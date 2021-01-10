import App from './app';
import RestService from './rest-service';

const rest = new RestService();
const app = new App({ rest });
