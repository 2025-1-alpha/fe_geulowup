'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/stores/useModalStore';
import { useTemplateStore } from '@/stores/useTemplateStore';
import { useUnsaveModalStore } from '@/stores/useUnsaveModalStore';
import { getTemplateDetail, TemplateDetail } from '@/services/template/getTemplateDetail';
import { Spacing } from '../../Spacing';
import { Button } from '../../Button';
import IconGlowScore from '@/assets/icons/icon-glow-score.svg';
import IconClose from '@/assets/icons/icon-close.svg';
import IconLike from '@/assets/icons/icon-like.svg';
import IconCopy from '@/assets/icons/icon-copy.svg';
import Dropdown from '../../Dropdown';
import Toast from '../../Toast';

export default function UsingModal() {
  const router = useRouter();

  const { selectedTemplateId, closeModal } = useModalStore();
  const { openUnsaveModal } = useUnsaveModalStore();
  const [template, setTemplate] = useState<TemplateDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState('');
  const [folderId, setFolderId] = useState<number>();
  const [replacements, setReplacements] = useState<Record<string, string>>({});
  const [dropdown, setDropdown] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const { setCurrentTemplate } = useTemplateStore();

  const inputs = Array.from(template?.content?.matchAll(/{(.*?)}/g) ?? []).map((m) => m[1]);

  useEffect(() => {
    if (!selectedTemplateId) return;

    const fetchTemplate = async () => {
      try {
        const data = await getTemplateDetail(selectedTemplateId);
        setTemplate(data);
        setContent(data?.content ?? '');
        setFolderId(data?.savedFolder?.folderId ?? 0);
      } catch (err) {
        console.error('템플릿 상세 불러오기 실패:', err);
        closeModal();
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [selectedTemplateId]);

  if (loading || !template) return <div className="p-8 text-center">불러오는 중...</div>;

  const handleClickAiUse = () => {
    setCurrentTemplate({ templateId: template.templateId, content: template.content });
    closeModal();
    router.push('/advice');
  };

  const handleCopyClipBoard = (text: string) => {
    const $textarea = document.createElement('textarea');
    document.body.appendChild($textarea);
    $textarea.value = text;
    $textarea.select();
    document.body.removeChild($textarea);
    // TODO : 저장되었습니다와 동일하게 복사되었습니다 띄우기
  };

  const handleInputChange = (key: string, value: string) => {
    const newReplacements = { ...replacements, [key]: value };
    setReplacements(newReplacements);

    let replaced = template?.content ?? '';
    for (const [k, v] of Object.entries(newReplacements)) {
      const regex = new RegExp(`{${k}}`, 'g');
      replaced = replaced.replace(regex, v);
    }

    setContent(replaced);
  };

  const handleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  return (
    <section className="bg-layout-white flex h-[700px] w-[1204px] flex-col rounded-[10px] p-9">
      {/* 태그 */}
      <section className="flex justify-between">
        <section className="flex gap-2">
          {template.tags.map((tag) => {
            return (
              <section
                key={tag}
                className="button-md bg-primary-navy4 text-layout-white rounded-[5px] p-2"
              >
                {tag}
              </section>
            );
          })}
        </section>
        <button onClick={openUnsaveModal}>
          <IconClose />
        </button>
      </section>

      {/* 타이틀 */}
      <Spacing size={12} />
      <div className="title-lg">{template.title}</div>
      <Spacing size={24} />
      <textarea
        className="body-lg border-layout-grey3 flex h-[312px] rounded-lg border bg-white p-2"
        placeholder="내용을 입력해 주세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <Spacing size={24} />
      <section className="flex h-11 justify-between">
        <section className="flex gap-3">
          {inputs.map((item, idx) => (
            <input
              key={idx}
              placeholder={item}
              value={replacements[item] || ''}
              size={(replacements[item] || item).length || 1}
              onChange={(e) => handleInputChange(item, e.target.value)}
              className="body-lg text-layout-grey5 border-layout-grey5 flex rounded-md border px-3 py-[9px]"
            />
          ))}
        </section>
        <section className="button-lg text-layout-grey5 mr-3 flex h-[28px]">
          <button
            onClick={() => {
              handleCopyClipBoard(content);
              triggerToast('복사되었습니다.');
            }}
            className="flex items-center gap-1"
          >
            <IconCopy className="scale-75" />
            복사하기
          </button>
        </section>
      </section>

      <Spacing size={24} />

      <section className="flex h-[80px] w-full items-end justify-between">
        {/* 작성자 정보 */}
        <section className="flex items-center gap-3">
          <Image
            src={template.author.profileImageUrl}
            alt="작성자 프로필"
            width={80}
            height={80}
            className="rounded-sm"
          />

          <section className="flex gap-6">
            <div className="flex flex-col items-center justify-center gap-[18px]">
              <div className="title-sm flex">{template.author.name}</div>
              <div className="body-lg flex gap-1">
                <IconGlowScore />
                {template.author.score}
              </div>
            </div>

            <div className="border-layout-grey5 flex h-16 w-0 border" />

            <div className="flex flex-col items-center justify-center gap-3">
              <div className="title-sm flex">추천수</div>
              <div className="body-lg flex gap-1">
                <IconLike />
                {template.likeCount}
              </div>
            </div>
          </section>
        </section>
        <section className="flex items-end gap-3">
          <Button state="line" onClick={openUnsaveModal}>
            사용 취소
          </Button>
          <Button onClick={handleClickAiUse} state="line">
            AI로 한 번 더 수정하기
          </Button>
          <div className="flex flex-col gap-2">
            {dropdown && <Dropdown templateId={selectedTemplateId ?? 0} savedFolderId={folderId} />}
            <Button icon="dropdown" onClick={handleDropdown}>
              저장하기
            </Button>
          </div>
        </section>
        {toastVisible && <Toast message={toastMessage} onClose={() => setToastVisible(false)} />}
      </section>
    </section>
  );
}
