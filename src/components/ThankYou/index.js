import React from "react";

import styles from "./response-type.module.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";
import PageTitle from "components/PageTitle";
import Page from "components/Page";
import { getResponsesArray } from "ducks/responses";
import { getDeviceData } from "ducks/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAltCheck } from "@fortawesome/pro-light-svg-icons";

const ThankYou = ({ match }) => {
  const responses = useSelector(getResponsesArray);
  const { entry, id } = useParams();

  const data = useSelector(getDeviceData);
  if (!data) return null;

  const responseList = responses.filter((e) => e.question === id);

  const single = responseList[entry]
    ? responseList[parseInt(entry)]
    : undefined;

  return (
    <Page kind="scroll">
      {entry && single && (
        <div className={styles.hello}>
          <NavLink to={`/gallery/${id}`}>Close</NavLink>

          {single.text ? (
            <div>{single.text}</div>
          ) : (
            // eslint-disable-next-line jsx-a11y/alt-text
            <img src={single.img} className={styles.image} />
          )}
        </div>
      )}
      <PageTitle showRestart showTitle={false}></PageTitle>
      <div className={styles.title}>
        <div>
          <FontAwesomeIcon className={styles.icon} icon={faCommentAltCheck} />
          <h2>Vielen Dank für deine Einsendung!</h2>
          <p>
            Deine Antwort wird von unseren Kuratoren überprüft und danach der
            Galerie hinzugefügt.
          </p>
        </div>
      </div>
    </Page>
  );
};

export default ThankYou;
