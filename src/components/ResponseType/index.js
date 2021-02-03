import React, { useEffect } from "react";
import styles from "./response-type.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Button, Loading } from "@wfp/ui";
import { NavLink } from "react-router-dom";

import { Story, List, ListItem, Wrapper } from "@wfp/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Trans } from "react-i18next";
import devices from "ducks/devices";
import ReactJson from "react-json-view";
import { faChevronLeft } from "@fortawesome/pro-solid-svg-icons";

const Details = (props) => {
  const { match } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(devices.actions.fetchSingle({ postId: match.params.id }));
  }, []);

  const data = useSelector((state) =>
    devices.selectors.byId(state, parseInt(match.params.id))
  );

  if (!data) return <Loading />;
  return (
    <Wrapper pageWidth="md">
      <Story className={styles.page}>
        <NavLink to={`/`}>
          <Button icon={<FontAwesomeIcon icon={faChevronLeft} />} iconReverse>
            <Trans>Overview</Trans>
          </Button>
        </NavLink>

        {/*<Text kind="title">{data.description}</Text>*/}
        <br />

        <a href={`/preview/${match.params.id}`} target="_blank">
          <Button kind="secondary">
            <Trans>Preview</Trans>
          </Button>
        </a>

        {data.deviceKind && (
          <div>
            {data.deviceKind.map((deviceKind) => (
              <div>
                <h4>{deviceKind.__component.split(".")[1]}</h4>
                {deviceKind.__component === "settings.preview" && (
                  <List kind="bullets">
                    <ListItem title="url">
                      <a href={deviceKind.previewurl} target="_blank">
                        {deviceKind.previewurl}
                      </a>
                    </ListItem>
                    <ListItem title="width">
                      {deviceKind.resolutionWidth}px
                    </ListItem>
                    <ListItem title="height">
                      {deviceKind.resolutionHeight}px
                    </ListItem>
                  </List>
                )}
                {deviceKind.files && (
                  <List kind="bullets">
                    {deviceKind.files.map((file) => (
                      <ListItem>
                        <a href={file.file.url} target="_blank">
                          {file.file.name} ({file.file.mime}) ({file.file.size}
                          mb)
                        </a>
                      </ListItem>
                    ))}
                  </List>
                )}
              </div>
            ))}
          </div>
        )}

        <h4>raw data</h4>
        <div className={styles.title}>
          <ReactJson src={data} collapsed />
        </div>
      </Story>
    </Wrapper>
  );
};

export default Details;
