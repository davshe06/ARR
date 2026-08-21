import { marketedLabel } from '../lib/format';
import type { Mpc } from '../data/types';
import type { Bullpen } from '../state/useBullpen';
import { SectionHead } from './SectionHead';

function MpcCard({ mpc, onOpen }: { mpc: Mpc; onOpen: () => void }) {
  return (
    <button type="button" className="card mpc-card card-interactive" onClick={onOpen}>
      <div className="mpc-head">
        <span className="mpc-num">{mpc.num}</span>
        <span className="mpc-name">{mpc.name}</span>
        <span className="mpc-rate">{mpc.rate}</span>
      </div>
      <div className="mpc-line">
        {mpc.title} · {mpc.place}
      </div>
      <div className="pill-row">
        {mpc.skills.map((skill) => (
          <span key={skill} className="tag tag-neutral tag-pill-space">
            {skill}
          </span>
        ))}
      </div>
      <div className="mpc-foot">
        <span>{mpc.avail}</span>
        <span>{marketedLabel(mpc)}</span>
      </div>
    </button>
  );
}

export function TopMpcs({ app }: { app: Bullpen }) {
  return (
    <section>
      <SectionHead eyebrow="03 · Top MPCs" sub="Taking to market" />
      <div className="mpc-stack">
        {app.topMpcs.map((mpc) => (
          <MpcCard key={mpc.id} mpc={mpc} onOpen={() => app.setOverlay({ kind: 'mpc', id: mpc.id })} />
        ))}
      </div>
    </section>
  );
}
