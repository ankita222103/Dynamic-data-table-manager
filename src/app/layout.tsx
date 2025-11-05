import './globals.css';
import Providers from './providers';
import AppThemeProviders from '@/components/Shared/AppThemeProvider'

export const metadata = { title: 'Dynamic Table Manager' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppThemeProviders>{children}</AppThemeProviders>
          </Providers>
      </body>
    </html>
  );
}