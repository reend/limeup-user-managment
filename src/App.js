import React, { useEffect, useState, useMemo } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

import UserList from './components/UserList';
import UserStore from './stores/UserStore';
import User from './models/User';

const App = () => {
  const userStore = useMemo(() => UserStore.create({ users: [] }), []);
  const [newUserName, setNewUserName] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    userStore.fetchUsers();
  }, [userStore]);

  const handleEdit = userId => {
    setEditingUserId(userId);
    const user = userStore.users.find(u => u.id === userId);
    setNewUserName(user.name);
  };

  const handleSaveEdit = () => {
    userStore.editUser(editingUserId, newUserName);
    setEditingUserId(null);
    setNewUserName('');
  };

  const handleAddUser = () => {
    const newUser = User.create({
      id: userStore.users.length + 1,
      name: newUserName,
      isBlocked: false,
    });
    userStore.addUser(newUser);
    setNewUserName('');
  };

  const handleDelete = userId => {
    userStore.removeUser(userId);
  };

  const handleToggleBlock = userId => {
    const user = userStore.users.find(u => u.id === userId);
    user.toggleBlock();
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setNewUserName('');
  };

  return (
    <AppContainer>
      <Title>User Management</Title>
      <UserList
        users={userStore.users}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleBlock={handleToggleBlock}
      />
      <InputContainer>
        <Input
          type="text"
          value={newUserName}
          onChange={e => setNewUserName(e.target.value)}
        />
        {editingUserId ? (
          <>
            <Button onClick={handleSaveEdit}>Save Edit</Button>
            <Button onClick={handleCancelEdit}>Cancel Edit</Button>
          </>
        ) : (
          <Button onClick={handleAddUser}>Add User</Button>
        )}
      </InputContainer>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
`;

const InputContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 8px;
  margin-right: 8px;
`;

const Button = styled.button`
  margin-right: 8px;
  padding: 8px;
  cursor: pointer;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

export default observer(App);
