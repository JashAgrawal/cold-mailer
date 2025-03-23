import { ISender } from '@/components/sender/type';
import { create } from 'zustand';

interface SenderStore {
  selectedSender: ISender | null;
  setSelectedSender: (sender: ISender) => void;
  clearSelectedSender: () => void;
}

export const useSenderStore = create<SenderStore>((set) => ({
  selectedSender: null,
  setSelectedSender: (sender) => set({ selectedSender: sender }),
  clearSelectedSender: () => set({ selectedSender: null }),
}));
