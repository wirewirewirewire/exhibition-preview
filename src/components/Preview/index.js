import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

import { useDispatch, useSelector } from "react-redux";
import devices from "ducks/devices";

const Preview = (props) => {
  const { match } = props;
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    dispatch(devices.actions.fetchSingle({ postId: match.params.id }));
  }, []);

  useEffect(() => {
    const resizeListener = () => {
      // change width from the state objecty
      setWidth(window.innerWidth);
    };
    // set resize listener
    window.addEventListener("resize", resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  const data = useSelector((state) =>
    devices.selectors.byId(state, parseInt(match.params.id))
  );

  if (!data) return null;

  const previewSettings = data.deviceKind.find(
    (e) => e.__component === "settings.preview"
  );

  const resolutionWidth = previewSettings?.resolutionWidth
    ? previewSettings.resolutionWidth
    : 1920;
  const resolutionHeight = previewSettings?.resolutionHeight
    ? previewSettings.resolutionHeight
    : 1080;

  const previewUrl = previewSettings?.previewurl
    ? previewSettings.previewurl
    : "https://exhibition-react-mediaplayer.vercel.app/";
  const scaleX = width / resolutionWidth;
  const scaleY = window.innerHeight / resolutionHeight;

  return (
    <div className={styles.preview}>
      <div className={styles.title}>
        <iframe
          src={`${previewUrl}/?dataOverrideUrl=${process.env.REACT_APP_SERVER_BASE_URL}devices/${match.params.id}`}
          title="Preview"
          className={styles.previewWrapper}
          style={{
            width: `${resolutionWidth}px`,
            height: `${resolutionHeight}px`,
            transform: `translateX(-50%) translateY(-50%) scale(${Math.min(
              scaleX,
              scaleY
            )})`,
          }}
        ></iframe>
      </div>
    </div>
  );
};

export default Preview;
