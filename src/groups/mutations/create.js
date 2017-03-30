import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const mutation = gql`
    mutation CreateGroup($name: String!) {
        createGroup(name: $name) {
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

export default graphql(mutation, {
    props: ({ mutate }) => ({
        createGroup: ({ name }) => mutate({
            variables: { name },
            optimisticResponse: {
                createGroup: {
                    __typename: 'Group',
                    id: null,
                    name,
                    students: []
                }
            },
            updateQueries: {
                Groups: (previousResult, { mutationResult }) => {
                    const createdGroup = mutationResult.data.createGroup;
                    const groups = [...previousResult.groups, createdGroup];

                    return {
                        ...previousResult,
                        groups
                    }
                }
            }
        })
    })
});
