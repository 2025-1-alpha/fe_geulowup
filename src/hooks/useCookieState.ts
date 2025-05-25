import { useState, useEffect, useCallback } from 'react';
import {
  userPrefsHelper,
  likesHelper,
  adviceStateHelper,
  exploreStateHelper,
  draftHelper,
  sessionHelper,
} from '@/utils/cookieHelpers';
import type {
  UserPreferences,
  AdviceState,
  ExploreState,
  UserLikes,
  DraftStorage,
  DraftItem,
} from '@/types/cookieTypes';

// 사용자 선호도 관리 훅
export function useUserPreferences() {
  const [prefs, setPrefs] = useState<UserPreferences | null>(null);

  useEffect(() => {
    setPrefs(userPrefsHelper.get());
  }, []);

  const updatePrefs = useCallback((updates: Partial<UserPreferences>) => {
    userPrefsHelper.update(updates);
    setPrefs(userPrefsHelper.get());
  }, []);

  const clearPrefs = useCallback(() => {
    userPrefsHelper.clear();
    setPrefs(null);
  }, []);

  return { prefs, updatePrefs, clearPrefs };
}

// 찜하기 관리 훅
export function useLikes() {
  const [likes, setLikes] = useState<UserLikes>({
    likedTemplates: [],
    likedAt: {},
    syncedWithServer: false,
  });

  useEffect(() => {
    setLikes(likesHelper.get());

    // 1초마다 쿠키 변경 확인 (다른 탭에서 변경된 경우)
    const interval = setInterval(() => {
      const currentLikes = likesHelper.get();
      setLikes(currentLikes);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleLike = useCallback((templateId: number) => {
    if (likesHelper.isLiked(templateId)) {
      likesHelper.remove(templateId);
    } else {
      likesHelper.add(templateId);
    }
    setLikes(likesHelper.get());
  }, []);

  const clearLikes = useCallback(() => {
    likesHelper.clear();
    setLikes({ likedTemplates: [], likedAt: {}, syncedWithServer: false });
  }, []);

  return {
    likes: likes.likedTemplates,
    likedAt: likes.likedAt,
    toggleLike,
    isLiked: likesHelper.isLiked,
    clearLikes,
  };
}

// advice 페이지 상태 관리 훅
export function useAdviceState() {
  const [state, setState] = useState<AdviceState | null>(null);

  useEffect(() => {
    setState(adviceStateHelper.get());
  }, []);

  const updateState = useCallback((updates: Partial<AdviceState>) => {
    adviceStateHelper.update(updates);
    setState(adviceStateHelper.get());
  }, []);

  const clearState = useCallback(() => {
    adviceStateHelper.clear();
    setState(null);
  }, []);

  return { state, updateState, clearState };
}

// explore 페이지 상태 관리 훅
export function useExploreState() {
  const [state, setState] = useState<ExploreState | null>(null);

  useEffect(() => {
    setState(exploreStateHelper.get());
  }, []);

  const updateState = useCallback((updates: Partial<ExploreState>) => {
    exploreStateHelper.update(updates);
    setState(exploreStateHelper.get());
  }, []);

  const clearState = useCallback(() => {
    exploreStateHelper.clear();
    setState(null);
  }, []);

  return { state, updateState, clearState };
}

// 드래프트 관리 훅
export function useDrafts() {
  const [drafts, setDrafts] = useState<DraftStorage>({ drafts: [], autoSaveEnabled: true });

  useEffect(() => {
    setDrafts(draftHelper.get());
  }, []);

  const addDraft = useCallback((draft: Omit<DraftItem, 'id' | 'createdAt'>) => {
    const draftId = draftHelper.add(draft);
    setDrafts(draftHelper.get());
    return draftId;
  }, []);

  const removeDraft = useCallback((draftId: string) => {
    draftHelper.remove(draftId);
    setDrafts(draftHelper.get());
  }, []);

  const clearDrafts = useCallback(() => {
    draftHelper.clear();
    setDrafts({ drafts: [], autoSaveEnabled: true });
  }, []);

  return {
    drafts: drafts.drafts,
    autoSaveEnabled: drafts.autoSaveEnabled,
    addDraft,
    removeDraft,
    clearDrafts,
  };
}

// 세션 관리 훅
export function useSession() {
  const [sessionData, setSessionData] = useState(sessionHelper.get());

  useEffect(() => {
    // 세션이 없으면 초기화
    if (!sessionData) {
      const newSession = sessionHelper.init();
      setSessionData(newSession);
    }

    // 페이지 활동 업데이트
    sessionHelper.updateActivity();
  }, [sessionData]);

  const visitPage = useCallback((pageName: string) => {
    sessionHelper.visitPage(pageName);
    setSessionData(sessionHelper.get());
  }, []);

  const clearSession = useCallback(() => {
    sessionHelper.clear();
    setSessionData(null);
  }, []);

  return { sessionData, visitPage, clearSession };
}
