import React, { Component } from 'react';
import bem from 'bem-cn';

import './index.css';

const b = bem('group')

export default class Group extends Component {
    state = {
        isUpdating: false,
        newName: this.props.group.name
    }

    handleUpdateInputChange = event => {
        this.setState({ newName: event.target.value });
    }

    handleUpdateButtonClick = () => {
        this.setState({ isUpdating: true });
    }

    handleSaveButtonClick = async () => {
        await this.props.onUpdate({ name: this.state.newName });

        this.setState({ isUpdating: false });
    }

    render() {
        const { isUpdating } = this.state;
        const { group, onRemove, className } = this.props;

        if (isUpdating) {
            return (
                <div className={b.mix(className)}>
                    <div className={b('id')}>{group.id}</div>
                    <input
                        type="text"
                        className={b('input')}
                        value={this.state.newName}
                        onChange={this.handleUpdateInputChange}
                    />
                    <button className={b('button')} onClick={this.handleSaveButtonClick}>
                        Сохранить
                    </button>
                    <button className={b('button')} onClick={onRemove}>
                        Удалить
                    </button>
                </div>
            );
        }

        return (
            <div className={b.mix(className)}>
                <div className={b('id')}>{group.id}</div>
                <div className={b('name')}>{group.name}</div>
                <button className={b('button')} onClick={this.handleUpdateButtonClick}>
                    Изменить
                </button>
                <button className={b('button')} onClick={onRemove}>
                    Удалить
                </button>
            </div>
        );
    }
};
