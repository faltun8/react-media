import React from 'react'
import {
    Button,
    TextField,
    Grid,
    Container,
  } from "@material-ui/core";
  import { makeStyles } from "@material-ui/core/styles";
  import { useFormik } from "formik";
  import firebase from "../firebase/firebase.utils";
  import * as Yup from "yup";

  const signInValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required!!!"),
    password: Yup.string()
    .required("Password is required!!!")
    .min(8, "Password is too short - should be atlest 8 chars"),
  })

  const styles = makeStyles({
    wrapper: {
      marginTop: "5rem",
    },
  });

  function Signin() {
    const signinStyles = styles();
  
    const formik = useFormik({
      initialValues: {
        displayName: "",
        email: "",
        password: "",
      },
      validationSchema: signInValidationSchema,
      onSubmit: (values) => {
        firebase.signIn(values.displayName, values.email, values.password)
       
      },
    });

    const handleGoogleButtonClick = () => {
        firebase.useGoogleProvider();
      }
  


  return (
    <Container className={signinStyles.wrapper} maxWidth="sm">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
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

export default Signin;