import React, { useState } from 'react';
import SavedButton from '../SavedButton';
import SavedInput from '../SavedInput';
import WarningModal from '../Modal/WarningModal';
import IconTrash from '@/assets/icons/icon-trash.svg';

// 데이터 타입 정의
export interface Template {
  id: string;
  name: string;
  content: string;
}

export interface Folder {
  id: string;
  name: string;
  templates: Template[];
  subFolders?: Folder[];
  isExpanded?: boolean;
}

interface TemplateStorageProps {
  initialFolders?: Folder[];
}

const TemplateStorage: React.FC<TemplateStorageProps> = ({ initialFolders = [] }) => {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [isAddingTemplate, setIsAddingTemplate] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateContent, setNewTemplateContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    id: string;
    type: 'folder' | 'template';
    parentId?: string;
  } | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  // 폴더 토글 (확장/축소)
  const toggleFolder = (folderId: string) => {
    setFolders((prevFolders) => {
      const toggleFolderExpand = (folders: Folder[]): Folder[] => {
        return folders.map((folder) => {
          if (folder.id === folderId) {
            return { ...folder, isExpanded: !folder.isExpanded };
          }

          if (folder.subFolders) {
            return {
              ...folder,
              subFolders: toggleFolderExpand(folder.subFolders),
            };
          }

          return folder;
        });
      };

      return toggleFolderExpand(prevFolders);
    });

    // 선택된 폴더 업데이트 (폴더 추가 시 사용)
    setSelectedFolderId(folderId);
  };

  // 최상위 폴더 추가
  const addRootFolder = (folderName: string) => {
    const newFolder: Folder = {
      id: `folder-${Date.now()}`,
      name: folderName,
      templates: [],
      subFolders: [],
      isExpanded: false,
    };

    setFolders([...folders, newFolder]);
    setIsAddingFolder(false);
  };

  // 하위 폴더 추가
  const addSubFolder = (parentId: string, folderName: string) => {
    const newFolder: Folder = {
      id: `folder-${Date.now()}`,
      name: folderName,
      templates: [],
      subFolders: [],
      isExpanded: false,
    };

    setFolders((prevFolders) => {
      const addFolderToParent = (folders: Folder[]): Folder[] => {
        return folders.map((folder) => {
          if (folder.id === parentId) {
            return {
              ...folder,
              subFolders: [...(folder.subFolders || []), newFolder],
            };
          }

          if (folder.subFolders) {
            return {
              ...folder,
              subFolders: addFolderToParent(folder.subFolders),
            };
          }

          return folder;
        });
      };

      return addFolderToParent(prevFolders);
    });

    setIsAddingFolder(false);
  };

  // 템플릿 추가
  const addTemplate = (folderId: string) => {
    if (!newTemplateName.trim()) return;

    const newTemplate: Template = {
      id: `template-${Date.now()}`,
      name: newTemplateName,
      content: newTemplateContent || '템플릿 내용이 비어있습니다.',
    };

    setFolders((prevFolders) => {
      const addTemplateToFolder = (folders: Folder[]): Folder[] => {
        return folders.map((folder) => {
          if (folder.id === folderId) {
            return {
              ...folder,
              templates: [...folder.templates, newTemplate],
            };
          }

          if (folder.subFolders) {
            return {
              ...folder,
              subFolders: addTemplateToFolder(folder.subFolders),
            };
          }

          return folder;
        });
      };

      return addTemplateToFolder(prevFolders);
    });

    setNewTemplateName('');
    setNewTemplateContent('');
    setIsAddingTemplate(false);
  };

  // 폴더명 중복 체크 (최상위 폴더)
  const checkRootDuplicate = (folderName: string): boolean => {
    return folders.some((folder) => folder.name === folderName);
  };

  // 폴더명 중복 체크 (하위 폴더)
  const checkSubFolderDuplicate = (parentId: string, folderName: string): boolean => {
    const checkInFolder = (folders: Folder[]): boolean => {
      for (const folder of folders) {
        if (folder.id === parentId) {
          return (folder.subFolders || []).some((subFolder) => subFolder.name === folderName);
        }
        if (folder.subFolders) {
          const found = checkInFolder(folder.subFolders);
          if (found) return true;
        }
      }
      return false;
    };

    return checkInFolder(folders);
  };

  // 템플릿명 중복 체크
  const checkTemplateDuplicate = (folderId: string, templateName: string): boolean => {
    const checkInFolder = (folders: Folder[]): boolean => {
      for (const folder of folders) {
        if (folder.id === folderId) {
          return folder.templates.some((template) => template.name === templateName);
        }
        if (folder.subFolders) {
          const found = checkInFolder(folder.subFolders);
          if (found) return true;
        }
      }
      return false;
    };

    return checkInFolder(folders);
  };

  // 삭제 모달 열기
  const openDeleteModal = (id: string, type: 'folder' | 'template', parentId?: string) => {
    setItemToDelete({ id, type, parentId });
    setIsModalOpen(true);
  };

  // 아이템 삭제
  const deleteItem = () => {
    if (!itemToDelete) return;

    const { id, type, parentId } = itemToDelete;

    if (type === 'folder') {
      if (!parentId) {
        // 최상위 폴더 삭제
        setFolders(folders.filter((folder) => folder.id !== id));
      } else {
        // 하위 폴더 삭제
        setFolders((prevFolders) => {
          const removeFolderRecursive = (folders: Folder[]): Folder[] => {
            return folders.map((folder) => {
              if (folder.id === parentId) {
                return {
                  ...folder,
                  subFolders: (folder.subFolders || []).filter((sf) => sf.id !== id),
                };
              }

              if (folder.subFolders) {
                return {
                  ...folder,
                  subFolders: removeFolderRecursive(folder.subFolders),
                };
              }

              return folder;
            });
          };

          return removeFolderRecursive(prevFolders);
        });
      }
    } else if (type === 'template') {
      if (parentId) {
        // 템플릿 삭제
        setFolders((prevFolders) => {
          const removeTemplateRecursive = (folders: Folder[]): Folder[] => {
            return folders.map((folder) => {
              if (folder.id === parentId) {
                return {
                  ...folder,
                  templates: folder.templates.filter((template) => template.id !== id),
                };
              }

              if (folder.subFolders) {
                return {
                  ...folder,
                  subFolders: removeTemplateRecursive(folder.subFolders),
                };
              }

              return folder;
            });
          };

          return removeTemplateRecursive(prevFolders);
        });
      }
    }

    setIsModalOpen(false);
    setItemToDelete(null);
  };

  // 재귀적으로 폴더 렌더링
  const renderFolder = (folder: Folder, depth: number = 0) => {
    const paddingLeft = depth * 16;

    return (
      <div key={folder.id} className="mb-1">
        <SavedButton
          variant="custom"
          text={folder.name}
          onClick={() => toggleFolder(folder.id)}
          onDelete={() => openDeleteModal(folder.id, 'folder', depth > 0 ? folder.id : undefined)}
        />

        {folder.isExpanded && (
          <div style={{ paddingLeft: `${paddingLeft + 16}px` }} className="mt-1">
            {/* 하위 폴더 */}
            {folder.subFolders && folder.subFolders.length > 0 && (
              <div className="mb-2">
                {folder.subFolders.map((subFolder) => renderFolder(subFolder, depth + 1))}
              </div>
            )}

            {/* 템플릿 목록 */}
            {folder.templates.map((template) => (
              <div
                key={template.id}
                className="mb-2 flex items-center justify-between rounded-[3px] bg-white p-2"
                style={{
                  color: 'layout color/grey6',
                  fontFamily: 'Pretendard',
                  fontSize: '14px',
                  width: '280px',
                }}
              >
                <div className="truncate">{template.name}</div>
                <button
                  className="flex-shrink-0 text-red-500 hover:text-red-700"
                  onClick={() => openDeleteModal(template.id, 'template', folder.id)}
                >
                  <IconTrash width={16} height={16} />
                </button>
              </div>
            ))}

            {/* 폴더 내 폴더 추가 UI */}
            {selectedFolderId === folder.id && isAddingFolder && (
              <div className="my-2">
                <SavedInput
                  onAdd={(name) => addSubFolder(folder.id, name)}
                  onCancel={() => setIsAddingFolder(false)}
                  checkDuplicate={(name) => checkSubFolderDuplicate(folder.id, name)}
                />
              </div>
            )}

            {/* 템플릿 추가 UI */}
            {selectedFolderId === folder.id && isAddingTemplate && (
              <div className="mt-2 rounded-md bg-white p-3" style={{ width: '280px' }}>
                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="템플릿 이름"
                    value={newTemplateName}
                    onChange={(e) => setNewTemplateName(e.target.value)}
                    className="w-full rounded border p-2"
                  />
                </div>
                <div className="mb-2">
                  <textarea
                    placeholder="템플릿 내용"
                    value={newTemplateContent}
                    onChange={(e) => setNewTemplateContent(e.target.value)}
                    className="h-20 w-full rounded border p-2"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    className="rounded bg-gray-200 px-3 py-1"
                    onClick={() => setIsAddingTemplate(false)}
                  >
                    취소
                  </button>
                  <button
                    className="rounded bg-blue-500 px-3 py-1 text-white"
                    onClick={() => addTemplate(folder.id)}
                    disabled={
                      !newTemplateName.trim() || checkTemplateDuplicate(folder.id, newTemplateName)
                    }
                  >
                    추가
                  </button>
                </div>
              </div>
            )}

            {/* 폴더 내 추가 버튼 */}
            {!isAddingFolder && !isAddingTemplate && (
              <div className="mt-2 flex space-x-2" style={{ width: '280px' }}>
                <button
                  className="flex-1 rounded-md px-4 py-2 text-left text-sm text-blue-500 hover:bg-gray-100"
                  onClick={() => {
                    setSelectedFolderId(folder.id);
                    setIsAddingFolder(true);
                    setIsAddingTemplate(false);
                  }}
                >
                  폴더 만들기
                </button>
                <button
                  className="flex-1 rounded-md px-4 py-2 text-left text-sm text-green-600 hover:bg-gray-100"
                  onClick={() => {
                    setSelectedFolderId(folder.id);
                    setIsAddingTemplate(true);
                    setIsAddingFolder(false);
                  }}
                >
                  템플릿 추가
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-[600px] w-[312px] flex-col overflow-hidden border border-gray-200 bg-[#f5f5f5]">
      {/* 보관함 헤더 */}
      <div className="border-b border-gray-200 px-4 py-2 font-bold">보관함</div>

      {/* 폴더 트리 */}
      <div className="flex-1 overflow-y-auto p-2">
        {folders.map((folder) => renderFolder(folder))}

        {/* 최상위 폴더 추가 */}
        {isAddingFolder && selectedFolderId === null && (
          <div className="mt-2">
            <SavedInput
              onAdd={addRootFolder}
              onCancel={() => setIsAddingFolder(false)}
              checkDuplicate={checkRootDuplicate}
            />
          </div>
        )}
      </div>

      {/* 최상위 폴더 추가 버튼 */}
      <div className="border-t border-gray-200 p-2">
        {!isAddingFolder && (
          <button
            className="w-full rounded-md px-4 py-2 text-left text-blue-500 hover:bg-gray-100"
            onClick={() => {
              setSelectedFolderId(null);
              setIsAddingFolder(true);
            }}
          >
            폴더 만들기
          </button>
        )}
      </div>

      {/* 삭제 모달 */}
      <WarningModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={deleteItem}
      />
    </div>
  );
};

export default TemplateStorage;
