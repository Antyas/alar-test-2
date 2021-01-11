class ErrorBox {
  constructor(ctx) {
    this.ctx = ctx;
    this.box = document.getElementById(this.name);
  }

  name = 'error-box'

  update() {
    if (this.ctx.store.errors.length) {
      this.box.textContent = `Ошибки: ${this.ctx.store.errors.join('; ')}`;
      this.box.classList.remove('error-box--hide');
    } else {
      this.box.textContent = '';
      this.box.classList.add('error-box--hide');
    }
  }
}

export default ErrorBox;