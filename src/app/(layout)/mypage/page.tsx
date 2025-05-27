'use client';

import { useState } from 'react';
import MypageData from './_components/MypageData';
import MypageGlow from './_components/MypageGlow';
import MypageCancelAccount from './_components/MypageCancelAccount';

export default function MyPage() {
  const [nickname, setNickname] = useState('사용자닉네임');
  const glowScore = 1213;

  const handleNicknameChange = (newNickname: string) => {
    setNickname(newNickname);
  };

  return (
    <div className="flex justify-center">
      <div className="flex h-[664px] w-[473px] flex-col">
        <h1 className="title-lg text-layout-grey7">마이페이지</h1>

        <div className="mt-[60px]">
          <MypageData nickname={nickname} onNicknameChange={handleNicknameChange} />
        </div>

        <div className="mt-10 flex justify-center">
          <MypageGlow glowScore={glowScore} />
        </div>

        <div className="mt-[39px]">
          <MypageCancelAccount />
        </div>
      </div>
    </div>
  );
}
