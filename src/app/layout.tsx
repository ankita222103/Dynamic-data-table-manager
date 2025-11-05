import './globals.css';
import Providers from './providers';
import AppThemeProviders from '@/components/Shared/AppThemeProvider'

export const metadata = { title: 'Dynamic Table Manager' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
      <body>
        <Providers>
          <AppThemeProviders>{children}</AppThemeProviders>
          </Providers>
      </body>
    </html>
  );
}