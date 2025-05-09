import Image from 'next/image';
import clsx from 'clsx';
import { Spacing } from '../Spacing';
import { Button } from '../Button';
import IconGlowScore from '@/assets/icons/icon-glow-score.svg';
import IconClose from '@/assets/icons/icon-close.svg';
import IconLike from '@/assets/icons/icon-like.svg';

export default function ViewModal() {
  const template = {
    templateId: 1001,
    author: {
      id: 42,
      name: '홍길동',
      score: 85,
      profileImageUrl: 'https://avatars.githubusercontent.com/u/66528589?v=4',
    },
    isAuthor: true,
    title: '면접에서 어필하기 좋은 자기소개',
    content:
      '안녕하세요. 저는 {이름} 입니다. {장소}는 여기... 책임감 있게 팀 프로젝트를 수행해 온... 안녕하세요 잘부탁드립니다 더미텍스트..안녕하세요 잘부탁드립니다 더미텍스트..안녕하세요 잘부탁드립니다 더미텍스트..안녕하세요 잘부탁드립니다 더미텍스트..안녕하세요 잘부탁드립니다 더미텍스트..안녕하세요 잘부탁드립니다 더미텍스트..안녕하세요 잘부탁드립니다 더미텍스트..안녕하세요 잘부탁드립니다 더미텍스트..안녕하세요 잘부탁드립니다 더미텍스트..안녕하세요 잘부탁드립니다 더미텍스트..',
    tags: ['자기소개', '테스트 태그'],
    likeCount: 27,
    isPrivate: false,
  };

  const inputs = Array.from(template?.content.matchAll(/{(.*?)}/g)).map((m) => m[1]);

  const handleCilckUse = () => {};

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
        <button>
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
            className="body-lg text-layout-grey5 border-layout-grey5 flex rounded-md border px-3 py-[9px]"
          >
            {item}
          </button>
        ))}
      </section>

      <Spacing size={24} />
      {template?.isAuthor && (
        <section className="body-lg text-layout-grey5 flex h-[28px] items-center justify-end gap-4">
          <button>삭제하기</button>|<button>수정하기</button>
        </section>
      )}

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
        <section className="flex gap-3">
          {/* TODO : API 연결 전에 저장하기 버튼 눌렀을 때 디자인 요청하기 */}
          <Button state="line" icon="dropdown">
            저장하기
          </Button>
          <Button>사용하기</Button>
          <Button>AI로 한 번 더 수정하기</Button>
        </section>
      </section>
    </section>
  );
}
