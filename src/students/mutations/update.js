import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const mutation = gql`
    mutation UpdateStudent($id: ID!, $name: String, $age: Int, $groupId: ID) {
        updateStudent(id: $id, name: $name, age: $age, groupId: $groupId) {
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
        updateStudent: id => ({ name, age, groupId }) => mutate({
            variables: { id, name, age, groupId },
            optimisticResponse: {
                updateStudent: { id, name, age, groupId }
            },
            updateQueries: {
                Students: (previousResult, { mutationResult }) => {
                    const students = [...previousResult.students];
                    const updatedStudent = mutationResult.data.updateStudent;

                    const index = students.findIndex(student => student.id === id);

                    students[index] = updatedStudent;

                    return {
                        ...previousResult,
                        students
                    }
                }
            }
        })
    })
});
