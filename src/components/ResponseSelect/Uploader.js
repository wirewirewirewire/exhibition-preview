import React, { useEffect } from "react";
import partizipations from "ducks/partizipations";
import { useDispatch, useSelector } from "react-redux";
import responses, { getResponsesArray } from "ducks/responses";
import data from "ducks/data";
import axios from "axios";

function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}

export default function Uploader() {
  const partizipationsArray = useSelector(partizipations.selectors.dataArray);
  const status = useSelector(partizipations.selectors.status);
  const responsesList = useSelector(getResponsesArray);
  const dispatch = useDispatch();

  useEffect(() => {
    const results = responsesList.find(
      (e) => e.uuid === status.latestCrudUpdate
    );

    // status.latestCrudUpdate
    //const resultsNew = responsesList.find((e) => e.uploaded !== true);
    const latestFile = partizipationsArray.find(
      (e) => e.uuid === status.latestCrudUpdate
    );

    if (results) {
      console.log("resultsresultsresultsresults");
      const bodyFormData = new FormData();
      const file = dataURItoBlob(results.img);

      bodyFormData.append("refId", latestFile.id);
      bodyFormData.append("field", "image");
      bodyFormData.append("ref", "partizipation");
      bodyFormData.append("files", file, "upppspsas");
      axios({
        async: true,
        crossDomain: true,
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_BASE_URL}upload`,
        data: bodyFormData,
      })
        .then((response) => {
          if (response.status === 200) {
            dispatch(
              responses.actions.updateResponse({
                uuid: status.latestCrudUpdate,
              })
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });

      dispatch(
        responses.actions.updateResponse({ uuid: status.latestCrudUpdate })
      );
    }

    setTimeout(() => {
      restart();
    }, 1000);
  }, [status.latestCrudUpdate]);

  useEffect(() => {
    restart();
  }, [responsesList.length]);

  console.log(responsesList.length);

  const restart = () => {
    const resultsNew = responsesList.find((e) => e.uploaded !== true);

    console.log("restart", resultsNew);
    if (resultsNew) {
      dispatch(
        partizipations.actions.createSingle({
          values: {
            uuid: resultsNew.uuid,
            text: resultsNew.text,
            question: parseInt(resultsNew.question),
          },
        })
      );
    }
  };

  return (
    <div>
      <button onClick={restart}>Goooosss</button>
    </div>
  );
}
