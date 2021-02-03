import React from "react";

import { Button, TextInput, Blockquote, Select, SelectItem } from "@wfp/ui";
import useSettingsForm from "helpers/useSettingsForm";
import { Trans } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/pro-light-svg-icons";
import devices from "ducks/devices";

import { useSelector } from "react-redux";
import { useParams } from "react-router";

export default function SettingsPatientsDetail() {
  const params = useParams();
  const store = useSettingsForm({
    name: "devices",
    getEntryById: devices.selectors.byId,
    getStatus: devices.selectors.status,
    duck: devices,
    url: `/responseselect`,
  });

  const { entryData, register, SubmitButton, setValue, Form } = store;

  const updateScan = (content) => {
    Object.keys(content).forEach((key) => {
      console.log("key", key, content[key]);
      setValue(key, content[key]);
    });

    return true;
  };

  return (
    <>
      {store.header()}
      <Form>
        <TextInput
          name="Question"
          labelText="Product code"
          inputRef={register}
        />

        <SubmitButton />
      </Form>
    </>
  );
}
