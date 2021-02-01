import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Blockquote, Button, ModalWrapper } from "@wfp/ui";
import { faCaretLeft, faCheckCircle } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonRouter from "components/ButtonRouter";
import styles from "./useSettingsForm.module.scss";
import SettingsTitle from "components/SettingsTitle";
import { useForm } from "react-hook-form";
import capitalize from "./capitalize";
import { Trans } from "react-i18next";
import CrudButton from "components/CrudButton";

function useStore({
  additionalHeader,
  getEntryById,
  id,
  name,
  prepareSubmit,
  duck,
  url,
  settings = {},
}) {
  const [loaded, setLoaded] = useState();
  const [submitStatus, setSubmitStatus] = useState(false);

  const history = useHistory();
  const params = useParams();
  const urlId = id ? id : params.entry;

  const dispatch = useDispatch();
  const { loading, loadingCrud } = useSelector(duck.selectors.status);
  const entryData = useSelector((state) => duck.selectors.byId(state, urlId));

  const nameCapitalized = capitalize(name);
  const { errors, handleSubmit, register, setValue, reset, ...other } = useForm(
    {
      defaultValues: entryData,
    }
  );

  useEffect(() => {
    if (loaded === false) setLoaded(true);
    if (!settings.disableFetchSingle)
      dispatch(duck.actions.fetchSingle({ postId: urlId }));
  }, [dispatch, loaded]);

  useEffect(() => {
    reset(entryData);
  }, [entryData]);

  const onSubmit = (values) => {
    if (prepareSubmit) values = prepareSubmit(values);
    setSubmitStatus(true);
    window.scrollTo(0, 0);
    if (urlId === "new" || urlId === undefined) {
      dispatch(
        duck.actions.createSingle({
          values,
        })
      );
    } else {
      dispatch(
        duck.actions.updateSingle({
          values,
          postId: urlId,
        })
      );
    }
  };

  const closeModal = (store) => {
    history.push(
      `/school/${params.schoolId}/${history.location.pathname.split("/")[3]}/${
        store ? store.data.id : params.item
      }`
    );
  };

  const DeleteModal = ({ customButton }) => (
    <ModalWrapper
      modalHeading={`Remove ${name}`}
      primaryButtonText="Remove"
      handleSubmit={deleteEntry}
      customButton={
        customButton ? (
          customButton
        ) : (
          <Button kind="danger" to={`${url}`}>
            <Trans>Remove {name}</Trans>
          </Button>
        )
      }
    >
      <Trans>Are you sure that you want to delete the {name}?</Trans>
    </ModalWrapper>
  );

  const Form = ({ children, title }) => (
    <>
      {title}
      <StatusBlockquote />
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </>
  );

  const StatusBlockquote = () => {
    if (!submitStatus) return null;

    window.scrollTo(0, 0);

    if (urlId === "new" && !loading) {
      history.push(`${url}/?new=true`);
    }

    return (
      <Blockquote
        withIcon
        icon={
          <FontAwesomeIcon
            icon={faCheckCircle}
            size="3x"
            className={styles.saveIcon}
          />
        }
        title="Settings saved"
      >
        Organization settings saved
      </Blockquote>
    );
  };

  const header = () => (
    <>
      <div className={styles.buttonWrapper}>
        <ButtonRouter
          icon={<FontAwesomeIcon icon={faCaretLeft} />}
          iconReverse
          to={url}
        >
          <Trans>Return to overview</Trans>
        </ButtonRouter>
        <div className={styles.headerRight}>
          {additionalHeader}
          {params.entry !== "new" && params.entry !== undefined && (
            <DeleteModal />
          )}
        </div>
      </div>

      <SettingsTitle>
        <Trans>
          {params.entry === "new" ? `New ${name}` : `${nameCapitalized} detail`}
        </Trans>
      </SettingsTitle>
    </>
  );

  const deleteEntry = () => {
    dispatch(duck.actions.deleteSingle({ postId: urlId }));
    history.push(`${url}/?deleted=true`);
  };

  const SubmitButton = (props) => (
    <CrudButton type="submit" loading={loadingCrud}>
      <Trans>
        {params.entry === "new" ? `Add new ${name}` : `Update ${name}`}
      </Trans>
    </CrudButton>
  );

  const isNew = urlId === "new" || urlId === undefined;

  return {
    closeModal,
    onSubmit,
    header,
    errors,
    entryData,
    loading,
    loadingCrud,
    setValue,
    Form,
    submitStatus,
    StatusBlockquote,
    handleSubmit,
    register,
    DeleteModal,
    deleteEntry,
    isNew,
    reset,
    SubmitButton,
    urlId,
    ...other,
  };
}
export default useStore;

export const SettingsSubmitButton = () => {};
