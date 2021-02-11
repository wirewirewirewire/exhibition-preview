import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button, TextInput, InlineLoading } from "@wfp/ui";
import styles from "./styles.module.scss";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({ hits: [] });
  const [fetching, setFetching] = useState();
  const [errorResponse, setErrorResponse] = useState();
  const history = useHistory();

  const onSubmit = async (values) => {
    setFetching(true);
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}auth/local`,
        {
          identifier: values.email,
          password: values.password,
        }
      );
      setFetching(false);
      if (result.data.jwt) {
        localStorage.setItem("access-token", result.data.jwt);
        history.push("/");
      }
    } catch (error) {
      setErrorResponse(error.response.data.message);
      setFetching(false);
      console.log(error.response.data.message); // this is the main part. Use the response property from the error object
    }
  };

  const { clearErrors, handleSubmit, setError, errors, register } = useForm({});

  return (
    <div className={styles.login}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => {
          clearErrors();
        }}
      >
        <h3>Login</h3>
        {errorResponse && (
          <div className={styles.error}>
            {errorResponse[0].messages[0].message}
          </div>
        )}
        <TextInput
          autocorrect="off"
          autoCapitalize="off"
          labelText="Email"
          inputRef={register({
            required: "Please enter an email or phone number",
          })}
          name="email"
          invalid={errors.email}
          invalidText={errors.email && errors.email.message}
        />
        <TextInput
          autocorrect="off"
          autoCapitalize="off"
          formItemClassName={styles.password}
          labelText="Password"
          inputRef={register}
          invalid={errors.password}
          invalidText={errors.password && errors.password.message}
          type="password"
          name="password"
        />
        <div className={styles.submitWrapper}>
          <div className={styles.button}>
            <Button type="submit" className={styles.mainButton}>
              Sign in
            </Button>
            {fetching && <InlineLoading />}
          </div>
        </div>
        <div className={styles.about}>
          <h4>Exhbition-preview v0.1-alpha</h4>
          wirewire GmbH | Polyxo Studios GmbH
        </div>
      </form>
    </div>
  );
}
