import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
//import Button from "components/Button";
import { Button, Loading } from "@wfp/ui";
import { NavLink } from "react-router-dom";
import PageTitle from "components/PageTitle";
import Page from "components/Page";

import { Trans } from "react-i18next";
import devices from "ducks/devices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import deviceKindLookUp from "helpers/deviceKindLookUp";

const Overview = ({ questions }) => {
  const data = useSelector(devices.selectors.dataArray);

  console.log(data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(devices.actions.fetch());
  }, []);
  if (!data && data.length <= 0) return <Loading />;
  return (
    <Page className={styles.page}>
      <h1>
        <Trans>Select a device</Trans>
      </h1>

      <div className={styles.title}>
        {data.map((question, i) => {
          const kind = question.deviceKind.find(
            (e) =>
              e.__component.startsWith("players.") /*=== "players.mediaplayer"*/
          );

          const deviceKind = deviceKindLookUp?.[kind?.__component]
            ? deviceKindLookUp?.[kind?.__component]
            : deviceKindLookUp.default;

          return (
            <NavLink
              to={`/type/${question.id}`}
              key={i}
              className={styles.listItem}
            >
              <FontAwesomeIcon icon={deviceKind.icon} />
              <h3>{question.description}</h3>
              <small>
                {kind?.__component
                  ? kind?.__component.split(".")[1]
                  : "no deviceKind"}
              </small>
            </NavLink>
          );
        })}
      </div>
    </Page>
  );
};

export default Overview;
