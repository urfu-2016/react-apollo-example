import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { createNetworkInterface } from 'apollo-client';

import Groups from './groups';
import Students from './students';

import './index.css';

const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: 'http://localhost:8080/graphql'
    })
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <div className="root-container">
            <Groups />
            <Students />
        </div>
    </ApolloProvider>,
    document.getElementById('root')
);
