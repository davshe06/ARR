import { useState } from 'react';
import { SUBMITTAL_STATUSES } from '../../data/seed';
import type { DeskSubmittal } from '../../data/types';
import type { Bullpen } from '../../state/useBullpen';
import { statusClass } from '../../lib/format';
import { Overlay } from './Overlay';

export function SubmittalStatusDialog({ sub, app }: { sub: DeskSubmittal; app: Bullpen }) {
  const close = () => app.setOverlay(null);

  return (
    <Overlay
      eyebrow="Change status"
      variant="modal"
      onClose={close}
      footer={
        <>
          <button type="button" className="btn btn-secondary btn-sm" onClick={close}>
            Cancel
          </button>
          <span className="queue-count">Submitted {sub.submitted}</span>
        </>
      }
    >
      <h2 className="overlay-title">{sub.candidate}</h2>
      <p className="overlay-sub">
        {sub.role} · {sub.company}
      </p>

      <div className="block-label">Where is it now?</div>
      <div className="pill-row">
        {SUBMITTAL_STATUSES.map((status) => (
          <button
            key={status}
            type="button"
            className={`btn btn-sm ${status === sub.status ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => {
              app.setSubmittalStatus(sub.id, status);
              close();
            }}
          >
            {status}
          </button>
        ))}
      </div>
      <p className="body-copy" style={{ marginTop: 18 }}>
        Currently <span className={`tag tag-pill-space ${statusClass(sub.status)}`}>{sub.status}</span> with{' '}
        {sub.salesperson}.
      </p>
    </Overlay>
  );
}

export function SubmittalNudgeDialog({ sub, app }: { sub: DeskSubmittal; app: Bullpen }) {
  const close = () => app.setOverlay(null);
  const [message, setMessage] = useState(
    `Any word from ${sub.company} on ${sub.candidate} (${sub.role})? Submitted ${sub.submitted}, sitting at ${sub.status}. Happy to chase the manager directly if that's easier.`,
  );

  return (
    <Overlay
      eyebrow={`Ask ${sub.salesperson} for an update`}
      variant="modal"
      onClose={close}
      footer={
        <>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            disabled={!message.trim()}
            onClick={() => {
              app.requestUpdate(sub.id, message.trim());
              close();
            }}
          >
            Send request
          </button>
          <button type="button" className="btn btn-secondary btn-sm" onClick={close}>
            Cancel
          </button>
          {sub.askedAt && <span className="queue-count">Last asked {sub.askedAt}</span>}
        </>
      }
    >
      <h2 className="overlay-title">{sub.candidate}</h2>
      <p className="overlay-sub">
        {sub.company} · {sub.status} · submitted {sub.submitted}
      </p>

      <div className="block-label">Message to {sub.salesperson}</div>
      <div className="field">
        <label htmlFor="nudge-message">Sent to the salesperson who owns the account</label>
        <textarea
          id="nudge-message"
          className="input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
    </Overlay>
  );
}
