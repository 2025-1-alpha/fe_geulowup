import { useEffect, useState } from 'react';
import { getFolders, Folder } from '@/services/folders/getFolders';
import { useSaveTemplate } from '@/hooks/template/useTemplateSave';
import { Button } from '../Button';
import Toast from '../Toast';

export default function Dropdown({
  templateId,
  savedFolderId,
  content,
}: {
  templateId: number;
  savedFolderId?: number;
  content?: string;
}) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<number>(savedFolderId || 1);
  const [toastVisible, setToastVisible] = useState(false);

  const { mutate: saveTemplate } = useSaveTemplate();

  const handleFolderClick = (folderId: number) => {
    setSelectedFolderId(folderId);
  };

  useEffect(() => {
    const fetchFolders = async () => {
      const res = await getFolders();
      if (res) {
        setFolders(res.folders);
      }
    };

    fetchFolders();
  }, []);

  const handleSaveBtn = () => {
    if (selectedFolderId !== undefined) {
      saveTemplate(
        {
          templateId: templateId,
          payload: {
            folderId: selectedFolderId,
            content: content,
          },
        },
        {
          onSuccess: () => {
            setToastVisible(true);
          },
          onError: (error) => {
            console.error('템플릿 수정 실패:', error);
          },
        },
      );
    }
  };

  return (
    <section className="bg-layout-grey2 z-30 flex max-h-[180px] w-[210px] flex-col gap-3 rounded-md p-4">
      <section className="flex max-h-[104px] flex-col items-start gap-1 overflow-y-auto">
        {folders.map((folder) => (
          <button
            key={folder.folderId}
            onClick={() => handleFolderClick(folder.folderId)}
            className={`button-md ${folder.folderId === selectedFolderId ? 'text-layout-grey7' : 'text-layout-grey5'}`}
          >
            {folder.name}
          </button>
        ))}
      </section>

      <section className="flex w-full justify-end">
        <Button size="xsmall" onClick={handleSaveBtn}>
          저장하기
        </Button>
        {toastVisible && <Toast message="저장되었습니다." onClose={() => setToastVisible(false)} />}
      </section>
    </section>
  );
}
