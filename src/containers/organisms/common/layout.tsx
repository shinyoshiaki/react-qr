import React, { Component } from "react";

import BottomBar from "../../../components/molecules/bottombar/index";

export default class LayoutOrg extends Component<{}, {}> {
  handleBottomBar = (v: number) => {};
  render() {
    return (
      <div>
        <div style={{ height: "95vh", width: "100vw", overflow: "hidden" }}>
          {this.props.children}
        </div>
        <div
          style={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            zIndex: 9999
          }}
        >
          <BottomBar handleChange={this.handleBottomBar} />
        </div>
      </div>
    );
  }
}
