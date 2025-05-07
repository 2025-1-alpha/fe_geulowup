'use client';

import React from 'react';
import CardTag from '@/components/ui/CardTag';

interface TemplateType {
  title: string;
  description: string;
  tags: string[];
  likes: number;
  content?: string;
}

interface TempTemplateModalProps {
  isOpen: boolean;
  template: TemplateType;
  onClose: () => void;
  onUse: () => void;
}

const TempTemplateModal: React.FC<TempTemplateModalProps> = ({
  isOpen,
  template,
  onClose,
  onUse,
}) => {
  if (!isOpen) return null;

  // 모달 외부 클릭 시 닫기
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black"
      onClick={handleBackdropClick}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="title-md text-layout-grey7">{template.title}</h3>
          <button onClick={onClose} className="text-layout-grey6 hover:text-layout-grey7">
            닫기
          </button>
        </div>

        <div className="mb-6">
          <p className="body-md text-layout-grey7 mb-4">{template.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {template.tags.map((tag, idx) => (
              <CardTag key={idx} text={tag} />
            ))}
          </div>
        </div>

        {template.content && (
          <div className="bg-layout-grey1 mt-4 mb-6 rounded-md p-4">
            <p className="text-layout-grey7 text-sm whitespace-pre-line">{template.content}</p>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            className="border-layout-grey3 hover:bg-layout-grey1 rounded-md border px-4 py-2 transition-colors"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="bg-primary-navy4 hover:bg-primary-navy5 rounded-md px-4 py-2 text-white transition-colors"
            onClick={onUse}
          >
            템플릿 사용하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TempTemplateModal;
