'use client';

import { useState, useEffect } from 'react';
import MypageData from './_components/MypageData';
import MypageGlow from './_components/MypageGlow';
import MypageCancelAccount from './_components/MypageCancelAccount';

export default function MyPage() {
  const [nickname, setNickname] = useState('');
  const glowScore = 1213;

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        if (userData.name) {
          setNickname(userData.name);
        }
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }
  }, []);

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
