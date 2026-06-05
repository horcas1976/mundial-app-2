import { useState } from "react";
import { Group, Match, calculateStandings } from "../data/tournamentData";
import { Trophy, HelpCircle, ChevronLeft, ChevronRight, Save } from "lucide-react";

interface GroupCarouselProps {
  groups: Group[];
  matches: Match[];
  onUpdateScore: (matchId: string, score1: number | null, score2: number | null) => void;
}

export default function GroupCarousel({ groups, matches, onUpdateScore }: GroupCarouselProps) {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const activeGroup = groups[activeGroupIndex];

  const handlePrev = () => {
    setActiveGroupIndex((prev) => (prev === 0 ? groups.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveGroupIndex((prev) => (prev === groups.length - 1 ? 0 : prev + 1));
  };

  // Standings for active group
  const standings = calculateStandings(activeGroup.id, matches);

  // Matches for active group
  const groupMatches = matches.filter((m) => m.group === activeGroup.id);

  return (
    <div id="group-carousel-container" className="bg-white/[0.03] rounded-2xl border border-white/10 shadow-lg overflow-hidden p-6 mb-8">
      
      {/* Selector & Title Header */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2 text-white/60 hover:text-amber-500 hover:bg-white/5 rounded-lg active:scale-95 transition-all font-bold"
            title="Grupo anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="text-center min-w-[140px]">
            <h2 className="text-2xl font-black text-white tracking-widest leading-none uppercase font-display">
              {activeGroup.name}
            </h2>
          </div>

          <button
            onClick={handleNext}
            className="p-2 text-white/60 hover:text-amber-500 hover:bg-white/5 rounded-lg active:scale-95 transition-all font-bold"
            title="Grupo siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Mini indicator labels */}
        <div className="hidden sm:flex items-center gap-1.5 flex-wrap">
          {groups.map((g, idx) => (
            <button
              key={g.id}
              onClick={() => setActiveGroupIndex(idx)}
              className={`w-7 h-7 text-xs font-mono font-bold rounded-lg transition-all ${
                idx === activeGroupIndex
                  ? "bg-amber-500 text-black"
                  : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
              }`}
            >
              {g.id}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Dynamic Real-time Standings Table */}
        <div className="lg:col-span-6">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-4 h-4 text-amber-500 animate-pulse" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Tabla de Posiciones
            </h3>
          </div>
          
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/20">
            <table className="w-full text-left border-collapse min-w-[360px]">
              <thead>
                <tr className="bg-black/40 border-b border-white/5 text-[11px] font-bold text-white/40 font-mono">
                  <th className="py-2.5 px-3 uppercase text-center w-8">Pos</th>
                  <th className="py-2.5 px-3 uppercase text-white/50">Equipo</th>
                  <th className="py-2.5 px-2 text-center w-10">PJ</th>
                  <th className="py-2.5 px-2 text-center w-10">PG</th>
                  <th className="py-2.5 px-2 text-center w-10">PE</th>
                  <th className="py-2.5 px-2 text-center w-10">PP</th>
                  <th className="py-2.5 px-2 text-center w-12">GF:GC</th>
                  <th className="py-2.5 px-2 text-center w-10">DG</th>
                  <th className="py-2.5 px-3 text-center w-12 text-amber-500">Pts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {standings.map((row, index) => {
                  const isQualified = index < 2; // Under 2026 rules, top 2 definitely qualify
                  return (
                    <tr
                      key={row.team}
                      className={`text-xs hover:bg-white/5 transition-colors ${
                        isQualified ? "bg-emerald-500/[0.02]" : ""
                      }`}
                    >
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`inline-flex items-center justify-center w-5 h-5 rounded-md font-bold font-mono text-[10px] ${
                            isQualified
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-white/10 text-white/40"
                          }`}
                        >
                          {index + 1}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-bold text-white/90 text-[13px]">{row.team}</span>
                      </td>
                      <td className="py-3 px-2 text-center font-semibold text-white/70 font-mono">{row.played}</td>
                      <td className="py-3 px-2 text-center text-white/70 font-mono">{row.won}</td>
                      <td className="py-3 px-2 text-center text-white/70 font-mono">{row.drawn}</td>
                      <td className="py-3 px-2 text-center text-white/70 font-mono">{row.lost}</td>
                      <td className="py-3 px-2 text-center text-white/50 font-mono text-[11px]">
                        {row.gf}:{row.ga}
                      </td>
                      <td
                        className={`py-3 px-2 text-center font-bold font-mono ${
                          row.gd > 0
                            ? "text-emerald-400"
                            : row.gd < 0
                            ? "text-rose-400"
                            : "text-white/20"
                        }`}
                      >
                        {row.gd > 0 ? `+${row.gd}` : row.gd}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="font-extrabold text-white font-mono text-sm">{row.points}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center gap-1.5 mt-3 text-[11px] text-white/40 font-mono leading-relaxed px-1">
            <span className="w-2.5 h-2.5 bg-emerald-500/20 border border-emerald-500/30 inline-block rounded shrink-0" />
            <span>Los dos primeros avanzan de ronda. Cuantos más goles marques, ¡mejor diferencia!</span>
          </div>
        </div>

        {/* Right Side: Interactive Match Score Setup Cards */}
        <div className="lg:col-span-6 bg-black/40 border border-white/5 rounded-2xl p-5 shadow-inner">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Partidos y Resultados del Grupo
              </h3>
              <p className="text-[11px] text-white/40 font-mono">Puedes cargar los goles directamente aquí</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {groupMatches.map((m) => {
              return (
                <div
                  key={m.id}
                  className="bg-white/[0.02] rounded-xl border border-white/5 hover:border-white/10 shadow-md p-3 transition-colors duration-150"
                  id={`match-editor-card-${m.id}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2 border-b border-white/5 pb-1.5">
                    <div className="text-[10px] text-white/40 font-mono font-semibold">
                      {m.date} - {m.time} HS
                    </div>
                    <span className="text-[9px] font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded font-mono uppercase">
                      {m.channel.split(" / ")[0]}
                    </span>
                  </div>

                  <div className="grid grid-cols-12 items-center gap-1 text-xs">
                    {/* Team1 Label */}
                    <div className="col-span-4 font-bold text-white/95 text-right truncate">
                      {m.team1}
                    </div>

                    {/* Inputs & Divider */}
                    <div className="col-span-4 flex items-center justify-center gap-2">
                      <input
                        type="number"
                        min="0"
                        placeholder="-"
                        value={m.score1 !== null ? m.score1 : ""}
                        onChange={(e) => {
                          const val = e.target.value === "" ? null : parseInt(e.target.value);
                          onUpdateScore(m.id, val, m.score2);
                        }}
                        className="w-10 h-8 text-center font-black bg-white/10 border border-white/10 rounded-md text-amber-500 focus:border-amber-500 focus:bg-white/25 text-sm transition-all focus:outline-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                      
                      <span className="text-white/20 font-extrabold text-[10px]">&mdash;</span>
                      
                      <input
                        type="number"
                        min="0"
                        placeholder="-"
                        value={m.score2 !== null ? m.score2 : ""}
                        onChange={(e) => {
                          const val = e.target.value === "" ? null : parseInt(e.target.value);
                          onUpdateScore(m.id, m.score1, val);
                        }}
                        className="w-10 h-8 text-center font-black bg-white/10 border border-white/10 rounded-md text-amber-500 focus:border-amber-500 focus:bg-white/25 text-sm transition-all focus:outline-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                    </div>

                    {/* Team2 Label */}
                    <div className="col-span-4 font-bold text-white/95 text-left truncate">
                      {m.team2}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
