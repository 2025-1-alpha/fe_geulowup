import { clsx } from 'clsx';
import IconArrowDown from '@/assets/icons/icon-arrow-down.svg';
import IconAdd from '@/assets/icons/icon-plus.svg';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'grey' | 'disabled';
  state?: 'default' | 'hover' | 'line' | 'line_hover';
  size?: 'large' | 'medium' | 'small' | 'xsmall';
  icon?: 'dropdown' | 'add';
  children?: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  variant = 'primary',
  state = 'default',
  size = 'medium',
  icon,
  children,
  className,
  ...props
}: ButtonProps) => {
  const baseStyle = 'flex items-center justify-center font-medium transition-all';

  const variantStyle = {
    primary: {
      default: 'bg-primary-navy4 text-layout-white',
      hover: 'bg-primary-navy5 text-layout-white',
      line: 'border border-primary-navy4 text-primary-navy4 bg-layout-white',
      line_hover: 'border border-primary-navy4 text-primary-navy4 bg-layout-grey1',
    },
    secondary: {
      default: 'bg-secondary-purple5 text-layout-white',
      hover: 'bg-secondary-purple6 text-layout-white',
      line: 'border border-secondary-purple6 text-secondary-purple6 bg-layout-white',
      line_hover: 'border border-secondary-purple6 text-secondary-purple6 bg-layout-grey1',
    },
    grey: {
      default: 'bg-layout-grey4 text-layout-white',
      hover: 'bg-layout-grey5 text-layout-white',
      line: 'border border-layout-grey6 text-layout-grey6 bg-layout-white',
      line_hover: 'border border-layout-grey6 text-layout-grey6 bg-layout-grey1',
    },
    disabled: {
      default: 'bg-layout-grey3 text-layout-grey2',
    },
  };

  const sizeStyle = {
    large: 'h-[54px] w-[764px] button-lg rounded-[6px]',
    medium: 'h-[52px] w-[217px] button-md rounded-[6px]',
    small: 'h-11 w-[129px] button-md rounded-[6px]',
    xsmall: 'h-[34px] w-[87px] button-sm rounded-[5px]',
  };
  const variantObj = variantStyle[variant];

  const selectedVariant =
    variant === 'disabled'
      ? variantObj.default
      : (variantObj as Record<'default' | 'hover' | 'line' | 'line_hover', string>)[state] ||
        variantObj.default;

  return (
    <button className={clsx(baseStyle, selectedVariant, sizeStyle[size], className)} {...props}>
      {icon && icon === 'add' && <IconAdd className="mr-0.5" />}
      {children}
      {icon && icon === 'dropdown' && <IconArrowDown className="ml-1" />}
    </button>
  );
};

// TODO : 생각해보니까 icon 형식이 다 들어가는 게 아니긴 한데... 확장성을 위해서 그냥 냅둘지 or medium 사이즈에만 가능하게 할지 결정하기!
// TODO : medium만 할 거면 medium 검사하기 or variant에 아이콘들을 추가하기
