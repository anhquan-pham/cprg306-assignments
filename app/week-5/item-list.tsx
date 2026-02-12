"use client";
import { useState } from "react";
import Item from "./item";
import items from "./items.json";

export default function ItemList() {
  const [sortBy, setSortBy] = useState("name");
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }

    return a.category.localeCompare(b.category);
  });

  const groupedItems = items
    .slice()
    .sort((a, b) => {
      const categoryCompare = a.category.localeCompare(b.category);
      if (categoryCompare !== 0) {
        return categoryCompare;
      }

      return a.name.localeCompare(b.name);
    })
    .reduce<Record<string, typeof items>>((groups, item) => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }

      groups[item.category].push(item);
      return groups;
    }, {});

  const activeButtonStyle = {
    backgroundColor: "#78190c",
    color: "#ffffff",
  };

  const baseButtonStyle = {
    border: "2px solid #1f2937",
    borderRadius: "0.5rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#ffffff",
    color: "#1f2937",
    cursor: "pointer",
    transition: "background-color 0.2s ease, color 0.2s ease",
  };

  const hoverButtonStyle = {
    backgroundColor: "#fde68a",
    color: "#1f2937",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "1rem",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            onClick={() => setSortBy("name")}
            onMouseEnter={() => setHoveredButton("name")}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              ...baseButtonStyle,
              ...(sortBy === "name"
                ? activeButtonStyle
                : hoveredButton === "name"
                  ? hoverButtonStyle
                  : undefined),
            }}
          >
            Sort by Name
          </button>
          <button
            type="button"
            onClick={() => setSortBy("category")}
            onMouseEnter={() => setHoveredButton("category")}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              ...baseButtonStyle,
              ...(sortBy === "category"
                ? activeButtonStyle
                : hoveredButton === "category"
                  ? hoverButtonStyle
                  : undefined),
            }}
          >
            Sort by Category
          </button>
          <button
            type="button"
            onClick={() => setSortBy("grouped")}
            onMouseEnter={() => setHoveredButton("grouped")}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              ...baseButtonStyle,
              ...(sortBy === "grouped"
                ? activeButtonStyle
                : hoveredButton === "grouped"
                  ? hoverButtonStyle
                  : undefined),
            }}
          >
            Group by Category
          </button>
        </div>
        {sortBy === "grouped" ? (
          <div style={{ textAlign: "left" }}>
            {Object.entries(groupedItems).map(([category, categoryItems]) => (
              <div
                key={category}
                style={{
                  border: "5px solid #FFFF00",
                  backgroundColor: "#dbeafe",
                  color: "#000000",
                  padding: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <p
                  className="capitalize"
                  style={{
                    fontWeight: 800,
                    textAlign: "center",
                    marginBottom: "0.75rem",
                  }}
                >
                  {category}
                </p>
                {categoryItems.map((item) => (
                  <div key={item.id} style={{ marginBottom: "1rem" }}>
                    <Item item={item} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div>
            {sortedItems.map((item) => (
              <div
                key={item.id}
                style={{
                  border: "1px solid #ccc",
                  backgroundColor: "#dbeafe",
                  color: "#000000",
                  padding: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <Item item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
