import React from "react";
import styles from "./styles.module.scss";
import Empty from "components/Empty";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/pro-solid-svg-icons";
import { faFileSearch } from "@fortawesome/pro-regular-svg-icons";
import ButtonRouter from "components/ButtonRouter";
import { Trans } from "react-i18next";

export default function Repeater({
  addButton,
  addButtonTo,
  addButtonText,
  children,
  customEmptyContent,
  emptyTitle = "No entry found",
  emptyMessage = "Currently there is no entry found",
}) {
  const addButtonElement = addButton ? (
    addButton
  ) : (
    <ButtonRouter
      to={addButtonTo ? addButtonTo : `/settings/medications/new`}
      icon={<FontAwesomeIcon icon={faPlusCircle} />}
    >
      {addButtonText}
    </ButtonRouter>
  );
  return (
    <div className={styles.repeater}>
      <div>
        {children}
        {children.length === 0 && (
          <>
            {customEmptyContent ? (
              customEmptyContent
            ) : (
              <Empty
                kind="large"
                icon={<FontAwesomeIcon icon={faFileSearch} />}
                button={addButtonElement}
                title={<Trans>{emptyTitle}</Trans>}
              >
                <Trans>{emptyMessage}</Trans>
              </Empty>
            )}
          </>
        )}
      </div>
      {children.length !== 0 && (
        <div className={styles.addButton}>{addButtonElement}</div>
      )}
    </div>
  );
}

export function RepeaterItem({ children, image }) {
  return (
    <div className={styles.repeaterItem}>
      {image && <RepeaterItemImage>{image}</RepeaterItemImage>}
      <div>{children}</div>
    </div>
  );
}

export function RepeaterItemImage({ children }) {
  return (
    <div className={styles.repeaterItemImage}>
      {children ? children : "no title"}
    </div>
  );
}

export function RepeaterItemTitle({ children }) {
  return (
    <div className={styles.repeaterItemTitle}>
      {children ? children : "no title"}
    </div>
  );
}

export function RepeaterItemContent({ children }) {
  return <div className={styles.repeaterItemContent}>{children}</div>;
}
