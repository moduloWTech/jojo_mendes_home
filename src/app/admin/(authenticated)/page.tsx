import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import {
  Calendar,
  Image as ImageIcon,
  Video,
  Plus,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  MapPin,
  Flame,
} from 'lucide-react';

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  let showsCount = 0;
  let upcomingShowsCount = 0;
  let photosCount = 0;
  let videosCount = 0;
  let latestShows: Array<{
    id: string;
    date: string;
    city: string;
    state: string;
    venue: string;
    status: string;
  }> = [];
  let latestPhotos: Array<{
    id: string;
    src: string;
    alt: string;
  }> = [];

  try {
    const todayStr = new Date().toISOString().split('T')[0];

    const [shows, photos, videos] = await Promise.all([
      prisma.show.findMany({ orderBy: [{ date: 'asc' }] }),
      prisma.galleryImage.findMany({ orderBy: [{ order: 'asc' }] }),
      prisma.video.findMany({ orderBy: [{ order: 'asc' }] }),
    ]);

    showsCount = shows.length;
    upcomingShowsCount = shows.filter((s) => s.date >= todayStr).length;
    photosCount = photos.length;
    videosCount = videos.length;
    latestShows = shows.slice(0, 4);
    latestPhotos = photos.slice(0, 4);
  } catch {
    // Falha silenciosa caso o banco esteja inicializando
  }

  const galleryOccupancyPercent = Math.min(100, Math.round((photosCount / 8) * 100));

  return (
    <div className="space-y-8">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1A1524] via-[#100D18] to-[#0A0810] p-6 sm:p-10 shadow-2xl">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(239,193,107,0.18)_0%,transparent_70%)] blur-2xl"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#EFC16B]/30 bg-[#EFC16B]/10 text-xs font-semibold uppercase tracking-wider text-[#EFC16B]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Painel de Controle Exclusivo</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Bem-vinda, Produção Jojo Mendes
            </h1>
            <p className="text-sm sm:text-base text-white/60 font-sans max-w-2xl">
              Atualize a agenda de shows, selecione as 8 fotos em destaque da galeria e compartilhe os vídeos mais recentes diretamente no site oficial.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/shows"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#EFC16B] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#F3CE85] transition-all shadow-[0_0_20px_rgba(239,193,107,0.25)]"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Show</span>
            </Link>
            <Link
              href="/admin/fotos"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 bg-white/[0.05] text-white font-semibold text-xs uppercase tracking-wider hover:bg-white/10 transition-all"
            >
              <ImageIcon className="w-4 h-4 text-[#EFC16B]" />
              <span>Gerenciar Fotos</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Shows */}
        <div className="rounded-2xl border border-white/10 bg-[#121019] p-6 flex flex-col justify-between hover:border-[#EFC16B]/40 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Agenda de Shows
              </span>
              <div className="p-2.5 rounded-xl bg-[#EFC16B]/10 border border-[#EFC16B]/20 text-[#EFC16B]">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-serif font-bold text-white">{showsCount}</div>
            <p className="text-xs text-white/60 mt-1">
              {upcomingShowsCount} {upcomingShowsCount === 1 ? 'show próximo' : 'shows próximos agendados'}
            </p>
          </div>

          <div className="pt-5 mt-5 border-t border-white/10">
            <Link
              href="/admin/shows"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#EFC16B] hover:text-[#F3CE85] transition-colors group"
            >
              <span>Gerenciar agenda</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Card 2: Galeria (Limite 8 fotos) */}
        <div className="rounded-2xl border border-white/10 bg-[#121019] p-6 flex flex-col justify-between hover:border-[#EFC16B]/40 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
                  Galeria de Fotos
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#EFC16B]/15 border border-[#EFC16B]/30 text-[10px] font-bold text-[#EFC16B]">
                  Máx 8
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <ImageIcon className="w-5 h-5" />
              </div>
            </div>
            
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-serif font-bold text-white">{photosCount}</span>
              <span className="text-sm text-white/40 font-mono">/ 8 fotos</span>
            </div>

            {/* Barra de progresso do limite de 8 */}
            <div className="mt-3">
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#EFC16B] to-[#F3CE85] h-full rounded-full transition-all duration-500"
                  style={{ width: `${galleryOccupancyPercent}%` }}
                />
              </div>
              <p className="text-[11px] text-white/50 mt-1.5">
                {photosCount === 8
                  ? 'Limite visual atingido (8/8). Fotos extras direcionam ao Instagram.'
                  : `Mais ${8 - photosCount} slots disponíveis para manter o layout perfeito.`}
              </p>
            </div>
          </div>

          <div className="pt-5 mt-5 border-t border-white/10">
            <Link
              href="/admin/fotos"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#EFC16B] hover:text-[#F3CE85] transition-colors group"
            >
              <span>Gerenciar fotos</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Card 3: Vídeos Oficiais */}
        <div className="rounded-2xl border border-white/10 bg-[#121019] p-6 flex flex-col justify-between hover:border-[#EFC16B]/40 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Vídeos Oficiais
              </span>
              <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                <Video className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-serif font-bold text-white">{videosCount}</div>
            <p className="text-xs text-white/60 mt-1">
              Clipes e gravações ao vivo integrados com o YouTube
            </p>
          </div>

          <div className="pt-5 mt-5 border-t border-white/10">
            <Link
              href="/admin/videos"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#EFC16B] hover:text-[#F3CE85] transition-colors group"
            >
              <span>Gerenciar vídeos</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Previews Grid: Shows Recentes & Fotos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Coluna 1: Shows na fila */}
        <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#121019] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-serif font-bold text-white">Próximos Shows Cadastrados</h2>
              <p className="text-xs text-white/50">Visão rápida da turnê e apresentações</p>
            </div>
            <Link
              href="/admin/shows"
              className="text-xs font-semibold text-[#EFC16B] hover:underline"
            >
              Ver todos
            </Link>
          </div>

          {latestShows.length === 0 ? (
            <div className="py-12 text-center text-white/40 text-xs">
              Nenhum show cadastrado no momento.{' '}
              <Link href="/admin/shows" className="text-[#EFC16B] underline ml-1">
                Cadastrar o primeiro show
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {latestShows.map((show) => {
                const [year, month, day] = show.date.split('-');
                const formattedDate = `${day}/${month}/${year}`;
                const isSoldOut = show.status === 'sold_out';
                const isCancelled = show.status === 'cancelled';

                return (
                  <div key={show.id} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                        <span className="text-xs font-bold text-[#EFC16B]">{day}</span>
                        <span className="text-[10px] text-white/50 uppercase">{month}</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white">{show.venue}</h3>
                        <div className="flex items-center gap-2 text-xs text-white/50">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#EFC16B]" />
                            {show.city} - {show.state}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      {isSoldOut ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-[10px] font-bold uppercase text-red-400">
                          <Flame className="w-3 h-3" />
                          Esgotado
                        </span>
                      ) : isCancelled ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase text-white/40">
                          Cancelado
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-bold uppercase text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" />
                          Confirmado
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Coluna 2: Galeria (preview das fotos e CTA Instagram) */}
        <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#121019] p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-lg font-serif font-bold text-white">Galeria Oficial</h2>
                <p className="text-xs text-white/50">Exibição de destaque (máx. 8)</p>
              </div>
              <Link
                href="/admin/fotos"
                className="text-xs font-semibold text-[#EFC16B] hover:underline"
              >
                Gerenciar
              </Link>
            </div>

            {latestPhotos.length === 0 ? (
              <div className="py-8 text-center text-white/40 text-xs">
                Nenhuma foto cadastrada.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5">
                {latestPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Banner Instagram CTA Sync */}
          <div className="rounded-xl border border-[#EFC16B]/20 bg-gradient-to-r from-[#EFC16B]/10 to-transparent p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#EFC16B]/20 text-[#EFC16B]">
                <InstagramIcon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">@jojomendesoficial</p>
                <p className="text-[11px] text-white/50">CTA ativo para direcionar fãs</p>
              </div>
            </div>
            <a
              href="https://www.instagram.com/jojomendesoficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold text-[#EFC16B] hover:underline whitespace-nowrap"
            >
              Abrir Perfil ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
