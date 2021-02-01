import React from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

const Page = ({ className, children, kind, ...other }) => {
  const pageClasses = classNames(className, styles.page, {
    [`${kind ? styles[kind] : ""}`]: true,
  });
  return (
    <div {...other} className={pageClasses}>
      {children}
    </div>
  );
};

export default Page;
