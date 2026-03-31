import { useState } from "react";
import WineTable from "./components/WineTable";
import WishList from "./components/WishList";

type Page = "journal" | "onskeliste";

export default function App() {
  const [page, setPage] = useState<Page>("journal");

  return (
    <div style={{ backgroundColor: "#FCF6EE", minHeight: "100vh" }}>
      <nav className="sticky top-0 z-40 border-b px-6" style={{ backgroundColor: "#FCF6EE", borderColor: "#E8DDD4" }}>
        <div className="max-w-5xl mx-auto flex gap-1 py-3">
          <button
            onClick={() => setPage("journal")}
            className="px-4 py-1.5 rounded-lg text-sm font-medium transition"
            style={{
              backgroundColor: "transparent",
              color: page === "journal" ? "#1A1A1A" : "#7C6A5E",
              borderBottom: page === "journal" ? "3px solid #97D2EC" : "3px solid transparent",
              borderRadius: 0,
            }}
          >
            Rett i nebbet
          </button>
          <button
            onClick={() => setPage("onskeliste")}
            className="px-4 py-1.5 text-sm font-medium transition"
            style={{
              backgroundColor: "transparent",
              color: page === "onskeliste" ? "#1A1A1A" : "#7C6A5E",
              borderBottom: page === "onskeliste" ? "3px solid #97D2EC" : "3px solid transparent",
              borderRadius: 0,
            }}
          >
            Ønskelisten
          </button>
        </div>
      </nav>

      {page === "journal" ? <WineTable /> : <WishList />}
    </div>
  );
}
