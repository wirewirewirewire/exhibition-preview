import React from "react";
import { Button } from "@wfp/ui";
import { useHistory, useParams } from "react-router";
export default function ButtonRouter({ to, withOrganization, ...other }) {
  const history = useHistory();
  const { organization } = useParams();
  const toCalc = withOrganization ? `/${organization}${to}` : to;
  return (
    <Button type="button" onClick={() => history.push(toCalc)} {...other} />
  );
}
