import React from 'react';
import { observer } from 'mobx-react';

import styled from 'styled-components';

const UserList = ({ users, onEdit, onDelete, onToggleBlock }) => (
  <ul>
    {users.map(user => (
      <UserListItem key={user.id} blocked={user.isBlocked}>
        <span>{user.name}</span>
        <button onClick={() => onEdit(user.id)} disabled={user.isBlocked}>Edit</button>
        <button onClick={() => onDelete(user.id)} disabled={user.isBlocked}>Delete</button>
        <button onClick={() => onToggleBlock(user.id)}>
          {user.isBlocked ? 'Unblock' : 'Block'}
        </button>
      </UserListItem>
    ))}
  </ul>
);

const UserListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: ${props => (props.blocked ? '#ffe6e6' : '#f0f8ff')};

  span {
    margin-right: 12px;
    font-weight: bold;
    color: ${props => (props.blocked ? 'red' : 'blue')};
  }

  button {
    margin-right: 8px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:disabled {
      cursor: not-allowed;
      background-color: #eee;
    }

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;


export default observer(UserList);
