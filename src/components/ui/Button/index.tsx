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
      hover: 'hover:bg-primary-navy5 hover:text-layout-white',
      line: 'border border-primary-navy4 text-primary-navy4 bg-layout-white',
      line_hover: 'hover:bg-layout-grey1 hover:border-primary-navy4 hover:text-primary-navy4',
    },
    secondary: {
      default: 'bg-secondary-purple5 text-layout-white',
      hover: 'hover:bg-secondary-purple6 hover:text-layout-white',
      line: 'border border-secondary-purple6 text-secondary-purple6 bg-layout-white',
      line_hover:
        'hover:bg-layout-grey1 hover:border-secondary-purple6 hover:text-secondary-purple6',
    },
    grey: {
      default: 'bg-layout-grey4 text-layout-white',
      hover: 'hover:bg-layout-grey5 hover:text-layout-white',
      line: 'border border-layout-grey6 text-layout-grey6 bg-layout-white',
      line_hover: 'hover:bg-layout-grey1 hover:border-layout-grey6 hover:text-layout-grey6',
    },
    disabled: {
      default: 'bg-layout-grey3 text-layout-grey2 cursor-not-allowed',
    },
  };

  const sizeStyle = {
    large: 'h-14 w-[764px] button-lg rounded-[6px]',
    medium:
      icon === 'add'
        ? 'h-14 w-[210px] button-md rounded-[6px]'
        : 'h-[52px] w-[210px] button-md rounded-[6px]',
    small: 'h-11 w-32 button-md rounded-[6px]',
    xsmall: 'h-8 w-[88px] button-sm rounded-[5px]',
  };

  const baseStateClass =
    variant === 'disabled'
      ? variantStyle.disabled.default
      : state === 'line'
        ? variantStyle[variant].line
        : variantStyle[variant].default;

  const hoverClass =
    variant === 'disabled'
      ? ''
      : state === 'line'
        ? variantStyle[variant].line_hover
        : variantStyle[variant].hover;

  return (
    <button
      disabled={variant === 'disabled'}
      className={clsx(baseStyle, baseStateClass, hoverClass, sizeStyle[size], className)}
      {...props}
    >
      {size === 'medium' && icon === 'add' && <IconAdd className="mr-0.5" />}
      {children}
      {size === 'medium' && icon === 'dropdown' && <IconArrowDown className="ml-1" />}
    </button>
  );
};
