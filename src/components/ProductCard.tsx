import { formatINR, type Product } from "../data/products";

type ProductCardProps = {
  product: Product;
  onViewDetails?: () => void;
  compact?: boolean;
  reducedVisual?: boolean;
};

export default function ProductCard({
  product,
  onViewDetails,
  compact = false,
  reducedVisual = false,
}: ProductCardProps) {
  return (
    <article
      style={compact ? { flexBasis: "calc((100% - 64px) / 5)" } : undefined}
      className={`group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.045)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_16px_36px_rgba(37,99,235,0.12)] ${compact ? "min-w-[170px] shrink-0" : ""}`}
    >
      <div className={`product-visual relative flex ${compact ? "h-44 sm:h-48" : reducedVisual ? "h-36 sm:h-60" : "h-56"} items-center justify-center overflow-hidden bg-white`}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="relative h-full w-full object-contain p-2 transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className={`phone-visual relative flex ${reducedVisual ? "h-28 w-[58px]" : "h-36 w-[74px]"} items-center justify-center rounded-[1.45rem] border-[3px] border-slate-400/30 bg-slate-950 shadow-[0_20px_40px_rgba(0,0,0,0.45)] transition duration-500 group-hover:scale-105`}>
            <div className="absolute inset-1 rounded-[1.1rem] bg-gradient-to-br from-slate-800 via-blue-950 to-slate-950" />
            <div className="absolute top-2 h-1 w-6 rounded-full bg-slate-900/80" />
            <span className="relative mt-2 text-xl font-bold tracking-tight text-white/85">{product.initials}</span>
          </div>
        )}
      </div>
      <div className={compact ? "p-3 sm:p-4" : reducedVisual ? "p-3 sm:p-5" : "p-4 sm:p-5"}>
        <h3 className={`truncate font-semibold text-slate-900 ${compact ? "text-sm" : "text-base"}`}>{product.name}</h3>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className={`font-bold text-slate-900 ${compact ? "text-sm" : "text-lg"}`}>{formatINR(product.price)}</span>
          {product.listPrice && <span className="text-xs text-slate-500 line-through">{formatINR(product.listPrice)}</span>}
        </div>
        {onViewDetails && (
          <button
            type="button"
            disabled
            title="View details is temporarily unavailable"
            className={`mt-3 w-full cursor-not-allowed rounded-lg border border-blue-200 bg-blue-50/60 text-xs font-semibold text-blue-700 opacity-70 ${reducedVisual ? "py-2 sm:py-2.5" : "py-2.5"}`}
          >
            View details
          </button>
        )}
      </div>
    </article>
  );
}
