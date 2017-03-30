import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`
    query Groups {
        groups {
            id
            name
            students {
                id
                name
                age
            }
        }
    }
`;

export default graphql(query);
