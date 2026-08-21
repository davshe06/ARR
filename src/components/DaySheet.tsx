import { DESK } from '../data/seed';
import type { Bullpen } from '../state/useBullpen';

export function DaySheet({ app }: { app: Bullpen }) {
  return (
    <div className="panel daysheet">
      <span className="daysheet-cell">Day sheet — {DESK.dayLabel}</span>
      <span className="daysheet-cell">{app.recruiterName}</span>
      <span className="daysheet-cell">{DESK.desk}</span>
      <span className="daysheet-cell">{app.counts}</span>
    </div>
  );
}
