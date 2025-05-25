import { COOKIE_KEYS } from '@/constants/cookieKeys';
import { getJSONCookie, setJSONCookie, removeCookie, COOKIE_DEFAULTS } from './cookieUtils';
import type {
  UserPreferences,
  AdviceState,
  ExploreState,
  UserLikes,
  DraftStorage,
  DraftItem,
  SessionData,
} from '@/types/cookieTypes';

// 사용자 선호도 관리
export const userPrefsHelper = {
  get: (): UserPreferences | null => getJSONCookie(COOKIE_KEYS.USER_PREFS),

  set: (prefs: UserPreferences) =>
    setJSONCookie(COOKIE_KEYS.USER_PREFS, prefs, {
      'max-age': COOKIE_DEFAULTS.MAX_AGE.ONE_MONTH,
      sameSite: COOKIE_DEFAULTS.SAME_SITE,
    }),

  update: (updates: Partial<UserPreferences>) => {
    const current = userPrefsHelper.get() || {
      theme: 'light',
      fontSize: 16,
      aiMode: true,
      autoSave: true,
      language: 'ko',
    };
    userPrefsHelper.set({ ...current, ...updates });
  },

  clear: () => removeCookie(COOKIE_KEYS.USER_PREFS),
};

// 찜하기 관리
export const likesHelper = {
  get: (): UserLikes =>
    getJSONCookie(COOKIE_KEYS.USER_LIKES) || {
      likedTemplates: [],
      likedAt: {},
      syncedWithServer: false,
    },

  add: (templateId: number) => {
    const likes = likesHelper.get();
    if (!likes.likedTemplates.includes(templateId)) {
      const updatedLikes = {
        ...likes,
        likedTemplates: [...likes.likedTemplates, templateId],
        likedAt: { ...likes.likedAt, [templateId]: Date.now() },
      };
      setJSONCookie(COOKIE_KEYS.USER_LIKES, updatedLikes, {
        'max-age': COOKIE_DEFAULTS.MAX_AGE.ONE_MONTH,
      });
    }
  },

  remove: (templateId: number) => {
    const likes = likesHelper.get();
    const updatedLikes = {
      ...likes,
      likedTemplates: likes.likedTemplates.filter((id) => id !== templateId),
      likedAt: Object.fromEntries(
        Object.entries(likes.likedAt).filter(([id]) => Number(id) !== templateId),
      ),
    };
    setJSONCookie(COOKIE_KEYS.USER_LIKES, updatedLikes, {
      'max-age': COOKIE_DEFAULTS.MAX_AGE.ONE_MONTH,
    });
  },

  isLiked: (templateId: number): boolean => {
    return likesHelper.get().likedTemplates.includes(templateId);
  },

  clear: () => removeCookie(COOKIE_KEYS.USER_LIKES),
};

// advice 페이지 상태 관리
export const adviceStateHelper = {
  get: (): AdviceState | null => getJSONCookie(COOKIE_KEYS.ADVICE_STATE),

  set: (state: AdviceState) =>
    setJSONCookie(COOKIE_KEYS.ADVICE_STATE, state, {
      'max-age': COOKIE_DEFAULTS.MAX_AGE.ONE_DAY,
      path: '/advice',
    }),

  update: (updates: Partial<AdviceState>) => {
    const current = adviceStateHelper.get();
    if (current) {
      adviceStateHelper.set({ ...current, ...updates });
    }
  },

  clear: () => removeCookie(COOKIE_KEYS.ADVICE_STATE),
};

// explore 페이지 상태 관리
export const exploreStateHelper = {
  get: (): ExploreState | null => getJSONCookie(COOKIE_KEYS.EXPLORE_STATE),

  set: (state: ExploreState) =>
    setJSONCookie(COOKIE_KEYS.EXPLORE_STATE, state, {
      'max-age': COOKIE_DEFAULTS.MAX_AGE.ONE_DAY,
      path: '/explore',
    }),

  update: (updates: Partial<ExploreState>) => {
    const current = exploreStateHelper.get() || {
      selectedTags: [],
      sortType: 'popular',
      viewMode: 'grid',
    };
    exploreStateHelper.set({ ...current, ...updates });
  },

  clear: () => removeCookie(COOKIE_KEYS.EXPLORE_STATE),
};

// 드래프트 관리
export const draftHelper = {
  get: (): DraftStorage =>
    getJSONCookie(COOKIE_KEYS.DRAFT_STORAGE) || {
      drafts: [],
      autoSaveEnabled: true,
    },

  add: (draft: Omit<DraftItem, 'id' | 'createdAt'>) => {
    const storage = draftHelper.get();
    const newDraft: DraftItem = {
      ...draft,
      id: `draft_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now(),
    };

    const updatedStorage = {
      ...storage,
      drafts: [newDraft, ...storage.drafts].slice(0, 10), // 최대 10개 유지
    };

    setJSONCookie(COOKIE_KEYS.DRAFT_STORAGE, updatedStorage, {
      'max-age': COOKIE_DEFAULTS.MAX_AGE.ONE_WEEK,
    });

    return newDraft.id;
  },

  remove: (draftId: string) => {
    const storage = draftHelper.get();
    const updatedStorage = {
      ...storage,
      drafts: storage.drafts.filter((draft) => draft.id !== draftId),
    };
    setJSONCookie(COOKIE_KEYS.DRAFT_STORAGE, updatedStorage);
  },

  clear: () => removeCookie(COOKIE_KEYS.DRAFT_STORAGE),
};

// 세션 데이터 관리
export const sessionHelper = {
  get: (): SessionData | null => getJSONCookie(COOKIE_KEYS.SESSION_DATA),

  init: () => {
    const sessionData: SessionData = {
      lastActiveAt: Date.now(),
      pageVisitCount: {},
      sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      deviceInfo: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    };

    setJSONCookie(COOKIE_KEYS.SESSION_DATA, sessionData, {
      'max-age': COOKIE_DEFAULTS.MAX_AGE.ONE_DAY,
    });

    return sessionData;
  },

  updateActivity: () => {
    const current = sessionHelper.get();
    if (current) {
      sessionHelper.set({
        ...current,
        lastActiveAt: Date.now(),
      });
    }
  },

  visitPage: (pageName: string) => {
    const current = sessionHelper.get() || sessionHelper.init();
    const updatedData = {
      ...current,
      pageVisitCount: {
        ...current.pageVisitCount,
        [pageName]: (current.pageVisitCount[pageName] || 0) + 1,
      },
      lastActiveAt: Date.now(),
    };
    sessionHelper.set(updatedData);
  },

  set: (data: SessionData) =>
    setJSONCookie(COOKIE_KEYS.SESSION_DATA, data, {
      'max-age': COOKIE_DEFAULTS.MAX_AGE.ONE_DAY,
    }),

  clear: () => removeCookie(COOKIE_KEYS.SESSION_DATA),
};
