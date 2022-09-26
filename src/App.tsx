import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>App</h1>
      <Link to="/posts">View Posts</Link>
      <Link to="/users">View Users</Link>
    </div>
  );
}

export default App;
