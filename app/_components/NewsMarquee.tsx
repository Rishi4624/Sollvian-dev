'use client';

import { useState, useEffect } from 'react';

interface Article {
  title: string;
  url: string;
  source: {
    name: string;
  };
  publishedAt: string;
}

export default function NewsMarquee() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/solar-news?max=5&page=1');
        if (response.ok) {
          const data = await response.json();
          if (data.articles) {
            setArticles(data.articles.slice(0, 5));
          }
        }
      } catch (err) {
        console.error('Failed to load marquee news', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (isLoading || articles.length === 0) return null;

  // We duplicate the articles to create a seamless infinite loop
  const marqueeItems = [...articles, ...articles];

  return (
    <div className="w-full border-y border-white/5 bg-[#020617]/50 backdrop-blur-sm overflow-hidden py-3">
      <div className="flex w-[200%] animate-marquee-ltr hover:[animation-play-state:paused]">
        {marqueeItems.map((article, idx) => (
          <a
            key={idx}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center flex-none w-1/2 md:w-auto md:px-8 border-r border-white/10 last:border-0 no-underline text-slate-300 hover:text-cyan-300 transition-colors group"
          >
            <span className="text-xs font-semibold text-cyan-500 mr-3 uppercase tracking-wider">
              {article.source.name}
            </span>
            <span className="text-sm font-medium whitespace-nowrap truncate max-w-[300px] lg:max-w-[400px]">
              {article.title}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
