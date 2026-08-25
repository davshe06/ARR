import { CalendarPanel } from './components/CalendarPanel';
import { DaySheet } from './components/DaySheet';
import { EqcTable } from './components/EqcTable';
import { HotJobs } from './components/HotJobs';
import { RequisitionsView } from './components/RequisitionsView';
import { StubView } from './components/StubView';
import { Submittals } from './components/Submittals';
import { TopMpcs } from './components/TopMpcs';
import { TopNav } from './components/TopNav';
import { ActivityDialog } from './components/overlays/ActivityDialog';
import { CallQueue } from './components/overlays/CallQueue';
import { EqcDrawer } from './components/overlays/EqcDrawer';
import { MpcDrawer } from './components/overlays/MpcDrawer';
import { ReqDrawer } from './components/overlays/ReqDrawer';
import { SubmittalNudgeDialog, SubmittalStatusDialog } from './components/overlays/SubmittalDialogs';
import { useBullpen } from './state/useBullpen';

function Today({ app }: { app: ReturnType<typeof useBullpen> }) {
  return (
    <div className="main-grid">
      <div className="main-col">
        <HotJobs app={app} />
        <div className="lower-grid">
          <EqcTable app={app} />
          <TopMpcs app={app} />
        </div>
        <Submittals app={app} />
      </div>
      <CalendarPanel app={app} />
    </div>
  );
}

function Overlays({ app }: { app: ReturnType<typeof useBullpen> }) {
  if (app.queueIndex !== null) return <CallQueue app={app} />;

  const overlay = app.overlay;
  if (!overlay) return null;

  if (overlay.kind === 'activity') return <ActivityDialog app={app} subject={overlay.subject} />;
  if (overlay.kind === 'req') {
    const job = app.jobById(overlay.id);
    return job ? <ReqDrawer job={job} app={app} /> : null;
  }
  if (overlay.kind === 'eqc') {
    const call = app.eqcById(overlay.id);
    return call ? <EqcDrawer call={call} app={app} /> : null;
  }
  if (overlay.kind === 'sub-status') {
    const sub = app.submittalById(overlay.id);
    return sub ? <SubmittalStatusDialog sub={sub} app={app} /> : null;
  }
  if (overlay.kind === 'sub-nudge') {
    const sub = app.submittalById(overlay.id);
    return sub ? <SubmittalNudgeDialog sub={sub} app={app} /> : null;
  }
  const mpc = app.mpcById(overlay.id);
  return mpc ? <MpcDrawer mpc={mpc} app={app} /> : null;
}

export default function App() {
  const app = useBullpen();

  return (
    <div className="page">
      <TopNav app={app} />
      <div className="page-body">
        <DaySheet app={app} />
        {app.route === 'today' && <Today app={app} />}
        {app.route === 'requisitions' && <RequisitionsView app={app} />}
        {app.route === 'pipeline' && (
          <StubView
            app={app}
            title="Pipeline"
            line="Stub route. The pipeline board — submittals by stage across the desk — is not part of this prototype."
          />
        )}
        {app.route === 'candidates' && (
          <StubView
            app={app}
            title="Candidates"
            line="Stub route. Candidate search and the full MPC bench are not part of this prototype."
          />
        )}
      </div>
      <Overlays app={app} />
      {app.toast && <div className="toast">{app.toast}</div>}
    </div>
  );
}
