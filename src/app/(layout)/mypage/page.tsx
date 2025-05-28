'use client';

import { useState, useEffect } from 'react';
import MypageData from './_components/MypageData/index';
import MypageGlow from './_components/MypageGlow/index';
import MypageCancelAccount from './_components/MypageCancelAccount/index';
import { useUserMe } from '@/hooks/user/useUserMe';
import { usePatchUserNickname } from '@/hooks/user/usePatchUserNickname';

export default function MyPage() {
  const [nickname, setNickname] = useState('');
  const { data: userData, isLoading, error } = useUserMe();
  const { mutate: patchNickname, isPending: isPatchingNickname } = usePatchUserNickname();

  useEffect(() => {
    if (userData) {
      if (userData.name) {
        setNickname(userData.name);
      }
    }
  }, [userData]);

  const handleNicknameChange = (newNickname: string) => {
    setNickname(newNickname);
    patchNickname(
      { nickname: newNickname },
      {
        onError: (err) => {
          if (userData?.name) {
            setNickname(userData.name);
          }
          console.error('닉네임 변경 실패:', err);
        },
      },
    );
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러 발생: {error.message}</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="flex h-[664px] w-[473px] flex-col">
        <h1 className="title-lg text-layout-grey7">마이페이지</h1>

        <div className="mt-[60px]">
          <MypageData
            profileImage={userData?.profileImageUrl}
            nickname={nickname}
            onNicknameChange={handleNicknameChange}
            isNicknameUpdating={isPatchingNickname}
          />
        </div>

        <div className="mt-10 flex justify-center">
          {userData?.score !== undefined && <MypageGlow glowScore={userData.score} />}
        </div>

        <div className="mt-[39px]">
          <MypageCancelAccount />
        </div>
      </div>
    </div>
  );
}
