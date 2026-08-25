import { useState } from 'react';
import type { Job } from '../../data/types';
import type { Bullpen } from '../../state/useBullpen';
import { Overlay } from './Overlay';

/** Put this req on the day sheet, or take it off. The 2x2 holds four, so
    adding a fifth means naming the one it replaces. */
function DaySheetControl({ job, app }: { job: Job; app: Bullpen }) {
  const [picking, setPicking] = useState(false);
  const isHot = app.isHotJob(job.id);

  if (isHot) {
    return (
      <>
        <div className="block-label">Day sheet</div>
        <p className="body-copy">This req is one of the hot jobs on the day sheet.</p>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => app.removeHotJob(job.id)}
        >
          Take off the day sheet
        </button>
      </>
    );
  }

  if (picking) {
    return (
      <>
        <div className="block-label">Swap into the hot jobs</div>
        <p className="body-copy">Which one comes off to make room?</p>
        <div className="swap-list">
          {app.hotJobs.map((hot) => (
            <button
              key={hot.id}
              type="button"
              className="swap-option"
              onClick={() => {
                app.swapHotJob(hot.id, job.id);
                setPicking(false);
              }}
            >
              <span className="job-num">{hot.num}</span>
              <span className="swap-option-title">{hot.title}</span>
              <span className="swap-option-company">{hot.company}</span>
              <span className="swap-option-action">Replace</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          style={{ marginTop: 14 }}
          onClick={() => setPicking(false)}
        >
          Cancel
        </button>
      </>
    );
  }

  return (
    <>
      <div className="block-label">Day sheet</div>
      <p className="body-copy">
        {app.hotSlotsFree > 0
          ? `Not on the day sheet. ${app.hotSlotsFree} hot job ${app.hotSlotsFree === 1 ? 'slot is' : 'slots are'} open.`
          : 'Not on the day sheet. All four hot job slots are taken.'}
      </p>
      <button
        type="button"
        className="btn btn-secondary btn-sm"
        onClick={() => (app.hotSlotsFree > 0 ? app.addHotJob(job.id) : setPicking(true))}
      >
        {app.hotSlotsFree > 0 ? 'Add to hot jobs' : 'Swap into hot jobs'}
      </button>
    </>
  );
}

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

      <DaySheetControl job={job} app={app} />

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
