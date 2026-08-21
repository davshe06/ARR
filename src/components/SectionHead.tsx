import type { ReactNode } from 'react';

interface Props {
  eyebrow: string;
  sub: string;
  action?: { label: string; onClick: () => void };
  /** The design pulls the EQC table tighter under its rule than the others. */
  ruleGap?: number;
  children?: ReactNode;
}

export function SectionHead({ eyebrow, sub, action, ruleGap = 26 }: Props) {
  return (
    <>
      <div className="section-head">
        <span className="section-eyebrow">{eyebrow}</span>
        <span className="section-sub">{sub}</span>
        {action && (
          <button type="button" className="section-action" onClick={action.onClick}>
            {action.label}
          </button>
        )}
      </div>
      <hr className="hr" style={{ marginBottom: ruleGap }} />
    </>
  );
}
