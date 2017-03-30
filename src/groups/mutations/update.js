import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const mutation = gql`
    mutation UpdateGroup($id: ID!, $name: String!) {
        updateGroup(id: $id, name: $name) {
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
        updateGroup: id => ({ name }) => mutate({
            variables: { id, name },
            optimisticResponse: {
                updateGroup: { id, name }
            },
            updateQueries: {
                Groups: (previousResult, { mutationResult }) => {
                    const groups = [...previousResult.groups];
                    const updatedGroup = mutationResult.data.updateGroup;

                    const index = groups.findIndex(group => group.id === id);

                    groups[index] = updatedGroup;

                    return {
                        ...previousResult,
                        groups
                    };
                }
            }
        })
    })
});
