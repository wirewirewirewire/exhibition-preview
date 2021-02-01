/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styles from "./response-type.module.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "components/Button";
import { NavLink } from "react-router-dom";
import PageTitle from "components/PageTitle";
import Page from "components/Page";
import { getResponsesArray } from "ducks/responses";
import { getDeviceData } from "ducks/data";
import i18next from "i18next";

const Gallery = ({ match }) => {
  const responses = useSelector(getResponsesArray);
  const { entry, id } = useParams();

  const data = useSelector(getDeviceData);
  if (!data) return null;

  const question = data?.json?.questions[id];

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
            <img src={single.img} className={styles.image} />
          )}
        </div>
      )}
      <PageTitle showRestart>
        <h1>
          {i18next.language === "en" ? question.question_en : question.question}
        </h1>
      </PageTitle>
      <div className={styles.title}>
        {responseList.map((e, i) => (
          <NavLink to={`/gallery/${id}/${i}`}>
            <Button key={i} kind="secondary">
              {e.text ? (
                <div>{e.text}</div>
              ) : (
                <img src={e.img} className={styles.image} />
              )}
            </Button>
          </NavLink>
        ))}
      </div>
    </Page>
  );
};

export default Gallery;
