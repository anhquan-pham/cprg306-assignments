export default function Item({
  item,
}: {
  item: { name: string; quantity: number; category: string };
}) {
  return (
    <div className="item">
      <h3>{item.name}</h3>
      <p>Quantity: {item.quantity}</p>
      <p>Category: {item.category}</p>
    </div>
  );
}
