import { useEffect, useRef, useState } from "react";
import { Page } from "../../components/layout/Page";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/EmptyState";
import { BoardCard } from "../../components/board/BoardCard";
import { boardsService } from "../../services/boards.service";
import { useToast } from "../../hooks/useToast";
import { useAuth } from "../../hooks/useAuth";

type BoardDTO = { id: number; title: string };

export function BoardsList() {
  const toast = useToast();
  const { logout } = useAuth();

  const [boards, setBoards] = useState<BoardDTO[]>([]);
  const boardsRef = useRef<BoardDTO[]>([]);
  useEffect(() => {
    boardsRef.current = boards;
  }, [boards]);

  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const load = async () => {
    setIsLoading(true);
    try {
      const data = await boardsService.list(); // list(): Promise<Board[]>
      setBoards(data);
    } catch (e) {
      console.log("LOAD ERROR =>", e);
      toast.error("Impossible de charger les boards");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const createBoard = async () => {
    if (isCreating) return; // anti double clic
    const t = title.trim();
    if (!t) return;

    setIsCreating(true);
    try {
      // ✅ UN SEUL appel
      const created = await boardsService.create(t); // create(): Promise<Board>

      // ✅ UI immédiate
      setBoards((prev) => [{ id: created.id, title: created.title }, ...prev]);

      setTitle("");
      toast.success("Board créé");
    } catch (e) {
      console.log("CREATE ERROR =>", e);
      toast.error("Création impossible");
    } finally {
      setIsCreating(false);
    }
  };

  const deleteBoard = async (id: number) => {
    if (deletingId === id) return;

    const backup = boardsRef.current; // snapshot fiable
    setDeletingId(id);

    // ✅ retire tout de suite de l'UI
    setBoards((prev) => prev.filter((b) => b.id !== id));

    try {
      await boardsService.remove(id);
      toast.success("Board supprimé");
    } catch (e) {
      console.log("DELETE ERROR =>", e);
      toast.error("Suppression impossible");
      // rollback
      setBoards(backup);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Page title="Mes boards" right={<Button onClick={logout}>Déconnexion</Button>}>
      {/* ✅ un seul point d'entrée: submit */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createBoard();
        }}
        style={{ display: "flex", gap: 10, alignItems: "center" }}
      >
        <div style={{ flex: 1 }}>
          <Input
            placeholder="Nouveau board..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isCreating}
          />
        </div>

        <Button type="submit" isLoading={isCreating} disabled={isCreating || !title.trim()}>
          Créer
        </Button>
      </form>

      <div style={{ marginTop: 16 }}>
        {isLoading ? (
          <div>Chargement...</div>
        ) : boards.length === 0 ? (
          <EmptyState title="Aucun board" hint="Crée ton premier board avec le champ ci-dessus." />
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {boards.map((b) => (
              <BoardCard key={b.id} id={b.id} title={b.title} onDelete={deleteBoard} />
            ))}
          </div>
        )}
      </div>
    </Page>
  );
}
