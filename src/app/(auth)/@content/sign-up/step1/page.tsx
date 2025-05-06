import { Spacing } from '@/components/ui/Spacing';
import Logo from '@/assets/logo.svg';

export default function Step1() {
  return (
    <section>
      <Logo />
      <Spacing size={120} />
      <div className="title-lg flex whitespace-pre-line">
        {`안녕하세요!
글로우업에서 사용할 이름을
입력해 주세요.`}
      </div>
      {/* TODO : input 공컴 제작하기 */}
    </section>
  );
}
