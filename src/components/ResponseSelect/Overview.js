import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/pro-solid-svg-icons";
import SettingsTitle from "../SettingsTitle";
import { useSelector } from "react-redux";
import Repeater, { RepeaterItem } from "components/Repeater";
import styles from "./styles.module.scss";
import { NavLink, useParams, useLocation, useHistory } from "react-router-dom";
import ButtonRouter from "components/ButtonRouter";

import useSettingsOverview from "helpers/useSettingsOverview";
import { Trans } from "react-i18next";
import partizipations from "ducks/partizipations";

import { Select, SelectItem } from "@wfp/ui";
import qs from "qs";

export default function SettingsPatients() {
  const location = useLocation();
  const locationParams = qs.parse(location.search.slice(1));
  const history = useHistory();

  const stockArray = useSelector((state) =>
    partizipations.selectors.dataArray(state, locationParams.patient)
  );

  const settingsOverview = useSettingsOverview({
    name: "partizipations",
    duck: partizipations,
  });

  return (
    <div>
      <SettingsTitle>
        <Trans>Stock</Trans>
      </SettingsTitle>

      {settingsOverview.getSaved()}

      <Repeater
        addButton={
          <ButtonRouter
            to={`/responseselect/new`}
            icon={<FontAwesomeIcon icon={faPlusCircle} />}
          >
            <Trans>Add new entry</Trans>
          </ButtonRouter>
        }
      >
        {stockArray.map((e, i) => (
          <RepeaterItem key={i}>
            <NavLink to={`/responseselect/${e.id}`}>
              <div className={styles.wrapper}>
                <div className={styles.content}>
                  {e.productCode ? (
                    e.productCode
                  ) : (
                    <Trans>Unnamed device</Trans>
                  )}
                  <div className={styles.subTitle}></div>
                </div>
              </div>
            </NavLink>
          </RepeaterItem>
        ))}
      </Repeater>
    </div>
  );
}
