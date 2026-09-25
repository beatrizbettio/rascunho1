import { useState } from "react";
import { Thermometer, PenTool, ShieldCheck, Gauge, Play } from "lucide-react";
import heroImage from "../assets/banner.jpg";

/* Ícone do Instagram (a Lucide não inclui ícones de marcas) */
function InstagramIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

/* ---------- Tipos ---------- */
type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  category: "Top" | "Shorts" | "Macaquinho" | "Cropped";
  badge?: { label: string; tone: "promo" | "estoque" | "novo" | "vendido" };
  colors: string[];
  sizes: string[];
  image: string;
  soldOut?: boolean;
};

/* ---------- Dados ---------- */
const CATEGORIES = ["Todos", "Top", "Shorts", "Macaquinho", "Cropped"] as const;

const PRODUCTS: Product[] = [
  {
    id: "top-alice",
    name: "Top Alice",
    price: 189.9,
    oldPrice: 239.9,
    category: "Top",
    badge: { label: "Promoção", tone: "promo" },
    colors: ["#3a1116", "#c46b7e", "#e76ea3", "#f2b9c9"],
    sizes: ["P", "M", "G", "GG"],
    image: "https://placehold.co/600x800/3a1116/fff?text=Top+Alice",
  },
  {
    id: "shorts-pietra",
    name: "Shorts Pietra",
    price: 129.9,
    category: "Shorts",
    badge: { label: "Pouco Estoque", tone: "estoque" },
    colors: ["#3a1116", "#8b1538", "#e0399c", "#e76ea3"],
    sizes: ["P", "M", "G"],
    image: "https://placehold.co/600x800/e0399c/fff?text=Shorts+Pietra",
    soldOut: true,
  },
  {
    id: "macaquinho-paola",
    name: "Macaquinho Paola",
    price: 219.9,
    category: "Macaquinho",
    badge: { label: "Novo", tone: "novo" },
    colors: ["#111111", "#8b1538", "#e0399c", "#f2b9c9"],
    sizes: ["P", "M", "G", "GG"],
    image: "https://placehold.co/600x800/111111/fff?text=Macaquinho+Paola",
  },
  {
    id: "cropped-sara",
    name: "Cropped Sara",
    price: 159.9,
    category: "Cropped",
    colors: ["#111111", "#c46b7e", "#e76ea3", "#f6d4de"],
    sizes: ["P", "M", "G", "GG"],
    image: "https://placehold.co/600x800/f6d4de/333?text=Cropped+Sara",
    soldOut: true,
  },
  {
    id: "cropped-manga-jessica",
    name: "Cropped Manga Longa Jessica",
    price: 149.9,
    category: "Cropped",
    badge: { label: "Mais Vendido", tone: "vendido" },
    colors: ["#111111", "#8b1538", "#e0399c", "#f2b9c9"],
    sizes: ["34", "36", "38", "40", "42"],
    image: "https://placehold.co/600x800/111111/fff?text=Cropped+Jessica",
  },
  {
    id: "cropped-grazy",
    name: "Cropped Grazy",
    price: 99.9,
    oldPrice: 119.9,
    category: "Cropped",
    badge: { label: "Promoção", tone: "promo" },
    colors: ["#111111", "#8b1538", "#e0399c", "#f2b9c9"],
    sizes: ["P", "M", "G"],
    image: "https://placehold.co/600x800/5c0f1c/fff?text=Cropped+Grazy",
  },
];

const BADGE_TONE_CLASSES: Record<NonNullable<Product["badge"]>["tone"], string> = {
  promo: "bg-[#8b1538] text-white",
  estoque: "bg-[#e0a838] text-white",
  novo: "bg-[#3a3a3a] text-white",
  vendido: "bg-[#8b1538] text-white",
};

const SIZE_TABLE = [
  { size: "P", bust: "78–84", waist: "58–64", hip: "85–91" },
  { size: "M", bust: "84–90", waist: "64–70", hip: "91–97" },
  { size: "G", bust: "90–96", waist: "70–76", hip: "97–103" },
  { size: "GG", bust: "96–104", waist: "76–84", hip: "103–111" },
];

const FEATURES = [
  {
    icon: Thermometer,
    title: "Tecnologia & Performance",
    text: "Fios inteligentes com respirabilidade térmica ativa e acabamento sedoso ao toque.",
  },
  {
    icon: PenTool,
    title: "Design Exclusivo",
    text: "Modelagens ergonômicas desenhadas especificamente para valorizar e acompanhar a silhueta natural.",
  },
  {
    icon: ShieldCheck,
    title: "Conforto Incomparável",
    text: "Construção seamless sem costuras aparentes e elastano de rápida recuperação que não alarga.",
  },
  {
    icon: Gauge,
    title: "Alta Durabilidade",
    text: "Testado em treinos de alta intensidade com retenção impecável de cor e estrutura após lavagem.",
  },
];

const CATEGORY_SHOWCASE = [
  {
    id: "tops",
    label: "Tops",
    image: "https://placehold.co/400x520/3a1116/fff?text=Tops",
  },
  {
    id: "legging",
    label: "Legging",
    image: "https://placehold.co/400x520/8b1538/fff?text=Legging",
  },
  {
    id: "shorts",
    label: "Shorts",
    image: "https://placehold.co/400x520/5c0f1c/fff?text=Shorts",
  },
  {
    id: "macacoes",
    label: "Macacões",
    image: "https://placehold.co/400x520/111111/fff?text=Macacoes",
  },
  {
    id: "conjuntos",
    label: "Conjuntos",
    image: "https://placehold.co/400x520/c46b7e/fff?text=Conjuntos",
  },
];

const VIDEO_DETAILS = [
  {
    id: "v1",
    caption: "Tecido com efeito modelador",
    thumb: "https://placehold.co/400x700/3a1116/fff?text=Video+1",
    productImage: "https://placehold.co/60x60/3a1116/fff?text=P",
    productName: "Legging Bella Poliamida",
    price: 189.9,
  },
  {
    id: "v2",
    caption: "Costura seamless, sem marcas",
    thumb: "https://placehold.co/400x700/8b1538/fff?text=Video+2",
    productImage: "https://placehold.co/60x60/8b1538/fff?text=P",
    productName: "Macaquinho Paola",
    price: 219.9,
  },
  {
    id: "v3",
    caption: "Ela é de poliamida premium",
    thumb: "https://placehold.co/400x700/5c0f1c/fff?text=Video+3",
    productImage: "https://placehold.co/60x60/5c0f1c/fff?text=P",
    productName: "Shorts Pietra",
    price: 129.9,
    oldPrice: 159.9,
  },
  {
    id: "v4",
    caption: "6 bolsos, caimento perfeito",
    thumb: "https://placehold.co/400x700/111111/fff?text=Video+4",
    productImage: "https://placehold.co/60x60/111111/fff?text=P",
    productName: "Cropped Grazy",
    price: 99.9,
    oldPrice: 119.9,
  },
  {
    id: "v5",
    caption: "Elástico que não marca",
    thumb: "https://placehold.co/400x700/c46b7e/fff?text=Video+5",
    productImage: "https://placehold.co/60x60/c46b7e/fff?text=P",
    productName: "Top Alice",
    price: 189.9,
    oldPrice: 239.9,
  },
];

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/* ---------- Componente principal ---------- */
export default function Main() {
  return (
    <main>
      {/* ===== Hero ===== */}
      <section className="relative">
        <img
          src={heroImage}
          alt="Modelos vestindo peças de fitness wear La Rose"
          className="w-full h-[420px] md:h-[560px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 text-white max-w-xl">
          <p className="text-xs tracking-widest uppercase mb-3 text-white/80">
            Santa Cruz das Palmeiras · SP
          </p>
          <h2 className="font-serif text-4xl md:text-6xl leading-tight">
            Elegância que
            <br />
            <span className="italic">abraça você</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-white/90 max-w-sm">
            Lingerie e fitness wear selecionados para celebrar cada curva com
            sofisticação e conforto real.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="#produtos"
              className="bg-[#8b1538] hover:bg-[#71102d] transition-colors text-white text-sm font-medium px-6 py-3 rounded-full"
            >
              Explorar Coleção →
            </a>
            <a
              href="#guia-tamanhos"
              className="bg-white/90 hover:bg-white transition-colors text-[#3a3a3a] text-sm font-medium px-6 py-3 rounded-full"
            >
              Guia de Tamanhos
            </a>
          </div>
        </div>
      </section>

      {/* ===== Compre por Categorias ===== */}
      <CategoryShowcase />

      {/* ===== Produtos em Destaque ===== */}
      <FeaturedProducts />

      {/* ===== Descubra Cada Detalhe em Vídeo ===== */}
      <VideoDetails />

      {/* ===== Guia de Tamanhos ===== */}
      <SizeGuide />

      {/* ===== Features ===== */}
      <section className="px-6 md:px-10 py-20">
        <div className="text-center mb-12">
          <p className="text-xs tracking-widest uppercase text-[#8b1538] mb-2">
            Precisão &amp; Propósito
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#3a3a3a]">
            O Padrão La Rose
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="bg-[#faf1f0] rounded-2xl p-6 flex gap-4 items-start"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#8b1538] text-white shrink-0">
                <Icon size={18} />
              </span>
              <div>
                <h3 className="text-sm font-medium text-[#3a3a3a] mb-1">
                  {title}
                </h3>
                <p className="text-sm text-neutral-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Feed Instagram ===== */}
      <section className="bg-[#2a2a2a]">
        <div className="flex items-center gap-2 px-6 md:px-10 pt-10 pb-6">
          <InstagramIcon size={16} className="text-[#e0399c]" />
          <span className="text-xs tracking-widest uppercase text-white/70">
            Siga-nos
          </span>
          <span className="text-sm text-white ml-1">@larose_modaintima</span>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6">
          {["8b1538", "e0399c", "f2b9c9", "3a3a3a", "5c0f1c", "c46b7e"].map(
            (color, i) => (
              <img
                key={i}
                src={`https://placehold.co/400x400/${color}/fff?text=@larose`}
                alt="Publicação do Instagram La Rose"
                className="w-full aspect-square object-cover"
              />
            )
          )}
        </div>
      </section>
    </main>
  );
}

/* ---------- Subcomponente: Compre por Categorias ---------- */
function CategoryShowcase() {
  return (
    <section className="py-14">
      <div className="text-center mb-8">
        <h2 className="font-serif text-2xl md:text-3xl text-[#3a3a3a] inline-block relative pb-2">
          Compre por Categorias
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-10 h-0.5 bg-[#8b1538]" />
        </h2>
      </div>

      <div className="flex overflow-x-auto md:grid md:grid-cols-5 gap-1 px-1 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {CATEGORY_SHOWCASE.map((cat) => (
          <a
            key={cat.id}
            href="#produtos"
            className="relative shrink-0 w-[62%] sm:w-[40%] md:w-auto aspect-[3/4] overflow-hidden group snap-start"
          >
            <img
              src={cat.image}
              alt={cat.label}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

            <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-4 py-4 text-white">
              <span className="text-xs font-semibold tracking-widest uppercase">
                {cat.label}
              </span>
              <span className="text-[10px] tracking-wide uppercase border-b border-white/70 pb-0.5 opacity-90 group-hover:opacity-100">
                Comprar Agora
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ---------- Subcomponente: Produtos em Destaque ---------- */
function FeaturedProducts() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("Todos");

  const filtered =
    active === "Todos" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);

  return (
    <section id="produtos" className="px-6 md:px-10 py-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <div>
          <p className="text-xs tracking-widest uppercase text-[#8b1538] mb-2">
            Nossa Coleção Pilates
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#3a3a3a]">
            Produtos em Destaque
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`text-sm px-4 py-2 rounded-full transition-colors ${
                active === cat
                  ? "bg-[#8b1538] text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

/* ---------- Subcomponente: Cartão de Produto ---------- */
function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <div className="relative overflow-hidden bg-neutral-100 aspect-[3/4]">
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-[10px] font-medium px-2.5 py-1 rounded-full ${
              BADGE_TONE_CLASSES[product.badge.tone]
            }`}
          >
            {product.badge.label}
          </span>
        )}
        <span className="absolute top-3 right-3 text-[10px] font-medium text-white/90">
          {product.category}
        </span>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.soldOut && (
          <div className="absolute bottom-0 inset-x-0 bg-white/90 text-center text-xs py-2 text-neutral-500">
            Apenas poucas unidades disponível
          </div>
        )}
      </div>

      <div className="pt-4">
        <h3 className="text-sm font-medium text-[#3a3a3a]">{product.name}</h3>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-[#8b1538] font-semibold">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-neutral-400 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 mt-3">
          {product.colors.map((c) => (
            <span
              key={c}
              className="w-4 h-4 rounded-full border border-black/10"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="flex items-center gap-2 mt-3">
          {product.sizes.map((s) => (
            <span
              key={s}
              className="text-[11px] w-6 h-6 flex items-center justify-center rounded-full border border-neutral-300 text-neutral-500"
            >
              {s}
            </span>
          ))}
        </div>

        <button
          disabled={product.soldOut}
          className={`mt-4 w-full text-sm font-medium py-2.5 rounded-full transition-colors ${
            product.soldOut
              ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
              : "bg-[#8b1538] hover:bg-[#71102d] text-white"
          }`}
        >
          {product.soldOut ? "Produto Esgotado" : "🛍  Adicionar ao Carrinho"}
        </button>
      </div>
    </article>
  );
}

/* ---------- Subcomponente: Descubra Cada Detalhe em Vídeo ---------- */
function VideoDetails() {
  return (
    <section className="py-16">
      <h2 className="font-serif text-2xl md:text-3xl text-center text-[#3a3a3a] mb-8 px-6">
        Descubra cada detalhe em vídeo
      </h2>

      <div
        className="flex gap-4 overflow-x-auto px-6 md:px-10 pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {VIDEO_DETAILS.map((item) => (
          <article
            key={item.id}
            className="relative shrink-0 w-[220px] md:w-[240px] aspect-[9/16] rounded-2xl overflow-hidden snap-start group cursor-pointer"
          >
            <img
              src={item.thumb}
              alt={item.productName}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Gradiente pra legibilidade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />

            {/* Botão de play */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="w-11 h-11 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/40 transition-colors">
                <Play size={18} className="text-white fill-white ml-0.5" />
              </span>
            </div>

            {/* Legenda estilo "reels" */}
            <p className="absolute bottom-[76px] left-3 right-3 text-white text-xs font-medium drop-shadow">
              {item.caption}
            </p>

            {/* Cartão do produto */}
            <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-sm px-2.5 py-2 flex items-center gap-2">
              <img
                src={item.productImage}
                alt=""
                className="w-9 h-9 rounded-lg object-cover shrink-0"
              />
              <div className="min-w-0">
                <p className="text-[11px] text-[#3a3a3a] leading-tight truncate">
                  {item.productName}
                </p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xs font-semibold text-[#8b1538]">
                    {formatPrice(item.price)}
                  </span>
                  {item.oldPrice && (
                    <span className="text-[10px] text-neutral-400 line-through">
                      {formatPrice(item.oldPrice)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------- Subcomponente: Guia de Tamanhos ---------- */
function SizeGuide() {
  const [measurements, setMeasurements] = useState({
    bust: "",
    waist: "",
    hip: "",
  });

  return (
    <section id="guia-tamanhos" className="bg-[#faf5f2] px-6 md:px-10 py-16">
      <div className="text-center mb-12">
        <p className="text-xs tracking-widest uppercase text-[#8b1538] mb-2">
          Ferramenta de Medidas
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-[#3a3a3a]">
          Guia de Tamanhos &amp; Provador Virtual
        </h2>
        <p className="text-sm text-neutral-500 mt-3 max-w-md mx-auto">
          Informe suas medidas e encontre o tamanho ideal para cada peça da
          coleção La Rose.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl p-8">
          <h3 className="font-medium text-[#3a3a3a] mb-6">
            Suas Medidas (em centímetros)
          </h3>

          <div className="space-y-5">
            {(["bust", "waist", "hip"] as const).map((field) => (
              <div key={field}>
                <label className="text-xs text-neutral-500 flex items-center gap-1.5 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8b1538]" />
                  {field === "bust"
                    ? "Busto"
                    : field === "waist"
                    ? "Cintura"
                    : "Quadril"}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder={
                      field === "bust"
                        ? "ex: 88"
                        : field === "waist"
                        ? "ex: 68"
                        : "ex: 94"
                    }
                    value={measurements[field]}
                    onChange={(e) =>
                      setMeasurements((m) => ({ ...m, [field]: e.target.value }))
                    }
                    className="w-full border border-neutral-200 rounded-lg px-4 py-3 pr-12 text-sm outline-none focus:border-[#8b1538]"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-neutral-400">
                    cm
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-8 w-full bg-[#8b1538] hover:bg-[#71102d] transition-colors text-white text-sm font-medium py-3 rounded-full">
            ✏️ Calcular Meu Tamanho
          </button>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl p-8">
            <h3 className="font-medium text-[#3a3a3a] mb-4">
              Tabela de Referência
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-neutral-400 text-xs">
                  <th className="pb-3 font-normal">Tam.</th>
                  <th className="pb-3 font-normal">Busto</th>
                  <th className="pb-3 font-normal">Cintura</th>
                  <th className="pb-3 font-normal">Quadril</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_TABLE.map((row) => (
                  <tr key={row.size} className="border-t border-neutral-100">
                    <td className="py-3">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#8b1538] text-white text-xs">
                        {row.size}
                      </span>
                    </td>
                    <td className="py-3 text-neutral-600">{row.bust}</td>
                    <td className="py-3 text-neutral-600">{row.waist}</td>
                    <td className="py-3 text-neutral-600">{row.hip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-[11px] text-neutral-400 mt-4">
              * Valores em centímetros. Peças com elastano podem ter margem de
              tamanho. Em caso de dúvida, recomendamos o tamanho maior.
            </p>
          </div>

          <div className="bg-[#f6d4de] rounded-2xl p-6 text-sm text-[#5c0f1c]">
            <p className="font-medium mb-1">Não tem fita métrica?</p>
            <p className="text-[#5c0f1c]/80">
              Entre em contato via WhatsApp e nossa consultora de moda íntima
              vai te ajudar a encontrar o tamanho perfeito.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}