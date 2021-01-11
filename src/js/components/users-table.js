class UsersTable {
  constructor(ctx) {
    this.table = document.getElementById(this.name);
    this.body = this.table.querySelector('tbody');
    this.ctx = ctx;
    this.#load();
  }

  fields =  ['name', 'phone']

  name = 'users-table'

  #currentEditUser = null;

  async #load() {
    await this.ctx.store.loadUsers();
    this.#renderAll();
  }

  #renderAll() {
    this.body.innerHTML = '';
    this.ctx.store.users.forEach(user => this.body.append( this.#createRow(user) ));
  }

  #createCell(content) {
    const cell = document.createElement('td');
    cell.classList.add('table__cell');
    cell.textContent = content;
    return cell;
  }

  #createInputCell(key, value) {
    const cell = document.createElement('td');
    cell.classList.add('table__cell');

    const input = document.createElement('input');
    input.classList.add('input');
    input.value = value;
    input.dataset.key = key;

    cell.append(input);
    return cell;
  }

  #createButton(content, method) {
    const button = document.createElement('button');
    button.classList.add('button');
    button.textContent = content;
    button.addEventListener('click', method);
    return button;
  }

  #createButtonsCell(user, isEdit) {
    const cell = document.createElement('td');
    cell.className = 'table__cell table__cell-control';

    if (isEdit) {
      cell.append(this.#createButton('Сохранить', this.#saveUser(user.id)));
      cell.append(this.#createButton('Отменить', this.#setEditRow(user, false)));
    } else {
      cell.append(this.#createButton('Редактировать', this.#setEditRow(user, true)));
      cell.append(this.#createButton('Удалить', this.#deleteUser(user.id)));
    }

    return cell;
  }

  #createRow(user, isEdit = false) {
    const row = document.createElement('tr');
    row.classList.add('table__row');
    row.dataset.userId = user.id;

    this.fields.forEach(key => row.append(
      isEdit 
        ? this.#createInputCell(key, user[key])
        : this.#createCell(user[key])
    ));

    row.append(this.#createButtonsCell(user, isEdit));
    
    return row;
  }

  getRowById(id) {
    return this.body.querySelector(`.table__row[data-user-id=${CSS.escape(id)}]`);
  }

  
  addRow(user) {
    this.body.append(this.#createRow(user));
  }

  updateRow(user, isEdit) {
    const row = this.getRowById(user.id);
    const newRow = this.#createRow(user, isEdit);
    row.after(newRow);
    row.remove();
  }

  deleteRow(id) {
    const row = this.getRowById(id);
    row.remove();
  }

  #setEditRow(user, isEdit) {
    return () => {
      this.ctx.store.clearErrors();
      if (this.#currentEditUser) this.updateRow(this.#currentEditUser, false);
      if (!isEdit) return;
      this.updateRow(user, true);
      this.#currentEditUser = user;
    }
  }

  #deleteUser(id) {
    return () => {
      if (this.#currentEditUser?.id === id) this.#currentEditUser = null;
      this.ctx.store.deleteUser(id);
    } 
  }

  #saveUser(id) {
    return async () => {
      const row = this.body.querySelector(`.table__row[data-user-id=${CSS.escape(id)}]`);

      const user = this.fields.reduce((res, key) => {
        res[key] = row.querySelector(`.input[data-key=${key}]`).value;
        return res;
      }, { id });

      await this.ctx.store.updateUser(user);
    }
  }
}

export default UsersTable;