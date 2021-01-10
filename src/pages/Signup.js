import React from "react";
import {
  Button,
  TextField,
  Grid,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import firebase from "../firebase/firebase.utils";

const styles = makeStyles({
  wrapper: {
    marginTop: "5rem",
  },
});

function Signup() {
  const signupStyles = styles();

  const formik = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      firebase.register(values.displayName, values.email, values.password);
    },
  });

  const handleGoogleButtonClick = () => {
    firebase.useGoogleProvider();
  }

  return (
    <Container className={signupStyles.wrapper} maxWidth="sm">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="displayName"
              id="outlined-basic"
              label="Display Name"
              variant="outlined"
              fullWidth
              value={formik.values.displayName}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
            >
              SUBMIT
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={ handleGoogleButtonClick }
            >
              SIGN UP WITH GOOGLE
            </Button>
          </Grid>
        </Grid>
      </form>
      {/*
                //display name input
                //email input
                //password input
                //submit nutton

                //google signup button
            */}
    </Container>
  );
}

export default Signup;
