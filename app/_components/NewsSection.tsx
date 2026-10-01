'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        // Fetch only top 5 news articles
        const response = await fetch(`/api/solar-news?page=1&max=5`);
        
        if (!response.ok) {
          throw new Error('Failed to load news');
        }

        const data = await response.json();
        if (data.articles) {
          setArticles(data.articles.slice(0, 5));
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
  }, []);

  useEffect(() => {
    if (articles.length === 0 || isLoading) return;
    
    let scrollDirection = 1;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        
        // If reached the end, go back to start
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll by approx one card width
          scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
        }
      }
    }, 4000); // Scroll every 4 seconds

    return () => clearInterval(interval);
  }, [articles, isLoading]);

  return (
    <section className="relative overflow-hidden py-24 bg-[#f0ebe1]" id="news">
      <div className="w-[min(80rem,calc(100%-2rem))] mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#a5a58d]/30 bg-white text-[#6b705c] text-xs font-bold tracking-widest uppercase mb-6">
            Industry News
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold tracking-tight text-[#2c3327] leading-[1.1] mb-6">
            Latest in Solar Energy.
          </h2>
          <p className="mt-4 text-[#4a533a] text-lg md:text-xl leading-relaxed">
            Stay updated with the top 5 newest trends, technology, and insights from the worldwide solar industry.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && articles.length === 0 && (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="w-10 h-10 rounded-full border-4 border-[#6b705c] border-t-transparent animate-spin" />
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="p-8 bg-white border border-red-200 rounded-3xl text-center shadow-sm">
            <p className="text-red-600 font-medium text-lg">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && articles.length === 0 && (
          <div className="p-8 bg-white border border-black/5 rounded-3xl text-center shadow-sm">
            <p className="text-[#4a533a] font-medium text-lg">No news articles found at this time.</p>
          </div>
        )}

        {/* News Row */}
        {!error && articles.length > 0 && (
          <div ref={scrollRef} className={`flex overflow-x-auto gap-6 lg:gap-8 pb-12 pt-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] transition-opacity duration-500 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            {articles.map((article, idx) => (
              <a 
                key={idx}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col bg-white border border-black/5 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 w-[300px] sm:w-[340px] shrink-0 snap-start"
              >
                {article.image && (
                  <div className="h-48 overflow-hidden relative border-b border-black/5">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-bold text-[#6b705c] uppercase tracking-widest bg-[#f0ebe1] px-3 py-1 rounded-full">
                      {article.source.name}
                    </span>
                    <span className="text-xs font-medium text-[#a5a58d]">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#2c3327] mb-3 line-clamp-2 leading-snug group-hover:text-[#6b705c] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-[#4a533a] leading-relaxed line-clamp-3 mb-0 flex-grow">
                    {article.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6b705c] opacity-80 group-hover:opacity-100 transition-opacity">
                    Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-2 transition-transform" />
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
