'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/stores/useModalStore';
import { useTemplateStore } from '@/stores/useTemplateStore';
import { useAuth } from '@/hooks/useAuth';
import { getTemplateDetail, TemplateDetail } from '@/services/template/getTemplateDetail';
import { useDeleteTemplate } from '@/hooks/template/useTemplateDeletes';
import { useTemplateUse } from '@/hooks/template/useTemplateUse';
import { useLikePost } from '@/hooks/template/useTemplateLikes';
import { Spacing } from '../../Spacing';
import { Button } from '../../Button';
import ArchiveModalWarning from '@/app/(layout)/archive/_components/ArchiveModalWarning';
import IconGlowScore from '@/assets/icons/icon-glow-score.svg';
import IconClose from '@/assets/icons/icon-close.svg';
import IconLike from '@/assets/icons/icon-like.svg';
import IconCopy from '@/assets/icons/icon-copy.svg';
import IconTrash from '@/assets/icons/icon-trash.svg';
import IconEraser from '@/assets/icons/icon-eraser.svg';
import Dropdown from '../../Dropdown';
import Toast from '../../Toast';

export default function ViewModal() {
  const router = useRouter();

  const { mutate: templateDelete } = useDeleteTemplate();
  const { mutate: templateUse } = useTemplateUse();
  const { mutate: templateLike } = useLikePost();

  const { selectedTemplateId, openModal, closeModal } = useModalStore();
  const { setCurrentTemplate } = useTemplateStore();
  const [template, setTemplate] = useState<TemplateDetail | null>(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState<number>();
  const [folderId, setFolderId] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const inputs = Array.from(template?.content?.matchAll(/{(.*?)}/g) ?? []).map((m) => m[1]);

  useEffect(() => {
    if (!selectedTemplateId) return;

    const fetchTemplate = async () => {
      try {
        const data = await getTemplateDetail(selectedTemplateId);
        setTemplate(data);
        setFolderId(data?.savedFolder?.folderId ?? 0);
        setLikeCount(data?.likeCount ?? 0);
        setHasLiked(data?.hasLiked ?? false);
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

  const handleCilckUse = () => {
    closeModal();
    openModal('using', {
      templateId: template.templateId,
      draftTitle: template.title,
      draftContent: template.content,
      draftTags: template.tags,
    });
  };

  const handleClickEdit = (template: TemplateDetail) => {
    closeModal();
    openModal('edit', {
      templateId: template.templateId,
      draftTitle: template.title,
      draftContent: template.content,
      draftTags: template.tags,
    });
  };

  const handleDeleteConfirm = () => {
    templateDelete(template.templateId);
    window.location.reload();
  };

  const handleClickDelete = () => {
    setDeleteModalOpen(true);
  };

  const handleClickAiUse = () => {
    templateUse(template.templateId);
    setCurrentTemplate({ templateId: template.templateId, content: template.content });
    closeModal();
    router.push('/advice');
  };

  const handleDropdown = () => {
    if (requireAuth()) {
      setDropdown((prev) => !prev);
    }
  };

  const handleCopyClipBoard = (text: string) => {
    const $textarea = document.createElement('textarea');
    document.body.appendChild($textarea);
    $textarea.value = text;
    $textarea.select();
    document.body.removeChild($textarea);
    triggerToast('복사되었습니다.');
  };

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const handleAuthor = () => {
    if (requireAuth()) {
      closeModal();
      openModal('profile', {
        templateId: template.templateId,
      });
    }
  };

  const handleClickLike = () => {
    // TODO : 리팩토링 시 debounce 넣기기
    templateLike(template.templateId);

    if (!hasLiked) {
      setLikeCount((likeCount as number) + 1);
    } else {
      setLikeCount((likeCount as number) - 1);
    }

    setHasLiked((prev) => (!prev))
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
        <button onClick={closeModal}>
          <IconClose />
        </button>
      </section>

      {/* 타이틀 */}
      <Spacing size={12} />
      <div className="title-lg">{template.title}</div>
      <Spacing size={24} />
      {/*  타이틀 원래 48px인데 디자인 시스템에 없어서 36px -> min-h 12만큼 늘림 */}
      <div className={clsx('body-lg', template.isAuthor ? 'h-[312px]' : 'h-[339px]')}>
        {template.content}
      </div>
      <Spacing size={24} />
      <section className="flex h-11 gap-3">
        {inputs.map((item, idx) => (
          <button
            key={idx}
            onClick={handleCilckUse}
            className="body-lg text-layout-grey5 border-layout-grey5 flex rounded-md border px-3 py-[9px]"
          >
            {item}
          </button>
        ))}
      </section>

      <Spacing size={24} />
      <section className="body-lg text-layout-grey5 flex h-[28px] items-center justify-end gap-4">
        {template?.isAuthor && (
          <>
            <button onClick={handleClickDelete} className="flex items-center gap-1">
              <IconTrash />
              삭제하기
            </button>
            |
            <button onClick={() => handleClickEdit(template)} className="flex items-center gap-1">
              <IconEraser />
              수정하기
            </button>
            |
          </>
        )}
        <button
          onClick={() => handleCopyClipBoard(template.content)}
          className="flex items-center gap-1"
        >
          <IconCopy className="scale-75" />
          복사하기
        </button>
      </section>

      <section className="flex h-[80px] w-full items-end justify-between">
        {/* 작성자 정보 */}
        <section className="flex items-center gap-3">
          <button onClick={handleAuthor}>
            <Image
              src={
                template.author.profileImageUrl ||
                'https://github.com/user-attachments/assets/9c948b08-a78b-44cb-b572-f2a934b70c45'
              }
              alt="작성자 프로필"
              width={80}
              height={80}
              className="rounded-sm"
            />
          </button>

          <section className="flex gap-6">
            <button
              onClick={handleAuthor}
              className="flex flex-col items-center justify-center gap-[18px]"
            >
              <div className="title-sm flex">{template.author.name}</div>
              <div className="body-lg flex gap-1">
                <IconGlowScore />
                {template.author.score}
              </div>
            </button>

            <div className="border-layout-grey5 flex h-16 w-0 border" />

            <div className="flex flex-col items-center justify-center gap-3">
              <div className="title-sm flex">추천수</div>
              <button className="body-lg flex gap-1" onClick={handleClickLike}>
                <IconLike />
                {likeCount}
              </button>
            </div>
          </section>
        </section>
        <section className="flex items-end gap-3">
          <div className="flex flex-col gap-2">
            {dropdown && <Dropdown templateId={selectedTemplateId ?? 0} savedFolderId={folderId} />}
            <Button icon="dropdown" state="line" onClick={handleDropdown}>
              저장하기
            </Button>
          </div>
          <Button onClick={handleCilckUse}>사용하기</Button>
          <Button onClick={handleClickAiUse}>AI로 한 번 더 수정하기</Button>
        </section>
        {toastVisible && <Toast message={toastMessage} onClose={() => setToastVisible(false)} />}
      </section>
      <ArchiveModalWarning
        isOpen={deleteModalOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setDeleteModalOpen(false);
        }}
      />
    </section>
  );
}
