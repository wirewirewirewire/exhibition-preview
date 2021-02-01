import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "components/PageTitle";
import Page from "components/Page";
import { useParams, useHistory } from "react-router-dom";
import Canvas from "./Canvas";
import { getDeviceData } from "ducks/data";
import responses from "ducks/responses";
import { v4 as uuidv4 } from "uuid";
import i18next from "i18next";

function Draw(props) {
  const history = useHistory();
  const data = useSelector(getDeviceData);

  const dispatch = useDispatch();

  const params = useParams();
  const saveDraw = (img) => {
    const generatedUUID = uuidv4();
    dispatch(
      responses.actions.saveResponse({
        uuid: generatedUUID,
        question: params.id,
        img,
      })
    );

    history.push(`/thankyou`);
  };

  if (!data) return null;

  const question = data.json.questions[params.id];

  return (
    <Page>
      <PageTitle askRestart showRestart>
        <h1>
          {i18next.language === "en" ? question.question_en : question.question}
        </h1>
      </PageTitle>

      <Canvas saveDraw={saveDraw} />
    </Page>
  );
}

export default Draw;
