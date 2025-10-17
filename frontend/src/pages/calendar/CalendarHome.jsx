export default function CalendarHome() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-heading text-primary">Calendar</h1>
      <p className="font-sans text-primary-900">
        This is your calendar home. Hook this to <code>/api/calendar</code> later.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded bg-white border border-primary/10 p-4">
          <div className="font-heading text-primary">Today</div>
          <div className="text-sm font-sans text-primary-900">No events yet.</div>
        </div>
        <div className="rounded bg-white border border-primary/10 p-4">
          <div className="font-heading text-primary">Upcoming</div>
          <div className="text-sm font-sans text-primary-900">Connect to your API.</div>
        </div>
        <div className="rounded bg-white border border-primary/10 p-4">
          <div className="font-heading text-primary">Reminders</div>
          <div className="text-sm font-sans text-primary-900">Add notifications later.</div>
        </div>
      </div>
    </div>
  );
}
