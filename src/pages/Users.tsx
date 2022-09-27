// Apollo
import { gql, useQuery } from '@apollo/client';

// React Router
import { Link } from 'react-router-dom';

// MUI
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

// Custom Types
import { IUserOverview } from '../types/customTypes';

interface UsersData {
  users: {
    data: IUserOverview[];
  };
}

const GET_USERS = gql`
  query {
    users(options: {}) {
      data {
        id
        name
      }
    }
  }
`;

const Users = () => {
  const { loading, error, data } = useQuery<UsersData>(GET_USERS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container sx={{ paddingTop: 3 }}>
      <Typography variant="h1" sx={{ fontSize: '2rem', textAlign: 'center' }}>
        Users
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <List sx={{ bgcolor: 'background.paper' }}>
          {data?.users.data.map((user) => {
            return (
              <Link to={`/user/${user.id}`} style={{ textDecoration: 'none' }} key={user.id}>
                <ListItem
                  alignItems="center"
                  sx={{ cursor: 'pointer', '&:hover': { background: 'rgba(255, 255, 255, 0.1)' } }}
                >
                  <ListItemAvatar>
                    <Avatar alt={user.name}>{user.name[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    sx={{}}
                    primary={
                      <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                        {user.name}
                      </Typography>
                    }
                  />
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Box>
    </Container>
  );
};

export default Users;
