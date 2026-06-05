import { useState, useMemo, useRef, useEffect } from "react";
import { Match } from "../data/tournamentData";
import { Calendar, ChevronLeft, ChevronRight, Tv } from "lucide-react";

interface FooterLiveMatchesProps {
  matches: Match[];
  onSelectMatch?: (matchId: string) => void;
}

export default function FooterLiveMatches({ matches, onSelectMatch }: FooterLiveMatchesProps) {
  // Extract all unique dates in the chronological order they appear in fixture
  const uniqueDates = useMemo(() => {
    const dates: string[] = [];
    matches.forEach((m) => {
      if (!dates.includes(m.date)) {
        dates.push(m.date);
      }
    });
    return dates;
  }, [matches]);

  // Set default selected date to the first date
  const [selectedDate, setSelectedDate] = useState<string>(uniqueDates[0] || "");
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter matches matching the selected date
  const dayMatches = useMemo(() => {
    return matches.filter((m) => m.date === selectedDate);
  }, [matches, selectedDate]);

  // Handle arrows in timeline
  const scrollDate = (direction: "left" | "right") => {
    const currentIndex = uniqueDates.indexOf(selectedDate);
    if (direction === "left" && currentIndex > 0) {
      setSelectedDate(uniqueDates[currentIndex - 1]);
    } else if (direction === "right" && currentIndex < uniqueDates.length - 1) {
      setSelectedDate(uniqueDates[currentIndex + 1]);
    }
  };

  // Auto-scroll timeline to keep selected element centered if needed
  useEffect(() => {
    const activeEl = document.getElementById(`tab-date-${uniqueDates.indexOf(selectedDate)}`);
    if (activeEl && containerRef.current) {
      const container = containerRef.current;
      const scrollLeft = activeEl.offsetLeft - container.offsetWidth / 2 + activeEl.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [selectedDate, uniqueDates]);

  return (
    <footer id="live-matches-footer" className="fixed bottom-0 left-0 right-0 bg-[#090909]/95 backdrop-blur-md border-t border-white/10 text-white z-40 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Quick Date Selector Timeline */}
          <div className="flex items-center gap-2 md:w-5/12 border-b md:border-b-0 md:border-r border-white/5 pb-2 md:pb-0 pr-4 shrink-0">
            <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold tracking-wider uppercase font-mono">
              <Calendar className="w-4 h-4 shrink-0" />
              <span>Días Fixture</span>
            </div>
            
            <div className="flex items-center gap-1 ml-auto">
              <button
                onClick={() => scrollDate("left")}
                disabled={uniqueDates.indexOf(selectedDate) === 0}
                className="p-1 text-slate-400 hover:text-white hover:bg-white/10 rounded disabled:opacity-30 transition-all font-bold"
                title="Día Anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div
                ref={containerRef}
                className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-[200px] sm:max-w-[300px] scroll-smooth"
                style={{ scrollbarWidth: "none" }}
              >
                {uniqueDates.map((date, idx) => {
                  const isActive = date === selectedDate;
                  // Simplify name slightly for timeline view
                  const displayDate = date.replace("de Junio", "/06");
                  return (
                    <button
                      key={date}
                      id={`tab-date-${idx}`}
                      onClick={() => setSelectedDate(date)}
                      className={`px-2.5 py-1 text-[11px] font-mono tracking-tight font-medium rounded-full transition-all shrink-0 whitespace-nowrap ${
                        isActive
                          ? "bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20"
                          : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                      }`}
                    >
                      {displayDate}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => scrollDate("right")}
                disabled={uniqueDates.indexOf(selectedDate) === uniqueDates.length - 1}
                className="p-1 text-slate-400 hover:text-white hover:bg-white/10 rounded disabled:opacity-30 transition-all font-bold"
                title="Próximo Día"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Matches for the Selected Day */}
          <div className="flex-1 overflow-x-auto no-scrollbar scroll-smooth" style={{ scrollbarWidth: "none" }}>
            <div className="flex items-center gap-4 py-0.5">
              {dayMatches.length === 0 ? (
                <p className="text-xs text-slate-400 font-medium">No hay partidos programados para este día.</p>
              ) : (
                dayMatches.map((m) => {
                  const hasScores = m.score1 !== null && m.score2 !== null;
                  return (
                    <div
                      key={m.id}
                      onClick={() => onSelectMatch?.(m.id)}
                      className="flex items-center gap-3 bg-[#121212]/90 hover:bg-white/[0.05] border border-white/10 hover:border-amber-500/30 rounded-xl px-4 py-1.5 min-w-[250px] cursor-pointer transition-all duration-200 hover:scale-[1.02] shrink-0 text-xs shadow-inner"
                    >
                      {/* Match metadata: Time and Group */}
                      <div className="flex flex-col items-center border-r border-white/10 pr-2.5">
                        <span className="text-[10px] font-bold font-mono text-amber-500">{m.time}</span>
                        <span className="text-[9px] font-bold text-slate-400 tracking-wider">GRUPO {m.group}</span>
                      </div>

                      {/* Teams and scores */}
                      <div className="flex-1 flex flex-col gap-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-slate-100 truncate max-w-[90px]">{m.team1}</span>
                          <span className={`font-mono font-bold text-center w-5 rounded ${hasScores ? "text-amber-500 bg-black/40" : "text-white/20"}`}>
                            {m.score1 !== null ? m.score1 : "-"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-slate-100 truncate max-w-[90px]">{m.team2}</span>
                          <span className={`font-mono font-bold text-center w-5 rounded ${hasScores ? "text-amber-500 bg-black/40" : "text-white/20"}`}>
                            {m.score2 !== null ? m.score2 : "-"}
                          </span>
                        </div>
                      </div>

                      {/* TV Channel Badge decoration */}
                      <div className="flex items-center justify-center p-1 bg-black/40 rounded border border-white/10" title={m.channel}>
                        <Tv className="w-3.5 h-3.5 text-slate-400 hover:text-amber-500 transition-colors" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Quick Explanatory Badge */}
          <div className="hidden lg:flex items-center gap-1.5 text-[10px] font-mono text-slate-400 shrink-0 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Zona Horaria: ARG (GMT-3)</span>
          </div>

        </div>
      </div>
    </footer>
  );
}
