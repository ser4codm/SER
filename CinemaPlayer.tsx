import { useState, useEffect } from "react";
import { X, ChevronLeft, Play } from "lucide-react";
import { saveResume } from "@/lib/storage";

interface CinemaPlayerProps {
  type: "movie" | "tv";
  id: string;
  imdb_id: string;
  title: string;
  poster: string | null;
  onBack: () => void;
  season?: number;
  episode?: number;
}

export function CinemaPlayer({
  type, id, imdb_id, title, poster, onBack, season, episode,
}: CinemaPlayerProps) {
  const finalId = imdb_id || id;

  // الرابط اللي يفتح في صفحة جديدة عشان نكسر حماية ريبلت
  const videoUrl = type === "movie" 
    ? `https://multiembed.mov/?video_id=${finalId}&tmdb=1` 
    : `https://multiembed.mov/?video_id=${finalId}&tmdb=1&s=${season}&e=${episode}`;

  useEffect(() => {
    // حفظ مكان المشاهدة عشان يرجع يكمل بعدين
    saveResume({ id, imdb_id, type, title, poster, watchedAt: Date.now(), season, episode });
  }, [finalId]);

  const openPlayer = () => {
    window.open(videoUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
      {/* زر الرجوع */}
      <button onClick={onBack} className="absolute top-6 right-6 p-2 bg-white/10 rounded-full text-white hover:bg-white/20">
        <X size={24} />
      </button>

      <div className="w-full max-w-sm space-y-8 animate-in fade-in zoom-in duration-300">
        <div className="space-y-4">
          <div className="w-32 h-48 mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            {poster ? (
              <img src={`https://image.tmdb.org/t/p/w500${poster}`} alt={title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-700">لا يوجد بوستر</div>
            )}
          </div>
          <h2 className="text-2xl font-black text-white">{title}</h2>
          {type === "tv" && (
            <p className="text-purple-400 font-bold">الموسم {season} • الحلقة {episode}</p>
          )}
        </div>

        <button
          onClick={openPlayer}
          className="w-full py-6 bg-purple-600 hover:bg-purple-500 text-white rounded-3xl flex flex-col items-center justify-center gap-3 shadow-2xl shadow-purple-900/40 transition-all active:scale-95 group"
        >
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play size={32} fill="white" />
          </div>
          <span className="font-bold text-lg">تشغيل SER المباشر</span>
        </button>

        <p className="text-[10px] text-zinc-600 px-6 leading-relaxed">
          نظام SER CINEMA الذكي: يتم فتح المشغل في نافذة مستقلة لضمان تجاوز حماية المتصفح وتوفير أعلى جودة ممكنة.
        </p>
      </div>
    </div>
  );
}
