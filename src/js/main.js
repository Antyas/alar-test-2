import App from './app';
import components from './components/index.js';
import modules from './modules/index.js';

const app = new App(modules, components);
app.run();
