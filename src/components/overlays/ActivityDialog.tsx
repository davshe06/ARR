import { useState } from 'react';
import type { Bullpen } from '../../state/useBullpen';
import { Overlay } from './Overlay';

const KINDS = ['Call', 'Email', 'Submittal', 'Meeting'];

export function ActivityDialog({ app, subject: initialSubject }: { app: Bullpen; subject?: string }) {
  const [kind, setKind] = useState(KINDS[0]);
  const [subject, setSubject] = useState(initialSubject ?? '');
  const [note, setNote] = useState('');
  const close = () => app.setOverlay(null);

  const save = () => {
    app.logActivity({ kind, subject: subject.trim() || '—', note });
    app.note('Activity logged.');
    close();
  };

  return (
    <Overlay
      eyebrow="Log activity"
      variant="modal"
      onClose={close}
      footer={
        <>
          <button type="button" className="btn btn-primary btn-sm" onClick={save}>
            Save activity
          </button>
          <button type="button" className="btn btn-secondary btn-sm" onClick={close}>
            Cancel
          </button>
          <span className="queue-count">{app.activity.length} logged today</span>
        </>
      }
    >
      <div className="field">
        <label>Type</label>
        <div className="pill-row">
          {KINDS.map((k) => (
            <button
              key={k}
              type="button"
              className={`btn btn-sm ${k === kind ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setKind(k)}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <div className="field" style={{ marginTop: 18 }}>
        <label htmlFor="activity-subject">Who / what</label>
        <input
          id="activity-subject"
          className="input"
          value={subject}
          placeholder="Candidate, client or req"
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      <div className="field" style={{ marginTop: 18 }}>
        <label htmlFor="activity-note">Note</label>
        <textarea
          id="activity-note"
          className="input"
          value={note}
          placeholder="What happened, and what happens next…"
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      {app.activity.length > 0 && (
        <>
          <div className="block-label">Today</div>
          <table className="table">
            <tbody>
              {app.activity.slice(0, 8).map((entry) => (
                <tr key={entry.id}>
                  <td className="cell-flush">
                    <div className="eqc-name">{entry.subject}</div>
                    <div className="eqc-role">{entry.note || '—'}</div>
                  </td>
                  <td className="eqc-client">{entry.kind}</td>
                  <td className="eqc-due">{entry.at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </Overlay>
  );
}
