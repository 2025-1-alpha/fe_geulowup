import { useRouter } from 'next/navigation';
import { useLoginModalStore } from '@/stores/useLoginModal';
import { useModalStore } from '@/stores/useModalStore';
import { Spacing } from '../../Spacing';
import { Button } from '../../Button';
import IconClose from '@/assets/icons/icon-close.svg';
import ImageLogin from '@/assets/icons/image-login.svg';

export default function LoginModal() {
  const router = useRouter();

  const { isLoginOpen, closeLoginModal } = useLoginModalStore();
  const { closeModal} = useModalStore();

  if (!isLoginOpen) return null;

  return (
    <section className="bg-layout-white flex h-[440px] w-[780px] flex-col items-center justify-center rounded-lg p-6">
      <button onClick={closeLoginModal} className="flex w-full justify-end">
        <IconClose />
      </button>
      <ImageLogin />
      <Spacing size={8} />
      <div className="body-lg text-layout-grey5">이 기능은 로그인 후에 사용할 수 있습니다.</div>
      <Spacing size={12} />
      <div className="title-lg">로그인하고 더 많은 기능을 누려보세요!</div>
      <Spacing size={48} />
      <section className="flex gap-2">
        <Button state="line" onClick={closeLoginModal}>
          다음에 하기
        </Button>
        <Button
          onClick={() => {
            closeModal()
            closeLoginModal()
            router.push('/login');
          }}
        >
          로그인하기
        </Button>
      </section>
        <Spacing size={25} />
    </section>
  );
}
