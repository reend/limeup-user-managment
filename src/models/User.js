import { types } from 'mobx-state-tree';

const User = types.model('User', {
  id: types.identifierNumber,
  name: types.string,
  isBlocked: types.boolean,
})
.actions(self => ({
  toggleBlock() {
    self.isBlocked = !self.isBlocked;
  },
  editName(newName) {
    self.name = newName;
  },
}));

export default User;
