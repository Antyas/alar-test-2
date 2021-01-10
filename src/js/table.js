class UsersTable {
  constructor({ elementId, users, ctx }) {
    this.root = document.getElementById(elementId);
    this.body = this.root.querySelector('tbody');
    this.users = users;
    this.ctx = ctx;
  }

  fields =  ['name', 'phone']

  renderAll() {
    this.body.innerHTML = '';
    const nodes = this.users.map()
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
    cell.classList.add('table__cell');

    if (isEdit) {
      cell.append(createButton('Сохранить', this.saveRow(row)));
    } else {
      cell.append(createButton('Редактировать', this.editRow(row)));
    }

    cell.append(createButton('Удалить', this.deleteRow(row)));

    return cell;
  }

  createRow(user, isEdit = false) {
    const row = document.createElement('tr');
    row.classList.add('table__row');
    row.dataset.userId = user.id;

    this.fields.forEach(key => row.append(
      isEdit 
        ? this.createCell(user[key]) 
        : this.createInputCell(key, user[key])
    ));

    row.append(this.createButtonsCell(row, isEdit))
    
    return row;
  }

  editRow(row) {
    return async () => {
      const user = this.users.find(u => u.id === row.dataset.userId);
      const newRow =  createRow(user, true)
      row.after(newRow);
      row.remove();
    }
  }

  deleteRow(row) {
    return async () => {
      await this.ctx.rest.deleteUser(row.dataset.userId);
      row.remove();
    }
  }

  saveRow(row) {
    return async () => {
      
    }
  }
}