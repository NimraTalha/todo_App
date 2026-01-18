import './globals.css'
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import { ThemeProvider } from '@/lib/theme'
import { ToastProvider } from '@/components/ui/Toast'
import Header from '@/components/layout/Header'
import PageTransition from '@/components/layout/PageTransition'
import ChatProvider from '@/components/chatbot/ChatProvider';
import ChatButton from '@/components/chatbot/ChatButton';
import '@/lib/hydrationUtils'; // Import hydration utility to handle browser extension attributes

/**
 * T009: Configure Outfit font (Premium, Geometric)
 * All weights from 300-900 for modern typography
 */
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-outfit',
})

export const metadata: Metadata = {
  title: 'Todo Pro - Productivity Suite',
  description: 'An elegant productivity suite for managing your daily tasks',
}

/**
 * T014: Root layout wrapping children with ThemeProvider
 * ThemeProvider manages theme detection, persistence, and class toggling
 * T077: ToastProvider for toast notifications
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${outfit.className} antialias`} suppressHydrationWarning={true}>
        <ThemeProvider>
          <ToastProvider>
            <ChatProvider>
              <Header />
                <main className="min-h-screen bg-background">
                  <PageTransition>
                    {children}
                  </PageTransition>
                </main>
              <ChatButton />
            </ChatProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
