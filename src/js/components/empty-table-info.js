class EmptyTableInfo {
  constructor(ctx) {
    this.ctx = ctx;
    this.box = document.getElementById(this.name);
  }

  name = 'empty-table-info'

  update() {
    if (this.ctx.store.users.length) {
      this.box.classList.add('empty-table-info--hide');
    } else {
      this.box.classList.remove('empty-table-info--hide');
    }
  }
}

export default EmptyTableInfo;