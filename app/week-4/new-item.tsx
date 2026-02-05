"use client";

import { useState } from "react";

export default function NewItem() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("Produce");

  const onBlur = () => {
    setNameTouched(true);
    const trimmed = name.trim();
    if (!trimmed) {
      setNameError("Item name cannot be empty!");
    } else if (trimmed.length < 2) {
      setNameError("Item name must be at least 2 characters");
    } else {
      setNameError("");
    }
  };

  const onFocus = () => {
    setNameTouched(false);
    setNameError("");
  };

  const submitFunction = (event) => {
    event.preventDefault();
    const trimmed = name.trim();

    if (!trimmed) {
      setNameTouched(true);
      setNameError("Item name cannot be empty!");
      return;
    }
    if (trimmed.length < 2) {
      setNameTouched(true);
      setNameError("Item name must be at least 2 characters");
      return;
    }
    if (quantity < 1 || quantity > 99) {
      alert("Quantity must be 1 to 99");
      return;
    }

    alert(
      `SUBMITTED \nItem name: ${trimmed}\nQuantity: ${quantity}\nCategory: ${category}`,
    );

    setName("");
    setNameError("");
    setNameTouched(false);
    setQuantity(1);
    setCategory("Produce");
  };

  const isFormInvalid =
    !name.trim() || name.trim().length < 2 || quantity < 1 || quantity > 99;

  return (
    <form
      onSubmit={submitFunction}
      className="flex flex-col gap-8 items-center justify-center mt-7"
    >
      <div className="w-100 bg-amber-100 border border-gray-200 rounded-lg p-6 flex flex-col gap-10 items-center">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder="Enter item name"
          className={`bg-white text-black w-80 border ${nameError ? "border-red-500" : "border-black"}`}
        />
        {nameError && <p className="text-red-500">{nameError}</p>}

        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          min="1"
          max="99"
          className="bg-white text-black flex-1 w-80 border border-black"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-white text-black w-80 border border-black"
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Bakery">Bakery</option>
          <option value="Meat">Meat</option>
          <option value="Frozen Foods">Frozen Foods</option>
          <option value="Canned Goods">Canned Goods</option>
          <option value="Dry Goods">Dry Goods</option>
          <option value="Beverages">Beverages</option>
          <option value="Snacks">Snacks</option>
          <option value="Household">Household</option>
          <option value="Other">Other</option>
        </select>

        <button
          type="submit"
          disabled={isFormInvalid}
          className={`bg-blue-500 text-white px-10 py-2 rounded ${isFormInvalid ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
