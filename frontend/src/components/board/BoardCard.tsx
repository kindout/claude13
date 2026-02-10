import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

export function BoardCard({
  id,
  title,
  onDelete,
}: {
  id: number;
  title: string;
  onDelete: (id: number) => void;
}) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
      <Link to={`/boards/${id}`} style={{ textDecoration: "none" }}>
        {title}
      </Link>
      <Button onClick={() => onDelete(id)}>Supprimer</Button>
    </div>
  );
}

