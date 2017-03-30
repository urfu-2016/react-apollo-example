import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`
    query Students {
        students {
            id
            name
            age
            group {
                id
            }
        }
    }
`;

export default graphql(query);
