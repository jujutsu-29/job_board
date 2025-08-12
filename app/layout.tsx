import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "./providers";
import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rolespot – Find Your Dream Job",
  description: "A modern job board built for job seekers and employers",
  icons: { icon: "/rolespot_noBG.png" },
  metadataBase: new URL("https://www.rolespot.in"),
  openGraph: {
    title: "Rolespot – Find Your Dream Job",
    description: "A modern job board built for job seekers and employers",
    url: "https://jobs.rolespot.space/",
    images: [{ url: "/rolespot_noBG.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3149724962399059"
     crossorigin="anonymous"></script>
        {/* Google Analytics Script */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <Toaster />
            {children}
            <Analytics />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
