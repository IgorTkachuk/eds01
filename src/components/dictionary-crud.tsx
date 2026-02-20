"use client";

import { useState } from "react";
import {
  createDictionaryItem,
  updateDictionaryItem,
  deleteDictionaryItem,
} from "@/lib/dictionaries/service";

import { DictionaryType } from "@/lib/dictionaries/config";

type Props = {
  type: DictionaryType;
  label: string;
  initialData: { id: number; name: string }[];
};

export default function DictionaryCrud({ type, label, initialData }: Props) {
  const [items, setItems] = useState(initialData);
  const [newName, setNewName] = useState("");

  async function handleCreate() {
    const [created] = await createDictionaryItem(type, newName);
    setItems([...items, created]);
    setNewName("");
  }

  async function handleDelete(id: number) {
    await deleteDictionaryItem(type, id);
    setItems(items.filter((i) => i.id !== id));
  }

  return (
    <div>
      <h1>{label}</h1>

      <div>
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        <button onClick={handleCreate}>Додати</button>
      </div>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleDelete(item.id)}>Видалити</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
