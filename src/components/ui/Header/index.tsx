'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '../Button';
import Logo from '@/assets/logo.svg';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const { requireAuth } = useAuth();

  const menus = [
    { label: '조언받기', href: '/advice' },
    { label: '찾아보기', href: '/explore' },
    { label: '보관함', href: '/archive' },
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    setIsLogin(!!(token && user));
  }, []);

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
              <button
                key={menu.href}
                onClick={() => {
                  if (menu.label === '보관함') {
                    if (requireAuth()) {
                      router.push(menu.href);
                    }
                  } else {
                    router.push(menu.href);
                  }
                }}
                className={cn('text-layout-grey5 button-lg', isActive && 'text-layout-grey6')}
              >
                {menu.label}
              </button>
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
