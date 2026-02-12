import ItemList from "./item-list";
// import Item from "./item";

export default function Page() {
  return (
    <main>
      <h1 style={{ textAlign: "center", fontSize: "2rem" }}>SHOPPING LIST</h1>
      <ItemList />
    </main>
  );
}
