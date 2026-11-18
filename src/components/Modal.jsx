// Modal: janelinha que abre por cima da tela (detalhe da peça, editar produto...).
// Acessível: fecha com Esc, clique fora ou no X; o foco fica preso dentro
// dela e volta para o botão que a abriu quando fecha.

import { useEffect, useRef } from "react";

export default function Modal({ title, onClose, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement; // quem abriu o modal
    dialogRef.current?.focus();
    document.body.style.overflow = "hidden"; // trava a rolagem do fundo

    function onKeyDown(e) {
      if (e.key === "Escape") onClose();

      // Mantém o Tab circulando só dentro do modal
      if (e.key === "Tab") {
        const focusable = dialogRef.current.querySelectorAll(
          'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);

    // Limpeza quando o modal fecha
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()} // clicar dentro não fecha
      >
        <div className="row between">
          <h2 id="modal-title">{title}</h2>
          <button className="btn outline small" onClick={onClose} aria-label="Fechar janela">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}