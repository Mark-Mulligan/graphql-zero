// React

// Apollo
import { gql, useQuery } from '@apollo/client';

// MUI
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Components
import Post from '../components/Post';

// Custom Types
import { IPost } from '../types/customTypes';

interface PostsData {
  posts: {
    data: IPost[];
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

  return (
    <Container sx={{ paddingTop: 3 }}>
      <Typography variant="h1" sx={{ fontSize: '2rem', textAlign: 'center' }}>
        Posts
      </Typography>
      <Box>
        {data &&
          data.posts.data.map((post) => {
            return <Post post={post} key={post.id} />;
          })}
      </Box>
    </Container>
  );
};

export default Posts;
