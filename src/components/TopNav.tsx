import type { Bullpen, Route } from '../state/useBullpen';

const LINKS: { route: Route; label: string }[] = [
  { route: 'today', label: 'Today' },
  { route: 'pipeline', label: 'Pipeline' },
  { route: 'requisitions', label: 'Requisitions' },
  { route: 'candidates', label: 'Candidates' },
];

export function TopNav({ app }: { app: Bullpen }) {
  return (
    <nav className="nav">
      <span className="nav-brand">The Recruiting Bullpen</span>
      {LINKS.map((link) => (
        <button
          key={link.route}
          type="button"
          className="nav-link"
          aria-current={app.route === link.route ? 'page' : undefined}
          onClick={() => app.setRoute(link.route)}
        >
          {link.label}
        </button>
      ))}
      <button
        type="button"
        className="btn btn-secondary btn-nav"
        onClick={() => app.setOverlay({ kind: 'activity' })}
      >
        Log activity
      </button>
      <button type="button" className="btn btn-primary btn-nav" onClick={app.startCalling}>
        Start calling
      </button>
    </nav>
  );
}
