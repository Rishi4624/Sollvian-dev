'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface Article {
  title: string; description: string; url: string; image: string;
  publishedAt: string; source: { name: string; url: string };
}

export default function NewsSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/solar-news?page=1&max=5');
        if (!res.ok) throw new Error('Failed to load news');
        const data = await res.json();
        if (data.articles) setArticles(data.articles.slice(0, 5));
        else if (data.error) throw new Error(data.error);
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : 'Failed to load news');
      } finally { setIsLoading(false); }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    if (!articles.length || isLoading) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [articles, isLoading]);

  return (
    <section className="border-t border-[#203a30]/10 bg-[#eef0e9] py-24 md:py-32" id="news">
      <div className="mx-auto w-[min(82rem,calc(100%-2.5rem))]">

        {/* Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#8b6744]">Industry notes</p>
            <h2 className="font-serif text-[clamp(2.6rem,4.5vw,4rem)] leading-[1.02] text-[#203a30]">
              A changing industry.<br />A clearer view.
            </h2>
          </div>
          <p className="max-w-sm text-[14px] leading-7 text-[#657066] md:text-right">
            The latest developments from the global solar energy sector, refreshed daily.
          </p>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center h-64">
            <div className="h-9 w-9 rounded-full border-[3px] border-[#829578] border-t-transparent animate-spin" />
          </div>
        )}

        {/* Error — red on dark → ✅ */}
        {error && !isLoading && (
          <p className="py-8 text-center font-medium text-[#a14f42]">{error}</p>
        )}

        {!error && articles.length > 0 && (
          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {articles.map((a, i) => (
              <a
                key={i}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-[min(82vw,340px)] shrink-0 snap-start flex-col overflow-hidden border border-[#203a30]/10 bg-[#fffefa] transition-all duration-300 hover:-translate-y-1 hover:border-[#829578]/60 hover:shadow-[0_18px_45px_-32px_rgba(31,58,48,0.55)]"
              >
                {a.image && (
                  <div className="relative h-44 overflow-hidden bg-[#dfe5d9]">
                    <img
                      src={a.image}
                      alt={a.title}
                      className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#203a30]/30 to-transparent" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="truncate text-[10px] font-bold uppercase tracking-[0.12em] text-[#8b6744]">
                      {a.source.name}
                    </span>
                    <span className="shrink-0 text-[11px] font-medium text-[#92998f]">
                      {new Date(a.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="mb-3 line-clamp-2 text-[15px] font-bold leading-snug text-[#2c4437] transition-colors group-hover:text-[#8b6744]">
                    {a.title}
                  </h3>
                  <p className="line-clamp-3 flex-1 text-[13px] leading-relaxed text-[#747d74]">
                    {a.description}
                  </p>
                  <div className="mt-5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8b6744] opacity-0 transition-opacity group-hover:opacity-100">
                    Read Article <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
