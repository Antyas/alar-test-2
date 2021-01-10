class Logger {
  constructor(ctx) {
    this.ctx = ctx;
  }

  name = 'logger'

  info(text) {
    console.log(text);
  }

  error(err) {
    throw err;
  }
}

export default Logger;