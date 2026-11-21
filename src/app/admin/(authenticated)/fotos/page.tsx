'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import {
  Image as ImageIcon,
  UploadCloud,
  Trash2,
  AlertCircle,
  Sparkles,
  Plus,
  Loader2,
  X,
  ExternalLink,
  Info,
} from 'lucide-react';
import { useToast } from '@/components/admin/ToastContext';
import { ConfirmModal } from '@/components/admin/ConfirmModal';

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

interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  order: number;
}

export default function AdminFotosPage() {
  const toast = useToast();
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Upload Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [altText, setAltText] = useState('Foto oficial Jojo Mendes');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Confirm Deletion State
  const [photoToDelete, setPhotoToDelete] = useState<GalleryPhoto | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_PHOTOS = 8;
  const isLimitReached = photos.length >= MAX_PHOTOS;

  const fetchPhotos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch('/api/admin/fotos');
      if (!res.ok) throw new Error('Não foi possível carregar a galeria.');
      const data = await res.json();
      setPhotos(data.photos || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar fotos.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const openModal = () => {
    if (isLimitReached) {
      toast.warning(
        'O limite máximo de 8 fotos já foi atingido. Remova uma foto antes de adicionar uma nova.'
      );
      return;
    }
    setSelectedFile(null);
    setFilePreview(null);
    setImageUrl('');
    setAltText('Foto oficial Jojo Mendes');
    setFormError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    setFilePreview(null);
    setImageUrl('');
    setFormError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleModeSwitch = (mode: 'file' | 'url') => {
    setUploadMode(mode);
    setFormError(null);
    if (mode === 'url') {
      setSelectedFile(null);
      setFilePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } else {
      setImageUrl('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setFormError('Por favor, selecione um arquivo de imagem válido (JPG, PNG, WebP).');
        return;
      }
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
      setFormError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsSubmitting(true);

    try {
      if (uploadMode === 'file') {
        if (!selectedFile) {
          throw new Error('Selecione uma imagem do seu computador.');
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('alt', altText.trim() || 'Foto oficial Jojo Mendes');
        formData.append('order', String(photos.length));

        const res = await fetch('/api/admin/fotos', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json().catch(() => null);
        if (!res.ok) throw new Error(data?.error || 'Erro no upload da foto.');
      } else {
        if (!imageUrl.trim()) {
          throw new Error('Informe o link da imagem.');
        }

        const res = await fetch('/api/admin/fotos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            src: imageUrl.trim(),
            alt: altText.trim() || 'Foto oficial Jojo Mendes',
            width: 1200,
            height: 800,
            order: photos.length,
          }),
        });

        const data = await res.json().catch(() => null);
        if (!res.ok) throw new Error(data?.error || 'Erro ao salvar a foto.');
      }

      closeModal();
      await fetchPhotos();
      toast.success('Foto adicionada à galeria com sucesso!');
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Falha na operação.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDeletePhoto = async () => {
    if (!photoToDelete) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/fotos/${photoToDelete.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Não foi possível remover a foto.');
      await fetchPhotos();
      toast.success('Foto removida da galeria com sucesso.');
      setPhotoToDelete(null);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Erro ao excluir');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header com Status do Limite de 8 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#EFC16B]/30 bg-[#EFC16B]/10 text-[10px] font-semibold uppercase tracking-wider text-[#EFC16B] mb-2 font-sans">
            <Sparkles className="w-3 h-3" />
            <span>Curadoria Visual</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Galeria de Fotos
          </h1>
          <p className="text-xs sm:text-sm text-white/60">
            A vitrine pública exibe exatamente <strong>8 fotos selecionadas</strong> para preservar a harmonia visual da home.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl border border-white/10 bg-white/[0.03] flex items-center gap-2 text-xs">
            <span className="text-white/50 uppercase font-semibold text-[10px]">Ocupação:</span>
            <span className={`font-mono font-bold ${isLimitReached ? 'text-[#EFC16B]' : 'text-white'}`}>
              {photos.length} / {MAX_PHOTOS}
            </span>
          </div>

          <button
            onClick={openModal}
            disabled={isLimitReached}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(239,193,107,0.25)] ${
              isLimitReached
                ? 'bg-white/10 text-white/40 cursor-not-allowed shadow-none'
                : 'bg-[#EFC16B] text-black hover:bg-[#F3CE85]'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Foto</span>
          </button>
        </div>
      </div>

      {/* Alerta de Limite Atingido / Lembrete Instagram */}
      <div className="rounded-2xl border border-[#EFC16B]/20 bg-gradient-to-r from-[#EFC16B]/10 via-[#121019] to-[#121019] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-[#EFC16B]/20 text-[#EFC16B] shrink-0 mt-0.5">
            <InstagramIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">
              Estratégia do Layout & Instagram Oficial
            </h3>
            <p className="text-xs text-white/60 mt-0.5 max-w-2xl">
              Para manter o site leve e a estética luxuosa, limitamos a galeria em 8 fotos de alto impacto. Na home, adicionamos um botão convidando os fãs a seguirem o Instagram <strong>@jojomendesoficial</strong> para verem mais registros e o dia a dia da cantora.
            </p>
          </div>
        </div>

        <a
          href="https://www.instagram.com/jojomendesoficial/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#EFC16B]/30 bg-[#EFC16B]/10 text-xs font-semibold text-[#EFC16B] hover:bg-[#EFC16B]/20 transition-all shrink-0 self-start md:self-center"
        >
          <span>Instagram de Jojo</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Alerta Geral de Erro */}
      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-xs text-red-200">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <p>{error}</p>
        </div>
      )}

      {/* Grid de 8 Slots */}
      <div className="rounded-2xl border border-white/10 bg-[#121019] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-serif font-bold text-white">
            Grade de Fotos ({photos.length} de {MAX_PHOTOS} ativas)
          </h2>
          <span className="text-xs text-white/40">
            {isLimitReached ? 'Limite máximo atingido' : `${MAX_PHOTOS - photos.length} espaços livres`}
          </span>
        </div>

        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-white/40">
            <Loader2 className="w-7 h-7 animate-spin text-[#EFC16B]" />
            <span className="text-xs">Carregando fotos...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Fotos cadastradas */}
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className="group relative aspect-[4/5] rounded-xl overflow-hidden border border-white/10 bg-black/40 shadow-lg flex flex-col justify-end"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  unoptimized={photo.src.startsWith('http') || undefined}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Overlay gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                {/* Badge de Posição */}
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/70">
                  Foto {index + 1}
                </div>

                {/* Botão de Excluir */}
                <div className="absolute top-2.5 right-2.5">
                  <button
                    onClick={() => setPhotoToDelete(photo)}
                    className="p-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white backdrop-blur-md border border-red-400/30 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title="Excluir foto da galeria"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Legenda inferior */}
                <div className="relative z-10 p-3 text-xs text-white/80 line-clamp-2">
                  <p className="font-medium text-white text-[11px] truncate">{photo.alt}</p>
                </div>
              </div>
            ))}

            {/* Slots vazios restantes (até completar 8) */}
            {Array.from({ length: Math.max(0, MAX_PHOTOS - photos.length) }).map((_, index) => (
              <button
                key={`empty-slot-${index}`}
                onClick={openModal}
                className="aspect-[4/5] rounded-xl border-2 border-dashed border-white/10 hover:border-[#EFC16B]/50 hover:bg-[#EFC16B]/[0.02] flex flex-col items-center justify-center gap-2.5 p-4 text-center transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-white/[0.04] group-hover:bg-[#EFC16B]/15 border border-white/10 group-hover:border-[#EFC16B]/30 flex items-center justify-center text-white/40 group-hover:text-[#EFC16B] transition-colors">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-white/60 group-hover:text-white transition-colors">
                    Espaço Disponível
                  </span>
                  <p className="text-[10px] text-white/30 mt-0.5">
                    Slot {photos.length + index + 1} de {MAX_PHOTOS}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Upload */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-[#121019] p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h2 className="text-lg font-serif font-bold text-white">
                  Adicionar Foto à Galeria
                </h2>
                <p className="text-xs text-white/50">
                  Slot livre ({photos.length + 1} de {MAX_PHOTOS})
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Alternador de Método: Arquivo vs URL */}
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-white/[0.04] border border-white/10">
              <button
                type="button"
                onClick={() => handleModeSwitch('file')}
                className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                  uploadMode === 'file'
                    ? 'bg-[#EFC16B] text-black shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Upload do Computador
              </button>
              <button
                type="button"
                onClick={() => handleModeSwitch('url')}
                className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                  uploadMode === 'url'
                    ? 'bg-[#EFC16B] text-black shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Informar Link Direto
              </button>
            </div>

            {formError && (
              <div className="flex items-start gap-2.5 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <p>{formError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {uploadMode === 'file' ? (
                <div key="mode-file-upload">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-2">
                    Arquivo de Imagem (JPG, PNG, WebP)
                  </label>

                  <input
                    key="file-input-element"
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {filePreview ? (
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/20 group">
                      <Image
                        src={filePreview}
                        alt="Preview"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFile(null);
                          setFilePreview(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 hover:bg-black text-white"
                        title="Trocar imagem"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-white/20 hover:border-[#EFC16B] rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer bg-white/[0.02] hover:bg-[#EFC16B]/[0.03] transition-all"
                    >
                      <UploadCloud className="w-8 h-8 text-[#EFC16B]" />
                      <div className="text-center">
                        <span className="text-xs font-semibold text-white">
                          Clique para selecionar ou solte a imagem aqui
                        </span>
                        <p className="text-[10px] text-white/40 mt-1">
                          PNG, JPG ou WebP até 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div key="mode-url-upload">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    URL pública da Imagem
                  </label>
                  <input
                    key="url-input-element"
                    type="url"
                    required
                    placeholder="https://exemplo.com/foto-jojo.jpg"
                    value={imageUrl || ''}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#EFC16B] focus:outline-none"
                  />
                </div>
              )}

              {/* Descrição / Alt Text */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  Legenda / Descrição da Foto (Acessibilidade)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Jojo Mendes cantando ao vivo no palco de Barretos"
                  value={altText || ''}
                  onChange={(e) => setAltText(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#EFC16B] focus:outline-none"
                />
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
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <span>Salvar Foto</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal de Confirmação de Exclusão */}
      <ConfirmModal
        isOpen={Boolean(photoToDelete)}
        title="Remover Foto da Galeria"
        description={`Deseja realmente remover esta foto ("${photoToDelete?.alt}")? Ela será retirada imediatamente da grade de 8 fotos do site.`}
        confirmText="Sim, Remover"
        cancelText="Cancelar"
        isDanger={true}
        isLoading={isDeleting}
        onConfirm={confirmDeletePhoto}
        onClose={() => setPhotoToDelete(null)}
      />
    </div>
  );
}
