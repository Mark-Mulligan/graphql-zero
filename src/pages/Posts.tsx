// React
import { useState } from 'react';

// Apollo
import { gql, useQuery } from '@apollo/client';

// MUI
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

interface Post {
  id: string;
  title: string;
  body: string;
}

interface PostsData {
  posts: {
    data: Post[];
  };
}

const GET_POSTS = gql`
  query {
    posts {
      data {
        id
        title
        body
      }
    }
  }
`;

const Posts = () => {
  const { loading, error, data } = useQuery<PostsData>(GET_POSTS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data);

  return (
    <Container>
      <Typography variant="h1" sx={{ fontSize: '2rem', textAlign: 'center' }}>
        Posts
      </Typography>
      <Box>
        {data &&
          data.posts.data.map((post) => {
            return (
              <Card sx={{ margin: 'auto', maxWidth: 400, marginBottom: 2 }} key={post.id}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.body}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">View Comments</Button>
                </CardActions>
              </Card>
            );
          })}
      </Box>
    </Container>
  );
};

export default Posts;
