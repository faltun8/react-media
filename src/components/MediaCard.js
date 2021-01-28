import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types'

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    margin: "auto",
    //marginRight:'10px',
    marginBottom:'30px',
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.5)",
    "&:hover": {
      transform: 'scale(1.02)',
      boxShadow: "0 20px 70px -13px rgba(0,0,0,0.5)"
    }
  },
  media: {
    height: 300,
    width: 'auto',
    resizeMode: "contain"
  },
});
export default function MediaCard({userImage, userName, userEmail, id}) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={()=> history.push(`/user/${id}`)}>
        <CardMedia
          className={classes.media}
          image={userImage}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {userName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={()=> history.push(`/user/${id}`)}>
          View Full Profile
        </Button>
        <Button size="small" color="primary" onClick={()=> history.push(`/user/${id}/post`)}>
          View User Posts
        </Button>
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  id: PropTypes.string.isRequired,
  userImage: PropTypes.string,
  userName: PropTypes.string,
  userEmail: PropTypes.string,

}