"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from "next/navigation";
import ItemList from "./item-list";
import NewItem from "./new-item";
import { getItems, addItem } from "../_services/shopping-list-service.js";
import MealIdeas from "./meal-ideas";

type Item = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function Week6() {
  const { user, loading } = useUserAuth();
  const router = useRouter();

  const [items, setItems] = useState<Item[]>([]);
  const [selectedItemName, setSelectedItemName] = useState("");

  const loadItems = async () => {
    if (!user?.uid) return;
    const fetchedItems = await getItems(user.uid);
    setItems(fetchedItems);
  };

  // if not logged in, redirect back to landing page
  useEffect(() => {
    if (!loading && !user) {
      router.push("/week-8");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user]);

  if (loading) {
    // wait for auth to load before rendering
    return null;
  }

  if (!user) {
    // don't render the shopping list at all if not authenticated
    return null;
  }

  const handleAddItem = async (newItem: Omit<Item, "id">) => {
    if (!user?.uid) return;

    const newId = await addItem(user.uid, newItem);
    const itemWithId: Item = {
      ...newItem,
      id: newId,
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
