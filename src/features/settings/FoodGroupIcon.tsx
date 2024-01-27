import { $Enums, type FoodGroupIconType as IconType } from "@prisma/client";
import { type ApiIconProps } from "../../components/ApiIcon";
import {
  IconApple,
  IconBottle,
  IconBread,
  IconCarrot,
  IconCheese,
  IconEgg,
  IconMeat,
  IconSoup,
} from "@tabler/icons-react";

export const foodGroupIcons = Object.keys(
  $Enums.FoodGroupIconType,
) as IconType[];
const icons = {
  Bread: IconBread,
  Carrot: IconCarrot,
  Cheese: IconCheese,
  Egg: IconEgg,
  Meat: IconMeat,
  Apple: IconApple,
  Soup: IconSoup,
  Bottle: IconBottle,
};
export function FoodGroupIcon({ type, ...props }: ApiIconProps<IconType>) {
  const IconComponent = icons[type];
  const icon = <IconComponent {...props} />;
  return icon;
}
