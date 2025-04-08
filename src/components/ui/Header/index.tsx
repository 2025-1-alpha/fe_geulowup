'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '../Button';
import Logo from '@/assets/logo.svg';

export default function Header() {
  const pathname = usePathname();

  const menus = [
    { label: '조언받기', href: '/advice' },
    { label: '찾아보기', href: '/explore' },
    { label: '보관함', href: '/archive' },
  ];

  {
    /* TODO : 쿠키에서 로그인 여부 받아서 수정할 수 있도록 하기 */
  }
  const isLogin = true;

  return (
    <header className="bg-layout-grey1 mx-auto mb-[100px] flex min-w-screen items-center justify-between px-24 py-3">
      <section className="flex h-11 items-center gap-[110px]">
        <Link href="/">
          <Logo />
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

      {isLogin ? (
        <div className="flex items-center gap-5">
          <Link href="/mypage" className="button-md text-layout-grey5">
            마이페이지
          </Link>
          <Button
            variant="grey"
            size="small"
            // TODO : 로그아웃 연결
            onClick={() => {
              alert('로그아웃!');
            }}
          >
            로그아웃
          </Button>
        </div>
      ) : (
        <Link href="/login">
          <Button variant="primary" size="small">
            로그인
          </Button>
        </Link>
      )}
    </header>
  );
}
