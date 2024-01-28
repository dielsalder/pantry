import {
  IconApple,
  IconCategory,
  IconFishBone,
  IconSortAZ,
} from "@tabler/icons-react";
import { atom } from "jotai";
import { type ApiIconProps } from "~/components/ApiIcon";
import { type Sort } from "~/server/api/routers/collection";

export const sortAtom = atom<Sort>("name");
export function SortIcon({ type, ...props }: ApiIconProps<Sort>) {
  if (type === "foodGroup") {
    return <IconCategory {...props} />;
  } else if (type === "name") {
    return <IconSortAZ {...props} />;
  } else if (type === "oldestFirst") {
    return <IconFishBone {...props} />;
  } else if (type === "newestFirst") return <IconApple {...props} />;
}
