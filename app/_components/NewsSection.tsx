'use client';

import { useState, useEffect } from 'react';

interface Article {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

export default function NewsSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/solar-news?page=${page}&max=9`);
        
        if (!response.ok) {
          throw new Error('Failed to load news');
        }

        const data = await response.json();
        if (data.articles) {
          setArticles(data.articles);
          // GNews returns up to the max requested. If less, we are at the end.
          setHasMore(data.articles.length === 9); 
        } else if (data.error) {
          throw new Error(typeof data.error === 'string' ? data.error : 'API Error');
        }
      } catch (err: any) {
        setError(err.message || 'Something went wrong while fetching news');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [page]);

  return (
    <section className="relative overflow-hidden py-20 bg-transparent scroll-mt-24" id="news">
      <div className="relative z-10 w-[min(72rem,calc(100%-2rem))] mx-auto">
        <div className="mb-12 text-center lg:text-left">
          <p className="m-0 text-[12px] font-bold tracking-[0.22em] uppercase text-cyan-300/90">Industry News</p>
          <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.25rem)] tracking-[-0.03em] text-[#e8eef7] leading-[1.2]">
            Latest in Solar Energy
          </h2>
          <p className="mt-4 max-w-2xl text-slate-300 leading-[1.7] mx-auto lg:mx-0">
            Stay updated with the newest trends, technology, and insights from the worldwide solar industry.
          </p>
        </div>

        {isLoading && articles.length === 0 && (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
          </div>
        )}

        {error && !isLoading && (
          <div className="p-6 bg-rose-400/10 border border-rose-400/30 rounded-2xl text-center">
            <p className="text-rose-200">{error}</p>
          </div>
        )}

        {!isLoading && !error && articles.length === 0 && (
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center">
            <p className="text-slate-300">No news articles found at this time.</p>
          </div>
        )}

        {!error && articles.length > 0 && (
          <>
            <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 transition-opacity duration-300 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
              {articles.map((article, idx) => (
                <a 
                  key={idx}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col bg-[#0a1730] border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-colors duration-300 no-underline"
                >
                  {article.image && (
                    <div className="h-48 overflow-hidden bg-white/5 relative">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
                        {article.source.name}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-[#e8eef7] mb-3 line-clamp-2 group-hover:text-cyan-300 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 mb-0 flex-grow">
                      {article.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1 || isLoading}
                className="px-6 py-2 rounded-full text-sm font-medium border border-cyan-400/30 text-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-400/10 transition-colors min-w-[100px] flex justify-center"
              >
                Previous
              </button>
              <span className="text-slate-400 text-sm min-w-[80px] text-center">
                {isLoading ? (
                  <span className="inline-block w-4 h-4 rounded-full border-2 border-slate-400 border-t-transparent animate-spin align-middle" />
                ) : `Page ${page}`}
              </span>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={!hasMore || isLoading}
                className="px-6 py-2 rounded-full text-sm font-medium border border-cyan-400/30 text-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-400/10 transition-colors min-w-[100px] flex justify-center"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
