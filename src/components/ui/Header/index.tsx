'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Header() {
  const pathname = usePathname();

  const menus = [
    { label: '조언받기', href: '/advice' },
    { label: '찾아보기', href: '/explore' },
    { label: '보관함', href: '/archive' },
  ];

  return (
    <header className="bg-layout-grey1 mx-auto flex min-w-screen items-center justify-between px-24 py-3">
      {/* TODO : svg 다운로드해서 로고로 변경하기 */}
      <section className="flex h-11 items-center gap-[110px]">
        <Link href="/" className="text-2xl font-bold">
          Geulow Up
        </Link>
        <nav className="flex gap-20">
          {menus.map((menu) => {
            const isActive = pathname.startsWith(menu.href);

            return (
              <Link
                key={menu.href}
                href={menu.href}
                className={cn('text-layout-grey5 button-lg', isActive && 'text-layout-grey6')}
              >
                {menu.label}
              </Link>
            );
          })}
        </nav>
      </section>

      <div>
        {/* TODO : 쿠키에서 로그인 여부 받아서 수정할 수 있도록 하기 */}
        {/* TODO : 버튼 컴포넌트 머지되면 버튼으로 변경하기 */}
        <Link href="/login">로그인</Link>
      </div>
    </header>
  );
}
