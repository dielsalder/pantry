import React from "react";
import type { Preview } from "@storybook/react";
import { MantineProvider } from "@mantine/core";
import { theme } from "../src/theme";

import "@mantine/core/styles.css";
import "../src/styles/globals.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <MantineProvider theme={theme}>
        <Story />
      </MantineProvider>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
