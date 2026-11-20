'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  Image as ImageIcon,
  Video,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

const navItems = [
  {
    href: '/admin',
    label: 'Visão Geral',
    icon: LayoutDashboard,
  },
  {
    href: '/admin/shows',
    label: 'Agenda de Shows',
    icon: Calendar,
  },
  {
    href: '/admin/fotos',
    label: 'Galeria de Fotos',
    icon: ImageIcon,
    badge: 'Máx 8',
  },
  {
    href: '/admin/videos',
    label: 'Vídeos Oficiais',
    icon: Video,
  },
];

export default function AdminAuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
    } finally {
      router.push('/admin/login');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#08070A] text-white flex flex-col font-sans selection:bg-[#EFC16B]/30 selection:text-[#EFC16B]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0E0C14]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-3 group">
              <div className="relative w-36 sm:w-44 h-11">
                <Image
                  src="/media/admin/logo-admin.png"
                  alt="Jojo Mendes — Eita Cantiga!"
                  fill
                  priority
                  className="object-contain object-left"
                />
              </div>
              <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#EFC16B]/30 bg-[#EFC16B]/10 text-[10px] font-semibold uppercase tracking-wider text-[#EFC16B]">
                <Sparkles className="w-2.5 h-2.5" />
                Painel
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 ml-4" aria-label="Navegação administrativa">
              {navItems.map((item) => {
                const isActive =
                  item.href === '/admin'
                    ? pathname === '/admin'
                    : pathname.startsWith(item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                      isActive
                        ? 'bg-[#EFC16B]/15 text-[#EFC16B] border border-[#EFC16B]/40 shadow-[0_0_15px_rgba(239,193,107,0.15)]'
                        : 'text-white/70 hover:text-white hover:bg-white/[0.05] border border-transparent'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-1 text-[9px] px-1.5 py-0.2 rounded-md bg-white/10 text-white/80">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right utility buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.04] text-xs font-medium text-white/80 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all"
              title="Abrir site público em nova aba"
            >
              <span>Ver Site</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </Link>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-500/30 bg-red-500/10 text-xs font-medium text-red-300 hover:bg-red-500/20 hover:border-red-500/50 transition-all disabled:opacity-50"
              title="Encerrar sessão administrativa"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isLoggingOut ? 'Saindo...' : 'Sair'}</span>
            </button>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-white/10 bg-white/[0.05] text-white/80 hover:text-white"
              aria-label="Abrir menu mobile"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#0E0C14] px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider ${
                    isActive
                      ? 'bg-[#EFC16B]/15 text-[#EFC16B] border border-[#EFC16B]/40'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-white/80">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-2 border-t border-white/10 mt-2">
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs text-white/70 hover:text-white"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Ver site público</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Page Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {children}
      </main>

      {/* Admin Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        <p>
          Jojo Mendes Oficial • Painel Administrativo Exclusivo • Desenvolvido por{' '}
          <span className="text-white/70 font-semibold">MW Technology</span>
        </p>
      </footer>
    </div>
  );
}

