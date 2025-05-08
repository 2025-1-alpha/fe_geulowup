import Image from 'next/image';
import { Spacing } from '../Spacing';
import { Button } from '../Button';

export default function ViewModal() {
  const template = {
    templateId: 1001,
    author: {
      id: 42,
      name: '홍길동',
      score: 85,
      profileImageUrl: 'https://example.com/images/profile.jpg',
    },
    isAuthor: true,
    title: '면접에서 어필하기 좋은 자기소개',
    content:
      '안녕하세요. 저는 책임감 있게 팀 프로젝트를 수행해 온... 안녕하세요 잘부탁드립니다 더미텍스트..안녕하세요 잘부탁드립니다 더미텍스트..안녕하세요 잘부탁드립니다 더미텍스트..안녕하세요 잘부탁드립니다 더미텍스트..안녕하세요 잘부탁드립니다 더미텍스트..안녕하세요 잘부탁드립니다 더미텍스트..안녕하세요 잘부탁드립니다 더미텍스트..안녕하세요 잘부탁드립니다 더미텍스트..안녕하세요 잘부탁드립니다 더미텍스트..안녕하세요 잘부탁드립니다 더미텍스트..',
    tags: ['자기소개', '테스트 태그'],
    likeCount: 27,
    isPrivate: false,
  };

  return (
    <section className="bg-layout-white flex h-[700px] w-[1204px] flex-col rounded-[10px] p-9">
      {/* 태그 */}
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

      {/* 타이틀 */}
      <Spacing size={12} />
      <div className="title-lg">{template.title}</div>
      <Spacing size={36} />
      {/* TODO : 타이틀 원래 48px인데 디자인 시스템에 없어서 36px -> min-h 12만큼 늘림 */}
      <div className="body-lg min-h-[312px]">{template.content}</div>
      <Spacing size={24} />
      {/* 태그 넣기  44 지우고 넣어야 함*/}
      <Spacing size={44} />
      <Spacing size={48} />
      <section className="flex h-[80px] w-full items-end justify-between">
        {/* 작성자 정보 */}
        <section className="flex">
          <Image src={template.author.profileImageUrl} alt="작성자 프로필" width={80} height={80} />
          테스트트트
        </section>
        <section className="flex gap-3">
          <Button>저장하기</Button>
          <Button>사용하기</Button>
          <Button>AI로 한 번 더 수정하기</Button>
        </section>
      </section>
    </section>
  );
}
