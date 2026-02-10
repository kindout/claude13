import { useEffect, useState } from "react";

type Status =
  | { kind: "idle"; msg: string }
  | { kind: "ok"; msg: string }
  | { kind: "err"; msg: string };

export function ApiTest() {
  const [status, setStatus] = useState<Status>({ kind: "idle", msg: "En attente..." });

  useEffect(() => {
    const controller = new AbortController();

    async function run() {
      try {
        const baseUrl = import.meta.env.VITE_API_URL;
        if (!baseUrl) {
          setStatus({ kind: "err", msg: "VITE_API_URL est vide. Vérifie ton .env (frontend)." });
          return;
        }

        // IMPORTANT: baseUrl contient déjà /api, donc on n'ajoute pas /api ici
        const res = await fetch(`${baseUrl}/auth/local`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identifier: "test@test.com", password: "test" }),
          signal: controller.signal,
        });

        const text = await res.text();
        if (!res.ok) {
          setStatus({ kind: "err", msg: `API KO (status ${res.status}). Body: ${text || "(vide)"}` });
          return;
        }

        setStatus({ kind: "ok", msg: `API OK (status ${res.status}). Body: ${text}` });
      } catch (e) {
        setStatus({ kind: "err", msg: `Erreur réseau (CORS/serveur off/URL): ${String(e)}` });
      }
    }

    run();
    return () => controller.abort();
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1>Test connexion Front ↔ Strapi</h1>
      <p><strong>Statut:</strong> {status.msg}</p>
      <p><strong>Backend:</strong> {import.meta.env.VITE_API_URL || "(non défini)"}</p>
    </div>
  );
}
