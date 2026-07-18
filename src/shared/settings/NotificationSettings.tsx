import { useSettingsStore } from '@/app/stores/settings';
import { Card, Toggle } from '@/components';
import { PageShell } from '../PageShell';

const PREFS = [
  { key: 'bookings', label: 'Booking alerts', description: 'New requests, confirmations, slot changes' },
  { key: 'messages', label: 'Messages', description: 'Order-room chat and voice notes' },
  { key: 'escrow', label: 'Escrow updates', description: 'Locked, delivered, released — the money beats' },
  { key: 'digest', label: 'Weekly digest', description: 'Briefs and stages worth a look, once a week' },
] as const;

/** SET-05 — Notification Preferences (persisted). */
export default function NotificationSettings() {
  const { notificationPrefs, setNotificationPref } = useSettingsStore();

  return (
    <PageShell title="Notifications">
      <Card className="flex flex-col divide-y divide-divider p-0">
        {PREFS.map((pref) => (
          <div key={pref.key} className="p-4">
            <Toggle
              label={pref.label}
              description={pref.description}
              checked={notificationPrefs[pref.key] ?? false}
              onChange={(value) => setNotificationPref(pref.key, value)}
            />
          </div>
        ))}
      </Card>
      <p className="text-small text-muted">
        Delivery is email + SMS (SendGrid/Twilio) at launch; these switches already drive it.
      </p>
    </PageShell>
  );
}
