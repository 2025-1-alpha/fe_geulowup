import Link from 'next/link';
import Image from 'next/image';
import { Spacing } from '@/components/ui/Spacing';
import AdviceEditor from './_components/AdviceEditor';
import Logo from '@/assets/logo.svg';

export default function Advice() {
  const ImageList = ['advice', 'explore', 'mypage'];

  return (
    <section className="flex flex-col items-center">
      <section className="mx-[96px] mb-60 max-w-[1320px] items-start">
        <p className="title-lg text-layout-grey7">조언받기</p>
        <Spacing size={16} />
        <AdviceEditor />
      </section>
      <Spacing size={240} />
      <section className="bg-layout-grey1 flex h-[500px] w-screen flex-col items-center justify-center py-[108px]">
        <div className="text-layout-grey7 title-md flex items-center justify-center gap-0.5">
          <Logo />과 함께 더 편리한 글쓰기 누리기
        </div>
        <Spacing size={60} />
        <section className="flex gap-3">
          {ImageList.map((name) => (
            <Link key={name} href={`/${name}`} className="relative h-48 w-[348px]">
              <Image
                src={`/images/main-${name}.png`}
                alt={`${name}-image`}
                fill
                className="object-cover"
              />
            </Link>
          ))}
        </section>
      </section>
    </section>
  );
}
