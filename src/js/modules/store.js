/*
  Стора не должна управлять компонентами, но так сейчас проще всего сделать реактивность
*/

class Store {
  constructor(ctx) {
    this.ctx = ctx;
    this.users = [];
    this.errors = [];
  }

  name = 'store'

  async loadUsers() {
    this.users = await this.ctx.rest.getUsers();
    this.ctx.components['empty-table-info'].update();
  }

  getUserById(id) {
    return this.users.find(user => user.id === id);
  }

  async deleteUser(id) {
    await this.ctx.rest.deleteUser(id);
    this.users = this.users.filter(user => user.id !== id);
    this.ctx.components['empty-table-info'].update();
    this.ctx.components['users-table'].deleteRow(id);
  }

  async updateUser(data) {
    if (this.#validateUser(data)) return;

    const user = this.users.find(user => user.id === data.id);
    user.name = data.name;
    user.phone = data.phone;
    
    await this.ctx.rest.updateUser(user);
    this.ctx.components['users-table'].updateRow(user);
  }

  async createUser(data) {
    if (this.#validateUser(data)) return;
    const user = await this.ctx.rest.createUser(data);
    this.users.push(user);
    this.ctx.components['users-table'].addRow(user);
    this.ctx.components['empty-table-info'].update();
    this.ctx.components['add-user-form'].clear();
  }

  clearErrors() {
    this.errors = [];
    this.ctx.components['error-box'].update();
  }

  #validateUser({ name, phone }) {
    this.errors = [];

    if (!name.trim()) this.errors.push('Имя - обязательное поле');
    /* 
      по хорошему надо бы это делать с маской. 
      в тз не было ничего про длинну номера или про страну с форматом номера, 
      так что будем считать что валидный любой не пустой номер 
    */
    if (!phone || phone.replace(/\+?\d+/, '')) this.errors.push('Невалидный телефон');

    this.ctx.components['error-box'].update();
    return Boolean(this.errors.length);
  }
}

export default Store;