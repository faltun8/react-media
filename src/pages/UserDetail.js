import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { capitalize, Avatar } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchData } from "../helper/FetchData";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneIcon from "@material-ui/icons/Phone";

const useStyles = makeStyles({
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
    //backgroundColor: 'wheat',

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
});

function UserDetail() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [userDetail, setUserDetail] = useState();

  useEffect(() => {
    fetchData(`/user/${id}`).then((res) => setUserDetail(res));
    console.log(userDetail);
  }, []);

  const userName = `${userDetail?.firstName} ${userDetail?.lastName}`;
  const location = `${userDetail?.location?.city}, ${userDetail?.location?.country}`;
  const email = `${userDetail?.email}`;
  const phone = `${userDetail?.phone}`;

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={userDetail?.picture}
        title="Contemplative Reptile"
      />
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="h5" component="h2">
          {userName}
        </Typography>
        <Typography variant="body3" color="textSecondary" component="p">
          <LocationOnOutlinedIcon className={classes.locationIcon} />
          {location}
        </Typography>
        <Typography variant="body3" color="textSecondary" component="p">
          <MailOutlineIcon className={classes.locationIcon} />
          {email}
        </Typography>
        <Typography variant="body3" color="textSecondary" component="p">
          <PhoneIcon className={classes.locationIcon} />
          {phone}
        </Typography>
          <br/>
          <br/>
          <Typography variant="h5" color="textSecondary" component="p">
            Summary
          </Typography>

          <br/>


        <Typography variant="body2" color="textSecondary" component="p">
            Ea deserunt cillum non cupidatat ex adipisicing veniam non occaecat
          ex. Nulla eiusmod qui velit laborum officia culpa amet sit ipsum.
          Veniam esse velit excepteur enim nulla exercitation ad proident veniam
          incididunt nulla ea ea aute. Do ex laboris consectetur officia sit
          nostrud. 
          
          <br/>
          <br/>

            Excepteur ut ullamco qui sit Lorem elit nostrud ea amet
          deserunt ipsum sunt dolor. Labore exercitation do sunt aute ut tempor
          excepteur eiusmod. Velit laborum eiusmod aliquip et duis aliqua non
          est consequat elit laboris. 
          
          
          <br/>
          <br/>

            Nisi non anim occaecat consequat amet duis
          minim fugiat ut irure. Et aliqua veniam magna eiusmod in consequat
          nulla sint ad velit ea nulla anim mollit. Tempor Lorem ea ad aliquip
          pariatur ut cupidatat anim. Deserunt id cupidatat exercitation
          deserunt magna. Dolore qui et occaecat laborum.
        </Typography>
      </CardContent>
    </Card>
  );
}

export default UserDetail;
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
