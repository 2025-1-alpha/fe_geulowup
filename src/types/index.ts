export type TagType =
  | '인사말'
  | '자기소개'
  | '사과문'
  | '부탁글'
  | '감사글'
  | '제안글'
  | '공지글'
  | '소개글'
  | '후기작성'
  | '소셜글'
  | '고객응대'
  | '교수문의'
  | '조별활동'
  | '공모전'
  | '지원서'
  | '기타';

export type TemplateType = {
  title: string;
  description: string;
  tags: string[];
  likes: number;
  content?: string;
};
