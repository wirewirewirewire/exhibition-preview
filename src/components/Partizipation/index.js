import React, { useEffect } from "react";
import classNames from "classnames";
import { Button, Item } from "@wfp/ui";
import { useDispatch, useSelector } from "react-redux";
import partizipation from "ducks/partizipations";
import {
  faCheckCircle,
  faQuestionCircle,
  faTimesCircle,
} from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.scss";

const Partizipation = ({
  button,
  className,
  children,
  icon,
  id,
  deviceKind,
  kind,
  title,
  noBackground,
}) => {
  const emptyClasses = classNames(
    {
      empty: true,
      "empty--noBackground": noBackground,
      "empty--large": kind === "large",
      "empty--section": kind === "section",
    },
    className
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(partizipation.actions.fetch());
  }, []);

  const partizipationArray = useSelector(partizipation.selectors.dataArray);

  function publish({ data, release }) {
    dispatch(
      partizipation.actions.updateSingle({
        postId: data.id,
        values: { ...data, public: release },
      })
    );
  }

  return (
    <>
      {partizipationArray.map((p) => {
        if (p.deviceId !== id) return null;

        return (
          <Item
            kind="horizontal"
            wrapper="repeater"
            title={
              deviceKind.json.questions[p.question]?.question
                ? deviceKind.json.questions[p.question]?.question
                : "Question not found"
            }
            image={
              p.public === true ? (
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className={styles.iconAllow}
                />
              ) : p.public === false ? (
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  className={styles.iconReject}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  className={styles.icon}
                />
              )
            }
            additional={
              <div>
                {p.public !== true ? (
                  <Button
                    small
                    onClick={() => publish({ data: p, release: true })}
                  >
                    Publish
                  </Button>
                ) : (
                  <Button
                    small
                    onClick={() => publish({ data: p, release: false })}
                  >
                    Unpublish
                  </Button>
                )}
              </div>
            }
            subContent={
              <div>
                <a
                  href={`${process.env.REACT_APP_SERVER_BASE_URL}admin/plugins/content-manager/collectionType/application::partizipation.partizipation/${p.id}`}
                  target="_blank"
                >
                  Open in admin panel
                </a>
              </div>
            }
          >
            {p.image && (
              <img src={p.image?.url} className={styles.previewImage} />
            )}
            {/*{p.Question}, {p.response} {p.image} {p.published_at}*/} {p.text}
            <br />
          </Item>
        );
      })}
    </>
  );
};

export default Partizipation;
