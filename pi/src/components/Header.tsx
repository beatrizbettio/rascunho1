import { useState } from "react";
import { Menu, Heart, ShoppingBag, User, Search, X, ChevronRight } from "lucide-react";

const NAV_LINKS = ["Catálogo", "Provador", "Novidades"];
const DRAWER_LINKS = ["Catálogo", "Provador", "Novidades", "Contato"];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Topbar de avisos */}
      <div className="hidden md:flex items-center justify-center gap-8 bg-[#5c0f1c] text-white text-xs py-2 px-4">
        <span>BRL (R$) / PT-BR</span>
        <span>Troca gratuita em até 30 dias</span>
        <span>Frete grátis a partir de R$600,00</span>
        <span>Descubra seu tamanho ideal La Rose</span>
        <span>Atendimento Presencial em Santa Cruz das Palmeiras - SP</span>
      </div>

      {/* Navegação principal */}
      <div className="flex items-center justify-between px-6 md:px-10 py-4">
        {/* Botão Mobile */}
        <button
          className="md:hidden text-[#5c0f1c]"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu"
        >
          <Menu size={24} />
        </button>

        <div className="flex items-center gap-10">
          {/* AQUI: Botão Desktop transformado em elemento clicável */}
          <button
            onClick={() => setMenuOpen(true)}
            className="hidden md:inline-flex items-center text-[#5c0f1c] hover:opacity-80 transition-opacity"
            aria-label="Abrir menu lateral"
          >
            <Menu size={22} />
          </button>

          <h1 className="font-serif italic text-3xl text-[#8b1538] tracking-wide">
            La Rose
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide text-[#3a3a3a]">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="hover:text-[#8b1538] transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <div className="hidden lg:flex items-center gap-2 border border-neutral-200 rounded-full px-4 py-2 w-64">
            <Search size={16} className="text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar peças..."
              className="text-sm outline-none w-full placeholder:text-neutral-400"
            />
          </div>
          <button aria-label="Favoritos" className="text-[#3a3a3a] hover:text-[#8b1538]">
            <Heart size={20} />
          </button>
          <button aria-label="Carrinho" className="relative text-[#3a3a3a] hover:text-[#8b1538]">
            <ShoppingBag size={20} />
            <span className="absolute -top-2 -right-2 bg-[#8b1538] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </button>
          <button aria-label="Conta" className="text-[#3a3a3a] hover:text-[#8b1538]">
            <User size={20} />
          </button>
        </div>
      </div>

      {/* ===== Drawer do menu (Mobile e Desktop) ===== */}
      {/* Fundo escurecido - REMOVIDO 'md:hidden' */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Painel lateral - REMOVIDO 'md:hidden' */}
      <div
        className={`fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white z-50 shadow-xl flex flex-col transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Topo: logo + fechar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
          <h2 className="font-serif italic text-2xl text-[#8b1538]">La Rose</h2>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
            className="text-neutral-400 hover:text-[#3a3a3a]"
          >
            <X size={22} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto py-2">
          {DRAWER_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="flex items-center justify-between px-6 py-4 text-sm text-[#3a3a3a] border-b border-neutral-50 hover:bg-neutral-50 transition-colors"
            >
              {link}
              <ChevronRight size={16} className="text-neutral-300" />
            </a>
          ))}
        </nav>

        {/* Rodapé com CTAs */}
        <div className="px-6 py-6 border-t border-neutral-100 flex flex-col gap-3">
          <button className="w-full text-sm font-medium py-3 rounded-full border border-[#8b1538] text-[#8b1538] hover:bg-[#faf1f0] transition-colors">
            Entrar na Conta
          </button>
          <button className="w-full text-sm font-medium py-3 rounded-full bg-[#8b1538] text-white hover:bg-[#71102d] transition-colors">
            Criar Conta Grátis
          </button>
        </div>
      </div>
    </header>
  );
}