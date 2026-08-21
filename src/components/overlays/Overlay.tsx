import { useEffect, type ReactNode } from 'react';

interface Props {
  eyebrow: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  /** Drawers slide in from the right; dialogs sit centred. */
  variant?: 'drawer' | 'modal';
  head?: ReactNode;
  /** Skip the scrolling body wrapper — the caller supplies its own body and
      footer, as the call queue does for each stop. */
  bare?: boolean;
}

export function Overlay({ eyebrow, onClose, children, footer, variant = 'drawer', head, bare }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className={`scrim${variant === 'modal' ? ' scrim-center' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={variant === 'modal' ? 'modal' : 'drawer'} role="dialog" aria-modal="true">
        <div className="overlay-head">
          <span className="overlay-eyebrow">{eyebrow}</span>
          {head}
          <button type="button" className="overlay-close" onClick={onClose}>
            Close
          </button>
        </div>
        {bare ? children : <div className="overlay-body">{children}</div>}
        {footer && <div className="overlay-foot">{footer}</div>}
      </div>
    </div>
  );
}
