// React Router
import { useParams } from 'react-router-dom';

// Apollo
import { gql, useQuery } from '@apollo/client';

// MUI
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';

// Custom Types
import { IUser } from '../types/customTypes';

const GET_USER_DATA = gql`
  query ($id: ID!) {
    user(id: $id) {
      id
      name
      username
      email
      address {
        street
        suite
        city
        zipcode
      }
      phone
      website
      company {
        name
      }
    }
  }
`;

interface UserData {
  user: IUser;
}

const User = () => {
  const params = useParams();

  const { loading, error, data } = useQuery<UserData>(GET_USER_DATA, {
    variables: { id: params.id },
  });

  console.log(data);

  console.log('params', params);

  return (
    <Container>
      <Typography variant="h1" sx={{ fontSize: '2rem', textAlign: 'center' }}>
        User Info
      </Typography>
      <List sx={{ margin: 'auto', maxWidth: 500 }}>
        <ListItem>
          <Grid container spacing={2}>
            <Grid item xs={6} sx={{ textAlign: 'right' }}>
              <Typography>Name:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{data?.user.name}</Typography>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </Container>
  );
};

export default User;
