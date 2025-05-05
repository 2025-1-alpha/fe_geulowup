import { Spacing } from '@/components/ui/Spacing';
import Logo from '@/assets/logo.svg';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center">
      <Logo className="scale-200" />
      <Spacing size={46} />
      <div className="body-lg flex">글로우업 회원이 되어 더 많은 기능을 누려보세요!</div>
      <Spacing size={120} />
      <section className="flex flex-col gap-3">
        <button className="h-[45px] w-[300px]">카카오</button>
        <button className="h-[45px] w-[300px]">구글</button>
      </section>
    </div>
  );
}
