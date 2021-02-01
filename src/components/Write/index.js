import React, { useState, useRef } from "react";
import styles from "./response-type.module.scss";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "components/Button";
import { useParams } from "react-router-dom";
import Keyboard from "react-simple-keyboard";

import "react-simple-keyboard/build/css/index.css";
import PageTitle from "components/PageTitle";

import Page from "components/Page";
import { getDeviceData } from "ducks/data";
import responses from "ducks/responses";
import { v4 as uuidv4 } from "uuid";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

function Write(props) {
  const [input, setInput] = useState("");
  const [layout, setLayout] = useState("default");
  const keyboard = useRef();
  const textarea = useRef();

  const history = useHistory();
  const data = useSelector(getDeviceData);
  const params = useParams();
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const onChange = (input) => {
    setInput(input);
  };

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const onKeyPress = (button) => {
    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const onChangeInput = (event) => {
    const input = event.target.value;
    setInput(input);
    keyboard.current.setInput(input);
  };

  const submit = () => {
    const generatedUUID = uuidv4();
    dispatch(
      responses.actions.saveResponse({
        uuid: generatedUUID,
        question: params.id,
        text: input,
      })
    );
    history.push(`/thankyou`);
  };

  const hideKeyboard = () => {
    //extarea.current.blur();
  };

  if (!data) return null;
  const question = data.json.questions[params.id];

  return (
    <Page className={styles.page}>
      <PageTitle askRestart showRestart>
        <h1>
          {i18next.language === "en" ? question.question_en : question.question}
        </h1>
      </PageTitle>
      <div className={styles.write}>
        <div className={styles.send}>
          <Button className={styles.submit} onClick={submit}>
            Absenden
          </Button>
        </div>
        <textarea
          value={input}
          placeholder={t("Tippe auf die Tastatur um zu starten")}
          onChange={onChangeInput}
          onFocus={hideKeyboard}
          ref={(r) => (textarea.current = r)}
        />
      </div>
      <div className={styles.keyboard}>
        <Keyboard
          keyboardRef={(r) => (keyboard.current = r)}
          layout={{
            default: [
              "^ 1 2 3 4 5 6 7 8 9 0 \u00DF \u00B4 {bksp}",
              "{tab} q w e r t z u i o p \u00FC +",
              "{lock} a s d f g h j k l \u00F6 \u00E4 # {enter}",
              "{shift} < y x c v b n m , . - {shift}",
              "{space}",
            ],
            shift: [
              '\u00B0 ! " \u00A7 $ % & / ( ) = ? ` {bksp}',
              "{tab} Q W E R T Z U I O P \u00DC *",
              "{lock} A S D F G H J K L \u00D6 \u00C4 ' {enter}",
              "{shift} > Y X C V B N M ; : _ {shift}",
              "{space}",
            ],
          }}
          layoutName={layout}
          display={{
            "{bksp}": "⌫",
            "{enter}": "⏎",
            "{shift}": "⇧",
            "{lock}": "⇪",
            "{space}": " ",
            "{tab}": "⇥",
            "@": "at",
          }}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
      </div>
    </Page>
  );
}
export default Write;
