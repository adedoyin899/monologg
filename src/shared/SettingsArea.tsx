import { Route, Routes } from 'react-router-dom';
import AppearanceSettings from './settings/AppearanceSettings';
import MediaSettings from './settings/MediaSettings';
import NotificationSettings from './settings/NotificationSettings';
import PayoutSettings from './settings/PayoutSettings';
import ProfileSettings from './settings/ProfileSettings';
import RateSettings from './settings/RateSettings';
import ReferralProgramme from './settings/ReferralProgramme';
import SettingsMenu from './settings/SettingsMenu';

/** SET-01..06 under /settings/*; accent follows the signed-in audience. */
export default function SettingsArea() {
  return (
    <Routes>
      <Route index element={<SettingsMenu />} />
      <Route path="profile" element={<ProfileSettings />} />
      <Route path="rates" element={<RateSettings />} />
      <Route path="media" element={<MediaSettings />} />
      <Route path="payout" element={<PayoutSettings />} />
      <Route path="notifications" element={<NotificationSettings />} />
      <Route path="appearance" element={<AppearanceSettings />} />
      <Route path="referral" element={<ReferralProgramme />} />
    </Routes>
  );
}
