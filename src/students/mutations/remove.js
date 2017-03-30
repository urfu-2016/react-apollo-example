import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const mutation = gql`
    mutation RemoveStudent($id: ID!) {
        removeStudent(id: $id)
    }
`;

export default graphql(mutation, {
    props: ({ mutate }) => ({
        removeStudent: id => () => mutate({
            variables: { id },
            optimisticResponse: {
                removeStudent: true
            },
            updateQueries: {
                Students: previousResult => {
                    const students = [...previousResult.students];
                    const index = students.findIndex(student => student.id === id);

                    students.splice(index, 1);

                    return {
                        ...previousResult,
                        students
                    };
                }
            }
        })
    })
});
