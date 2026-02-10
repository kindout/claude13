import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Page } from "../../components/layout/Page";
import { EmptyState } from "../../components/ui/EmptyState";
import { CardItem } from "../../components/card/CardItem";
import { boardsService } from "../../services/boards.service";
import { useToast } from "../../hooks/useToast";

type CardDTO = { id: number; title: string; dueDate?: string; order?: number };
type ListDTO = { id: number; title: string; order?: number; cards: CardDTO[] };
type BoardDTO = { id: number; title: string; lists: ListDTO[] };

export function BoardView() {
  const { id } = useParams();
  const toast = useToast();

  const [board, setBoard] = useState<BoardDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const boardId = Number(id);

  const load = async () => {
    setIsLoading(true);
    try {
      const res = await boardsService.get(boardId);
      // Strapi response => { data: { id, attributes: { title, lists: { data: [...] } } } }
      const b = res?.data;
      const attrs = b?.attributes ?? {};

      const lists: ListDTO[] = (attrs?.lists?.data ?? []).map((l: any) => {
        const lAttrs = l.attributes ?? {};
        const cards: CardDTO[] = (lAttrs?.cards?.data ?? []).map((c: any) => {
          const cAttrs = c.attributes ?? {};
          return {
            id: c.id,
            title: cAttrs?.title ?? "Card",
            dueDate: cAttrs?.dueDate,
            order: cAttrs?.order,
          };
        });

        return {
          id: l.id,
          title: lAttrs?.title ?? "Liste",
          order: lAttrs?.order,
          cards,
        };
      });

      setBoard({
        id: b.id,
        title: attrs?.title ?? `Board ${b.id}`,
        lists,
      });
    } catch {
      toast.error("Impossible de charger le board");
      setBoard(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!Number.isFinite(boardId)) return;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardId]);

  const sortedLists = useMemo(() => {
    if (!board) return [];
    return [...board.lists].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [board]);

  return (
    <Page
      title={board ? board.title : "Board"}
      right={<Link to="/boards">← Retour</Link>}
    >
      {isLoading ? (
        <div>Chargement...</div>
      ) : !board ? (
        <EmptyState title="Board introuvable" />
      ) : (
        <div
          style={{
            display: "flex",
            gap: 12,
            overflowX: "auto",
            paddingBottom: 8,
          }}
        >
          {sortedLists.length === 0 ? (
            <div style={{ minWidth: 320 }}>
              <EmptyState title="Aucune colonne" hint="Ajoute ta première colonne." />
            </div>
          ) : (
            sortedLists.map((list) => {
              const sortedCards = [...list.cards].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
              return (
                <div
                  key={list.id}
                  style={{
                    minWidth: 320,
                    background: "#f7f7f7",
                    border: "1px solid #eee",
                    borderRadius: 12,
                    padding: 12,
                  }}
                >
                  <div style={{ fontWeight: 700, marginBottom: 10 }}>
                    {list.title}
                  </div>

                  {sortedCards.length === 0 ? (
                    <EmptyState title="Aucune carte" hint="Crée une carte dans cette colonne." />
                  ) : (
                    <div style={{ display: "grid", gap: 10 }}>
                      {sortedCards.map((c) => (
                        <CardItem key={c.id} title={c.title} dueDate={c.dueDate} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </Page>
  );
}
