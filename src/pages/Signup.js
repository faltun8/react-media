import React from "react";
import {
  Button,
  TextField,
  Grid,
  Container,
  Avatar,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import firebase from "../firebase/firebase.utils";
import * as Yup from "yup";
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

const signUpValidationSchema = Yup.object().shape({
  displayName: Yup.string().required("Display name is required!!!"),
  email: Yup.string().email("Invalid email").required("Email is required!!!"),
  password: Yup.string()
  .required("No password provided.")
  .min(8, "Password is too short - should be atleast 8 chars."),
})

const stylesFunc = makeStyles((theme) => ({
  wrapper: {
    marginTop: "5rem",
    textAlign: "center",
  },
  avatar: {
    margin: "1rem auto",
    backgroundColor: theme.palette.secondary.main,
  },
  label: {
    padding: "5rem",
  }
}));

function Signup() {
  const signupStyles = stylesFunc();

  const formik = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
    },
    validationSchema: signUpValidationSchema,
    onSubmit: (values) => {
      firebase.register(values.displayName, values.email, values.password);
    },
  });

  const handleGoogleButtonClick = () => {
    firebase.useGoogleProvider();
  }

  return (
    <Container className={signupStyles.wrapper} maxWidth="sm">
       <Avatar className={signupStyles.avatar}>
        <AssignmentTurnedInIcon/>
      </Avatar>
      <Typography variant="h4" >
        <p calssName={signupStyles.label}>Register</p>
      </Typography>
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
              error={formik.errors.displayName}
              helperText={formik.errors.displayName}

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
              error={formik.errors.email}
              helperText={formik.errors.email}
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
              error={formik.errors.password}
              helperText={formik.errors.password}
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
