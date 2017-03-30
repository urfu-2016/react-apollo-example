import React, { Component } from 'react';
import { compose } from 'react-apollo';
import bem from 'bem-cn';

import Group from '../group';

import GroupsQuery from './queries/groups';
import CreateGroupMutation from './mutations/create';
import UpdateGroupMutation from './mutations/update';
import RemoveGroupMutation from './mutations/remove';

import './index.css';

const b = bem('groups');

class Groups extends Component {
    state = {
        name: ''
    }

    handleInputChange = event => {
        this.setState({
            name: event.target.value
        });
    }

    handleAddClick = async () => {
        await this.props.createGroup({ name: this.state.name });

        this.setState({ name: '' });
    }

    render() {
        const { data, removeGroup, updateGroup } = this.props;

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
                <div className={b('title')}>Группы</div>
                <div className={b('columns')}>
                    <div className={b('column-id')}>ID</div>
                    <div className={b('column-name')}>Название</div>
                </div>
                {data.groups.map(group => (
                    <Group
                        group={group}
                        key={group.id}
                        className={b('group')}
                        onRemove={removeGroup(group.id)}
                        onUpdate={updateGroup(group.id)}
                    />
                ))}
                <div className={b('form')}>
                    <label className={b('form-name')}>
                        <div className={b('label-text')}>Название:</div>
                        <input
                            type="text"
                            value={this.state.name}
                            onChange={this.handleInputChange}
                        />
                        <button
                            disabled={!this.state.name}
                            className={b('add-button')}
                            onClick={this.handleAddClick}
                        >
                            Добавить
                        </button>
                    </label>
                </div>
            </div>
        );
    }
}

export default compose(
    GroupsQuery,
    CreateGroupMutation,
    UpdateGroupMutation,
    RemoveGroupMutation
)(Groups);
