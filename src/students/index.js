import React, { Component } from 'react';
import { compose } from 'react-apollo';
import bem from 'bem-cn';

import Student from '../student';

import StudentsQuery from './queries/students';
import CreateStudentMutation from './mutations/create';
import UpdateStudentMutation from './mutations/update';
import RemoveStudentMutation from './mutations/remove';

import './index.css';

const b = bem('students');

class Students extends Component {
    state = {
        name: '',
        age: '',
        groupId: ''
    }

    handleInputChange = fieldName => event => {
        this.setState({
            [fieldName]: event.target.value
        });
    }

    handleAddClick = async () => {
        await this.props.createStudent({
            age: this.state.age,
            name: this.state.name,
            groupId: this.state.groupId
        });

        this.setState({
            age: '',
            name: '',
            groupId: ''
        });
    }

    render() {
        const { data, removeStudent, updateStudent } = this.props;
        const { name, age, groupId } = this.state;

        if (data.loading) {
            return <div>Загрузка...</div>;
        }

        if (data.error) {
            return (
                <div>
                    Не удалось получить информацию. <br />
                    Убедитесь что GraphQL сервер запущен и перезагрузите страницу.
                </div>
            );
        }

        return (
            <div className={b}>
                <div className={b('title')}>Студенты</div>
                <div className={b('columns')}>
                    <div className={b('column-id')}>ID</div>
                    <div className={b('column-name')}>Имя</div>
                    <div className={b('column-age')}>Возраст</div>
                    <div className={b('column-group')}>Группа</div>
                </div>
                {data.students.map(student => (
                    <Student
                        student={student}
                        key={student.id}
                        className={b('student')}
                        onRemove={removeStudent(student.id)}
                        onUpdate={updateStudent(student.id)}
                    />
                ))}
                <div className={b('form')}>
                    <label className={b('form-name')}>
                        <div className={b('label-text')}>Имя:</div>
                        <input
                            type="text"
                            value={this.state.name}
                            onChange={this.handleInputChange('name')}
                        />
                    </label>
                    <label className={b('form-age')}>
                        <div className={b('label-text')}>Возраст:</div>
                        <input
                            type="number"
                            value={this.state.age}
                            onChange={this.handleInputChange('age')}
                        />
                    </label>
                    <label className={b('form-group')}>
                        <div className={b('label-text')}>Группа:</div>
                        <input
                            value={this.state.groupId}
                            onChange={this.handleInputChange('groupId')}
                        />
                    </label>
                    <button
                        disabled={!name || !age || !groupId}
                        className={b('add-button')}
                        onClick={this.handleAddClick}
                    >
                        Добавить
                    </button>
                </div>
            </div>
        );
    }
}

export default compose(
    StudentsQuery,
    CreateStudentMutation,
    UpdateStudentMutation,
    RemoveStudentMutation
)(Students);
