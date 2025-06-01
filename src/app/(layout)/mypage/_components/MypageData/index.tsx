'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import IconEdit from '@/assets/icons/icon-edit.svg';
import IconProfilePic from '@/assets/icons/icon-profilepic.svg';
import { usePatchUserProfileImage } from '@/hooks/user/usePatchUserProfileImage';

interface MypageDataProps {
  profileImage?: string;
  nickname: string;
  onNicknameChange: (nickname: string) => void;
  isNicknameUpdating?: boolean;
}

export default function MypageData({
  profileImage,
  nickname,
  onNicknameChange,
  isNicknameUpdating,
}: MypageDataProps) {
  const [currentNickname, setCurrentNickname] = useState(nickname);
  const { mutate: patchProfileImage, isPending: isPatchingProfileImage } =
    usePatchUserProfileImage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentNickname(nickname);
  }, [nickname]);

  const handleNicknameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentNickname(e.target.value);
  };

  const handleNicknameBlur = () => {
    if (nickname !== currentNickname) {
      onNicknameChange(currentNickname);
    }
  };

  const handleProfileImageEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      patchProfileImage(formData, {
        onError: (err) => {
          console.error('프로필 이미지 변경 실패:', err);
        },
      });
    }
  };

  return (
    <div className="flex flex-col">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleProfileImageChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
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

        <button
          type="button"
          className="button-sm text-layout-grey6 flex items-center gap-1 disabled:opacity-50"
          onClick={handleProfileImageEditClick}
          disabled={isPatchingProfileImage}
        >
          <IconEdit aria-label="편집 아이콘" />
          {isPatchingProfileImage ? '업로드 중...' : '프로필 사진 수정'}
        </button>
      </div>

      <div className="mt-10 flex h-[44px] w-[473px] items-center justify-between">
        <span className="button-lg text-layout-grey6">닉네임</span>
        <div className="border-layout-grey5 flex h-[44px] w-[400px] items-center rounded-[6px] border px-3">
          <input
            type="text"
            value={currentNickname}
            onChange={handleNicknameInputChange}
            onBlur={handleNicknameBlur}
            className="body-lg text-layout-grey7 h-full w-full bg-transparent outline-none disabled:opacity-50"
            placeholder="닉네임을 입력하세요"
            disabled={isNicknameUpdating}
          />
        </div>
      </div>
    </div>
  );
}
