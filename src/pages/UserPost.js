import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container, CircularProgress, Grid } from "@material-ui/core";
import UserPostCard from "../components/UserPostCard";
import { fetchData } from "../helper/FetchData";
import { formatDateFunc } from "../helper/FormatDate";

const useStyles = makeStyles({
  wrapper: {
    alignItems: "center",
    alignContent: "center",
    margin: "auto",
    marginTop: 100,
    padding: "auto",
  },
  root: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 70,
    boxShadow: "0 0 0 0",
  },
  media: {
    height: 150,
    width: 150,
    borderRadius: 200,
    margin: 10,
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "0px 2px 5px 5px rgba(0,0,0,0.2)",
  },

  content: {
    width: 500,
    margin: "auto",
    borderRadius: 10,
    boxShadow: "0px 2px 3px 3px rgba(0,0,0,0.1)",
    marginBottom: 50,
  },

  locationIcon: {
    height: 15,
    width: 15,
    color: "grey",
    marginTop: 4,
    marginRight: 5,
    paddingTop: 1,
  },
  circular: {
    marginTop: 300,
    marginBottom: 300,
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 50,
  },
});

function UserPost() {
  const classes = useStyles();

  const { id } = useParams();
  const [userPost, setUserPost] = useState();
  console.log("userPost", userPost);
  useEffect(() => {
    fetchData(`/user/${id}/post`)
      .then((res) => setUserPost(res?.data))
      .catch()
      .finally();
    console.log(userPost);
  }, [id]);

  return (
    <Container className={classes.wrapper}>
      {!userPost ? (
        <div className={classes.circular}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <Grid container spacing={5}>
          {userPost?.map((post) => {
            const { firstName, lastName, picture } = post.owner;
            return (
              <Grid item sm={4} xs={12} key={post?.id}>
                <UserPostCard
                  userProfilePicture={picture}
                  title={`${firstName} ${lastName}`}
                  subheader={
                    post.publishDate && formatDateFunc(post.publishDate)
                  }
                  imgSrc={post.image}
                  imgTitle="Image Title"
                  description={post.text}
                  likes={post.likes}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
}

export default UserPost;
// dateOfBirth: "1974-03-12T21:15:08.878Z"
// email: "heinz-georg.fiedler@example.com"
// firstName: "Heinz-Georg"
// gender: "male"
// id: "0F8JIqi4zwvb77FGz6Wt"
// lastName: "Fiedler"
// location: {state: "Rheinland-Pfalz", street: "4118, Schulstraße", city: "Fellbach", timezone: "-7:00", country: "Germany"}
// phone: "0700-3090279"
// picture: "https://randomuser.me/api/portraits/men/81.jpg"
// registerDate: "2020-03-07T00:42:32.221Z"
// title: "mr"
