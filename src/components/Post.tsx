// React
import { FC, useState } from 'react';

// Apollo
import { gql, useLazyQuery } from '@apollo/client';

// MUI
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

// Custom Types
import { IPost, IComment } from '../types/customTypes';

const GET_POST_COMMENTS = gql`
  query ($id: ID!) {
    post(id: $id) {
      comments {
        data {
          id
          body
          email
        }
      }
    }
  }
`;

interface PostCommentData {
  post: {
    comments: {
      data: IComment[];
    };
  };
}

interface IProps {
  post: IPost;
}

const Post: FC<IProps> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);

  const [getPostComments, { loading, error, data }] = useLazyQuery<PostCommentData>(GET_POST_COMMENTS);

  const commentsClick = () => {
    setShowComments(!showComments);
    getPostComments({ variables: { id: post.id } });
  };

  return (
    <Card sx={{ margin: 'auto', maxWidth: 500, marginBottom: 2 }} key={post.id}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => commentsClick()}>
          {showComments ? 'Hide Comments' : 'Show Comments'}
        </Button>
      </CardActions>
      <Collapse in={showComments} timeout="auto" unmountOnExit>
        <CardContent>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {loading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100px' }}>
                <CircularProgress />
              </Box>
            ) : (
              data?.post.comments.data.map((comment) => {
                return (
                  <ListItem alignItems="flex-start" key={comment.id}>
                    <ListItemAvatar>
                      <Avatar alt={comment.email}>{comment.email[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={comment.email}
                      secondary={
                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                          {comment.body}
                        </Typography>
                      }
                    />
                  </ListItem>
                );
              })
            )}
          </List>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Post;
