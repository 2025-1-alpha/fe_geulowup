import PlusIcon from '@/assets/icons/icon-plus.svg';

export default function ArchiveCreateButton() {
  return (
    <button className="bg-primary-navy4 hover:bg-primary-navy5 flex h-[52px] w-[210px] items-center justify-center gap-2 rounded-[6px] text-white transition-colors">
      <PlusIcon className="h-5 w-5" />
      <span>새 템플릿 만들기</span>
    </button>
  );
}
