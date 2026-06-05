import { useEffect, useState } from "react";
import { Newspaper, RefreshCw, AlertTriangle } from "lucide-react";

export interface NewsItem {
  title: string;
  summary: string;
  date: string;
  url: string;
}

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/news");
      const data = await response.json();
      if (data.success && data.news) {
        setNews(data.news);
      } else {
        throw new Error("No se pudo obtener las noticias.");
      }
    } catch (err: any) {
      console.error(err);
      setError("No se pudo cargar las noticias en vivo. Mostrando respaldo offline.");
      setNews([
        {
          title: "¡Todo Listo para el Mundial 2026!",
          summary: "Por primera vez en la historia, 48 selecciones disputarán el trofeo más codiciado en tres países anfitriones: México, Estados Unidos y Canadá.",
          date: "05 de Junio",
          url: "https://fifa.com"
        },
        {
          title: "Argentina busca revalidar su corona mundialista",
          summary: "La selección campeona del mundo se encuentra concentrada en su base deportiva de cara a su esperado debut contra la difícil Argelia el martes 16.",
          date: "05 de Junio",
          url: "https://fifa.com"
        },
        {
          title: "Transmisiones oficiales confirmadas",
          summary: "Los hinchas de todo el mundo podrán seguir el fixture de primera ronda minuto a minuto a través de DSPORTS, TyC Sports, Canal 7 y Disney+.",
          date: "04 de Junio",
          url: "https://fifa.com"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div id="news-section-card" className="bg-white/[0.03] rounded-2xl border border-white/10 shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
            <Newspaper className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-display tracking-tight">Noticias del Mundial</h2>
            <p className="text-xs text-white/40">Información en tiempo real generada por IA</p>
          </div>
        </div>
        <button
          onClick={fetchNews}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-amber-500 hover:bg-amber-500/15 active:bg-amber-500/30 rounded-lg transition-colors duration-150 font-bold font-mono"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Sincronizar
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 mb-4 bg-amber-950/20 border border-amber-500/30 rounded-xl text-amber-300 text-xs font-medium">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="animate-pulse flex flex-col gap-3">
              <div className="h-4 bg-white/5 rounded w-1/4"></div>
              <div className="h-6 bg-white/5 rounded w-3/4"></div>
              <div className="h-16 bg-white/5 rounded w-full"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <div
              key={index}
              className="flex flex-col h-full bg-white/[0.01] hover:bg-white/[0.04] rounded-xl p-4 border border-white/5 hover:border-amber-500/20 transition-all duration-200"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold font-mono tracking-wider text-amber-500 bg-amber-500/10 border border-amber-500/25 px-2 py-0.5 rounded-full uppercase">
                  Fase de Grupos
                </span>
                <span className="text-[11px] text-white/40 font-mono">{item.date}</span>
              </div>
              <h3 className="text-[15px] font-semibold text-white font-display leading-snug hover:text-amber-500 transition-colors duration-150 mb-2">
                {item.title}
              </h3>
              <p className="text-white/70 text-xs leading-relaxed mb-4 flex-grow">
                {item.summary}
              </p>
              <a
                href={item.url}
                target="_blank"
                referrerPolicy="no-referrer"
                className="text-[11px] font-bold text-amber-500 hover:text-amber-400 inline-flex items-center gap-1 mt-auto"
                id={`news-link-${index}`}
              >
                Leer detalles en sitio oficial &rarr;
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
