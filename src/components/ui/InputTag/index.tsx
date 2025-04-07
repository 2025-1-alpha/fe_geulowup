'use client';

import { useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import InputTagAlert from '@/assets/icons/icon-input-tag-alert.svg';
import InputTagRemove from '@/assets/icons/icon-input-tag-remove.svg';

type InputTagProps = {
  initialValue?: string;
  placeholder?: string;
  onConfirm: (value: string) => void;
  onRemove?: (value: string) => void;
  tagErrCheck: (value: string) => boolean;
  maxLength?: number;
};

const getVisualLength = (str: string) =>
  [...str].reduce((len, ch) => len + (ch.charCodeAt(0) > 127 ? 2 : 1), 0);

export const InputTag = ({
  initialValue = '',
  placeholder = '#태그',
  onConfirm,
  onRemove,
  tagErrCheck,
  maxLength = 20,
}: InputTagProps) => {
  const [value, setValue] = useState(initialValue);
  const [isConfirmed, setIsConfirmed] = useState(initialValue.trim().length > 0);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isError, setIsError] = useState(false);

  const spanRef = useRef<HTMLSpanElement>(null);
  const [inputWidth, setInputWidth] = useState(32);

  useEffect(() => {
    if (spanRef.current) {
      const width = spanRef.current.offsetWidth;
      setInputWidth(Math.min(width + 16, 200));
    }
  }, [value, placeholder]);

  const confirmInput = () => {
    const trimmed = value.trim();
    if (!trimmed) return;

    const hasError = tagErrCheck(trimmed);
    setIsError(hasError);
    setIsConfirmed(true);
    setIsFocused(false);
    onConfirm(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      confirmInput();
    }
  };

  const handleBlur = () => {
    confirmInput();
  };

  const enterEditMode = () => {
    setIsFocused(true);
    setIsConfirmed(false);
  };

  const baseStyle =
    'group flex items-center gap-1 px-2 py-1 text-sm font-medium rounded-[4px] border transition-colors w-fit text-[color:var(--color-layout-grey6)]';

  const statusStyle = clsx({
    'bg-[color:var(--color-primary-navy1)] border-[color:var(--color-primary-navy3)]':
      !isConfirmed || (isConfirmed && (isHovered || isFocused) && !isError),
    'bg-[color:var(--color-primary-navy2)] border-[color:var(--color-primary-navy3)]':
      isConfirmed && !isError && !isHovered && !isFocused,
    'bg-[color:var(--color-point-pink1)] border-[color:var(--color-point-pink3)]':
      isConfirmed && isError && !isHovered && !isFocused,
    'bg-[color:var(--color-point-pink2)] border-[color:var(--color-point-pink3)]':
      isConfirmed && isError && (isHovered || isFocused),
  });

  return (
    <div
      className={clsx(baseStyle, statusStyle)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <span ref={spanRef} className="absolute left-[-9999px] text-sm font-medium whitespace-pre">
        {value || placeholder || ' '}
      </span>

      {!isConfirmed ? (
        <input
          value={value}
          autoFocus
          placeholder={placeholder}
          onChange={(e) => {
            const newValue = e.target.value;
            if (getVisualLength(newValue) <= maxLength) {
              setValue(newValue);
            }
          }}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          style={{ width: inputWidth }}
          className="bg-transparent text-inherit outline-none placeholder:text-[color:var(--color-layout-grey3)]"
        />
      ) : (
        <span onClick={enterEditMode} className="cursor-text" tabIndex={0}>
          {value}
        </span>
      )}

      {isConfirmed && (
        <>
          {isError ? (
            // 에러 상태일 때: hover/focus면 제거 아이콘, 아니면 alert 아이콘
            isHovered || isFocused ? (
              <button
                onClick={() => onRemove?.(value)}
                className="ml-1 flex h-[17px] w-[17px] items-center justify-center"
              >
                <InputTagRemove className="h-[17px] w-[17px]" />
              </button>
            ) : (
              <span className="ml-1 flex h-[17px] w-[17px] items-center justify-center">
                <InputTagAlert className="h-[17px] w-[17px]" />
              </span>
            )
          ) : (
            // 정상 상태면 그냥 remove 아이콘
            onRemove && (
              <button
                onClick={() => onRemove(value)}
                className="ml-1 flex h-[17px] w-[17px] items-center justify-center"
              >
                <InputTagRemove className="h-[17px] w-[17px]" />
              </button>
            )
          )}
        </>
      )}
    </div>
  );
};
