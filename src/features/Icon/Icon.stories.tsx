import type { Meta, StoryObj } from "@storybook/react";
import { Icon, availableIcons } from "./Icon";

const meta = {
  title: "Example/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: {},
  argTypes: {
    name: {
      options: Object.keys(availableIcons),
      control: "select",
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "bread",
  },
};
