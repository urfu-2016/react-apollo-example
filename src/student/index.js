import React, { Component } from 'react';
import bem from 'bem-cn';

import './index.css';

const b = bem('student');

export default class Student extends Component {
    state = {
        isUpdating: false,
        newName: this.props.student.name,
        newAge: this.props.student.age,
        newGroupId: this.props.student.group && this.props.student.group.id
    }

    handleInputChange = fieldName => event => {
        this.setState({ [fieldName]: event.target.value });
    }

    handleUpdateButtonClick = () => {
        this.setState({ isUpdating: true });
    }

    handleSaveButtonClick = async () => {
        await this.props.onUpdate({
            age: this.state.newAge,
            name: this.state.newName,
            groupId: this.state.newGroupId
        });

        this.setState({ isUpdating: false });
    }

    render() {
        const { isUpdating } = this.state;
        const { student, onRemove, className } = this.props;

        if (isUpdating) {
            return (
                <div className={b.mix(className)}>
                    <div className={b('id')}>{student.id}</div>
                    <input
                        type="text"
                        className={b('input-name')}
                        value={this.state.newName}
                        onChange={this.handleInputChange('newName')}
                    />
                    <input
                        type="number"
                        className={b('input-age')}
                        value={this.state.newAge}
                        onChange={this.handleInputChange('newAge')}
                    />
                    <input
                        className={b('input-group')}
                        value={this.state.newGroupId}
                        onChange={this.handleInputChange('newGroupId')}
                    />
                    <button className={b('update-button')} onClick={this.handleSaveButtonClick}>
                        Сохранить
                    </button>
                    <button className={b('remove-button')} onClick={onRemove}>
                        Удалить
                    </button>
                </div>
            );
        }

        return (
            <div className={b.mix(className)}>
                <div className={b('id')}>{student.id}</div>
                <div className={b('name')}>{student.name}</div>
                <div className={b('age')}>{student.age}</div>
                <div className={b('group')}>{student.group && student.group.id}</div>
                <button className={b('update-button')} onClick={this.handleUpdateButtonClick}>
                    Изменить
                </button>
                <button className={b('remove-button')} onClick={onRemove}>
                    Удалить
                </button>
            </div>
        );
    }
};