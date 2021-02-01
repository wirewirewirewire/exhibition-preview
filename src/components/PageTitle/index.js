import React from "react";
import styles from "./styles.module.scss";
import { Button, ModalWrapper } from "@wfp/ui";
import { NavLink } from "react-router-dom";
import { Trans } from "react-i18next";
import { ReactComponent as BackIcon } from "../Icons/BackIcon.svg";
import { useHistory } from "react-router-dom";

const PageTitle = ({
  askRestart,
  children,
  showTitle = true,
  showRestart,
  actionButton,
  ...others
}) => {
  const history = useHistory();
  return (
    <>
      {showTitle && (
        <div className={`page-title ${styles.button}`} {...others}>
          {children}
        </div>
      )}

      {(showRestart || actionButton) && (
        <div className={styles.restart}>
          {actionButton && actionButton}
          {showRestart && askRestart && (
            <ModalWrapper
              customButton={
                <Button kind="secondary">
                  <BackIcon className={styles.backIcon} />
                  <Trans>neu starten</Trans>
                </Button>
              }
              disabled={false}
              handleSubmit={() => history.push("/")}
              primaryButtonText={<Trans>Neustart</Trans>}
              secondaryButtonText={<Trans>Abbrechen</Trans>}
              triggerButtonKind="primary"
            >
              <span className={styles.modalText}>Bist du sicher?</span>
            </ModalWrapper>
          )}
          {showRestart && !askRestart && (
            <NavLink to="/">
              <Button kind="secondary">
                <BackIcon className={styles.backIcon} />
                <Trans>neu starten</Trans>
              </Button>
            </NavLink>
          )}
        </div>
      )}
    </>
  );
};

export default PageTitle;
