import { ToastViewport } from '@/components';
import { AudienceProvider } from './providers/AudienceProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { AppRouter } from './router';

export default function App() {
  return (
    <ThemeProvider>
      <AudienceProvider>
        <AppRouter />
        <ToastViewport />
      </AudienceProvider>
    </ThemeProvider>
  );
}
