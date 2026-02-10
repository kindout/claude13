export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div style={{ padding: 16, border: "1px dashed #ddd", borderRadius: 12 }}>
      <strong>{title}</strong>
      {hint ? <div style={{ marginTop: 6, opacity: 0.75 }}>{hint}</div> : null}
    </div>
  );
}
