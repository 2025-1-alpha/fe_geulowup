import IconClose from '@/assets/icons/icon-close.svg';
import { Button } from '../../Button';
import { useUnsaveModalStore } from '@/stores/useUnsaveModalStore';
import { useModalStore } from '@/stores/useModalStore';

export default function UnsaveModal() {
  const { isUnsaveOpen, closeUnsaveModal } = useUnsaveModalStore();
  const { closeModal } = useModalStore();

  if (!isUnsaveOpen) return null;

  return (
    <section className="bg-layout-grey1 flex h-[252px] w-[448px] flex-col rounded-sm p-6">
      <button>
        <IconClose />
      </button>
      <div></div>
      <div className="flex">저장하지 않고 나가시겠습니까?</div>
      <section className="flex gap-2">
        <Button size="xsmall" onClick={closeUnsaveModal}>
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
