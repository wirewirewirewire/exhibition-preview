import React from "react";
import styles from "./response-type.module.scss";
import { useSelector } from "react-redux";
//import Button from "components/Button";
import { Button, Loading } from "@wfp/ui";
import { NavLink } from "react-router-dom";
import PageTitle from "components/PageTitle";
import Page from "components/Page";
import { getDeviceData } from "ducks/data";
import i18next from "i18next";
import LanguageSwitcher from "components/LanguageSwitcher";
import { Trans } from "react-i18next";

const ResponseQuestion = ({ questions }) => {
  const data = useSelector(getDeviceData);

  if (!data) return <Loading />;
  return (
    <Page className={styles.page}>
      <PageTitle actionButton={<LanguageSwitcher />}>
        <h1>
          <Trans>1945 und heute?</Trans>
        </h1>
        <p>
          <Trans>introText</Trans>
        </p>
      </PageTitle>
      <div className={styles.title}>
        {Object.entries(data.json.questions).map(([key, question], i) => (
          <NavLink to={`/type/${key}`} key={i}>
            <Button key={i} kind="secondary">
              {i18next.language === "en"
                ? question.question_en
                : question.question}
            </Button>
          </NavLink>
        ))}
      </div>
    </Page>
  );
};

export default ResponseQuestion;
