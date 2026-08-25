import { SUBMITTALS } from '../data/seed';
import type { DeskSubmittal } from '../data/types';
import { statusClass } from '../lib/format';
import type { Bullpen } from '../state/useBullpen';
import { SectionHead } from './SectionHead';

function Row({ sub, app }: { sub: DeskSubmittal; app: Bullpen }) {
  return (
    <tr>
      <td className="cell-flush">
        <div className="eqc-name">{sub.company}</div>
        <div className="eqc-role">{sub.salesperson}</div>
      </td>
      <td>
        <div className="eqc-name">{sub.candidate}</div>
        <div className="eqc-role">{sub.role}</div>
      </td>
      <td className="sub-date">
        <div>{sub.submitted}</div>
        {sub.askedAt && <div className="eqc-role">Asked {sub.askedAt}</div>}
      </td>
      <td>
        <span className={`tag tag-pill-space ${statusClass(sub.status)}`}>{sub.status}</span>
      </td>
      <td className="sub-actions">
        <button
          type="button"
          className="btn btn-secondary btn-row"
          onClick={() => app.setOverlay({ kind: 'sub-status', id: sub.id })}
        >
          Change status
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-row"
          onClick={() => app.setOverlay({ kind: 'sub-nudge', id: sub.id })}
        >
          Ask for update
        </button>
      </td>
    </tr>
  );
}

export function Submittals({ app }: { app: Bullpen }) {
  const live = app.submittals.filter((s) => s.status !== 'Out' && s.status !== 'Start').length;
  const starts = app.submittals.filter((s) => s.status === 'Start').length;

  return (
    <section>
      <SectionHead
        eyebrow="04 · Submittals"
        sub="Out to clients · chase the movement"
        ruleGap={8}
      />
      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="cell-flush">
              Client
            </th>
            <th scope="col">Candidate</th>
            <th scope="col">Submitted</th>
            <th scope="col">Status</th>
            <th scope="col" className="sub-actions">
              Move it
            </th>
          </tr>
        </thead>
        <tbody>
          {app.submittals.map((sub) => (
            <Row key={sub.id} sub={sub} app={app} />
          ))}
        </tbody>
      </table>
      <div className="eqc-foot">
        <span>
          {SUBMITTALS.length} out · {live} in process · {starts} started
        </span>
      </div>
    </section>
  );
}
