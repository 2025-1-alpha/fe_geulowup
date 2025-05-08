import clsx from 'clsx';

const colorMap = {
  purple: {
    default: 'bg-secondary-purple2 text-secondary-purple5 border-secondary-purple3',
    hover: 'hover:bg-secondary-purple3 hover:text-secondary-purple5 hover:border-secondary-purple3',
    selected: 'ring-2 ring-offset-2 ring-secondary-purple5 bg-secondary-purple3',
  },
  navy: {
    default: 'bg-primary-navy2 text-primary-navy5 border-primary-navy3',
    hover: 'hover:bg-primary-navy3 hover:text-primary-navy5 hover:border-primary-navy3',
    selected: 'ring-2 ring-offset-2 ring-primary-navy4 bg-primary-navy3 ',
  },
  green: {
    default: 'bg-correction-green1 text-correction-green4 border-correction-green2',
    hover: 'hover:bg-correction-green2 hover:text-correction-green4 hover:border-correction-green2',
    selected: 'ring-2 ring-offset-2 ring-correction-green4 bg-correction-green2',
  },
  pink: {
    default: 'bg-point-pink1 text-point-pink4 border-point-pink2',
    hover: 'hover:bg-point-pink2 hover:text-point-pink4 hover:border-point-pink2',
    selected: 'ring-2 ring-offset-2 ring-point-pink5 bg-point-pink2',
  },
};

type Props = {
  color: 'purple' | 'navy' | 'green' | 'pink';
  icon: string;
  label: string;
  selected?: boolean;
  onClick?: () => void;
};

export function RoleCard({ icon, label, color, selected, onClick }: Props) {
  const { default: defaultStyle, hover, selected: selectedStyle } = colorMap[color];
  const stateStyle = selected ? selectedStyle : hover;

  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex h-[140px] w-[252px] items-center justify-center rounded-xl border p-6',
        defaultStyle,
        stateStyle,
      )}
    >
      <span className="text-3xl">{icon}</span>
      <span className="title-sm mt-2 ml-2">{label}</span>
    </button>
  );
}
