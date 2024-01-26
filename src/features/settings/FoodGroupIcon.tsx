import { $Enums, type FoodGroupIconType as IconType } from "@prisma/client";
import { type ApiIconProps } from "../../components/ApiIcon";
import {
  IconApple,
  IconBread,
  IconCarrot,
  IconCheese,
  IconEgg,
  IconMeat,
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
};
export function FoodGroupIcon({ type, ...props }: ApiIconProps<IconType>) {
  const IconComponent = icons[type];
  const icon = <IconComponent {...props} />;
  return icon;
}
