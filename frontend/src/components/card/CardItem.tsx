import { formatDate } from "../../utils/formatDate";

export function CardItem({
  title,
  dueDate,
}: {
  title: string;
  dueDate?: string;
}) {
  return (
    <div
      style={{
        border: "1px solid #eee",
        borderRadius: 10,
        padding: 10,
        background: "white",
      }}
    >
      <div style={{ fontWeight: 600 }}>{title}</div>
      {dueDate ? (
        <div style={{ marginTop: 6, fontSize: 12, opacity: 0.8 }}>
          ⏰ {formatDate(dueDate)}
        </div>
      ) : null}
    </div>
  );
}
