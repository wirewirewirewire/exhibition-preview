import React from "react";
import { logout } from "./PrivateRoute";
import { Button, Empty } from "@wfp/ui";
import { Link } from "react-router-dom";
import styles from "./logout.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrow } from "@fortawesome/pro-light-svg-icons";

export default function Logout() {
  logout();
  return (
    <div className={styles.logout}>
      <Empty
        kind="large"
        title="Logout successfull"
        icon={<FontAwesomeIcon icon={faCrow} />}
        button={
          <Link to="/login">
            <Button>Login again</Button>
          </Link>
        }
      >
        You've logged out successfully
      </Empty>
    </div>
  );
}
