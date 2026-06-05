import { useState, useEffect } from "react";
import { GROUPS_DATA, INITIAL_MATCHES, calculateStandings, Match } from "./data/tournamentData";
import NewsSection from "./components/NewsSection";
import GroupCarousel from "./components/GroupCarousel";
import FooterLiveMatches from "./components/FooterLiveMatches";

// Import beautiful header generated image directly
// @ts-ignore
import headerImg from "./assets/images/world_cup_header_1780694825270.png";

import {
  Trophy,
  Calendar,
  Settings,
  Sparkles,
  RefreshCw,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"inicio" | "cargar" | "posiciones">("inicio");
  const [matches, setMatches] = useState<Match[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Filters for administration/cargar screen
  const [filterGroup, setFilterGroup] = useState<string>("TODOS");
  const [filterDate, setFilterDate] = useState<string>("TODOS");
  const [searchTeam, setSearchTeam] = useState<string>("");

  // Load matches from localStorage if available, otherwise use initialMatches
  useEffect(() => {
    const saved = localStorage.getItem("mundial_matches");
    if (saved) {
      try {
        setMatches(JSON.parse(saved));
      } catch (e) {
        console.error("No se pudo cargar localStorage mundial_matches:", e);
        setMatches(INITIAL_MATCHES);
      }
    } else {
      setMatches(INITIAL_MATCHES);
    }
  }, []);

  const saveMatches = (updated: Match[]) => {
    setMatches(updated);
    localStorage.setItem("mundial_matches", JSON.stringify(updated));
  };

  // Modify individual match score
  const handleUpdateScore = (matchId: string, score1: number | null, score2: number | null) => {
    const updated = matches.map((m) => {
      if (m.id === matchId) {
        return { ...m, score1, score2 };
      }
      return m;
    });
    saveMatches(updated);
  };

  // Reset matches to null/initial state
  const handleResetScores = () => {
    if (confirm("¿Estás seguro de que deseas vaciar todos los resultados cargados?")) {
      saveMatches(INITIAL_MATCHES);
      setSuccessMsg("Resultados reiniciados correctamente.");
      setTimeout(() => setSuccessMsg(null), 3500);
    }
  };

  // Synchronize/Simulate matches through AI (Gemini)
  const handleSyncWithAI = async () => {
    setSyncing(true);
    setSuccessMsg(null);
    setErrorMsg(null);
    try {
      const response = await fetch("/api/sync-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matches }),
      });
      const data = await response.json();
      if (data.success && data.matches) {
        saveMatches(data.matches);
        setSuccessMsg(
          data.note
            ? "Simulado localmente sin internet."
            : "¡Partidos sincronizados con éxito mediante Inteligencia Artificial (Gemini)!"
        );
        setTimeout(() => setSuccessMsg(null), 4000);
      } else {
        throw new Error("No se obtuvieron resultados de sincronización.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Ocurrió un error al sincronizar con el backend de IA. Reintentando...");
    } finally {
      setSyncing(false);
    }
  };

  // Extract unique dates for search filter
  const uniqueDates = Array.from(new Set(INITIAL_MATCHES.map((m) => m.date)));

  // Filter administration matches based on search and selected filter values
  const filteredMatchesForCargar = matches.filter((m) => {
    const matchesGroup = filterGroup === "TODOS" || m.group === filterGroup;
    const matchesDate = filterDate === "TODOS" || m.date === filterDate;
    const matchesSearch =
      searchTeam === "" ||
      m.team1.toLowerCase().includes(searchTeam.toLowerCase()) ||
      m.team2.toLowerCase().includes(searchTeam.toLowerCase());
    return matchesGroup && matchesDate && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e5e5] pb-36 font-sans antialiased selection:bg-amber-500/20 selection:text-amber-200">
      
      {/* Top Banner & Navigation Header */}
      <header className="sticky top-0 bg-[#050505]/90 backdrop-blur-md border-b border-white/10 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-black shadow-md shadow-amber-500/20 shrink-0">
              <Trophy className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter text-white leading-none uppercase italic font-display">
                Mundial<span className="text-amber-500">App</span> <span className="text-amber-500 font-extrabold text-[12px] font-mono tracking-normal capitalize bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded-md ml-1 not-italic">2026</span>
              </h1>
              <p className="text-[10px] text-white/50 tracking-[0.25em] font-medium font-mono leading-none mt-1 uppercase">COPA DEL MUNDO 2026 — Official Management</p>
            </div>
          </div>

          {/* Navigation View Switcher tabs */}
          <nav className="flex items-center gap-1.5 bg-white/[0.03] p-1 rounded-xl border border-white/10 shrink-0 font-mono">
            <button
              onClick={() => setActiveTab("inicio")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "inicio"
                  ? "bg-amber-500 text-black shadow-sm"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              Inicio Mundial
            </button>
            <button
              onClick={() => setActiveTab("cargar")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "cargar"
                  ? "bg-amber-500 text-black shadow-sm"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              Cargar Resultados
            </button>
            <button
              onClick={() => setActiveTab("posiciones")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "posiciones"
                  ? "bg-amber-500 text-black shadow-sm"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              Tabla de Grupos
            </button>
          </nav>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 mt-6">

        {/* Dynamic Alerts Banner */}
        {successMsg && (
          <div className="flex items-center gap-2.5 p-3.5 mb-6 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs font-medium animate-fade-in-down shadow-lg">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
            <p>{successMsg}</p>
          </div>
        )}

        {errorMsg && (
          <div className="flex items-center gap-2.5 p-3.5 mb-6 bg-rose-950/40 border border-rose-500/30 rounded-xl text-rose-300 text-xs font-medium animate-fade-in-down shadow-lg">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <p>{errorMsg}</p>
          </div>
        )}

        {/* ==================== SCREEN 1: INICIO MUNDIAL ==================== */}
        {activeTab === "inicio" && (
          <div className="animate-fade-in">
            {/* Header Banner Image */}
            <div id="hero-banner" className="relative rounded-3xl overflow-hidden aspect-[21/9] max-h-[340px] mb-8 shadow-lg border border-white/10 bg-slate-950">
              <img
                src={headerImg}
                alt="FIFA World Cup 2026 Header"
                className="w-full h-full object-cover select-none brightness-[0.7] opacity-50"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-950/60 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/45 to-transparent flex items-end p-6 md:p-8 z-20">
                <div className="text-white max-w-2xl">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-500 text-black text-[10px] font-bold font-mono tracking-widest uppercase mb-2">
                    Oficial Primera Ronda
                  </div>
                  <h2 className="text-2xl md:text-4xl font-extrabold font-display tracking-tight leading-none text-white drop-shadow">
                    COPA MUNDIAL DE LA FIFA 2026
                  </h2>
                  <p className="text-xs md:text-sm text-white/75 mt-2 font-medium drop-shadow leading-relaxed">
                    Sigue todo el fixture de primera ronda del torneo de fútbol más grande del mundo en directo. Configura los resultados y mira cómo se actualiza la tabla de posiciones en vivo desde tu casa.
                  </p>
                </div>
              </div>
            </div>

            {/* News Section with search grounding fetch */}
            <NewsSection />

            {/* Single Group Widget Header */}
            <div className="mb-4">
              <h3 className="text-lg font-black text-white tracking-tight uppercase font-display">
                Tablero del Torneo por Grupos
              </h3>
              <p className="text-xs text-white/40 leading-none">Navega por las pestañas de los grupos para administrar y visualizar su estado</p>
            </div>

            {/* Group Carousel with standigs & inputs */}
            <GroupCarousel
              groups={GROUPS_DATA}
              matches={matches}
              onUpdateScore={handleUpdateScore}
            />
          </div>
        )}

        {/* ==================== SCREEN 2: CARGAR RESULTADOS (ADMIN) ==================== */}
        {activeTab === "cargar" && (
          <div className="animate-fade-in bg-white/[0.03] border border-white/10 rounded-2xl shadow-xl p-6 mb-8">
            
            {/* Admin Header with actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
              <div>
                <h2 className="text-xl font-bold text-white font-display">Carga de Resultados Center</h2>
                <p className="text-xs text-white/55">Actualiza los marcadores manualmente o sincronízalos automáticamente mediante Inteligencia Artificial</p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSyncWithAI}
                  disabled={syncing}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-[0.98] text-black text-xs font-bold rounded-xl shadow-md transition-all disabled:opacity-50"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
                  {syncing ? "Sincronizando..." : "Sincronizar Resultados con IA"}
                </button>

                <button
                  onClick={handleResetScores}
                  className="px-4 py-2 hover:bg-white/10 hover:text-white text-white/70 active:scale-[0.98] text-xs font-bold rounded-xl border border-white/10 transition-all"
                >
                  Vaciar Marcadores
                </button>
              </div>
            </div>

            {/* AI Warning / Helper box */}
            <div className="flex gap-3 p-4 bg-white/[0.02] border border-white/10 rounded-2xl text-white/80 mb-6 text-xs leading-relaxed">
              <Info className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
              <div>
                <span className="font-bold">Soporte Inteligente de Resultados:</span> Al presionar "Sincronizar Resultados con IA", la aplicación simula puntajes de fútbol realistas de modo que puedas ver stands y tablas de inmediato, de forma interactiva.
              </div>
            </div>

            {/* Filters panel */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-6 bg-black/40 p-4 border border-white/5 rounded-xl">
              
              {/* Group Filter */}
              <div className="sm:col-span-3">
                <label className="block text-[10px] font-bold text-white/40 font-mono uppercase mb-1">Filtrar por Grupo</label>
                <div className="relative">
                  <select
                    value={filterGroup}
                    onChange={(e) => setFilterGroup(e.target.value)}
                    className="w-full bg-[#0d0d0d] appearance-none text-xs font-semibold px-3 py-2 border border-white/10 focus:border-amber-400 focus:outline-none rounded-lg pr-8 text-white cursor-pointer"
                  >
                    <option value="TODOS">TODOS LOS GRUPOS</option>
                    {GROUPS_DATA.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-white/40">
                    <Filter className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Date Filter */}
              <div className="sm:col-span-3">
                <label className="block text-[10px] font-bold text-white/40 font-mono uppercase mb-1">Filtrar por Día</label>
                <div className="relative">
                  <select
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="w-full bg-[#0d0d0d] appearance-none text-xs font-semibold px-3 py-2 border border-white/10 focus:border-amber-400 focus:outline-none rounded-lg pr-8 text-white cursor-pointer"
                  >
                    <option value="TODOS">TODOS LOS DÍAS</option>
                    {uniqueDates.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-white/40">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Text Search Team */}
              <div className="sm:col-span-6">
                <label className="block text-[10px] font-bold text-white/40 font-mono uppercase mb-1">Buscar por Selección</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTeam}
                    onChange={(e) => setSearchTeam(e.target.value)}
                    placeholder="Escribe el nombre del país, ej: 'Argentina', 'Alemania'..."
                    className="w-full bg-[#0d0d0d] text-xs px-3 py-2 border border-white/10 focus:border-amber-400 focus:outline-none rounded-lg pr-8 text-white font-medium placeholder-white/30"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-white/40">
                    <Search className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

            </div>

            {/* List of matches matches */}
            <div className="text-xs text-white/40 font-mono mb-3 px-1">
              Mostrando {filteredMatchesForCargar.length} de {matches.length} partidos del fixture
            </div>

            {filteredMatchesForCargar.length === 0 ? (
              <div className="text-center py-16 bg-white/[0.01] border border-white/5 rounded-2xl">
                <AlertCircle className="w-8 h-8 text-white/20 mx-auto mb-2" />
                <p className="text-sm font-bold text-white/70">Ningún partido coincide con los filtros</p>
                <p className="text-xs text-white/40 mt-1">Prueba a seleccionar otro grupo o limpiar la búsqueda</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMatchesForCargar.map((m) => {
                  return (
                    <div
                      key={m.id}
                      className="bg-white/[0.02] hover:bg-white/[0.04] rounded-2xl border border-white/10 hover:border-amber-500/20 shadow-md p-4 transition-all duration-150 flex flex-col justify-between"
                    >
                      <div>
                        {/* Header metadata decoration */}
                        <div className="flex items-center justify-between gap-2 mb-3 pb-1 border-b border-white/5">
                          <span className="text-[10px] font-bold font-mono text-amber-500 bg-amber-500/10 border border-amber-500/25 px-2 py-0.5 rounded-full">
                            GRUPO {m.group}
                          </span>
                          <span className="text-[10px] text-white/40 font-mono">{m.date} &bull; {m.time} HS</span>
                        </div>

                        {/* Interactive score editor row */}
                        <div className="grid grid-cols-12 items-center gap-2 py-3 bg-black/40 px-3 border border-white/5 rounded-xl mb-3">
                          <label className="col-span-4 font-bold text-white/90 text-right truncate text-xs">
                            {m.team1}
                          </label>
                          <div className="col-span-4 flex items-center justify-center gap-2">
                            <input
                              type="number"
                              min="0"
                              placeholder="-"
                              value={m.score1 !== null ? m.score1 : ""}
                              onChange={(e) => {
                                const val = e.target.value === "" ? null : parseInt(e.target.value);
                                handleUpdateScore(m.id, val, m.score2);
                              }}
                              className="w-10 h-8 text-center font-black bg-white/10 border border-white/10 rounded text-amber-500 focus:border-amber-500 focus:bg-white/25 text-xs transition-all focus:outline-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            />
                            <span className="text-white/20 text-[10px] font-bold">&mdash;</span>
                            <input
                              type="number"
                              min="0"
                              placeholder="-"
                              value={m.score2 !== null ? m.score2 : ""}
                              onChange={(e) => {
                                const val = e.target.value === "" ? null : parseInt(e.target.value);
                                handleUpdateScore(m.id, m.score1, val);
                              }}
                              className="w-10 h-8 text-center font-black bg-white/10 border border-white/10 rounded text-amber-500 focus:border-amber-500 focus:bg-white/25 text-xs transition-all focus:outline-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            />
                          </div>
                          <label className="col-span-4 font-bold text-white/90 text-left truncate text-xs">
                            {m.team2}
                          </label>
                        </div>
                      </div>

                      {/* Footer tv details */}
                      <div className="text-[10px] text-white/40 flex items-center justify-between font-mono bg-black/25 p-1.5 rounded-lg border border-white/5">
                        <span>Canal: <strong className="text-white/80">{m.channel}</strong></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* ==================== SCREEN 3: TABLA DE POSICIONES CONSOLIDADA ==================== */}
        {activeTab === "posiciones" && (
          <div className="animate-fade-in">
            {/* Header section info */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight uppercase font-display">
                  Tablas de Posiciones Consolidadas
                </h2>
                <p className="text-xs text-white/40">Visualización de las posiciones de las 48 selecciones clasificadas en los 12 grupos de primera ronda en tiempo real</p>
              </div>
            </div>

            {/* Grid of 12 small Tables side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {GROUPS_DATA.map((group) => {
                const groupStandings = calculateStandings(group.id, matches);
                return (
                  <div
                    key={group.id}
                    className="bg-white/[0.02] border border-white/10 hover:border-amber-500/20 rounded-2xl shadow-lg overflow-hidden p-5 transition-all duration-300"
                    id={`consolidated-group-card-${group.id}`}
                  >
                    <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3">
                      <h3 className="font-extrabold text-[15px] font-display text-white uppercase tracking-tight">
                        {group.name}
                      </h3>
                      <span className="text-[9px] font-black font-mono text-amber-500 uppercase bg-amber-500/10 border border-amber-500/25 px-1.5 py-0.5 rounded">
                        4 Selecciones
                      </span>
                    </div>

                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-white/5 text-[10px] font-bold text-white/40 font-mono">
                          <th className="py-1 px-1 text-center w-6">#</th>
                          <th className="py-1 px-1 text-left">Selección</th>
                          <th className="py-1 px-1 text-center w-6" title="Partidos Jugados">PJ</th>
                          <th className="py-1 px-1 text-center w-6" title="Goles a Favor">GF</th>
                          <th className="py-1 px-1 text-center w-6" title="Diferencia de Goles">DG</th>
                          <th className="py-1 px-1.5 text-center w-8 text-amber-500">Pts</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {groupStandings.map((row, index) => {
                          const isLead = index < 2;
                          return (
                            <tr
                              key={row.team}
                              className={`hover:bg-white/5 ${
                                isLead ? "bg-emerald-500/[0.02]" : ""
                              }`}
                            >
                              <td className="py-2.5 px-1 text-center font-bold font-mono text-[10px]">
                                <span
                                  className={`inline-block w-4 h-4 rounded text-center leading-none ${
                                    isLead
                                      ? "bg-emerald-500/25 text-emerald-400 text-[9px] pt-0.5 font-bold"
                                      : "bg-white/10 text-white/40 text-[9px] pt-0.5"
                                  }`}
                                >
                                  {index + 1}
                                </span>
                              </td>
                              <td className="py-2.5 px-1 font-semibold text-white/90 truncate max-w-[110px]">
                                {row.team}
                              </td>
                              <td className="py-2.5 px-1 text-center font-mono text-white/50">{row.played}</td>
                              <td className="py-2.5 px-1 text-center font-mono text-white/50">{row.gf}</td>
                              <td
                                className={`py-2.5 px-1 text-center font-bold font-mono ${
                                  row.gd > 0
                                    ? "text-emerald-400"
                                    : row.gd < 0
                                    ? "text-rose-400"
                                    : "text-white/20"
                                }`}
                              >
                                {row.gd > 0 ? `+${row.gd}` : row.gd}
                              </td>
                              <td className="py-2.5 px-1.5 text-center font-black font-mono text-sm text-white">
                                {row.points}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>

      {/* Ticker / Live Matches Day to Day Ticker Footer */}
      <FooterLiveMatches
        matches={matches}
        onSelectMatch={(id) => {
          // Find match group and navigate group carousel to view/edit it
          const m = matches.find((m) => m.id === id);
          if (m) {
            const groupIdx = GROUPS_DATA.findIndex((g) => g.id === m.group);
            if (groupIdx !== -1) {
              setActiveTab("inicio");
              // Wait for component swap and scroll to element smoothly
              setTimeout(() => {
                const carouselEl = document.getElementById("group-carousel-container");
                if (carouselEl) {
                  carouselEl.scrollIntoView({ behavior: "smooth" });
                }
                const matchCard = document.getElementById(`match-editor-card-${id}`);
                if (matchCard) {
                  matchCard.classList.add("ring-2", "ring-amber-500", "scale-[1.01]");
                  setTimeout(() => {
                    matchCard.classList.remove("ring-2", "ring-amber-500", "scale-[1.01]");
                  }, 3000);
                }
              }, 120);
            }
          }
        }}
      />

    </div>
  );
}
