import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Button, Loading } from "@wfp/ui";
import { NavLink, Link } from "react-router-dom";

import { Story, List, ListItem, Item, Wrapper } from "@wfp/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Trans } from "react-i18next";
import devices from "ducks/devices";
import ReactJson from "react-json-view";
import { faChevronLeft } from "@fortawesome/pro-solid-svg-icons";
import { useParams } from "react-router-dom";
import deviceKindLookUp from "helpers/deviceKindLookUp";
import Empty from "components/Empty";
import { faCrow, faPlay } from "@fortawesome/pro-light-svg-icons";
import { faExternalLink, faSearch } from "@fortawesome/pro-solid-svg-icons";
import Partizipation from "components/Partizipation";

const Details = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(devices.actions.fetchSingle({ postId: params.id }));
  }, []);

  const data = useSelector((state) =>
    devices.selectors.byId(state, parseInt(params.id))
  );

  if (!data)
    return (
      <Empty
        title="Select an entry"
        icon={<FontAwesomeIcon icon={faCrow} />}
        kind="large"
      >
        Please select an entry on the left side
      </Empty>
    );

  const kind = data.deviceKind.find((e) =>
    e.__component.startsWith("players.")
  );

  const deviceKind = deviceKindLookUp?.[kind?.__component]
    ? deviceKindLookUp?.[kind?.__component]
    : deviceKindLookUp.default;

  const previewSettings = data.deviceKind.find(
    (e) => e.__component === "settings.preview"
  );

  const mediaplayerSettings = data.deviceKind.find(
    (e) => e.__component === "players.react-mediaplayer"
  );

  return (
    <div className={styles.page}>
      <div className={styles.pageTitle}>
        <div className={styles.avatar}>
          <FontAwesomeIcon icon={deviceKind.icon} />
        </div>

        <div className={styles.pageTitleName}>
          <h3>{data.description && <span>{data.description} </span>}</h3>
          <h5>
            {" "}
            {kind?.__component
              ? kind?.__component.split(".")[1]
              : "no deviceKind"}
          </h5>
        </div>
      </div>

      <div className={styles.buttons}>
        {(previewSettings?.previewurl || mediaplayerSettings) && (
          <NavLink to={`/preview/${params.id}`} target="_blank">
            <Button
              icon={
                <FontAwesomeIcon
                  icon={faSearch}
                  className={styles.sidebarImage}
                />
              }
              kind="accent"
            >
              Preview
            </Button>
          </NavLink>
        )}
        <a
          href={`${process.env.REACT_APP_SERVER_BASE_URL}admin/plugins/content-manager/collectionType/application::devices.devices/${params.id}`}
          target="_blank"
        >
          <Button
            icon={
              <FontAwesomeIcon
                icon={faExternalLink}
                className={styles.sidebarImage}
              />
            }
          >
            Open in admin panel
          </Button>
        </a>
        <a
          href={`${process.env.REACT_APP_SERVER_BASE_URL}admin/plugins/content-manager/collectionType/application::devices.devices/${params.id}`}
          target="_blank"
        >
          <Button
            icon={
              <FontAwesomeIcon
                icon={faExternalLink}
                className={styles.sidebarImage}
              />
            }
          >
            Open in balena
          </Button>
        </a>
      </div>
      {data.deviceKind && (
        <div>
          {data.deviceKind.map((deviceKind) => (
            <div>
              <h4>{deviceKind.__component.split(".")[1]}</h4>
              {deviceKind.__component === "players.json-player" && (
                <Partizipation id={data.id} deviceKind={deviceKind} />
              )}
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
                <List>
                  {deviceKind.files.map((file) => (
                    <a
                      href={file.file.url}
                      target="_blank"
                      className={styles.itemLink}
                    >
                      <Item
                        kind="horizontal"
                        wrapper="repeater"
                        title={file.file.name}
                        image={
                          <div className={styles.preview}>
                            <FontAwesomeIcon
                              icon={faPlay}
                              className={styles.previewIcon}
                            />
                            {file.file.mime.split("/")[0] === "image" ? (
                              <img alt="Moving van" src={file.file.url} />
                            ) : file.file.mime.split("/")[0] === "video" ? (
                              <video src={file.file.url}>
                                <source src={file.file.url} />
                              </video>
                            ) : undefined}
                          </div>
                        }
                        noImage
                        subContent={
                          <>
                            ID: {file.id} File-ID: {file.file.id} Provider:{" "}
                            {file.file.provider}
                          </>
                        }
                      >
                        {file.file.mime} ({file.file.size}
                        mb)
                      </Item>
                    </a>
                  ))}
                </List>
              )}
              {deviceKind.Trigger && (
                <>
                  <h4>Trigger</h4>
                  <div className={styles.code}>{deviceKind.mainFunction}</div>
                  <div>
                    {deviceKind.Trigger.map((trigger) => (
                      <Item
                        kind="horizontal"
                        wrapper="repeater"
                        title={
                          <>
                            ID: {trigger.id} GPIO: {trigger.gpio}
                          </>
                        }
                      >
                        <div className={styles.code}>
                          {trigger.customFunction}
                        </div>
                      </Item>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
      <h4>raw data</h4>
      <div className={styles.title}>
        <ReactJson src={data} collapsed />
      </div>
    </div>
  );
};

export default Details;
