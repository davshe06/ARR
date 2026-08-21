import { COMPACT_PX, DAY_START, DAY_HOURS, EVENT_TYPES, HOUR_PX } from '../data/seed';
import type { CalEvent, EventType } from '../data/types';

/** Decimal hours → pixels from the top of the track. */
export function hoursToPx(t: number): number {
  return (t - DAY_START) * HOUR_PX;
}

export interface HourLabel {
  key: number;
  label: string;
  top: number;
}

/** 8am through 7pm, one label per hour line. */
export function hourLabels(): HourLabel[] {
  const out: HourLabel[] = [];
  for (let h = DAY_START; h <= DAY_START + DAY_HOURS; h++) {
    const ampm = h < 12 ? 'am' : 'pm';
    const hh = h > 12 ? h - 12 : h;
    out.push({ key: h, label: `${hh}:00 ${ampm}`, top: hoursToPx(h) - 6 });
  }
  return out;
}

export function isCompact(ev: CalEvent): boolean {
  return (ev.end - ev.start) * HOUR_PX < COMPACT_PX;
}

/** Fill, ink and border for a block in the current presentation mode. */
export function blockPaint(type: EventType, style: 'solid' | 'tint') {
  const t = EVENT_TYPES[type];
  const solid = style === 'solid';
  return {
    background: solid ? t.solid : t.tint,
    color: solid ? t.ink : t.tintInk,
    border: `1px solid ${t.solid}`,
  };
}

export function blockBox(ev: CalEvent) {
  return {
    top: hoursToPx(ev.start) + 2,
    height: (ev.end - ev.start) * HOUR_PX - 4,
  };
}

export function typeLabel(type: EventType): string {
  return EVENT_TYPES[type].label;
}
