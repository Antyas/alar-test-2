class UsersTable {
  constructor(ctx) {
    this.name = 'usersTable';
    this.root = document.getElementById('user-table');
    this.body = this.root.querySelector('tbody');
    this.emptyString = document.getElementById('empty-string');
    this.ctx = ctx;
  }

  fields =  ['name', 'phone']

  async init() {
    await this.ctx.store.loadUsers();
    this.setEmptyTableString();
    this.renderAll();
  }

  setEmptyTableString() {
    const { classList } = this.emptyString;
    const className = 'empty-string--hide';
    this.ctx.store.users.length ? classList.add(className) : classList.remove(className);
  }

  renderAll() {
    this.body.innerHTML = '';
    this.ctx.store.users.forEach(user => this.body.append( this.createRow(user) ));
  }

  createCell(content) {
    const cell = document.createElement('td');
    cell.classList.add('table__cell');
    cell.textContent = content;
    return cell;
  }

  createInputCell(key, value) {
    const cell = document.createElement('td');
    cell.classList.add('table__cell');

    const input = document.createElement('input');
    input.classList.add('input');
    input.value = value;
    input.dataset.key = key;

    cell.append(input);
    return cell;
  }

  createButton(content, method) {
    const button = document.createElement('button');
    button.classList.add('button');
    button.textContent = content;
    button.addEventListener('click', method);
    return button;
  }

  createButtonsCell(row, isEdit) {
    const cell = document.createElement('td');
    cell.className = 'table__cell table__cell-control';

    if (isEdit) {
      cell.append(this.createButton('Сохранить', this.saveRow(row)));
      cell.append(this.createButton('Отменить', this.setEditRow(row, false)));
    } else {
      cell.append(this.createButton('Редактировать', this.setEditRow(row)));
      cell.append(this.createButton('Удалить', this.deleteRow(row)));
    }

    return cell;
  }

  addRow(user) {
    this.body.append(this.createRow(user));
  }

  createRow(user, isEdit = false) {
    const row = document.createElement('tr');
    row.classList.add('table__row');
    row.dataset.userId = user.id;

    this.fields.forEach(key => row.append(
      isEdit 
        ? this.createInputCell(key, user[key])
        : this.createCell(user[key])
    ));

    row.append(this.createButtonsCell(row, isEdit))
    
    return row;
  }

  setEditRow(row, isEdit = true) {
    return () => {
      const user = this.ctx.store.getUserById(+row.dataset.userId);
      const newRow = this.createRow(user, isEdit);
      row.after(newRow);
      row.remove();
    }
  }

  deleteRow(row) {
    return () => {
      this.ctx.store
        .deleteUser(+row.dataset.userId)
        .then(() => { 
          row.remove(); 
          this.setEmptyTableString(); 
        })
        .catch(this.ctx.logger.error);
    }
  }

  saveRow(row) {
    return async () => {
      const user = {
        phone: row.querySelector('input[data-key=phone]').value,
        name: row.querySelector('input[data-key=name]').value,
        id: +row.dataset.userId,
      };

      await this.ctx.store.updateUser(user);
      const newRow = this.createRow(user);
      row.after(newRow);
      row.remove();
    }
  }
}

export default UsersTable;