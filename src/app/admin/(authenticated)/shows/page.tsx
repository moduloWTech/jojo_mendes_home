'use client';

import React, { useEffect, useState } from 'react';
import {
  Calendar,
  Plus,
  Pencil,
  Trash2,
  Clock,
  MapPin,
  ExternalLink,
  Flame,
  CheckCircle2,
  XCircle,
  AlertCircle,
  X,
  Loader2,
} from 'lucide-react';
import { useToast } from '@/components/admin/ToastContext';
import { ConfirmModal } from '@/components/admin/ConfirmModal';

interface ShowItem {
  id: string;
  date: string;
  time: string | null;
  city: string;
  state: string;
  venue: string;
  detailsUrl: string | null;
  status: 'confirmed' | 'sold_out' | 'cancelled';
  order: number;
}

export default function AdminShowsPage() {
  const toast = useToast();
  const [shows, setShows] = useState<ShowItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingShow, setEditingShow] = useState<ShowItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    city: '',
    state: '',
    venue: '',
    detailsUrl: '',
    status: 'confirmed' as 'confirmed' | 'sold_out' | 'cancelled',
    order: 0,
  });

  // Confirm Deletion State
  const [showToDelete, setShowToDelete] = useState<ShowItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchShows = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch('/api/admin/shows');
      if (!res.ok) throw new Error('Não foi possível carregar a lista de shows.');
      const data = await res.json();
      setShows(data.shows || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  const openCreateModal = () => {
    setEditingShow(null);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      time: '21:00',
      city: '',
      state: 'SP',
      venue: '',
      detailsUrl: '',
      status: 'confirmed',
      order: 0,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (show: ShowItem) => {
    setEditingShow(show);
    setFormData({
      date: show.date,
      time: show.time || '',
      city: show.city,
      state: show.state,
      venue: show.venue,
      detailsUrl: show.detailsUrl || '',
      status: show.status,
      order: show.order || 0,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingShow(null);
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsSubmitting(true);

    try {
      const payload = {
        date: formData.date,
        time: formData.time.trim() || undefined,
        city: formData.city.trim(),
        state: formData.state.trim().toUpperCase(),
        venue: formData.venue.trim(),
        detailsUrl: formData.detailsUrl.trim() || undefined,
        status: formData.status,
        order: Number(formData.order) || 0,
      };

      const url = editingShow
        ? `/api/admin/shows/${editingShow.id}`
        : '/api/admin/shows';
      const method = editingShow ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || 'Erro ao salvar informações do show.');
      }

      closeModal();
      await fetchShows();
      toast.success(editingShow ? 'Show atualizado com sucesso!' : 'Show cadastrado com sucesso!');
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Falha na operação.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDeleteShow = async () => {
    if (!showToDelete) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/shows/${showToDelete.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Não foi possível excluir o show.');
      await fetchShows();
      toast.success('Show removido da agenda com sucesso.');
      setShowToDelete(null);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Erro ao excluir');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header com Ações */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#EFC16B]/30 bg-[#EFC16B]/10 text-[10px] font-semibold uppercase tracking-wider text-[#EFC16B] mb-2 font-sans">
            <Calendar className="w-3 h-3" />
            <span>Turnê & Apresentações</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Agenda de Shows
          </h1>
          <p className="text-xs sm:text-sm text-white/60">
            Cadastre novas datas, locais, ingressos e altere o status para esgotado ou cancelado.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#EFC16B] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#F3CE85] transition-all shadow-[0_0_20px_rgba(239,193,107,0.25)] self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Novo Show</span>
        </button>
      </div>

      {/* Alerta Geral de Erro */}
      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-xs text-red-200">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <p>{error}</p>
        </div>
      )}

      {/* Tabela / Grid de Shows */}
      <div className="rounded-2xl border border-white/10 bg-[#121019] overflow-hidden">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-white/40">
            <Loader2 className="w-7 h-7 animate-spin text-[#EFC16B]" />
            <span className="text-xs">Carregando shows da agenda...</span>
          </div>
        ) : shows.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <Calendar className="w-10 h-10 text-white/20 mx-auto" />
            <h3 className="text-base font-semibold text-white">Nenhum show cadastrado</h3>
            <p className="text-xs text-white/50 max-w-sm mx-auto">
              Clique no botão acima para adicionar a primeira data da turnê de Jojo Mendes.
            </p>
            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-xs font-semibold text-white hover:bg-white/20 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar Agora</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-white/40 uppercase tracking-wider font-semibold text-[10px]">
                  <th className="py-3.5 px-4 sm:px-6">Data & Hora</th>
                  <th className="py-3.5 px-4">Local / Evento</th>
                  <th className="py-3.5 px-4">Cidade / UF</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Ingressos / Link</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {shows.map((show) => {
                  const [y, m, d] = show.date.split('-');
                  const formattedDate = `${d}/${m}/${y}`;

                  return (
                    <tr
                      key={show.id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      {/* Data & Hora */}
                      <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-lg bg-white/[0.05] border border-white/10 flex flex-col items-center justify-center text-center">
                            <span className="text-xs font-bold text-[#EFC16B] leading-none">
                              {d}
                            </span>
                            <span className="text-[9px] text-white/40 uppercase leading-none mt-0.5">
                              {m}
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold text-white">{formattedDate}</div>
                            {show.time && (
                              <div className="text-[11px] text-white/50 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{show.time}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Local / Venue */}
                      <td className="py-4 px-4 font-medium text-white max-w-xs truncate">
                        {show.venue}
                      </td>

                      {/* Cidade / UF */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 text-white/70">
                          <MapPin className="w-3.5 h-3.5 text-[#EFC16B]" />
                          {show.city} - {show.state}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        {show.status === 'sold_out' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-[10px] font-bold uppercase text-red-400">
                            <Flame className="w-3 h-3" />
                            Esgotado
                          </span>
                        ) : show.status === 'cancelled' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase text-white/40">
                            <XCircle className="w-3 h-3" />
                            Cancelado
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-bold uppercase text-emerald-400">
                            <CheckCircle2 className="w-3 h-3" />
                            Confirmado
                          </span>
                        )}
                      </td>

                      {/* Link */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        {show.detailsUrl ? (
                          <a
                            href={show.detailsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[#EFC16B] hover:underline"
                          >
                            <span>Abrir link</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-white/30">—</span>
                        )}
                      </td>

                      {/* Ações */}
                      <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(show)}
                            className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all"
                            title="Editar dados deste show"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setShowToDelete(show)}
                            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 transition-all"
                            title="Excluir este show"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de Criação / Edição */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-[#121019] p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h2 className="text-lg font-serif font-bold text-white">
                  {editingShow ? 'Editar Show' : 'Cadastrar Novo Show'}
                </h2>
                <p className="text-xs text-white/50">
                  Preencha os dados do evento que serão exibidos no site oficial.
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Error */}
            {formError && (
              <div className="flex items-start gap-2.5 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <p>{formError}</p>
              </div>
            )}

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Data */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Data do Show *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white focus:border-[#EFC16B] focus:outline-none"
                  />
                </div>

                {/* Horário */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Horário (ex: 22:00)
                  </label>
                  <input
                    type="text"
                    placeholder="22:00"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white focus:border-[#EFC16B] focus:outline-none"
                  />
                </div>
              </div>

              {/* Local / Venue */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  Local / Espaço / Festival *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Villa Country / Festa do Peão"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#EFC16B] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {/* Cidade */}
                <div className="col-span-2">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="São Paulo"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#EFC16B] focus:outline-none"
                  />
                </div>

                {/* UF */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    UF *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={2}
                    placeholder="SP"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value.toUpperCase() })
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white uppercase text-center focus:border-[#EFC16B] focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  Status do Show *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, status: 'confirmed' })}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold uppercase transition-all ${
                      formData.status === 'confirmed'
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                        : 'border-white/10 bg-white/[0.03] text-white/60 hover:bg-white/[0.06]'
                    }`}
                  >
                    Confirmado
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, status: 'sold_out' })}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold uppercase transition-all ${
                      formData.status === 'sold_out'
                        ? 'bg-red-500/20 border-red-500/50 text-red-300'
                        : 'border-white/10 bg-white/[0.03] text-white/60 hover:bg-white/[0.06]'
                    }`}
                  >
                    Esgotado
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, status: 'cancelled' })}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold uppercase transition-all ${
                      formData.status === 'cancelled'
                        ? 'bg-white/20 border-white/40 text-white'
                        : 'border-white/10 bg-white/[0.03] text-white/60 hover:bg-white/[0.06]'
                    }`}
                  >
                    Cancelado
                  </button>
                </div>
              </div>

              {/* URL de Ingressos */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  Link de Ingressos ou Mais Informações (opcional)
                </label>
                <input
                  type="url"
                  placeholder="https://bileto.sympla.com.br/..."
                  value={formData.detailsUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, detailsUrl: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#EFC16B] focus:outline-none"
                />
              </div>

              {/* Botões de Ação */}
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
                      <span>Salvando...</span>
                    </>
                  ) : (
                    <span>{editingShow ? 'Atualizar Show' : 'Cadastrar Show'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal de Confirmação de Exclusão */}
      <ConfirmModal
        isOpen={Boolean(showToDelete)}
        title="Remover Show da Agenda"
        description={`Tem certeza que deseja excluir o show em "${showToDelete?.city} - ${showToDelete?.state}" (${showToDelete?.venue})? Esta ação removerá a data da turnê no site.`}
        confirmText="Sim, Excluir"
        cancelText="Cancelar"
        isDanger={true}
        isLoading={isDeleting}
        onConfirm={confirmDeleteShow}
        onClose={() => setShowToDelete(null)}
      />
    </div>
  );
}

