import { gql, useQuery } from '@apollo/client';

const GET_USERS = gql`
  query {
    user(id: 1) {
      id
      username
      email
      address {
        geo {
          lat
          lng
        }
      }
    }
  }
`;

const Users = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data);
  return (
    <div>
      <h1>Users</h1>
    </div>
  );
};

export default Users;
