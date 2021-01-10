class Store {
  constructor(ctx) {
    this.ctx = ctx;
    this.users = [];
  }

  name = 'store'

  async loadUsers() {
    this.users = await this.ctx.rest.getUsers();
  }

  getUserById(id) {
    return this.users.find(user => user.id === id);
  }

  async deleteUser(id) {
    await this.ctx.rest.deleteUser(id);
    this.users = this.users.filter(user => user.id !== id);
  }

  async updateUser({id, name, phone}) {
    const user = this.users.find(user => user.id === id);
    user.name = name;
    user.phone = phone;
    await this.ctx.rest.updateUser(user);
  }
}

export default Store;