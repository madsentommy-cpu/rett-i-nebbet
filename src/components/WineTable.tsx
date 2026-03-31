import { useState } from "react";

type WineType = "hvit" | "rød" | "oransje" | "rosé" | "musserende";

interface Wine {
  produsent: string;
  cuvee: string;
  argang: number;
  land: string;
  drue: string;
  type: WineType;
  score: number;
}

const initialWines: Wine[] = [
  { produsent: "Domaine Leflaive", cuvee: "Puligny-Montrachet", argang: 2021, land: "Frankrike", drue: "Chardonnay", type: "hvit", score: 9 },
  { produsent: "Château Pichon Baron", cuvee: "Pichon Baron", argang: 2018, land: "Frankrike", drue: "Cabernet Sauvignon", type: "rød", score: 8 },
  { produsent: "Radikon", cuvee: "Ribolla", argang: 2019, land: "Italia", drue: "Ribolla Gialla", type: "oransje", score: 9 },
  { produsent: "Movia", cuvee: "Lunar", argang: 2020, land: "Slovenia", drue: "Pinot Grigio", type: "oransje", score: 7 },
  { produsent: "Château d'Esclans", cuvee: "Whispering Angel", argang: 2022, land: "Frankrike", drue: "Grenache", type: "rosé", score: 8 },
  { produsent: "Barolo Cascina Francia", cuvee: "Barolo", argang: 2017, land: "Italia", drue: "Nebbiolo", type: "rød", score: 10 },
  { produsent: "Weingut Knoll", cuvee: "Loibner Federspiel", argang: 2020, land: "Østerrike", drue: "Grüner Veltliner", type: "hvit", score: 8 },
  { produsent: "Domaine Weinbach", cuvee: "Cuvée Théo", argang: 2019, land: "Frankrike", drue: "Riesling", type: "hvit", score: 9 },
  { produsent: "Mas de Daumas Gassac", cuvee: "Rouge", argang: 2016, land: "Frankrike", drue: "Cabernet Sauvignon", type: "rød", score: 7 },
  { produsent: "Château Simone", cuvee: "Palette Rouge", argang: 2021, land: "Frankrike", drue: "Grenache", type: "rosé", score: 8 },
];

const typeConfig: Record<WineType, { label: string; icon: string; color: string; bg: string }> = {
  hvit:    { label: "Hvit",    icon: "🥂", color: "#8B7536", bg: "#FDF8E8" },
  rød:     { label: "Rød",     icon: "🍷", color: "#8B1A1A", bg: "#FFF0F0" },
  oransje: { label: "Oransje", icon: "🍊", color: "#B5540C", bg: "#FFF4E8" },
  rosé:       { label: "Rosé",       icon: "🌸", color: "#B5456A", bg: "#FFF0F5" },
  musserende: { label: "Musserende", icon: "🫧", color: "#2E6B8A", bg: "#EFF7FC" },
};

const emptyForm: Wine = {
  produsent: "",
  cuvee: "",
  argang: new Date().getFullYear(),
  land: "",
  drue: "",
  type: "rød",
  score: 8,
};

function ScoreBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className="w-2 h-4 rounded-sm"
            style={{ backgroundColor: i < score ? "#FF8C45" : "#E8DDD4" }}
          />
        ))}
      </div>
      <span className="text-sm font-semibold" style={{ color: "#1A1A1A" }}>
        {score}
      </span>
    </div>
  );
}

function WineModal({
  title,
  initial,
  submitLabel,
  onClose,
  onSubmit,
}: {
  title: string;
  initial: Wine;
  submitLabel: string;
  onClose: () => void;
  onSubmit: (wine: Wine) => void;
}) {
  const [form, setForm] = useState<Wine>(initial);

  const set = (field: keyof Wine, value: string | number) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.produsent || !form.land || !form.drue) return;
    onSubmit(form);
    onClose();
  };

  const labelClass = "block text-xs font-semibold uppercase tracking-wider mb-1";
  const inputClass = "w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-offset-1";
  const inputStyle = { borderColor: "#E8DDD4", backgroundColor: "#FDFAF6", color: "#3B1F1F" };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(59,31,31,0.35)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md rounded-2xl shadow-xl p-6" style={{ backgroundColor: "#FCF6EE" }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold" style={{ color: "#3B1F1F" }}>{title}</h2>
          <button
            onClick={onClose}
            className="text-lg leading-none px-2 py-1 rounded-lg hover:bg-black/5 transition"
            style={{ color: "#9C7E6B" }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass} style={{ color: "#9C7E6B" }}>Produsent</label>
              <input
                className={inputClass}
                style={inputStyle}
                value={form.produsent}
                onChange={(e) => set("produsent", e.target.value)}
                placeholder="f.eks. Domaine Leflaive"
                required
              />
            </div>
            <div>
              <label className={labelClass} style={{ color: "#9C7E6B" }}>Cuvée</label>
              <input
                className={inputClass}
                style={inputStyle}
                value={form.cuvee}
                onChange={(e) => set("cuvee", e.target.value)}
                placeholder="f.eks. Puligny-Montrachet"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass} style={{ color: "#9C7E6B" }}>Årgang</label>
              <input
                type="number"
                className={inputClass}
                style={inputStyle}
                value={form.argang}
                onChange={(e) => set("argang", parseInt(e.target.value))}
                min={1900}
                max={new Date().getFullYear()}
                required
              />
            </div>
            <div>
              <label className={labelClass} style={{ color: "#9C7E6B" }}>Land</label>
              <input
                className={inputClass}
                style={inputStyle}
                value={form.land}
                onChange={(e) => set("land", e.target.value)}
                placeholder="f.eks. Italia"
                required
              />
            </div>
          </div>

          <div>
            <label className={labelClass} style={{ color: "#9C7E6B" }}>Drue</label>
            <input
              className={inputClass}
              style={inputStyle}
              value={form.drue}
              onChange={(e) => set("drue", e.target.value)}
              placeholder="f.eks. Nebbiolo"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass} style={{ color: "#9C7E6B" }}>Type</label>
              <select
                className={inputClass}
                style={inputStyle}
                value={form.type}
                onChange={(e) => set("type", e.target.value as WineType)}
              >
                {(Object.entries(typeConfig) as [WineType, typeof typeConfig[WineType]][]).map(([key, cfg]) => (
                  <option key={key} value={key}>
                    {cfg.icon} {cfg.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass} style={{ color: "#9C7E6B" }}>
                Score: <span className="font-bold" style={{ color: "#7C3D3D" }}>{form.score}</span>
              </label>
              <input
                type="range"
                min={1}
                max={10}
                value={form.score}
                onChange={(e) => set("score", parseInt(e.target.value))}
                className="w-full mt-1 accent-[#7C3D3D]"
              />
              <div className="flex justify-between text-xs mt-0.5" style={{ color: "#B8A89A" }}>
                <span>1</span><span>10</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold border transition hover:bg-black/5"
              style={{ borderColor: "#E8DDD4", color: "#9C7E6B" }}
            >
              Avbryt
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: "#1A1A1A" }}
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function WineTable() {
  const [wines, setWines] = useState<Wine[]>(initialWines);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const addWine = (wine: Wine) => setWines((prev) => [wine, ...prev]);

  const updateWine = (wine: Wine) =>
    setWines((prev) => prev.map((w, i) => (i === editIndex ? wine : w)));

  return (
    <div className="min-h-screen px-6 py-12" style={{ backgroundColor: "#FCF6EE" }}>
      {showAddModal && (
        <WineModal
          title="Legg til vin"
          initial={emptyForm}
          submitLabel="Legg til"
          onClose={() => setShowAddModal(false)}
          onSubmit={addWine}
        />
      )}
      {editIndex !== null && (
        <WineModal
          title="Rediger vin"
          initial={wines[editIndex]}
          submitLabel="Lagre"
          onClose={() => setEditIndex(null)}
          onSubmit={updateWine}
        />
      )}

      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2" style={{ color: "#1A1A1A" }}>
              Rett i nebbet
            </h1>
            <p className="text-base" style={{ color: "#7C6A5E" }}>
              Viner jeg har drukket og mine vurderinger
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
            style={{ backgroundColor: "#1A1A1A" }}
          >
            <span className="text-base">+</span>
            Legg til vin
          </button>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-sm border" style={{ borderColor: "#E8DDD4" }}>
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ backgroundColor: "#F5EDE2" }}>
                {["Produsent", "Cuvée", "Årgang", "Land", "Drue", "Type", "Score", ""].map((h, i) => (
                  <th
                    key={i}
                    className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "#9C7E6B" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {wines.map((wine, i) => {
                const cfg = typeConfig[wine.type];
                return (
                  <tr
                    key={i}
                    style={{
                      backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#FCF6EE",
                      borderTop: "1px solid #EFE5D8",
                    }}
                  >
                    <td className="px-5 py-4 font-medium" style={{ color: "#3B1F1F" }}>
                      {wine.produsent}
                    </td>
                    <td className="px-5 py-4 text-sm" style={{ color: "#5C4A3E" }}>
                      {wine.cuvee}
                    </td>
                    <td className="px-5 py-4 text-sm" style={{ color: "#7C6A5E" }}>
                      {wine.argang}
                    </td>
                    <td className="px-5 py-4 text-sm" style={{ color: "#7C6A5E" }}>
                      {wine.land}
                    </td>
                    <td className="px-5 py-4 text-sm italic" style={{ color: "#5C4A3E" }}>
                      {wine.drue}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: cfg.bg, color: cfg.color }}
                      >
                        <span>{cfg.icon}</span>
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <ScoreBar score={wine.score} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditIndex(i)}
                          className="p-2 rounded-lg border transition hover:bg-black/5"
                          style={{ borderColor: "#E8DDD4", color: "#7C6A5E" }}
                          title="Rediger"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </button>
                        <button
                          onClick={() => setWines((prev) => prev.filter((_, j) => j !== i))}
                          className="p-2 rounded-lg border transition hover:bg-red-50"
                          style={{ borderColor: "#E8DDD4", color: "#B8A89A" }}
                          title="Slett"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                            <path d="M10 11v6"/>
                            <path d="M14 11v6"/>
                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-xs text-center" style={{ color: "#B8A89A" }}>
          {wines.length} viner registrert
        </p>
      </div>
    </div>
  );
}
