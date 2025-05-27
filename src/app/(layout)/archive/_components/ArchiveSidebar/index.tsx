'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ArchiveFolderStatus from '../ArchiveFolderStatus';
import ArchiveFolderInput from '../ArchiveFolderInput';
import ArchiveModalWarning from '../ArchiveModalWarning';

interface ArchiveSidebarProps {
  selectedFolderId: string;
  onFolderSelect: (folderId: string) => void;
}

export default function ArchiveSidebar({ selectedFolderId, onFolderSelect }: ArchiveSidebarProps) {
  const router = useRouter();
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState<string | null>(null);

  // 테스트용 더미 데이터
  const [folders, setFolders] = useState([
    { id: '1', name: '찜한 템플릿', templateCount: 32 },
    { id: '2', name: '최근 사용한 템플릿', templateCount: 5 },
    { id: '3', name: '사용자 폴더1', templateCount: 8 },
    { id: '4', name: '사용자 폴더2', templateCount: 3 },
  ]);

  const handleFolderClick = (folderId: string) => {
    onFolderSelect(folderId);
    console.log('폴더 선택:', folderId);
  };

  const handleFolderDoubleClick = (folderId: string) => {
    console.log('폴더 더블클릭:', folderId);
  };

  const handleCreateFolderClick = () => {
    setIsCreatingFolder(true);
  };

  const handleFolderSave = (folderName: string) => {
    console.log('폴더 저장:', folderName);
    // 새 폴더를 목록에 추가
    const newFolder = {
      id: Date.now().toString(),
      name: folderName,
      templateCount: 0,
    };
    setFolders((prev) => [...prev, newFolder]);
    setIsCreatingFolder(false);
  };

  const handleFolderCancel = () => {
    console.log('폴더 생성 취소');
    setIsCreatingFolder(false);
  };

  const handleExploreClick = () => {
    router.push('/explore');
  };

  const handleDeleteClick = (folderId: string) => {
    setFolderToDelete(folderId);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (folderToDelete) {
      setFolders((prev) => prev.filter((folder) => folder.id !== folderToDelete));
      console.log('폴더 삭제:', folderToDelete);
      // 삭제된 폴더가 현재 선택된 폴더라면 기본 폴더로 변경
      if (selectedFolderId === folderToDelete) {
        onFolderSelect('1'); // 찜한 템플릿으로 변경
      }
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
        {/* 기존 폴더들 */}
        {folders.map((folder) => (
          <ArchiveFolderStatus
            key={folder.id}
            folderId={folder.id}
            folderName={folder.name}
            isSelected={selectedFolderId === folder.id}
            isDeletable={folder.id !== '1' && folder.id !== '2'} // 찜한 템플릿, 최근 사용한 템플릿 제외
            onClick={handleFolderClick}
            onDoubleClick={handleFolderDoubleClick}
            onDelete={handleDeleteClick}
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
