import React from "react";
import { Button, InlineLoading } from "@wfp/ui";

import styles from "./styles.module.scss";

export default function CrudButton({ loading, status, ...other }) {
  return (
    <div className={styles.crudButton}>
      <Button {...other} />{" "}
      {(loading || status) && (
        <InlineLoading
          description={loading ? "Saving..." : "Saved"}
          success={status}
        />
      )}
    </div>
  );
}
