'use client';

import { useModalStore } from '@/stores/useModalStore';
import { InputTag } from '../../InputTag';
import { Spacing } from '../../Spacing';
import { Button } from '../../Button';
import IconClose from '@/assets/icons/icon-close.svg';
import { useEffect, useState } from 'react';

interface TagItem {
  id: string;
  value: string;
}

interface EditModalProps {
  mode: 'create' | 'edit';
  draftContent?: string;
}

export default function EditModal({ mode, draftContent }: EditModalProps) {
  const [tags, setTags] = useState<TagItem[]>([{ id: generateId(), value: '' }]);
  const [content, setContent] = useState('');
  const [inputs, setInputs] = useState<string[]>([]);

  const { closeModal } = useModalStore();

  function generateId() {
    return Date.now().toString() + Math.random().toString(36).substring(2);
  }

  const handleTagConfirm = (id: string, value: string) => {
    setTags((prev) => {
      const newTags = prev.map((tag) => (tag.id === id ? { ...tag, value } : tag));
      const lastTag = newTags[newTags.length - 1];

      if (lastTag.id === id && value.trim() !== '') {
        newTags.push({ id: generateId(), value: '' });
      }

      return newTags;
    });
  };

  const handleTagRemove = (id: string) => {
    setTags((prev) => {
      const newTags = prev.filter((tag) => tag.id !== id);

      if (newTags.length === 0) {
        return [{ id: generateId(), value: '' }];
      }

      return newTags;
    });
  };

  const handleCancelEditBtn = () => {
    closeModal();
  };

  const tagErrCheck = () => false;

  useEffect(() => {
    if (mode === 'edit' && draftContent) {
      setContent(draftContent);
    }
  }, [mode, draftContent]);

  useEffect(() => {
    const matches = Array.from(content.matchAll(/{(.*?)}/g)).map((m) => m[1]);
    setInputs(matches);
  }, [content]);

  return (
    <section className="bg-layout-white flex h-[700px] w-[1204px] flex-col rounded-[10px] p-9">
      {/* 태그 */}
      <section className="flex justify-between">
        <div className="custom-scrollbar max-w-[760px] rotate-x-180 scroll-smooth">
          <div className="mb-3 flex w-max rotate-x-180 flex-nowrap gap-2">
            {tags.map((tag) => (
              <InputTag
                key={tag.id}
                initialValue={tag.value}
                onConfirm={(value) => handleTagConfirm(tag.id, value)}
                onRemove={() => handleTagRemove(tag.id)}
                tagErrCheck={tagErrCheck}
              />
            ))}
          </div>
        </div>
        <button onClick={closeModal}>
          <IconClose />
        </button>
      </section>

      {/* 타이틀 */}
      <Spacing size={12} />
      <input className="title-lg flex" placeholder="제목을 입력해 주세요." />
      <Spacing size={24} />
      <p className="text-primary-navy4 body-sm whitespace-pre">
        {`*중괄호를 사용해 이름, 날짜 등을 사용자가 채울 수 있는 빈칸을 만들 수 있어요!
    ex){이름} 님, {날짜}에 뵐 수 있을까요?`}
      </p>
      <Spacing size={24} />
      <textarea
        className="body-lg flex h-[287px]"
        placeholder="내용을 입력해 주세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Spacing size={24} />

      {inputs ? (
        <section className="flex h-11 gap-3">
          {inputs.map((item, idx) => (
            <div
              key={idx}
              className="body-lg text-layout-grey5 border-layout-grey5 flex rounded-md border px-3 py-[9px]"
            >
              {item}
            </div>
          ))}
        </section>
      ) : (
        <Spacing size={44}></Spacing>
      )}

      <Spacing size={24} />
      <section className="flex h-[80px] w-full items-end justify-end gap-3">
        <section className="button-sm mb-3 flex items-center gap-2">
          <input type="checkbox" className="border-primary-navy5 h-4 w-4 rounded-b-xs border" />
          나만 보기
        </section>
        {mode == 'edit' && (
          <Button state="line" onClick={handleCancelEditBtn}>
            수정 취소
          </Button>
        )}
        <Button>자동 빈칸 만들기</Button>
        <Button icon="dropdown">저장하기</Button>
      </section>
    </section>
  );
}
