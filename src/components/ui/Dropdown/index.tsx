import { useEffect, useState } from 'react';
import { getFolders, Folder } from '@/services/folders/getFolders';
import { Button } from '../Button';

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

  useEffect(() => {
    const fetchFolders = async () => {
      const res = await getFolders();
      if (res) {
        setFolders(res.folders);
      }
    };

    fetchFolders();
  }, []);

  return (
    <section className="bg-layout-grey2 h-max-[180px] z-30 flex w-[210px] flex-col rounded-md p-4">
      <section className="flex flex-col items-start gap-1">
        {folders.map((folder) => (
          <button
            key={folder.folderId}
            className={`button-md ${folder.folderId === savedFolderId ? 'text-layout-grey7' : 'text-layout-grey5'}`}
          >
            {folder.name}
          </button>
        ))}
      </section>

      <section className="flex w-full justify-end">
        <Button size="xsmall">저장하기</Button>
      </section>
    </section>
  );
}
