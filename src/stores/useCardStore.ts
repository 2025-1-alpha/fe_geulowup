import { create } from 'zustand';

interface CardState {
  clickedCards: Record<string, boolean>;
  setCardClicked: (cardId: string, clicked: boolean) => void;
  clearCardClicked: (cardId: string) => void;
  clearAllCards: () => void;
}

export const useCardStore = create<CardState>((set) => ({
  clickedCards: {},
  setCardClicked: (cardId, clicked) =>
    set((state) => ({
      clickedCards: {
        ...state.clickedCards,
        [cardId]: clicked,
      },
    })),
  clearCardClicked: (cardId) =>
    set((state) => {
      const newClickedCards = { ...state.clickedCards };
      delete newClickedCards[cardId];
      return { clickedCards: newClickedCards };
    }),
  clearAllCards: () => set({ clickedCards: {} }),
}));
