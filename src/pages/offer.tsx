import React, { FunctionComponent, useState, useEffect } from "react";
import MeasureWrap from "../components/molecules/measure/index";
import QrReader from "react-qr-reader";
import QRCode from "qrcode.react";
import { getLocalVideo } from "webrtc4me/lib/utill";
import WebRTC from "webrtc4me";
import useObject from "useobject";

interface State {
  stream?: MediaStream;
  qr: string;
  result?: string;
}

const initialState: State = { qr: "" };
let peer: WebRTC;

const Offer: FunctionComponent = () => {
  const { state, setState } = useObject(initialState);
  const [qrShow, qrSwitch] = useState(false);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    setTimeout(() => {
      console.log({ state });
      qrSwitch(true);
    }, 500);
    const stream = await getLocalVideo();
    setState({ stream });
    peer = new WebRTC({});
    peer.makeOffer();
    peer.signal = sdp => {
      console.log({ sdp });
      setState({ qr: JSON.stringify({ sdp }) });
    };
    peer.connect = () => {
      console.log("connect");
      setState({ result: "connect" });
    };
  }

  const handleScan = (data: any) => {
    if (data) {
      setState({ result: data });
      const obj = JSON.parse(data);
      if (obj.sdp) {
        peer.setAnswer(obj.sdp);
      }
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      {qrShow && (
        <div style={{ height: "40vh" }}>
          <QrReader
            delay={300}
            onError={console.warn}
            onScan={handleScan}
            style={{ width: "40vh" }}
          />
        </div>
      )}
      <br />

      <div style={{ height: "40vh" }}>
        <MeasureWrap
          target={(_, b) => {
            return <QRCode value={state.qr} size={b} />;
          }}
        />
      </div>

      <p>{state.result}</p>
    </div>
  );
};

export default Offer;
