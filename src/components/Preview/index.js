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

  const scaleX = width / 1920;
  const scaleY = window.innerHeight / 1080;
  const scale = [scaleX, scaleY];

  console.log("scale", scale, Math.min(scale));

  return (
    <div className={styles.preview}>
      <div className={styles.title}>
        <iframe
          src="https://bewegung.vercel.app"
          title="W3Schools Free Online Web Tutorials"
          width="1920"
          height="1080"
          className={styles.previewWrapper}
          style={{
            width: `${1920}px`,
            height: `${1080}px`,
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
