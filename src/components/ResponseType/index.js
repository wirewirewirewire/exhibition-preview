import React from "react";
import styles from "./response-type.module.scss";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "@wfp/ui";
import { NavLink } from "react-router-dom";
import PageTitle from "components/PageTitle";
import Page from "components/Page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignature,
  faFeatherAlt,
  faBook,
} from "@fortawesome/pro-light-svg-icons";
import { Trans } from "react-i18next";

const Draw = (props) => {
  const { match } = props;
  return (
    <Page className={styles.page}>
      <PageTitle showRestart>
        <h1>
          <Trans>Wie möchtest du antworten?</Trans>
        </h1>
      </PageTitle>
      <div className={styles.title}>
        <NavLink to={`/draw/${match.params.id}`} key={1}>
          <Button kind="secondary">
            <FontAwesomeIcon icon={faSignature} className={styles.icon} />
            <br />
            <Trans>zeichnen</Trans>
          </Button>
        </NavLink>
        <NavLink to={`/write/${match.params.id}`} key={2}>
          <Button kind="secondary">
            <FontAwesomeIcon icon={faFeatherAlt} className={styles.icon} />
            <br />
            <Trans>schreiben</Trans>
          </Button>
        </NavLink>
        <NavLink
          to={`/gallery/${match.params.id}`}
          className={styles.other}
          key={3}
        >
          <Button kind="secondary">
            <FontAwesomeIcon icon={faBook} className={styles.icon} />
            <br />
            <Trans>andere Antworten anschauen</Trans>
          </Button>
        </NavLink>
      </div>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    questions: state.questions,
  };
};

export default compose(withRouter, connect(mapStateToProps))(Draw);
