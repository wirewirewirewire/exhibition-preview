import React from "react";
import styles from "./styles.module.scss";

export default function SettingsTitle({ additional, children, kind }) {
  return (
    <h2
      className={`${styles.settingsTitle} ${
        kind === "subtitle" ? styles.subTitle : ""
      }`}
    >
      {children}
      {additional}
    </h2>
  );
}
