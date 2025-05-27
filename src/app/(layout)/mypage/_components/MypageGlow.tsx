import IconGlowScore from '@/assets/icons/icon-glow-score-big.svg';

interface MypageGlowProps {
  glowScore: number;
}

export default function MypageGlow({ glowScore }: MypageGlowProps) {
  return (
    <div className="bg-layout-grey1 h-[145px] w-[473px] rounded-[6px] p-4">
      <div className="flex h-[37px] w-[180px] items-center">
        <IconGlowScore aria-label="글로우 점수 아이콘" />
        <span className="button-lg text-layout-grey7 ml-2">글로우</span>
        <span className="button-lg text-layout-grey7 ml-2">{glowScore}</span>
      </div>

      <div className="mt-3">
        <p className="detail text-layout-grey6">
          글로우는 나의 활동, 받은 좋아요 수 등을 통해 계산됩니다.
        </p>
      </div>

      <div className="mt-5">
        <p className="button-lg text-layout-grey6">나의 템플릿 작성 내역</p>
      </div>
    </div>
  );
}
