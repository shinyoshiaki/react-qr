import React, { Component } from "react";
import QrReader from "react-qr-reader";
import QRCode from "qrcode.react";
import LayoutOrg from "./containers/organisms/common/layout";
import { getLocalVideo } from "webrtc4me/lib/utill";
import WebRTC from "webrtc4me";
import MeasureWrap from "./components/molecules/measure/index";

export default class Test extends Component<
  {},
  { stream?: MediaStream; qr: string; result?: string }
> {
  peer: WebRTC;
  constructor(props: any) {
    super(props);
    this.peer = new WebRTC();
    this.peer.makeOffer();
    this.peer.signal = sdp => {
      this.setState({ qr: JSON.stringify(sdp) });
    };
    this.state = { qr: "" };
  }

  async init() {
    const stream = await getLocalVideo();
    this.setState({ stream });
  }

  handleScan = (data: any) => {
    if (data) {
      this.setState({ result: data });
    }
  };
  handleError = (err: any) => {
    console.error(err);
  };
  render() {
    return (
      <LayoutOrg>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          {!this.state.result && (
            <div style={{ height: "40vh" }}>
              <QrReader
                delay={300}
                onError={this.handleError}
                onScan={this.handleScan}
                style={{ width: "40vh" }}
              />
            </div>
          )}
          <br />

          <div style={{ height: "45vh" }}>
            <MeasureWrap
              target={(_, b) => {
                return <QRCode value={this.state.qr} size={b} />;
              }}
            />
          </div>

          <p>{this.state.result}</p>
        </div>
      </LayoutOrg>
    );
  }
}
