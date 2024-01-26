import { type FoodGroupIcon as IconType } from "@prisma/client";
import { type ApiIconProps } from "./ApiIcon";
import {
  IconApple,
  IconBread,
  IconCarrot,
  IconCheese,
  IconEgg,
  IconMeat,
} from "@tabler/icons-react";

const icons = {
  Bread: IconBread,
  Carrot: IconCarrot,
  Cheese: IconCheese,
  Egg: IconEgg,
  Meat: IconMeat,
  Apple: IconApple,
};
export function FoodGroupIcon({ name, ...props }: ApiIconProps<IconType>) {
  const IconComponent = icons[name];
  const icon = <IconComponent {...props} />;
  return icon;
}
