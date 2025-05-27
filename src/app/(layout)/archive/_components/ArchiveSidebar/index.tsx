'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ArchiveFolderStatus from '../ArchiveFolderStatus';
import ArchiveFolderInput from '../ArchiveFolderInput';
import ArchiveModalWarning from '../ArchiveModalWarning';
import { useFolders } from '@/hooks/folder/useFolders';
import { useCreateFolder } from '@/hooks/folder/useCreateFolder';
import { useDeleteFolder } from '@/hooks/folder/useDeleteFolder';

interface ArchiveSidebarProps {
  selectedFolderId: string;
  onFolderSelect: (folderId: string) => void;
}

export default function ArchiveSidebar({ selectedFolderId, onFolderSelect }: ArchiveSidebarProps) {
  const router = useRouter();
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState<number | null>(null);

  // 폴더 목록 API 연동
  const { data: foldersData } = useFolders();
  const createFolderMutation = useCreateFolder();
  const deleteFolderMutation = useDeleteFolder();

  // 찜한 템플릿, 최근 사용한 템플릿은 고정
  const fixedFolders = [
    { id: 1, name: '찜한 템플릿' },
    { id: 2, name: '최근 사용한 템플릿' },
  ];

  // 폴더 목록 합치기
  const folders = [
    ...fixedFolders,
    ...(foldersData?.folders?.map((f) => ({ id: f.folderId, name: f.name })) || []),
  ];

  const handleFolderClick = (folderId: number) => {
    onFolderSelect(folderId.toString());
  };

  const handleFolderDoubleClick = (folderId: string) => {
    console.log('폴더 더블클릭:', folderId);
  };

  const handleCreateFolderClick = () => {
    setIsCreatingFolder(true);
  };

  const handleFolderSave = (folderName: string) => {
    createFolderMutation.mutate(
      { name: folderName },
      {
        onSuccess: () => setIsCreatingFolder(false),
      },
    );
  };

  const handleFolderCancel = () => {
    setIsCreatingFolder(false);
  };

  const handleExploreClick = () => {
    router.push('/explore');
  };

  const handleDeleteClick = (folderId: number) => {
    setFolderToDelete(folderId);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (folderToDelete) {
      deleteFolderMutation.mutate(folderToDelete, {
        onSuccess: () => {
          // 삭제된 폴더가 현재 선택된 폴더라면 기본 폴더로 변경
          if (selectedFolderId === folderToDelete.toString()) {
            onFolderSelect('1');
          }
        },
      });
    }
    setDeleteModalOpen(false);
    setFolderToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setFolderToDelete(null);
  };

  return (
    <div
      className="bg-layout-grey2 border-layout-grey3 flex flex-col rounded-[7px] border p-4"
      style={{ width: '312px', height: '640px' }}
    >
      <div className="flex-1">
        {/* 폴더 목록 */}
        {folders.map((folder) => (
          <ArchiveFolderStatus
            key={folder.id}
            folderId={folder.id.toString()}
            folderName={folder.name}
            isSelected={selectedFolderId === folder.id.toString()}
            isDeletable={folder.id !== 1 && folder.id !== 2}
            onClick={() => handleFolderClick(folder.id)}
            onDoubleClick={() => handleFolderDoubleClick(folder.id.toString())}
            onDelete={() => handleDeleteClick(folder.id)}
          />
        ))}

        {/* 폴더 생성 중일 때 입력 필드 */}
        {isCreatingFolder && (
          <ArchiveFolderInput
            mode="create"
            initialState="enabled"
            onSave={handleFolderSave}
            onCancel={handleFolderCancel}
          />
        )}

        {/* 폴더 만들기 버튼 (항상 마지막에 표시) */}
        {!isCreatingFolder && (
          <button
            className="button-md text-layout-grey4 hover:text-layout-grey6 hover:bg-layout-grey3 w-full rounded-lg px-4 py-3 text-left transition-all duration-200"
            onClick={handleCreateFolderClick}
            disabled={createFolderMutation.isPending}
          >
            + 폴더 만들기
          </button>
        )}
      </div>

      {/* 다른 템플릿 찾아보기 버튼 - 하단 고정 */}
      <div className="mb-6">
        <button
          className="button-lg text-primary-navy4 hover:text-primary-navy5 w-full rounded-lg px-4 py-3 text-left transition-all duration-200"
          onClick={handleExploreClick}
        >
          + 다른 템플릿 찾아보기
        </button>
      </div>

      {/* 삭제 확인 모달 */}
      <ArchiveModalWarning
        isOpen={deleteModalOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
}
