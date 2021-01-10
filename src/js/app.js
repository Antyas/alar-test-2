class App {
  constructor(modules, components) {
    this.createContext(modules);
    this.registerComponents(components);
  }

  async run() {
    await this.initComponents();
    this.ctx.logger.info('Аpp is running');
  }

  createContext(modules) {
    this.ctx = {};

    Object.values(modules).forEach(M => {
      const module = new M(this.ctx);
      this.ctx[module.name] = module;
    });
  }

  async initComponents() {
    const promices = Object.values(this.ctx.components).map(component => component.init());
    await Promise.all(promices);
  }

  registerComponents(components) {
    const entries = Object.values(components).map(C => {
      const component = new C(this.ctx);
      return [component.name, component];
    });

    this.ctx.components = Object.fromEntries(entries);
  }
}

export default App;