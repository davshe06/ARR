import type { EqcCall, Mpc } from '../data/types';

/** Check-ins whose due state has already slipped read as urgent. */
export function isOverdue(call: EqcCall): boolean {
  return call.due.startsWith('Overdue');
}

/** "4 sent · 2 replies" — derived from the marketing log so the card stays
    true after a call is logged. Reproduces the seed's own strings. */
export function marketedLabel(mpc: Mpc): string {
  const sent = mpc.log.length;
  const interviews = mpc.log.filter((t) => t.outcome.startsWith('Interview')).length;
  if (interviews > 0) {
    return `${sent} sent · ${interviews} ${interviews === 1 ? 'interview' : 'interviews'}`;
  }
  const replies = mpc.log.filter((t) => t.outcome.startsWith('Reply')).length;
  return `${sent} sent · ${replies} ${replies === 1 ? 'reply' : 'replies'}`;
}
