import { atom } from "jotai";

export const userAtom = atom<{
  email: string;
  user_id: number;
} | null>(null);
