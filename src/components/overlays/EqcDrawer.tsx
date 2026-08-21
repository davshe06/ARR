import { useState } from 'react';
import type { EqcCall } from '../../data/types';
import type { Bullpen } from '../../state/useBullpen';
import { isOverdue } from '../../lib/format';
import { Overlay } from './Overlay';

export function EqcCheckInFields({
  call,
  note,
  onNote,
}: {
  call: EqcCall;
  note: string;
  onNote: (v: string) => void;
}) {
  return (
    <>
      <h2 className="overlay-title">{call.name}</h2>
      <p className="overlay-sub">
        {call.role} · {call.client}
      </p>

      <div className="pill-row" style={{ marginTop: 14 }}>
        <span className={`tag tag-pill-space ${isOverdue(call) ? 'tag-overdue' : 'tag-outline'}`}>
          {call.completed ? 'Logged' : call.due}
        </span>
        <span className="tag tag-neutral tag-pill-space">Week {call.week}</span>
      </div>

      <div className="block-label">On assignment</div>
      <dl className="def-grid">
        <div>
          <dt>Client</dt>
          <dd>{call.client}</dd>
        </div>
        <div>
          <dt>Week on assignment</dt>
          <dd>{call.week}</dd>
        </div>
        <div>
          <dt>Client manager</dt>
          <dd>{call.manager}</dd>
        </div>
        <div>
          <dt>Assignment</dt>
          <dd>{call.started}</dd>
        </div>
      </dl>

      <div className="block-label">Check-in notes</div>
      <div className="field">
        <label htmlFor="eqc-note">How is the assignment going?</label>
        <textarea
          id="eqc-note"
          className="input"
          value={note}
          placeholder="Hours, fit, client feedback, anything that needs escalating…"
          onChange={(e) => onNote(e.target.value)}
        />
      </div>
    </>
  );
}

export function EqcDrawer({ call, app }: { call: EqcCall; app: Bullpen }) {
  const [note, setNote] = useState(call.note);
  const close = () => app.setOverlay(null);

  return (
    <Overlay
      eyebrow="EQC check-in"
      onClose={close}
      footer={
        call.completed ? (
          <>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                app.reopenCheckIn(call.id);
                app.note(`Re-opened — ${call.name}`);
              }}
            >
              Re-open check-in
            </button>
            <span className="queue-count">Logged today</span>
          </>
        ) : (
          <>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => {
                app.logCheckIn(call.id, note);
                close();
              }}
            >
              Log check-in
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={close}>
              Cancel
            </button>
          </>
        )
      }
    >
      <EqcCheckInFields call={call} note={note} onNote={setNote} />
    </Overlay>
  );
}
