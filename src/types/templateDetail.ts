export interface TemplateDetail {
  templateId: number;
  author: {
    id: number;
    name: string;
    score: number;
    profileImageUrl: string;
  };
  isAuthor: boolean;
  title: string;
  content: string;
  tags: string[];
  likeCount: number;
  isPrivate: boolean;
}
