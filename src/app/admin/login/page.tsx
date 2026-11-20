'use client';

import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, ArrowRight, AlertCircle, Sparkles, Loader2 } from 'lucide-react';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage('Informe seu e-mail e senha.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setErrorMessage(data?.error || 'Não foi possível realizar o login.');
        setIsLoading(false);
        return;
      }

      // Redireciona para o painel
      router.push(redirectTarget);
      router.refresh();
    } catch {
      setErrorMessage('Erro de conexão. Tente novamente em instantes.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[100svh] w-full bg-[#08070A] text-white flex flex-col justify-between selection:bg-[#EFC16B]/30 selection:text-[#EFC16B]">
      {/* Luz ambiente cênica */}
      <div
        className="pointer-events-none fixed left-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(239,193,107,0.06)_0%,transparent_70%)] blur-3xl"
        aria-hidden="true"
      />

      {/* Barra superior de navegação limpa */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-white/60 hover:text-[#EFC16B] transition-colors"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          <span>Voltar ao site oficial</span>
        </Link>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-sans text-white/50">
          <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
          <span>Área Segura • Produção</span>
        </div>
      </header>

      {/* Conteúdo Principal — Split Layout Desktop & Mobile */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-8 flex-1 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Coluna Esquerda: Formulário de Autenticação */}
          <div className="lg:col-span-6 xl:col-span-5 w-full max-w-md mx-auto lg:mx-0">
            {/* Logo Oficial */}
            <div className="mb-6 sm:mb-8">
              <div className="relative w-44 sm:w-52 h-14 sm:h-16 mb-4">
                <Image
                  src="/media/admin/logo-admin.png"
                  alt="Jojo Mendes — Eita Cantiga!"
                  fill
                  priority
                  className="object-contain object-left"
                />
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#EFC16B]/30 bg-[#EFC16B]/10 text-[10px] font-semibold uppercase tracking-wider text-[#EFC16B] mb-2 font-sans">
                <Sparkles className="w-3 h-3" />
                <span>Gestão de Conteúdo</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Painel da Artista
              </h1>
              <p className="text-xs sm:text-sm text-white/60 mt-1 font-sans font-light">
                Gerencie shows, fotos da galeria e vídeos oficiais em um único lugar.
              </p>
            </div>

            {/* Alerta de Erro */}
            {errorMessage && (
              <div
                role="alert"
                className="mb-5 flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-500/10 p-3.5 text-xs text-red-200"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <p>{errorMessage}</p>
              </div>
            )}

            {/* Card do Formulário */}
            <div className="rounded-2xl border border-white/10 bg-[#121019]/90 backdrop-blur-xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
                {/* Campo E-mail */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2 font-sans"
                  >
                    E-mail administrativo
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-white/40">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@jojomendes.com.br"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:border-[#EFC16B] focus:bg-white/[0.07] focus:outline-none focus:ring-1 focus:ring-[#EFC16B] transition-all"
                    />
                  </div>
                </div>

                {/* Campo Senha */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2 font-sans"
                  >
                    Senha de acesso
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-white/40">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] pl-10 pr-11 py-3 text-sm text-white placeholder-white/30 focus:border-[#EFC16B] focus:bg-white/[0.07] focus:outline-none focus:ring-1 focus:ring-[#EFC16B] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Ocultar senha' : 'Ver senha'}
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-white/40 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Botão de Entrar */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#EFC16B] to-[#C89332] text-[#08070A] font-semibold text-sm shadow-[0_10px_25px_rgba(239,193,107,0.25)] hover:shadow-[0_14px_35px_rgba(239,193,107,0.4)] hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-60 disabled:pointer-events-none"
                >
                  {isLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#08070A] border-t-transparent" />
                      <span>Autenticando...</span>
                    </span>
                  ) : (
                    <>
                      <span>Entrar no Painel</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            </div>

            <p className="text-center text-[11px] text-white/40 mt-5 font-sans">
              Sistema protegido por criptografia de ponta a ponta e auditoria de acessos.
            </p>
          </div>

          {/* Coluna Direita: Foto da Cantora & Card Editorial */}
          <div className="hidden lg:block lg:col-span-6 xl:col-span-7 pl-6">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-[#121019] shadow-[0_30px_70px_rgba(0,0,0,0.8)] aspect-[16/10] xl:aspect-[16/10]">
              <Image
                src="/media/admin/login-hero.jpg"
                alt="Jojo Mendes cantando ao microfone"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center"
              />

              {/* Degradê e sombras atmosféricas para máxima sofisticação */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08070A] via-[#08070A]/30 to-transparent"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#08070A]/60 via-transparent to-transparent"
                aria-hidden="true"
              />

              {/* Tag flutuante superior */}
              <div className="absolute top-6 right-6">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-[11px] font-semibold text-white/90">
                  <span className="h-2 w-2 rounded-full bg-[#EFC16B] animate-pulse" />
                  Eita Cantiga! • Ao Vivo
                </span>
              </div>

              {/* Citação inspiradora no rodapé da foto */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md">
                <p className="text-sm font-serif italic text-white/95 leading-relaxed">
                  “A música faz parte de quem eu sou desde os meus primeiros passos... Na minha carreira solo, levo essa história inteira comigo.”
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#EFC16B]">
                    Jojo Mendes
                  </span>
                  <span className="text-[11px] text-white/50">
                    Site Oficial & Gestão
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Rodapé discreto */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-5 text-center text-xs text-white/30 font-sans">
        © {new Date().getFullYear()} Jojo Mendes. Todos os direitos reservados.
      </footer>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#08070A] flex items-center justify-center text-white">
          <Loader2 className="w-8 h-8 animate-spin text-[#EFC16B]" />
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
