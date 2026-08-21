import type { Job } from '../../data/types';
import type { Bullpen } from '../../state/useBullpen';
import { Overlay } from './Overlay';

export function ReqDrawer({ job, app }: { job: Job; app: Bullpen }) {
  const close = () => app.setOverlay(null);

  return (
    <Overlay
      eyebrow={`Req ${job.num} · ${job.company}`}
      onClose={close}
      footer={
        <>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => app.note(`Submit candidate — ${job.title} is stubbed in this prototype.`)}
          >
            Submit candidate
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => app.setOverlay({ kind: 'activity', subject: `${job.company} — ${job.title}` })}
          >
            Log activity
          </button>
          <span className="queue-count">{job.subs}</span>
        </>
      }
    >
      <h2 className="overlay-title">{job.title}</h2>
      <p className="overlay-sub">
        {job.branch} branch · {job.place} · {job.pay}
      </p>

      <div className="pill-row" style={{ marginTop: 14 }}>
        <span className="tag tag-accent tag-pill-space">{job.heat}</span>
        {job.skills.map((skill) => (
          <span key={skill} className="tag tag-accent tag-pill-space">
            {skill}
          </span>
        ))}
      </div>

      <div className="block-label">Description</div>
      <p className="body-copy">{job.description}</p>

      <div className="block-label">Must have</div>
      <ul className="script-list">
        {job.requirements.map((req) => (
          <li key={req}>{req}</li>
        ))}
      </ul>

      <div className="block-label">Req detail</div>
      <dl className="def-grid">
        <div>
          <dt>Client contact</dt>
          <dd>{job.contact}</dd>
        </div>
        <div>
          <dt>Age</dt>
          <dd>{job.age}</dd>
        </div>
        <div>
          <dt>Branch</dt>
          <dd>{job.branch}</dd>
        </div>
        <div>
          <dt>Pay range</dt>
          <dd>{job.pay}</dd>
        </div>
      </dl>

      <div className="block-label">Submittals</div>
      {job.submittals.length === 0 ? (
        <p className="body-copy">Nothing submitted yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col" className="cell-flush">
                Candidate
              </th>
              <th scope="col">Status</th>
              <th scope="col" style={{ textAlign: 'right', paddingRight: 0 }}>
                Sent
              </th>
            </tr>
          </thead>
          <tbody>
            {job.submittals.map((sub) => (
              <tr key={sub.name}>
                <td className="cell-flush">
                  <div className="eqc-name">{sub.name}</div>
                  <div className="eqc-role">{sub.title}</div>
                </td>
                <td className="eqc-client">{sub.status}</td>
                <td className="eqc-due">{sub.sent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Overlay>
  );
}
