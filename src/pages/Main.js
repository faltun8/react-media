import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  capitalize,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import MediaCard from "../components/MediaCard";

const stylesFunc = makeStyles((theme) => ({
  wrapper: {
    marginTop: "7rem",
    textAlign: "center",
  },
  circular: {
    marginTop: 300,
    marginBottom: 300,
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 50,
  },
}));

function Main() {
  const [userList, setUserList] = useState();
  const mainStyles = stylesFunc();
  const { REACT_APP_API_BASE_URL, REACT_APP_API_TOKEN } = process.env;

  const fetchData = async () => {
    const response = await axios.get(`${REACT_APP_API_BASE_URL}/user`, {
      headers: {
        "app-id": REACT_APP_API_TOKEN,
      },
    });
    return response;
  };

  useEffect(() => {
    fetchData().then((res) => setUserList(res?.data.data));
  }, []);

  return (
    <Container className={mainStyles.wrapper}>

      {!userList ? (
        <div className={mainStyles.circular}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <Grid container spacing={5}>
          {userList?.map((user) => {
            return (
              <Grid item sm={4} xs={12} key={user?.id}>
                <MediaCard
                  id={user?.id}
                  userImage={user?.picture}
                  userName={`${capitalize(user?.title)} ${user?.firstName} ${
                    user?.lastName
                  }`}
                  userEmail={user?.email}
                />
              </Grid>
            );
          })}

        </Grid>
      )}
    </Container>
  );
}

export default Main;
