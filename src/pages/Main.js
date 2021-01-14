import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import MediaCard from "../components/MediaCard";

const stylesFunc = makeStyles((theme) => ({
  wrapper: {
    marginTop: "5rem",
    textAlign: "center",
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
    setUserList(response?.data.data);
  };

  useEffect(() => {
    fetchData();
    console.log(userList);
  }, []);

  return (
    <Container className={mainStyles.wrapper} maxWidth="sm">
      {userList?.map((user) => {
        return <MediaCard key={user?.id} userImage={user.picture} userName={`${user.title} ${user.firstName} ${user.lastName}`} />;
      })}
    </Container>
  );
}

export default Main;
