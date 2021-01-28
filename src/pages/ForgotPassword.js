import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Container,
  Avatar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "../firebase/firebase.utils";
import { Formik } from "formik";
import * as Yup from "yup";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const forgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required!!"),
});

const stylesFunc = makeStyles((theme) => ({
  wrapper: {
    marginTop: "10rem",
    height: "calc(100vh - 19.0625rem)",
    textAlign: "center",
  },
  avatar: {
    margin: "1rem auto",
    backgroundColor: theme.palette.secondary.main,
  },
  forgotPassword: {
    margin: "1rem",
  },
}));

const initialValues = {
  email: "",
};

function ForgotPassword() {
  const [loginError, setLoginError] = useState(null);
  const [isEmailSent, setIsEmailSent] = useState(true);
  const forgotPasswordStyles = stylesFunc();

  const handleFormSubmit = (values) => {
    firebase.forgotPassword(values.email).then(() => {
      setIsEmailSent(false);
    });
  };

  return (
    <Container className={forgotPasswordStyles.wrapper} maxWidth="sm">
      <Avatar className={forgotPasswordStyles.avatar} color="secondary">
        <VpnKeyIcon />
      </Avatar>
      {isEmailSent ? (
        <div>
          <Typography
            className={forgotPasswordStyles.forgotPassword}
            variant="h4"
          >
            Forgot Password
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={forgotPasswordValidationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      value={values.email}
                      onChange={handleChange}
                      error={errors.email}
                      helperText={errors.email}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      fullWidth
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
                <p style={{ textAlign: "center", color: "red" }}>
                  <small>{loginError}</small>
                </p>
              </form>
            )}
          </Formik>
        </div>
      ) : (
        <Typography
          className={forgotPasswordStyles.forgotPassword}
          variant="h4"
        >
          An email has been sent. Please check your inbox.
        </Typography>
      )}
    </Container>
  );
}

export default ForgotPassword;
