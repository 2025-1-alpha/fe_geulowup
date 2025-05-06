import clsx from 'clsx';

const colorMap = {
  purple: 'bg-secondary-purple2 text-secondary-purple5 border-secondary-purple4',
  navy: 'bg-primary-navy2 text-primary-navy5 border-primary-navy3',
  green: 'bg-correction-green1 text-correction-green4 border-correction-green2',
  pink: 'bg-point-pink1 text-point-pink4 border-point-pink2',
};

export function RoleCard({
  color,
  icon,
  label,
}: {
  color: keyof typeof colorMap;
  icon: string;
  label: string;
}) {
  return (
    // TODO : onClick이랑 클릭 상태 변화 주기
    <button
      className={clsx(
        'flex h-[140px] w-[252px] items-center justify-center rounded-xl border p-6',
        colorMap[color],
      )}
    >
      <span className="text-3xl">{icon}</span>
      <span className="title-sm mt-2 ml-2">{label}</span>
    </button>
  );
}
