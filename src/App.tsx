import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import LayoutOrg from "./containers/organisms/common/layout";
import TabMol from "./components/molecules/tab/index";
import Offer from "./pages/offer";
import Answer from "./pages/answer";

const Connect: FunctionComponent = () => {
  return (
    <LayoutOrg>
      <TabMol
        tabs={{
          offer: () => <Offer />,
          answer: () => <Answer />
        }}
      />
    </LayoutOrg>
  );
};

export default Connect;
