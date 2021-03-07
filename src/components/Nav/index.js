import React from "react";
import styles from "./styles.module.scss";
import { Button, MainNavigation } from "@wfp/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/pro-regular-svg-icons";
import { ReactComponent as Logo } from "./wirewire-logo.svg";
import { Link } from "react-router-dom";

const Nav = (props) => {
  return (
    <MainNavigation
      pageWidth="fullWidth"
      logo={
        <div className={styles.logo}>
          <Logo />
          exhibition preview
        </div>
      }
    >
      <div>
        <Link to="/logout">
          <Button
            small
            kind="accent"
            icon={<FontAwesomeIcon icon={faSignOut} />}
          >
            Logout
          </Button>
        </Link>
      </div>
    </MainNavigation>
  );
};

export default Nav;
