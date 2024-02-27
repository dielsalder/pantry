import { atom } from "jotai";
import { atomWithToggle } from "~/utils/atomWithToggle";

export const notesAtom = atom(true);
export const viewPrepAtom = atom(true);
export const viewFoodGroupsAtom = atomWithToggle(true);
