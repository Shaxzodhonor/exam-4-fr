import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient ,InMemoryCache, ApolloProvider } from "@apollo/client"
import App from './App';

const client = new ApolloClient({
  uri: "https://exam-4-b.herokuapp.com/",
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
  );
  
  