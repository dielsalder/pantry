import type { Meta, StoryObj } from "@storybook/react";
import { Item } from "./Item";

const meta = {
  title: "Item",
  component: Item,
  parameters: {
    name: { type: "string" },
  },
} satisfies Meta<typeof Item>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { name: "Eggs", id: 1 } };
