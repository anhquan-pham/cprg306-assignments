"use client";

import { useState } from "react";
import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items.json";

type Item = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function Week6() {
  const [items, setItems] = useState<Item[]>(itemsData);

  const handleAddItem = (newItem: Omit<Item, "id">) => {
    const itemWithId: Item = {
      ...newItem,
      id: crypto.randomUUID(),
    };

    setItems((prevItems) => [...prevItems, itemWithId]);
  };

  return (
    <main>
      <h1 style={{ textAlign: "center", fontSize: "2rem" }}>SHOPPING LIST</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
        }}
      >
        <div>
          <NewItem onAddItem={handleAddItem} />
        </div>

        <div>
          <ItemList items={items} />
        </div>
      </div>
    </main>
  );
}
