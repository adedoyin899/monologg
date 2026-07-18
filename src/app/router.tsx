import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from '@/auth/Auth';
import ClientHome from '@/client/ClientHome';
import PublicStorefront from '@/client/PublicStorefront';
import CreatorHome from '@/creator/CreatorHome';
import BlogArticle from '@/marketing/blog/BlogArticle';
import BlogIndex from '@/marketing/blog/BlogIndex';
import HowItWorksPage from '@/marketing/HowItWorksPage';
import Landing from '@/marketing/Landing';
import Faq from '@/shared/Faq';
import HelpSupport from '@/shared/HelpSupport';
import Inbox from '@/shared/Inbox';
import NotificationCentre from '@/shared/NotificationCentre';
import OrderRoom from '@/shared/OrderRoom';
import SettingsArea from '@/shared/SettingsArea';
import Terms from '@/shared/Terms';
import Transactions from '@/shared/Transactions';
import { AppLayout } from './AppNav';
import { DevAxeWatcher } from './DevAxeWatcher';
import KitchenSink from './KitchenSink';
import { AudienceBoundary } from './providers/AudienceProvider';
import { RequireAudience } from './RequireAudience';

export function AppRouter() {
  return (
    <BrowserRouter>
      <DevAxeWatcher />
      <Routes>
        {/* marketing + auth — no app chrome */}
        <Route path="/" element={<Landing />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogArticle />} />
        <Route path="/auth/*" element={<Auth />} />

        {/* the app — one login, two fully separated sides, shared bottom nav shell */}
        <Route element={<AppLayout />}>
          <Route
            path="/creator/*"
            element={
              <RequireAudience userType="talent">
                <AudienceBoundary audience="talent">
                  <CreatorHome />
                </AudienceBoundary>
              </RequireAudience>
            }
          />
          <Route
            path="/client/*"
            element={
              <RequireAudience userType="client">
                <AudienceBoundary audience="client">
                  <ClientHome />
                </AudienceBoundary>
              </RequireAudience>
            }
          />
          {/* public storefront is a talent surface — coral even for client viewers */}
          <Route
            path="/t/:id"
            element={
              <AudienceBoundary audience="talent">
                <PublicStorefront />
              </AudienceBoundary>
            }
          />
          <Route path="/order/:orderId" element={<OrderRoom />} />
          {/* settings + system screens — shared by both audiences */}
          <Route path="/settings/*" element={<SettingsArea />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/notifications" element={<NotificationCentre />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/help" element={<HelpSupport />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/terms" element={<Terms />} />
        </Route>

        <Route path="/kitchen-sink" element={<KitchenSink />} />
      </Routes>
    </BrowserRouter>
  );
}
