class App {
  constructor(modules, components) {
    this.ctx = { components: {} };
    this.registerModules(modules);
    this.registerComponents(components);
    this.ctx.logger.info('Аpp is running');
  }

  registerModules(modules) {
    Object.values(modules).forEach(M => {
      const module = new M(this.ctx);
      this.ctx[module.name] = module;
    });
  }

  registerComponents(components) {
    Object.values(components).forEach(C => {
      const component = new C(this.ctx);
      this.ctx.components[component.name] = component;
    });
  }
}

export default App;