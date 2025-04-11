import IconAdd from '@/assets/icons/icon-add.svg';

type InputTagAddProps = {
  onClick: () => void;
  className?: string;
};

export const InputTagAdd = ({ onClick, className = '' }: InputTagAddProps) => {
  return (
    <button
      onClick={onClick}
      className={`border-layout-grey6 hover:bg-layout-grey1 flex h-[40px] w-[40px] items-center justify-center rounded-[6px] border bg-white transition-colors duration-150 ${className}`}
    >
      <IconAdd />
    </button>
  );
};
