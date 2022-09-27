// React Router
import { Link } from 'react-router-dom';

// MUI
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Card sx={{ maxWidth: 500 }}>
        <CardContent>
          <Typography>GraphQL Zero</Typography>
          <Typography>
            This app is built from the graphql zero api. The point is to demonstrate using graphQL in react.
            Technologies includes, react, react-router-dom, MUI, and Apollo GraphQL.
          </Typography>
          <Link to="/posts">View Posts</Link>
          <Link to="/users">View Users</Link>
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
