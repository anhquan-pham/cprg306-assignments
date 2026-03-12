"use client";

import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from "next/navigation";
import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items.json";
import MealIdeas from "./meal-ideas";

type Item = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function Week6() {
  const { user } = useUserAuth();
  const router = useRouter();

  // if not logged in, redirect back to landing page
  useEffect(() => {
    if (user === null) {
      router.push("/week-8");
    }
  }, [user, router]);

  if (user === null) {
    // don't render the shopping list at all until we know the user is available
    return null;
  }

  const [items, setItems] = useState<Item[]>(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  const handleAddItem = (newItem: Omit<Item, "id">) => {
    const itemWithId: Item = {
      ...newItem,
      id: crypto.randomUUID(),
    };

    setItems((prevItems) => [...prevItems, itemWithId]);
  };

  const handleItemSelect = (item: Item) => {
    const cleanedName = item.name
      .split(",")[0]
      .trim()
      .replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        "",
      )
      .trim();

    setSelectedItemName(cleanedName);
  };

  return (
    <main>
      <h1 style={{ textAlign: "center", fontSize: "2rem" }}>SHOPPING LIST</h1>
      <div
        style={{
          display: "flex",
          gap: "2rem",
          alignItems: "flex-start",
          paddingLeft: "1rem",
        }}
      >
        <div style={{ flex: 1 }}>
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>

        <div style={{ flex: 1 }}>
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}
