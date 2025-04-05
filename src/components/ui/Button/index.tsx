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
    large: 'h-14 w-[764px] button-lg rounded-[6px]',
    medium:
      icon === 'add'
        ? 'h-14 w-[210px] button-md rounded-[6px]'
        : 'h-[52px] w-[210px] button-md rounded-[6px]',
    small: 'h-11 w-32 button-md rounded-[6px]',
    xsmall: 'h-8 w-[88px] button-sm rounded-[5px]',
  };

  const variantObj = variantStyle[variant];

  const selectedVariant =
    variant === 'disabled'
      ? variantObj.default
      : (variantObj as Record<'default' | 'hover' | 'line' | 'line_hover', string>)[state] ||
        variantObj.default;

  return (
    <button className={clsx(baseStyle, selectedVariant, sizeStyle[size], className)} {...props}>
      {size === 'medium' && icon === 'add' && <IconAdd className="mr-0.5" />}
      {children}
      {size === 'medium' && icon === 'dropdown' && <IconArrowDown className="ml-1" />}
    </button>
  );
};
