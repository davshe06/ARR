import { JOBS } from '../data/seed';
import type { Bullpen } from '../state/useBullpen';
import { SectionHead } from './SectionHead';

/** The destination for "All 24 reqs" — every open req on the desk, so the
    prototype has something to scroll. */
export function RequisitionsView({ app }: { app: Bullpen }) {
  return (
    <section>
      <SectionHead
        eyebrow={`Requisitions · ${JOBS.length} open`}
        sub="Charlotte · TDC desk"
        action={{ label: 'Back to today', onClick: () => app.setRoute('today') }}
        ruleGap={8}
      />
      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="cell-flush">
              Req
            </th>
            <th scope="col">Client</th>
            <th scope="col">Location</th>
            <th scope="col">Pay</th>
            <th scope="col">Age</th>
            <th scope="col">Submittals</th>
            <th scope="col" className="eqc-due">
              Heat
            </th>
          </tr>
        </thead>
        <tbody>
          {JOBS.map((job) => (
            <tr
              key={job.id}
              className="eqc-row"
              onClick={() => app.setOverlay({ kind: 'req', id: job.id })}
            >
              <td className="cell-flush">
                <div className="eqc-name">
                  {job.num} · {job.title}
                </div>
                <div className="eqc-role">{job.skills.join(' · ')}</div>
              </td>
              <td className="eqc-client">{job.company}</td>
              <td className="eqc-client">{job.place}</td>
              <td className="eqc-client">{job.pay}</td>
              <td className="eqc-client">{job.age}</td>
              <td className="eqc-client">{job.subs}</td>
              <td className="eqc-due">
                <span className="tag tag-accent tag-pill-space">{job.heat}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
