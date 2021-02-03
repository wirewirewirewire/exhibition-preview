import React, { useEffect } from "react";
import styles from "./response-type.module.scss";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { Button } from "@wfp/ui";
import { NavLink } from "react-router-dom";
import PageTitle from "components/PageTitle";
import Page from "components/Page";
import { Story, List, ListItem, Wrapper } from "@wfp/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature, faFeatherAlt } from "@fortawesome/pro-light-svg-icons";
import { Trans } from "react-i18next";
import devices from "ducks/devices";
import ReactJson from "react-json-view";

const Details = (props) => {
  const { match } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(devices.actions.fetchSingle({ postId: match.params.id }));
  }, []);

  const data = useSelector((state) =>
    devices.selectors.byId(state, parseInt(match.params.id))
  );

  if (!data) return null;
  return (
    <Wrapper pageWidth="md">
      <Story className={styles.page}>
        <NavLink to={`/`}>
          <Button>
            <Trans>Overview</Trans>
          </Button>
        </NavLink>

        <h1>{data.description}</h1>
        <br />

        <NavLink to={`/preview/${match.params.id}`} key={1}>
          <Button kind="secondary">
            <Trans>Preview</Trans>
          </Button>
        </NavLink>

        {data.deviceKind && (
          <div>
            {data.deviceKind.map((deviceKind) => (
              <div>
                <h4>{deviceKind.__component.split(".")[1]}</h4>
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
