/* Shapes for everything the Bullpen renders. The seed module is the only
   place these are populated today; swapping it for an API later should not
   require touching a component. */

export type EventType = 'interview' | 'client' | 'eqc' | 'icm' | 'internal';

/** Fill / ink pair for a calendar block, in both presentation modes. */
export interface EventTypeStyle {
  label: string;
  solid: string;
  tint: string;
  ink: string;
  tintInk: string;
}

/** Points a calendar event at the record it was booked against. */
export interface RecordRef {
  kind: 'job' | 'eqc' | 'mpc';
  id: string;
}

export interface CalEvent {
  id: string;
  type: EventType;
  start: number;
  end: number;
  time: string;
  title: string;
  sub: string;
  ref?: RecordRef;
}

export interface Submittal {
  name: string;
  title: string;
  status: string;
  sent: string;
}

export interface Job {
  id: string;
  num: string;
  company: string;
  heat: string;
  title: string;
  branch: string;
  place: string;
  pay: string;
  skills: string[];
  age: string;
  subs: string;
  /** The four cards on the day sheet; the rest sit behind "All 24 reqs". */
  hot: boolean;
  contact: string;
  description: string;
  requirements: string[];
  submittals: Submittal[];
}

export interface EqcCall {
  id: string;
  name: string;
  role: string;
  client: string;
  week: string;
  due: string;
  manager: string;
  started: string;
  /** Prototype state: set by logging the check-in. */
  completed: boolean;
  note: string;
}

export interface MarketingTouch {
  company: string;
  contact: string;
  sent: string;
  outcome: string;
}

export interface Mpc {
  id: string;
  num: string;
  name: string;
  title: string;
  place: string;
  rate: string;
  skills: string[];
  avail: string;
  marketed: string;
  summary: string;
  highlights: string[];
  log: MarketingTouch[];
}

export interface DeskInfo {
  dayLabel: string;
  recruiterName: string;
  desk: string;
  /** Decimal hours; drives the calendar's now-line. */
  now: number;
}
