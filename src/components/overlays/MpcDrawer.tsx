import type { Mpc } from '../../data/types';
import { marketedLabel } from '../../lib/format';
import type { Bullpen } from '../../state/useBullpen';
import { Overlay } from './Overlay';

export function MarketingLog({ mpc }: { mpc: Mpc }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col" className="cell-flush">
            Client
          </th>
          <th scope="col">Outcome</th>
          <th scope="col" style={{ textAlign: 'right', paddingRight: 0 }}>
            Sent
          </th>
        </tr>
      </thead>
      <tbody>
        {mpc.log.map((touch, i) => (
          <tr key={`${touch.company}-${i}`}>
            <td className="cell-flush">
              <div className="eqc-name">{touch.company}</div>
              <div className="eqc-role">{touch.contact}</div>
            </td>
            <td className="eqc-client">{touch.outcome}</td>
            <td className="eqc-due">{touch.sent}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function MpcDrawer({ mpc, app }: { mpc: Mpc; app: Bullpen }) {
  const close = () => app.setOverlay(null);

  return (
    <Overlay
      eyebrow={`MPC ${mpc.num} · Taking to market`}
      onClose={close}
      footer={
        <>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => app.setOverlay({ kind: 'activity', subject: mpc.name })}
          >
            Log marketing call
          </button>
          <span className="queue-count">{marketedLabel(mpc)}</span>
        </>
      }
    >
      <h2 className="overlay-title">{mpc.name}</h2>
      <p className="overlay-sub">
        {mpc.title} · {mpc.place} · {mpc.rate} · {mpc.avail}
      </p>

      <div className="pill-row" style={{ marginTop: 14 }}>
        {mpc.skills.map((skill) => (
          <span key={skill} className="tag tag-neutral tag-pill-space">
            {skill}
          </span>
        ))}
      </div>

      <div className="block-label">The pitch</div>
      <p className="body-copy">{mpc.summary}</p>
      <ul className="script-list">
        {mpc.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>

      <div className="block-label">Marketing log · {marketedLabel(mpc)}</div>
      <MarketingLog mpc={mpc} />
    </Overlay>
  );
}
