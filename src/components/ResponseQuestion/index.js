import React, { useEffect } from "react";
import styles from "./response-type.module.scss";
import { useDispatch, useSelector } from "react-redux";
//import Button from "components/Button";
import { Button, Loading } from "@wfp/ui";
import { NavLink } from "react-router-dom";
import PageTitle from "components/PageTitle";
import Page from "components/Page";
import { getDeviceData } from "ducks/data";
import i18next from "i18next";
import LanguageSwitcher from "components/LanguageSwitcher";
import { Trans } from "react-i18next";
import devices from "ducks/devices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import deviceKindLookUp from "helpers/deviceKindLookUp";

const ResponseQuestion = ({ questions }) => {
  const data = useSelector(devices.selectors.dataArray);

  console.log(data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(devices.actions.fetch());
  }, []);

  if (!data) return <Loading />;
  return (
    <Page className={styles.page}>
      <PageTitle>
        <h1>
          <Trans>Select a device</Trans>
        </h1>
      </PageTitle>
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
            <NavLink to={`/type/${i}`} key={i}>
              <div key={i}>
                <FontAwesomeIcon icon={deviceKind.icon} />
                {question.description}
                <small>{kind?.__component}</small>
              </div>
            </NavLink>
          );
        })}
      </div>
    </Page>
  );
};

export default ResponseQuestion;
