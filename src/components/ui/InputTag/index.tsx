'use client';

import { useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';

type InputTagProps = {
  initialValue?: string;
  placeholder?: string; //#태그 #tag #input
  onConfirm: (value: string) => void;
  onRemove?: (value: string) => void;
  tagErrCheck: (value: string) => boolean;
  maxLength?: number;
};

const getVisualLength = (str: string) =>
  [...str].reduce((len, ch) => len + (ch.charCodeAt(0) > 127 ? 2 : 1), 0);

export const InputTag = ({
  initialValue = '',
  placeholder = '',
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

  // 텍스트 길이에 따라 input 너비 자동 조절
  useEffect(() => {
    if (spanRef.current) {
      const width = spanRef.current.offsetWidth;
      setInputWidth(Math.min(width + 16, 200));
    }
  }, [value, placeholder]);

  // 입력 확정
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
    'group flex items-center gap-1 px-2 py-1 text-sm font-medium rounded-[4px] border transition-colors w-fit text-[#454545]';

  const statusStyle = clsx({
    'bg-[#E8F3FF] border-[#4287D6]':
      !isConfirmed || (isConfirmed && (isHovered || isFocused) && !isError),
    'bg-[#BBDBFF] border-[#4287D6]': isConfirmed && !isError && !isHovered && !isFocused,
    'bg-[#FFD6D9] border-[#FF6771]': isConfirmed && isError && !isHovered && !isFocused,
    'bg-[#FD8A91] border-[#FF6771]': isConfirmed && isError && (isHovered || isFocused),
  });

  return (
    <div
      className={clsx(baseStyle, statusStyle)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {/* 너비 측정용 span */}
      <span ref={spanRef} className="absolute left-[-9999px] text-sm font-medium whitespace-pre">
        {value || placeholder || ' '}
      </span>

      {/* 입력 필드 or 확정된 텍스트 */}
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
          className="bg-transparent text-inherit outline-none placeholder:text-[#C0C0C0]"
        />
      ) : (
        <span onClick={enterEditMode} className="cursor-text" tabIndex={0}>
          {value}
        </span>
      )}

      {/* 아이콘 표시 영역 */}
      {isConfirmed && (
        <>
          {isError ? (
            <img src="/input_tag_alert.png" alt="에러" className="ml-1 h-4 w-4 shrink-0" />
          ) : (
            onRemove && (
              <button onClick={() => onRemove(value)} className="ml-1">
                <img src="/input_tag_hover.png" alt="삭제" className="h-3 w-3 shrink-0" />
              </button>
            )
          )}
        </>
      )}
    </div>
  );
};
