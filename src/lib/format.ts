import type { EqcCall, Mpc, SubmittalStatus } from '../data/types';

/** Status pills, drawn from the existing accent and neutral ramps: outline
    while the client owes feedback, filled tint through the ICM ladder, solid
    accent for a start, neutral once the submittal is dead. */
export function statusClass(status: SubmittalStatus): string {
  if (status === 'Start') return 'tag-strong';
  if (status === 'Out') return 'tag-neutral';
  if (status === 'Feedback') return 'tag-outline';
  return 'tag-accent';
}

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

/** Build identity, stamped into the document at build time. Lets a stale page
    be identified on sight rather than guessed at. */
export function buildInfo(): { build: string; at: string } {
  const read = (name: string) =>
    document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)?.content ?? '';
  const build = read('build');
  return {
    build: build && build.charAt(0) !== '_' ? build : 'dev',
    at: read('build-at').charAt(0) === '_' ? '' : read('build-at'),
  };
}
