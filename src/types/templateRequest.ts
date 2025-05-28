export interface TemplateRequest {
  templateId?: number;
  title: string;
  content: string;
  tags: string[];
  isPrivate: boolean;
}
