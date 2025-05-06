import { ReactNode } from 'react';
import { Spacing } from '@/components/ui/Spacing';
import IconArrowDown from '@/assets/icons/icon-arrow-down.svg';

type Props = {
  children: ReactNode;
};

export default function SignUpLayout({ children }: Props) {
  return (
    <section className="flex w-[520px] flex-col">
      {/* TODO : 아이콘 왜 안 먹히는지 확인하기 */}
      <IconArrowDown />
      <Spacing size={32} />
      {children}
      {/* TODO : step에 따라 bar 생성하기 */}
    </section>
  );
}
