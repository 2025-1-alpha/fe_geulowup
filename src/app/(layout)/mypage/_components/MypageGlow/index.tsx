import IconGlowScore from '@/assets/icons/icon-glow-score-big.svg';

interface MypageGlowProps {
  glowScore: number;
}

export default function MypageGlow({ glowScore }: MypageGlowProps) {
  const getTemperatureStyle = (score: number) => {
    // 0~100 범위로 제한
    const limitedScore = Math.min(Math.max(score, 0), 100);

    if (limitedScore >= 90) {
      return {
        background: '#16135B', // purple7
        text: '#F0EFFA',
        label: '셰익스피어, 시대를 초월한 문장의 마술사',
      };
    } else if (limitedScore >= 75) {
      return {
        background: '#403AC0', // purple5
        text: '#F0EFFA',
        label: '헤밍웨이, 간결하고 힘있는 문장의 대가',
      };
    } else if (limitedScore >= 60) {
      return {
        background: '#7D76FA', // purple4
        text: '#F0EFFA',
        label: '무라카미, 독특한 문체로 매력을 전하는 작가',
      };
    } else if (limitedScore >= 45) {
      return {
        background: '#B3B0F9', // purple3
        text: '#161184',
        label: '에세이스트, 일상의 감성을 글로 표현하는 작가',
      };
    } else if (limitedScore >= 30) {
      return {
        background: '#E2E0FB', // purple2
        text: '#161184',
        label: '필사가, 꾸준한 글쓰기로 성장하는 중',
      };
    } else {
      return {
        background: '#F0EFFA', // purple1
        text: '#161184',
        label: '새싹, 글쓰기를 시작하는 첫 걸음',
      };
    }
  };

  const style = getTemperatureStyle(glowScore);

  return (
    <div className="bg-layout-grey1 h-[145px] w-[473px] rounded-[6px] p-4">
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <IconGlowScore aria-label="글로우 점수 아이콘" />
          <div className={`rounded-full px-3 py-1`} style={{ backgroundColor: style.background }}>
            <span className="button-lg" style={{ color: style.text }}>
              {glowScore.toFixed(1)}℃
            </span>
          </div>
          <span className="detail text-layout-grey5">{style.label}</span>
        </div>

        <p className="detail text-layout-grey6 mt-2">
          온도(글로우)는 나의 활동, 받은 좋아요 수 등을 통해 계산됩니다.
        </p>

        <div className="mt-4">
          <p className="button-lg text-layout-grey6">나의 템플릿 작성 내역</p>
        </div>
      </div>
    </div>
  );
}
