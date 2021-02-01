//import Button from "components/Button";
import { Button } from "@wfp/ui";
import React from "react";
import styles from "./styles.module.scss";
import i18n from "translation/i18n";
import { Trans } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/pro-regular-svg-icons";

export default function LanguageSwitcher() {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={styles.languageSwitcher}>
      <Button
        kind="secondary"
        className={styles.restart}
        onClick={() => {
          changeLanguage(i18n.language === "en" ? "de" : "en");
        }}
      >
        <FontAwesomeIcon icon={faLanguage} className={styles.icon} />
        <Trans>otherLanguage</Trans>
      </Button>
    </div>
  );
}
