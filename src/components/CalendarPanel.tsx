import { DESK, EVENTS, EVENT_TYPES, LEGEND_ORDER } from '../data/seed';
import type { CalEvent } from '../data/types';
import { blockBox, blockPaint, hourLabels, hoursToPx, isCompact, typeLabel } from '../lib/calendar';
import type { Bullpen } from '../state/useBullpen';

function Block({
  ev,
  selected,
  style,
  onSelect,
}: {
  ev: CalEvent;
  selected: boolean;
  style: 'solid' | 'tint';
  onSelect: () => void;
}) {
  const compact = isCompact(ev);
  return (
    <button
      type="button"
      className={`cal-block${compact ? ' is-compact' : ''}${selected ? ' is-selected' : ''}`}
      style={{ ...blockBox(ev), ...blockPaint(ev.type, style) }}
      onClick={onSelect}
    >
      <span className="cal-block-time">
        {ev.time} · {typeLabel(ev.type)}
      </span>
      <span className="cal-block-title">{ev.title}</span>
      {!compact && <span className="cal-block-sub">{ev.sub}</span>}
    </button>
  );
}

export function CalendarPanel({ app }: { app: Bullpen }) {
  const selected = app.selectedEvent;
  const hours = hourLabels();

  const openRecord = () => {
    const ref = selected.ref;
    if (!ref) {
      app.note('No linked record for this event.');
      return;
    }
    app.setOverlay(ref.kind === 'job' ? { kind: 'req', id: ref.id } : { kind: ref.kind, id: ref.id });
  };

  return (
    <aside className="panel cal">
      <div className="cal-head">
        <span className="cal-title">Today</span>
        <span className="cal-date">{DESK.dayLabel}</span>
        <button
          type="button"
          className="link-action"
          onClick={() => app.note('Week view is stubbed in this prototype.')}
        >
          Week
        </button>
      </div>

      {app.showLegend && (
        <div className="cal-legend">
          {LEGEND_ORDER.map((key) => {
            const paint = blockPaint(key, app.eventStyle);
            return (
              <span key={key} className="cal-legend-item">
                <i style={{ background: paint.background, border: paint.border }} />
                {EVENT_TYPES[key].label}
              </span>
            );
          })}
          <button
            type="button"
            className="cal-legend-item"
            style={{ marginLeft: 'auto' }}
            onClick={() => app.setEventStyle(app.eventStyle === 'solid' ? 'tint' : 'solid')}
            title="Switch calendar blocks between solid and tinted fills"
          >
            {app.eventStyle === 'solid' ? 'Tint' : 'Solid'}
          </button>
        </div>
      )}

      <div className="cal-body">
        <div className="cal-track">
          {hours.map((hour) => (
            <span key={hour.key} className="cal-hour" style={{ top: hour.top }}>
              {hour.label}
            </span>
          ))}
          {EVENTS.map((ev) => (
            <Block
              key={ev.id}
              ev={ev}
              selected={ev.id === app.selectedEventId}
              style={app.eventStyle}
              onSelect={() => app.setSelectedEventId(ev.id)}
            />
          ))}
          <div className="cal-now" style={{ top: hoursToPx(DESK.now) }} />
        </div>
      </div>

      <div className="cal-detail">
        <div className="cal-detail-eyebrow">Selected</div>
        <div className="cal-detail-title">{selected.title}</div>
        <div className="cal-detail-line">
          {typeLabel(selected.type)} · {selected.time} · {selected.sub}
        </div>
        <div className="cal-detail-actions">
          <button type="button" className="btn btn-primary btn-sm" onClick={openRecord}>
            Open record
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => app.note('Rescheduling is stubbed in this prototype.')}
          >
            Reschedule
          </button>
        </div>
      </div>
    </aside>
  );
}
