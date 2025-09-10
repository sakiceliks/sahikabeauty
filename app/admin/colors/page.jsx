"use client";
import { useState } from "react";

const colorVars = [
  { name: "Accent", var: "--color-accent" },
  { name: "Background", var: "--color-background" },
  { name: "Text", var: "--color-text" },
  // diğer renkler...
];

export default function ColorAdmin() {
  const [colors, setColors] = useState(() =>
    colorVars.reduce((acc, c) => {
      acc[c.var] = getComputedStyle(document.documentElement).getPropertyValue(c.var).trim();
      return acc;
    }, {})
  );

  const handleChange = (v, value) => {
    document.documentElement.style.setProperty(v, value);
    setColors((prev) => ({ ...prev, [v]: value }));
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-lg mt-12">
      <h2 className="text-2xl font-bold mb-6">Renk Yönetimi</h2>
      <form className="space-y-4">
        {colorVars.map((c) => (
          <div key={c.var} className="flex items-center gap-4">
            <label className="w-32">{c.name}</label>
            <input
              type="color"
              value={colors[c.var]}
              onChange={(e) => handleChange(c.var, e.target.value)}
              className="w-12 h-8 border rounded"
            />
            <input
              type="text"
              value={colors[c.var]}
              onChange={(e) => handleChange(c.var, e.target.value)}
              className="border rounded px-2 py-1 w-32"
            />
          </div>
        ))}
      </form>
    </div>
  );
}