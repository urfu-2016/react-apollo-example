import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const mutation = gql`
    mutation RemoveGroup($id: ID!) {
        removeGroup(id: $id)
    }
`;

export default graphql(mutation, {
    props: ({ mutate }) => ({
        removeGroup: id => () => mutate({
            variables: { id },
            optimisticResponse: {
                removeGroup: true
            },
            updateQueries: {
                Groups: previousResult => {
                    const groups = [...previousResult.groups];
                    const index = groups.findIndex(group => group.id === id);

                    groups.splice(index, 1);

                    return {
                        ...previousResult,
                        groups
                    };
                }
            }
        })
    })
});
