import { useState } from 'react';
import { marketedLabel } from '../../lib/format';
import type { Bullpen } from '../../state/useBullpen';
import { EqcCheckInFields } from './EqcDrawer';
import { MarketingLog } from './MpcDrawer';
import { Overlay } from './Overlay';

const OUTCOMES = ['Reply — reviewing', 'Interview set', 'No response yet'];

function EqcStop({ app, id, onDone }: { app: Bullpen; id: string; onDone: () => void }) {
  const call = app.eqcById(id);
  const [note, setNote] = useState(call?.note ?? '');
  if (!call) return null;

  return (
    <>
      <div className="overlay-body">
        <EqcCheckInFields call={call} note={note} onNote={setNote} />
      </div>
      <div className="overlay-foot">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => {
            app.logCheckIn(call.id, note);
            onDone();
          }}
        >
          Log check-in &amp; next
        </button>
        <button type="button" className="btn btn-secondary btn-sm" onClick={onDone}>
          Skip
        </button>
      </div>
    </>
  );
}

function MpcStop({ app, id, onDone }: { app: Bullpen; id: string; onDone: () => void }) {
  const mpc = app.mpcById(id);
  const [company, setCompany] = useState('');
  const [contact, setContact] = useState('');
  const [outcome, setOutcome] = useState(OUTCOMES[2]);
  const [note, setNote] = useState('');
  if (!mpc) return null;

  return (
    <>
      <div className="overlay-body">
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

        <div className="block-label">Already marketed to · {marketedLabel(mpc)}</div>
        <MarketingLog mpc={mpc} />

        <div className="block-label">This call</div>
        <div className="def-grid">
          <div className="field">
            <label htmlFor="queue-company">Client called</label>
            <input
              id="queue-company"
              className="input"
              value={company}
              placeholder="Company"
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="queue-contact">Contact</label>
            <input
              id="queue-contact"
              className="input"
              value={contact}
              placeholder="Name · title"
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
        </div>

        <div className="field" style={{ marginTop: 18 }}>
          <label>Outcome</label>
          <div className="pill-row">
            {OUTCOMES.map((o) => (
              <button
                key={o}
                type="button"
                className={`btn btn-sm ${o === outcome ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setOutcome(o)}
              >
                {o}
              </button>
            ))}
          </div>
        </div>

        <div className="field" style={{ marginTop: 18 }}>
          <label htmlFor="queue-note">Note</label>
          <textarea
            id="queue-note"
            className="input"
            value={note}
            placeholder="What the client said, and the next step…"
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </div>
      <div className="overlay-foot">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          disabled={!company.trim()}
          onClick={() => {
            app.logMarketingCall(
              mpc.id,
              {
                company: company.trim(),
                contact: contact.trim() || '—',
                sent: 'Called today',
                outcome,
              },
              note,
            );
            onDone();
          }}
        >
          Log call &amp; next
        </button>
        <button type="button" className="btn btn-secondary btn-sm" onClick={onDone}>
          Skip
        </button>
        {!company.trim() && <span className="queue-count">Name the client to log the call</span>}
      </div>
    </>
  );
}

export function CallQueue({ app }: { app: Bullpen }) {
  const index = app.queueIndex;
  if (index === null) return null;

  const total = app.queue.length;
  const done = index >= total;
  const stop = app.queue[index];
  const checkIns = app.activity.filter((a) => a.kind === 'EQC check-in').length;
  const calls = app.activity.filter((a) => a.kind === 'MPC marketing call').length;

  let content;
  if (done) {
    content = (
      <div className="overlay-body">
        <h2 className="overlay-title">Queue complete</h2>
        <p className="overlay-sub">
          {checkIns} check-in{checkIns === 1 ? '' : 's'} and {calls} marketing call
          {calls === 1 ? '' : 's'} logged. {app.dueCalls.length} EQC call
          {app.dueCalls.length === 1 ? '' : 's'} still due today.
        </p>
        <div className="cal-detail-actions" style={{ marginTop: 20 }}>
          <button type="button" className="btn btn-primary btn-sm" onClick={app.closeQueue}>
            Back to the day sheet
          </button>
        </div>
      </div>
    );
  } else if (stop.kind === 'eqc') {
    content = <EqcStop key={stop.id} app={app} id={stop.id} onDone={app.advanceQueue} />;
  } else {
    content = <MpcStop key={stop.id} app={app} id={stop.id} onDone={app.advanceQueue} />;
  }

  return (
    <Overlay
      eyebrow="Call queue"
      variant="modal"
      bare
      onClose={app.closeQueue}
      head={
        <span className="queue-count">
          {done ? `${total} of ${total}` : `${index + 1} of ${total}`}
        </span>
      }
    >
      <div className="queue-progress">
        <i style={{ width: `${total ? (Math.min(index, total) / total) * 100 : 0}%` }} />
      </div>
      {content}
    </Overlay>
  );
}
