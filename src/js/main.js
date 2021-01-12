import App from './app';
import components from './components/index.js';
import modules from './modules/index.js';

document.addEventListener("DOMContentLoaded", () => {
  const app = new App(modules, components);
});

