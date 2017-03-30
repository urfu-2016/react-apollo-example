import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const mutation = gql`
    mutation CreateStudent($name: String!, $age: Int!, $groupId: ID!) {
        createStudent(name: $name, age: $age, groupId: $groupId) {
            id
            name
            age
            group {
                id
            }
        }
    }
`;

export default graphql(mutation, {
    props: ({ mutate }) => ({
        createStudent: ({ name, age, groupId }) => mutate({
            variables: { name, age, groupId },
            optimisticResponse: {
                createStudent: {
                    __typename: 'Student',
                    id: null,
                    name,
                    age,
                    group: {
                        __typename: 'Group',
                        id: groupId
                    }
                }
            },
            updateQueries: {
                Students: (previousResult, { mutationResult }) => {
                    const createdStudent = mutationResult.data.createStudent;

                    return {
                        ...previousResult,
                        students: [...previousResult.students, createdStudent]
                    };
                }
            }
        })
    })
});
