import { types, flow } from 'mobx-state-tree';
import User from '../models/User';

const UserStore = types
  .model('UserStore', {
    users: types.array(User),
  })
  .actions(self => ({
    fetchUsers: flow(function* () {
      try {
        const response = yield fetch('https://jsonplaceholder.typicode.com/users');
        const data = yield response.json();
        self.users = data.map(user => ({
          id: user.id,
          name: user.name,
          isBlocked: false,
        }));
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    }),
      addUser(user) {
       self.users.push(user);
    },
    removeUser(userId) {
      self.users = self.users.filter(user => user.id !== userId);
    },
    editUser(userId, newName) {
      const user = self.users.find(u => u.id === userId);
      if (user) {
        user.editName(newName);
      }
    },
  }));

export default UserStore;

