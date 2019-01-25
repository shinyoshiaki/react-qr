import * as React from "react";

import { storiesOf } from "@storybook/react";

import Component from ".";

storiesOf("molecules", module).add("bottombar", () => (
  <Component tabs={{ main: () => <div>main</div> }} />
));
