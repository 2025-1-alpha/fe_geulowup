// 사용자 선호도 설정
export interface UserPreferences {
  theme: 'light' | 'dark';
  fontSize: number;
  aiMode: boolean;
  autoSave: boolean;
  language: 'ko' | 'en';
}

// advice 페이지 상태
export interface AdviceState {
  lastDraftContent: string;
  selectedTemplateId?: number;
  aiModeEnabled: boolean;
  lastEditedAt: number;
}

// explore 페이지 상태
export interface ExploreState {
  selectedTags: string[];
  sortType: 'popular' | 'recent';
  viewMode: 'grid' | 'list';
  lastSearchQuery?: string;
}

// archive 페이지 상태
export interface ArchiveState {
  filterType: 'all' | 'liked' | 'created';
  sortOrder: 'newest' | 'oldest';
  selectedCategory?: string;
}

// 찜하기 데이터
export interface UserLikes {
  likedTemplates: number[];
  likedAt: Record<number, number>;
  syncedWithServer: boolean;
}

// 임시 저장 드래프트
export interface DraftItem {
  id: string;
  title?: string;
  content: string;
  tags: string[];
  createdAt: number;
  sourcePageId: 'advice' | 'archive' | 'explore';
}

export interface DraftStorage {
  drafts: DraftItem[];
  autoSaveEnabled: boolean;
}

// 세션 데이터
export interface SessionData {
  lastActiveAt: number;
  pageVisitCount: Record<string, number>;
  sessionId: string;
  deviceInfo?: string;
}
