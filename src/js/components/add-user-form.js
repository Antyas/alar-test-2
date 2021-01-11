class AddUserForm {
  constructor(ctx) {
    this.ctx = ctx;
    this.form = document.getElementById(this.name);
    this.nameInput = this.form.querySelector('.input[data-key=name]');
    this.phoneInput = this.form.querySelector('.input[data-key=phone]');
    this.button = this.form.querySelector('.button');

    this.form.addEventListener('submit', this.#onSubmit.bind(this));
  }

  name = 'add-user-form'

  #onSubmit(e) {
    e.preventDefault();

    const name = this.nameInput?.value;
    const phone = this.phoneInput?.value;

    this.ctx.store.createUser({ name, phone });
  }

  clear() {
    this.form.reset();
  }
}

export default AddUserForm;