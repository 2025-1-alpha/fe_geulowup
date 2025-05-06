import { ReactNode } from 'react';
import { Spacing } from '@/components/ui/Spacing';
import BackButton from './_components/BackButton';
import Logo from '@/assets/logo.svg';

type Props = {
  children: ReactNode;
};

export default function SignUpLayout({ children }: Props) {
  return (
    <section className="flex w-[520px] flex-col">
      <BackButton />
      <Spacing size={12} />
      <Logo />
      <Spacing size={32} />
      {children}
    </section>
  );
}
