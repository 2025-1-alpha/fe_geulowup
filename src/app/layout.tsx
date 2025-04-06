import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GeulouUp',
  description: '사회 초년생을 위한 글쓰기 도움 서비스',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </head>
      <body className="mx-auto max-w-[1512px] font-sans antialiased">{children}</body>
    </html>
  );
}
