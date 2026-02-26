import { Outfit } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { PermissionsProvider } from '@/context/PermissionsContext';
import PublicLayout from '@/components/layout/PublicLayout';

export const metadata: Metadata = {
  title: 'BFZ Track',
  description: 'Advanced vehicle tracking and port clearance solutions',
};

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${outfit.className} dark:bg-gray-900 overflow-x-hidden w-full`}>
        <ThemeProvider>
          <AuthProvider>
            <PermissionsProvider>
              <SidebarProvider>
                <PublicLayout>{children}</PublicLayout>
              </SidebarProvider>
            </PermissionsProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
