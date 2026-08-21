import type { Bullpen } from '../state/useBullpen';

export function StubView({ app, title, line }: { app: Bullpen; title: string; line: string }) {
  return (
    <div className="panel stub-panel">
      <h2 className="stub-title">{title}</h2>
      <p className="body-copy" style={{ margin: '0 auto 20px', maxWidth: 460 }}>
        {line}
      </p>
      <button type="button" className="btn btn-secondary btn-sm" onClick={() => app.setRoute('today')}>
        Back to today
      </button>
    </div>
  );
}
