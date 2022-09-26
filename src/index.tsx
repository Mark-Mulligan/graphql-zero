// React
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

// Apollo
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// MUI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import App from './App';
import Posts from './pages/Posts';
import Users from './pages/Users';
import User from './pages/User';

// CSS
import './index.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const client = new ApolloClient({
  uri: 'https://graphqlzero.almansi.me/api',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/users" element={<Users />} />
            <Route path="/user/:id" element={<User />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
