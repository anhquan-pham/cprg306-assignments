export default function Item({
  item,
  onSelect,
}: {
  item: { name: string; quantity: number; category: string };
  onSelect?: () => void;
}) {
  return (
    <div className="item">
      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
        <li
          onClick={onSelect}
          style={{
            cursor: "pointer",
            width: "50%",
            aspectRatio: "1 / 1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            border: "2px solid #1f2937",
            borderRadius: "0.5rem",
            padding: "0.5rem",
            backgroundColor: "#fff7ed",
            margin: "0 auto",
          }}
        >
          <h3>{item.name}</h3>
          <p>Quantity: {item.quantity}</p>
          <p>Category: {item.category}</p>
        </li>
      </ul>
    </div>
  );
}
