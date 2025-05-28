'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import IconEdit from '@/assets/icons/icon-edit.svg';
import IconProfilePic from '@/assets/icons/icon-profilepic.svg';

interface MypageDataProps {
  profileImage?: string;
  nickname: string;
  onNicknameChange: (nickname: string) => void;
}

export default function MypageData({ profileImage, nickname, onNicknameChange }: MypageDataProps) {
  const [currentNickname, setCurrentNickname] = useState(nickname);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        if (userData.name) {
          setCurrentNickname(userData.name);
          onNicknameChange(userData.name);
        }
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }
  }, []);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setCurrentNickname(newNickname);
    onNicknameChange(newNickname);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-end gap-4">
        <div className="bg-layout-grey2 h-[200px] w-[200px] overflow-hidden rounded-[12.5px]">
          {profileImage ? (
            <Image
              src={profileImage}
              alt="프로필 이미지"
              width={200}
              height={200}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="bg-layout-grey3 flex h-full w-full items-center justify-center">
              <IconProfilePic aria-label="기본 프로필 이미지" />
            </div>
          )}
        </div>

        <button type="button" className="button-sm text-layout-grey6 flex items-center gap-1">
          <IconEdit aria-label="편집 아이콘" />
          프로필 사진 수정
        </button>
      </div>

      <div className="mt-10 flex h-[44px] w-[473px] items-center justify-between">
        <span className="button-lg text-layout-grey6">닉네임</span>
        <div className="border-layout-grey5 flex h-[44px] w-[400px] items-center rounded-[6px] border px-3">
          <input
            type="text"
            value={currentNickname}
            onChange={handleNicknameChange}
            className="body-lg text-layout-grey7 h-full w-full bg-transparent outline-none"
            placeholder="닉네임을 입력하세요"
          />
        </div>
      </div>
    </div>
  );
}
