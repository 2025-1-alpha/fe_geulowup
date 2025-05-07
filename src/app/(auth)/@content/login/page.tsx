import { Spacing } from '@/components/ui/Spacing';
import Logo from '@/assets/logo.svg';
import IconKaKao from '@/assets/icons/icon-kakao.svg';
import KakaoText from '@/assets/icons/kakao-text.svg';
import IconGoogle from '@/assets/icons/icon-google.svg';
import GoogleText from '@/assets/icons/google-text.svg';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center">
      <Logo className="scale-200" />
      <Spacing size={46} />
      <div className="body-lg flex">글로우업 회원이 되어 더 많은 기능을 누려보세요!</div>
      <Spacing size={120} />
      <section className="flex flex-col gap-3">
        {/* TODO : api 연결할 때 onClick 연결 필요 */}
        <button className="flex h-[45px] w-[300px] items-center justify-center rounded-md bg-[#fee500] p-[14px]">
          <IconKaKao />
          <KakaoText />
        </button>
        <button className="border-layout-grey4 flex h-[45px] w-[300px] items-center justify-center rounded-md border p-[14px]">
          <IconGoogle />
          <GoogleText />
        </button>
      </section>
    </div>
  );
}
