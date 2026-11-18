// ProductCard: o cartão de uma peça. Usado no Marketplace e nos Salvos.
// Props (informações que recebe de quem o usa):
//   product  -> o objeto da peça (vem de data/mock.js)
//   onView   -> função chamada ao clicar em "Ver peça"
//   saved    -> true/false, se a peça está nos salvos (opcional)
//   onToggleSave -> função do coração (opcional; sem ela o coração some)

import { formatPrice } from "../utils/format";

export default function ProductCard({ product, onView, saved = false, onToggleSave }) {
  return (
    <article className="card product-card">
      {/* Cor de fundo muda por peça: --h é o "matiz" usado no CSS */}
      <div className="ph" style={{ "--h": (product.id * 47) % 360 }} aria-hidden="true">
        {product.emoji}
        {onToggleSave && (
          <button
            className="heart"
            onClick={() => onToggleSave(product.id)}
            aria-pressed={saved}
            aria-label={saved ? `Remover ${product.name} dos salvos` : `Salvar ${product.name}`}
          >
            {saved ? "♥" : "♡"}
          </button>
        )}
      </div>

      <h3>{product.name}</h3>
      <p className="sub">
        {product.shop} • Tam. {product.size}
      </p>
      <strong className="price">{formatPrice(product.price)}</strong>

      <button className="btn outline small block" onClick={() => onView(product)}>
        Ver peça
      </button>
    </article>
  );
}