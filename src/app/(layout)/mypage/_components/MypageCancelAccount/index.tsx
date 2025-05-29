'use client';

import { useState } from 'react';

export default function MypageCancelAccount() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancelAccount = () => {
    setIsModalOpen(true);
  };

  const handleConfirmCancel = () => {
    // TODO: 회원 탈퇴 API 호출
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleCancelAccount}
        className="bg-layout-grey4 flex h-[52px] w-[210px] items-center justify-center rounded-[6px]"
      >
        <span className="button-md text-layout-white">회원 탈퇴하기</span>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={handleCloseModal}
          />

          <div className="bg-layout-white relative w-[400px] rounded-[8px] p-6 shadow-lg">
            <h3 className="title-sm text-layout-grey7 mb-4 text-center">정말 탈퇴하시겠습니까?</h3>
            <p className="body-md text-layout-grey6 mb-6 text-center">
              탈퇴하시면 모든 데이터가 삭제되며 복구할 수 없습니다.
            </p>

            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={handleCloseModal}
                className="border-layout-grey5 flex h-[44px] w-[120px] items-center justify-center rounded-[6px] border"
              >
                <span className="button-md text-layout-grey6">취소</span>
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="bg-point-pink3 flex h-[44px] w-[120px] items-center justify-center rounded-[6px]"
              >
                <span className="button-md text-layout-white">탈퇴하기</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
