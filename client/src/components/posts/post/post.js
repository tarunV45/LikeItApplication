import React from "react";
import { useDispatch } from "react-redux";
import useStyles from "./style";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined"
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  const LikeController = () => {
    if(post.likes.length > 0){
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
      ? (
        <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
      ) : (
        <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
      );
    } else{
      return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>
    }
  }

  const deleteHandle = () => {
    dispatch(deletePost(post._id));
  };
  console.log(post);
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={
          post.selectedPic ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        height="10px"
        title={post.title}
      />

      <div className={classes.overlay}>
        <Typography variant="h6">{post.Name}</Typography>
        <Typography variant="body2">
          {moment(post.createdTime).fromNow()}
        </Typography>
      </div>

      {(user?.result?.googleId === post.user || user?.result?._id === post.user) && (
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => {
            setCurrentId(post._id);
          }}
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      )}
      
      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>

      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tags) => `#${tags} `)}
        </Typography>
      </div>

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => dispatch(likePost(post._id))}
        >
          <LikeController />
        </Button>
        {(user?.result?.googleId === post.user || user?.result?._id === post.user) && (
           <Button size="small" color="primary" onClick={deleteHandle}>
           <DeleteIcon fontSize="small" />
           Delete
         </Button>
        )}
       
      </CardActions>
    </Card>
  );
};

export default Post;
