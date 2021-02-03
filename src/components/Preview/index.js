import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { Button } from "@wfp/ui";
import { NavLink } from "react-router-dom";
import PageTitle from "components/PageTitle";
import Page from "components/Page";

import { Trans } from "react-i18next";
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
      // change width from the state object
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

  const scaleX = width / previewSettings.resolutionWidth;
  const scaleY = window.innerHeight / 1080;

  return (
    <div className={styles.preview}>
      <div className={styles.title}>
        <iframe
          src={previewSettings.previewurl}
          title="Preview"
          className={styles.previewWrapper}
          style={{
            width: `${previewSettings.resolutionWidth}px`,
            height: `${previewSettings.resolutionHeight}px`,
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
