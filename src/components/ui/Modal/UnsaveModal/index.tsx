import IconClose from '@/assets/icons/icon-close.svg';
import IconDoor from '@/assets/icons/icon-door.svg';
import { Button } from '../../Button';
import { Spacing } from '../../Spacing';
import { useUnsaveModalStore } from '@/stores/useUnsaveModalStore';
import { useModalStore } from '@/stores/useModalStore';

export default function UnsaveModal() {
  const { isUnsaveOpen, closeUnsaveModal } = useUnsaveModalStore();
  const { closeModal } = useModalStore();

  if (!isUnsaveOpen) return null;

  return (
    <section className="bg-layout-grey1 flex h-[252px] w-[448px] flex-col items-center justify-center rounded-lg p-6">
      <button onClick={closeUnsaveModal} className="flex w-full justify-end">
        <IconClose />
      </button>
      <div className="bg-primary-navy4 flex h-[60px] w-[60px] items-center justify-center rounded-full">
        <IconDoor />
      </div>
      <Spacing size={8} />
      <div className="title-sm text-layout-grey6 flex">저장하지 않고 나가시겠습니까?</div>
      <Spacing size={38} />
      <section className="flex gap-2">
        <Button size="xsmall" state="line" onClick={closeUnsaveModal}>
          취소
        </Button>
        <Button
          size="xsmall"
          onClick={() => {
            closeModal();
            closeUnsaveModal();
          }}
        >
          나가기
        </Button>
      </section>
    </section>
  );
}
