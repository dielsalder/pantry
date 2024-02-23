import { atom } from "jotai";

export const selectedFoodGroupsAtom = atom<string[]>([]);

export const prepAtom = atom<string[]>([]);

export const perishableAtom = atom(false);
