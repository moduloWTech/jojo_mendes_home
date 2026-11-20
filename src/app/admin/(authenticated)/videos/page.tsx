'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Video,
  Plus,
  Trash2,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Play,
  Loader2,
  X,
  Tv,
} from 'lucide-react';

function YoutubeIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

interface VideoItem {
  id: string;
  youtubeId: string;
  title: string;
  isDemo: boolean;
  order: number;
}

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [youtubeUrlOrId, setYoutubeUrlOrId] = useState('');
  const [title, setTitle] = useState('');
  const [isDemo, setIsDemo] = useState(false);
  const [order, setOrder] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Video Preview Modal State
  const [activePreviewId, setActivePreviewId] = useState<string | null>(null);

  // Deletion State
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchVideos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch('/api/admin/videos');
      if (!res.ok) throw new Error('Não foi possível carregar os vídeos.');
      const data = await res.json();
      setVideos(data.videos || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar vídeos.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const openModal = () => {
    setYoutubeUrlOrId('');
    setTitle('');
    setIsDemo(false);
    setOrder(videos.length);
    setFormError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setYoutubeUrlOrId('');
    setTitle('');
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsSubmitting(true);

    try {
      if (!youtubeUrlOrId.trim() || !title.trim()) {
        throw new Error('Informe o link do YouTube e o título do vídeo.');
      }

      const res = await fetch('/api/admin/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          youtubeUrlOrId: youtubeUrlOrId.trim(),
          title: title.trim(),
          isDemo,
          order: Number(order) || 0,
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || 'Erro ao cadastrar vídeo.');

      closeModal();
      await fetchVideos();
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Falha na operação.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja realmente remover este vídeo do site oficial?')) return;
    setDeletingId(id);

    try {
      const res = await fetch(`/api/admin/videos/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Não foi possível remover o vídeo.');
      await fetchVideos();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Erro ao excluir');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header com Ações */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#EFC16B]/30 bg-[#EFC16B]/10 text-[10px] font-semibold uppercase tracking-wider text-[#EFC16B] mb-2 font-sans">
            <YoutubeIcon className="w-3 h-3 text-red-400" />
            <span>Audiovisual Oficial</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Vídeos & Clipes Oficiais
          </h1>
          <p className="text-xs sm:text-sm text-white/60">
            Adicione links do YouTube para exibir na seção de vídeos e clipes da página inicial.
          </p>
        </div>

        <button
          onClick={openModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#EFC16B] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#F3CE85] transition-all shadow-[0_0_20px_rgba(239,193,107,0.25)] self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Adicionar Vídeo</span>
        </button>
      </div>

      {/* Alerta Geral de Erro */}
      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-xs text-red-200">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <p>{error}</p>
        </div>
      )}

      {/* Lista de Vídeos */}
      <div className="rounded-2xl border border-white/10 bg-[#121019] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-serif font-bold text-white">
            Vídeos Ativos ({videos.length})
          </h2>
          <span className="text-xs text-white/40">Integração nativa com YouTube Player</span>
        </div>

        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-white/40">
            <Loader2 className="w-7 h-7 animate-spin text-[#EFC16B]" />
            <span className="text-xs">Carregando vídeos...</span>
          </div>
        ) : videos.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <Video className="w-10 h-10 text-white/20 mx-auto" />
            <h3 className="text-base font-semibold text-white">Nenhum vídeo cadastrado</h3>
            <p className="text-xs text-white/50 max-w-sm mx-auto">
              Adicione clipes oficiais, teasers ou gravações ao vivo colando links do YouTube.
            </p>
            <button
              onClick={openModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-xs font-semibold text-white hover:bg-white/20 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar Agora</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((vid) => {
              const thumbnailUrl = `https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`;
              const watchUrl = `https://www.youtube.com/watch?v=${vid.youtubeId}`;

              return (
                <div
                  key={vid.id}
                  className="rounded-xl border border-white/10 bg-[#0E0C14] overflow-hidden group hover:border-[#EFC16B]/40 transition-all flex flex-col justify-between"
                >
                  {/* Thumbnail com botão de play */}
                  <div className="relative aspect-video w-full bg-black">
                    <Image
                      src={thumbnailUrl}
                      alt={vid.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <button
                        onClick={() => setActivePreviewId(vid.youtubeId)}
                        className="w-12 h-12 rounded-full bg-[#EFC16B] text-black flex items-center justify-center pl-0.5 shadow-xl transition-transform group-hover:scale-110"
                        title="Assistir prévia"
                      >
                        <Play className="w-5 h-5 fill-current" />
                      </button>
                    </div>

                    {/* Badge isDemo */}
                    <div className="absolute top-2.5 left-2.5">
                      {vid.isDemo ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-semibold text-white/80 flex items-center gap-1">
                          <Tv className="w-3 h-3 text-[#EFC16B]" />
                          Ao Vivo / Demo
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-red-600/80 backdrop-blur-md border border-red-400/30 text-[10px] font-semibold text-white flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Clipe Oficial
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Informações & Ações */}
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-semibold text-sm text-white line-clamp-2 mb-2">
                        {vid.title}
                      </h3>
                      <p className="text-[11px] text-white/40 font-mono">
                        ID: {vid.youtubeId}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                      <a
                        href={watchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#EFC16B] hover:underline"
                      >
                        <span>Abrir no YouTube</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <button
                        onClick={() => handleDelete(vid.id)}
                        disabled={deletingId === vid.id}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-all disabled:opacity-50"
                        title="Excluir vídeo"
                      >
                        {deletingId === vid.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal de Criação de Vídeo */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-[#121019] p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h2 className="text-lg font-serif font-bold text-white">
                  Adicionar Novo Vídeo
                </h2>
                <p className="text-xs text-white/50">
                  Cole o link do YouTube para integrá-lo ao site oficial.
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="flex items-start gap-2.5 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <p>{formError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  Link ou ID do YouTube *
                </label>
                <input
                  type="text"
                  required
                  placeholder="https://www.youtube.com/watch?v=... ou youtu.be/..."
                  value={youtubeUrlOrId}
                  onChange={(e) => setYoutubeUrlOrId(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#EFC16B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  Título do Vídeo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Jojo Mendes - Teaser Oficial / Clipe"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#EFC16B] focus:outline-none"
                />
              </div>

              {/* Tag Demo / Ao Vivo */}
              <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.03]">
                <input
                  type="checkbox"
                  id="isDemo"
                  checked={isDemo}
                  onChange={(e) => setIsDemo(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-white/10 text-[#EFC16B] focus:ring-[#EFC16B]"
                />
                <label htmlFor="isDemo" className="text-xs text-white/80 cursor-pointer">
                  Marcar como gravação ao vivo / demo (em vez de clipe oficial)
                </label>
              </div>

              {/* Ações */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white/70 hover:text-white hover:bg-white/5 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EFC16B] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#F3CE85] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Cadastrando...</span>
                    </>
                  ) : (
                    <span>Salvar Vídeo</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Player de Prévia */}
      {activePreviewId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden border border-white/20 bg-black shadow-2xl">
            <button
              onClick={() => setActivePreviewId(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/80 hover:bg-black text-white border border-white/20"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${activePreviewId}?autoplay=1`}
              title="Prévia do YouTube"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
