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

interface UserDataPoint {
  accessKey: keyof IUser;
  label: string;
}

const UserDataPoints: UserDataPoint[] = [
  { accessKey: 'name', label: 'Name' },
  { accessKey: 'username', label: 'Username' },
  { accessKey: 'email', label: 'Email' },
  { accessKey: 'phone', label: 'Phone' },
  { accessKey: 'website', label: 'website' },
];

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container sx={{ paddingTop: 2 }}>
      <Typography variant="h1" sx={{ fontSize: '2rem', textAlign: 'center' }}>
        User Info
      </Typography>
      <List sx={{ margin: 'auto', maxWidth: 500 }}>
        {data &&
          UserDataPoints.map((dataPoint, index) => {
            const userData = data.user[dataPoint.accessKey];

            if (typeof userData === 'string') {
              return (
                <ListItem key={`userDataPoint-${index}`}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sx={{ textAlign: 'right' }}>
                      <Typography>{dataPoint.label}:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 300 }}>{userData}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              );
            }

            return null;
          })}

        <ListItem>
          <Grid container spacing={2}>
            <Grid item xs={6} sx={{ textAlign: 'right' }}>
              <Typography>Company:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 300 }}>
                {data?.user.company.name}
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container spacing={2}>
            <Grid item xs={6} sx={{ textAlign: 'right' }}>
              <Typography>Address:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 300 }}>
                {data?.user.address.street}, {data?.user.address.city}, {data?.user.address.zipcode}
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </Container>
  );
};

export default User;
