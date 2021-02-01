import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import { Blockquote } from "@wfp/ui";
import capitalize from "./capitalize";

function useSettingsOverview({
  getEntryById,
  name,
  getStatus,
  titleKey = "name",
  duck,
}) {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const organizationId = useParams().organization;

  const location = useLocation();
  const search = qs.parse(location.search, { ignoreQueryPrefix: true });

  useEffect(() => {
    if (loaded === false) setLoaded(true);
    dispatch(duck.actions.fetch({ organizationId }));
  }, [dispatch, loaded]);

  const medicationSearch = useSelector((state) =>
    duck.selectors.byId(state, search.new ? search.new : search.updated)
  );

  const getSelector = (getMedicationById) => {
    return medicationSearch;
  };

  const { latestCrudUpdate } = useSelector(duck.selectors.status);

  const nameCapitalized = capitalize(name);

  const getSaved = () => {
    if (search.new) {
      return (
        <Blockquote kind="success" title={`${nameCapitalized} created`}>
          <b>
            {latestCrudUpdate &&
            latestCrudUpdate.meta &&
            latestCrudUpdate?.meta[titleKey]
              ? latestCrudUpdate?.meta[titleKey]
              : "not found"}
          </b>{" "}
          created
        </Blockquote>
      );
    }

    if (search.updated) {
      return (
        <Blockquote kind="success" title={`${nameCapitalized} updated`}>
          {name}{" "}
          <b>
            {medicationSearch && medicationSearch[titleKey]
              ? medicationSearch[titleKey]
              : "not found"}
          </b>{" "}
          updated
        </Blockquote>
      );
    }

    if (search.deleted) {
      return (
        <Blockquote title={`${nameCapitalized} removed`}>
          {nameCapitalized} successfully removed
        </Blockquote>
      );
    }
  };

  return {
    organizationId,
    getSaved,
    getSelector,
  };
}
export default useSettingsOverview;
