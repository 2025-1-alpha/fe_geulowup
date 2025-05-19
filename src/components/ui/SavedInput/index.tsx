import React, { useState, useRef, useEffect } from 'react';
import IconAdd from '@/assets/icons/icon-add.svg';
import IconRemove from '@/assets/icons/icon-remove.svg';
import IconCheck from '@/assets/icons/icon-check.svg';

interface SavedInputProps {
  onAdd?: (folderName: string) => void;
  onCancel?: () => void;
  checkDuplicate?: (folderName: string) => boolean;
}

const SavedInput: React.FC<SavedInputProps> = ({ onAdd, onCancel, checkDuplicate }) => {
  const [state, setState] = useState<'default' | 'hover' | 'enabled' | 'wrote'>('default');
  const [folderName, setFolderName] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleMouseEnter = () => {
    if (state === 'default') {
      setState('hover');
    }
  };

  const handleMouseLeave = () => {
    if (state === 'hover') {
      setState('default');
    }
  };

  const handleClick = () => {
    if (state === 'default' || state === 'hover') {
      setState('enabled');
    }
  };

  const handleCancel = () => {
    setState('default');
    setFolderName('');
    setIsDuplicate(false);
    if (onCancel) onCancel();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFolderName(value);

    if (value.trim() !== '') {
      setState('wrote');
      if (checkDuplicate) {
        setIsDuplicate(checkDuplicate(value));
      }
    } else {
      setState('enabled');
    }
  };

  const handleSave = () => {
    if (!isDuplicate && folderName.trim() !== '' && onAdd) {
      onAdd(folderName);
      setState('default');
      setFolderName('');
    }
  };

  useEffect(() => {
    if (state === 'enabled' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [state]);

  const getComponentByState = () => {
    switch (state) {
      case 'default':
        return (
          <button
            className="flex h-[32px] w-[280px] items-center rounded-[3px] px-0 py-0"
            style={{
              background: 'transparent',
              color: 'layout color/grey4',
              fontFamily: 'Pretendard',
              fontSize: '14px',
              fontWeight: 'normal',
              textAlign: 'left',
            }}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <IconAdd width={16} height={16} className="ml-[7px]" color="layout color/grey4" />
            <span className="ml-0">폴더 만들기</span>
          </button>
        );

      case 'hover':
        return (
          <button
            className="flex h-[32px] w-[280px] items-center rounded-[3px] px-0 py-0"
            style={{
              background: 'layout color/grey3',
              color: 'layout color/grey6',
              fontFamily: 'Pretendard',
              fontSize: '14px',
              fontWeight: 'normal',
              textAlign: 'left',
            }}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <IconAdd width={16} height={16} className="ml-[7px]" color="layout color/grey6" />
            <span className="ml-[6px]">폴더 만들기</span>
          </button>
        );

      case 'enabled':
        return (
          <div className="relative flex h-[32px] w-[280px] items-center rounded-[3px] px-2 py-[5px]">
            <input
              ref={inputRef}
              type="text"
              value={folderName}
              onChange={handleChange}
              placeholder="폴더의 제목을 입력해 주세요."
              className="w-[264px] bg-transparent outline-none"
              style={{
                color: 'layout color/grey5',
                fontFamily: 'Pretendard',
                fontSize: '14px',
                fontWeight: 'normal',
              }}
            />
            <IconRemove
              width={16}
              height={16}
              className="absolute right-2 cursor-pointer"
              onClick={handleCancel}
              onMouseOver={(e: React.MouseEvent<SVGSVGElement>) =>
                (e.currentTarget.style.color = 'layout color/grey6')
              }
              onMouseOut={(e: React.MouseEvent<SVGSVGElement>) =>
                (e.currentTarget.style.color = 'layout color/grey5')
              }
              color="layout color/grey5"
            />
          </div>
        );

      case 'wrote':
        return (
          <div className="relative flex h-[32px] w-[280px] items-center rounded-[3px] px-2 py-[5px]">
            <input
              ref={inputRef}
              type="text"
              value={folderName}
              onChange={handleChange}
              className="w-[128px] truncate bg-transparent outline-none"
              style={{
                color: 'layout color/grey6',
                fontFamily: 'Pretendard',
                fontSize: '14px',
                fontWeight: 'normal',
              }}
            />
            <div className="absolute right-2 flex items-center">
              <IconRemove
                width={16}
                height={16}
                className="cursor-pointer"
                onClick={handleCancel}
                onMouseOver={(e: React.MouseEvent<SVGSVGElement>) =>
                  (e.currentTarget.style.color = 'layout color/grey6')
                }
                onMouseOut={(e: React.MouseEvent<SVGSVGElement>) =>
                  (e.currentTarget.style.color = 'layout color/grey5')
                }
                color="layout color/grey5"
              />
              <IconCheck
                width={16}
                height={16}
                className="ml-2 cursor-pointer"
                onClick={!isDuplicate ? handleSave : undefined}
                style={{
                  opacity: isDuplicate ? 0.5 : 1,
                  color: isDuplicate ? 'grey' : 'layout color/grey5',
                }}
                onMouseOver={(e: React.MouseEvent<SVGSVGElement>) => {
                  if (!isDuplicate) {
                    e.currentTarget.style.color = 'layout color/grey6';
                  }
                }}
                onMouseOut={(e: React.MouseEvent<SVGSVGElement>) => {
                  if (!isDuplicate) {
                    e.currentTarget.style.color = 'layout color/grey5';
                  }
                }}
              />
            </div>
          </div>
        );
    }
  };

  return <>{getComponentByState()}</>;
};

export default SavedInput;
