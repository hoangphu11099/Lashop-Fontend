import React from "react";

export default function Dialog({
  children,
  onClose,
  busy = false,
  titleId = "dialog-title",
}) {
  return (
    <div
      className="overlay"
      onClick={() => {
        if (!busy) onClose();
      }}
    >
      <section
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="close"
          aria-label="Đóng"
          disabled={busy}
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </section>
    </div>
  );
}
