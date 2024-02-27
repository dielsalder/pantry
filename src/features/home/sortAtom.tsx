import {
  IconApple,
  IconClock,
  IconFishBone,
  IconSortAZ,
  IconTags,
  IconToolsKitchen,
} from "@tabler/icons-react";
import { atom } from "jotai";
import { type ApiIconProps } from "~/components/ApiIcon";
import { type Sort } from "~/server/api/routers/sort";

export const sortAtom = atom<Sort>("perishable");
export function SortIcon({ type, ...props }: ApiIconProps<Sort>) {
  if (type === "foodGroup") {
    return <IconTags {...props} />;
  } else if (type === "prep") {
    return <IconToolsKitchen {...props} />;
  } else if (type === "name") {
    return <IconSortAZ {...props} />;
  } else if (type === "oldestFirst") {
    return <IconFishBone {...props} />;
  } else if (type === "newestFirst") {
    return <IconApple {...props} />;
  } else if (type === "perishable") {
    return <IconClock {...props} />;
  }
}

const sortNames = {
  foodGroup: "Food group",
  name: "Name",
  oldestFirst: "Oldest first",
  newestFirst: "Newest first",
  perishable: "Perishable first",
  prep: "Prep",
};
export function SortName({ sort }: { sort: Sort }) {
  return sortNames[sort];
}
