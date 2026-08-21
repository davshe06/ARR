import type { EqcCall } from '../data/types';
import { isOverdue } from '../lib/format';
import type { Bullpen } from '../state/useBullpen';
import { SectionHead } from './SectionHead';

function DuePill({ call }: { call: EqcCall }) {
  if (call.completed) return <span className="tag tag-done tag-pill-space">Logged</span>;
  return (
    <span className={`tag tag-pill-space ${isOverdue(call) ? 'tag-overdue' : 'tag-outline'}`}>
      {call.due}
    </span>
  );
}

function Row({ call, onOpen }: { call: EqcCall; onOpen: () => void }) {
  return (
    <tr className={`eqc-row${call.completed ? ' is-done' : ''}`} onClick={onOpen}>
      <td className="cell-flush">
        <div className="eqc-name">{call.name}</div>
        <div className="eqc-role">{call.role}</div>
      </td>
      <td className="eqc-client">{call.client}</td>
      <td className="eqc-week">{call.week}</td>
      <td className="eqc-due">
        <DuePill call={call} />
      </td>
    </tr>
  );
}

export function EqcTable({ app }: { app: Bullpen }) {
  const rows = app.showLogged ? app.eqcCalls : app.dueCalls;
  const logged = app.loggedCalls.length;

  return (
    <section>
      <SectionHead eyebrow="02 · EQC calls" sub="On assignment · check-in due" ruleGap={8} />
      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="cell-flush">
              Candidate
            </th>
            <th scope="col">Client</th>
            <th scope="col" style={{ textAlign: 'right' }}>
              Wk
            </th>
            <th scope="col" className="eqc-due">
              Due
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((call) => (
            <Row key={call.id} call={call} onOpen={() => app.setOverlay({ kind: 'eqc', id: call.id })} />
          ))}
        </tbody>
      </table>
      <div className="eqc-foot">
        <span>
          {app.dueCalls.length} due · {logged} logged today
        </span>
        {logged > 0 && (
          <button type="button" className="link-action" onClick={() => app.setShowLogged(!app.showLogged)}>
            {app.showLogged ? 'Due only' : 'Show logged'}
          </button>
        )}
      </div>
    </section>
  );
}
