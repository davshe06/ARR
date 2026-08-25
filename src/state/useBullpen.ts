import { useCallback, useMemo, useRef, useState } from 'react';
import { DESK, EQC_CALLS, EVENTS, JOBS, MPCS, SUBMITTALS, TOP_MPCS } from '../data/seed';
import type { DeskSubmittal, EqcCall, MarketingTouch, Mpc, SubmittalStatus } from '../data/types';

export type Route = 'today' | 'pipeline' | 'requisitions' | 'candidates';

export type Overlay =
  | { kind: 'req'; id: string }
  | { kind: 'eqc'; id: string }
  | { kind: 'mpc'; id: string }
  | { kind: 'sub-status'; id: string }
  | { kind: 'sub-nudge'; id: string }
  | { kind: 'activity'; subject?: string };

export type QueueStop =
  | { kind: 'eqc'; id: string }
  | { kind: 'mpc'; id: string };

export interface ActivityEntry {
  id: string;
  kind: string;
  subject: string;
  note: string;
  at: string;
}

let activitySeq = 0;
const stamp = () => {
  const d = new Date();
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
};

export function useBullpen() {
  const [route, setRoute] = useState<Route>('today');
  const [selectedEventId, setSelectedEventId] = useState('e4');
  const [eventStyle, setEventStyle] = useState<'solid' | 'tint'>('solid');
  const [showLegend, setShowLegend] = useState(true);
  const [recruiterName] = useState(DESK.recruiterName);

  const [eqcCalls, setEqcCalls] = useState<EqcCall[]>(() => EQC_CALLS.map((c) => ({ ...c })));
  const [mpcs, setMpcs] = useState<Mpc[]>(() => MPCS.map((m) => ({ ...m, log: m.log.map((l) => ({ ...l })) })));
  const [showLogged, setShowLogged] = useState(false);
  const [submittals, setSubmittals] = useState<DeskSubmittal[]>(() => SUBMITTALS.map((x) => ({ ...x })));

  const [overlay, setOverlay] = useState<Overlay | null>(null);
  const [queue, setQueue] = useState<QueueStop[]>([]);
  const [queueIndex, setQueueIndex] = useState<number | null>(null);
  const [activity, setActivity] = useState<ActivityEntry[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const selectedEvent = useMemo(
    () => EVENTS.find((e) => e.id === selectedEventId) ?? EVENTS[0],
    [selectedEventId],
  );

  const dueCalls = useMemo(() => eqcCalls.filter((c) => !c.completed), [eqcCalls]);
  const loggedCalls = useMemo(() => eqcCalls.filter((c) => c.completed), [eqcCalls]);
  const topMpcIds = useMemo(() => new Set(TOP_MPCS.map((m) => m.id)), []);
  const topMpcs = useMemo(() => mpcs.filter((m) => topMpcIds.has(m.id)), [mpcs, topMpcIds]);

  /** The day sheet's third cell, derived so it tracks the seed and the
      check-ins logged so far rather than hard-coding the design's string. */
  const counts = useMemo(() => {
    const interviews = EVENTS.filter((e) => e.type === 'interview').length;
    return `${interviews} interviews · ${dueCalls.length} EQC due · ${topMpcs.length} MPCs live`;
  }, [dueCalls.length, topMpcs.length]);

  const toastTimer = useRef<number | undefined>(undefined);
  const note = useCallback((message: string) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  const logActivity = useCallback((entry: Omit<ActivityEntry, 'id' | 'at'>) => {
    activitySeq += 1;
    setActivity((prev) => [{ ...entry, id: `a${activitySeq}`, at: stamp() }, ...prev]);
  }, []);

  const logCheckIn = useCallback(
    (id: string, text: string) => {
      let name = '';
      setEqcCalls((prev) =>
        prev.map((c) => {
          if (c.id !== id) return c;
          name = c.name;
          return { ...c, completed: true, note: text };
        }),
      );
      logActivity({ kind: 'EQC check-in', subject: name, note: text });
      note(`Check-in logged — ${name}`);
    },
    [logActivity, note],
  );

  const reopenCheckIn = useCallback((id: string) => {
    setEqcCalls((prev) => prev.map((c) => (c.id === id ? { ...c, completed: false } : c)));
  }, []);

  const logMarketingCall = useCallback(
    (id: string, touch: MarketingTouch, text: string) => {
      let name = '';
      setMpcs((prev) =>
        prev.map((m) => {
          if (m.id !== id) return m;
          name = m.name;
          return { ...m, log: [...m.log, touch] };
        }),
      );
      logActivity({ kind: 'MPC marketing call', subject: name, note: text });
      note(`Marketing call logged — ${name}`);
    },
    [logActivity, note],
  );

  const setSubmittalStatus = useCallback(
    (id: string, status: SubmittalStatus) => {
      let label = '';
      setSubmittals((prev) =>
        prev.map((sub) => {
          if (sub.id !== id) return sub;
          label = `${sub.candidate} · ${sub.company}`;
          return { ...sub, status };
        }),
      );
      logActivity({ kind: 'Submittal status', subject: label, note: `Moved to ${status}` });
      note(`${label} — ${status}`);
    },
    [logActivity, note],
  );

  const requestUpdate = useCallback(
    (id: string, message: string) => {
      let who = '';
      let label = '';
      setSubmittals((prev) =>
        prev.map((sub) => {
          if (sub.id !== id) return sub;
          who = sub.salesperson;
          label = `${sub.candidate} · ${sub.company}`;
          return { ...sub, askedAt: stamp() };
        }),
      );
      logActivity({ kind: 'Update request', subject: label, note: message });
      note(`Update requested from ${who}`);
    },
    [logActivity, note],
  );

  const submittalById = useCallback((id: string) => submittals.find((s) => s.id === id), [submittals]);

  /* ── Call queue: every EQC check-in still due, then the live MPCs.
     The list is fixed when "Start calling" is pressed — recomputing it as rows
     complete would pull the ground out from under the cursor. ───────────── */
  const startCalling = useCallback(() => {
    const stops: QueueStop[] = [
      ...eqcCalls.filter((c) => !c.completed).map((c) => ({ kind: 'eqc' as const, id: c.id })),
      ...topMpcs.map((m) => ({ kind: 'mpc' as const, id: m.id })),
    ];
    setRoute('today');
    setOverlay(null);
    setQueue(stops);
    setQueueIndex(stops.length ? 0 : null);
    if (!stops.length) note('Nothing left in the call list today.');
  }, [eqcCalls, note, topMpcs]);

  const advanceQueue = useCallback(() => {
    setQueueIndex((i) => (i === null ? null : i + 1));
  }, []);

  const closeQueue = useCallback(() => setQueueIndex(null), []);

  const jobById = useCallback((id: string) => JOBS.find((j) => j.id === id), []);
  const eqcById = useCallback((id: string) => eqcCalls.find((c) => c.id === id), [eqcCalls]);
  const mpcById = useCallback((id: string) => mpcs.find((m) => m.id === id), [mpcs]);

  return {
    // view state
    route,
    setRoute,
    selectedEventId,
    setSelectedEventId,
    selectedEvent,
    eventStyle,
    setEventStyle,
    showLegend,
    setShowLegend,
    recruiterName,
    counts,
    // records
    eqcCalls,
    dueCalls,
    loggedCalls,
    showLogged,
    setShowLogged,
    mpcs,
    topMpcs,
    submittals,
    submittalById,
    setSubmittalStatus,
    requestUpdate,
    jobById,
    eqcById,
    mpcById,
    // overlays
    overlay,
    setOverlay,
    queue,
    queueIndex,
    startCalling,
    advanceQueue,
    closeQueue,
    // writes
    activity,
    logActivity,
    logCheckIn,
    reopenCheckIn,
    logMarketingCall,
    toast,
    note,
  };
}

export type Bullpen = ReturnType<typeof useBullpen>;
