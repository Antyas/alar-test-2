/* 
  отлов ошибок по идее должен быть в инстансе аксиоса 
  или в своей оболочке над fetch, 
  так что тут в фейковом апи не буду асинхронные функции оборачивать в try-catch
*/

class RestService {
  name = 'rest';

  #backendData = {
    counter: 3,
    users: [
      { id: 0, name: 'Игорь', phone: '+79994443322' },
      { id: 1, name: 'Валентина', phone: '89091110055' },
      { id: 2, name: 'Григорий', phone: '+35554441111' },
      { id: 3, name: 'Людмила', phone: '+31119990066' },
    ],
  }

  #delay() {
    return new Promise((resolve) => setTimeout(resolve, 500));
  }

  async getUsers() {
    await this.#delay();
    return this.#backendData.users;
  }

  async updateUser(data) {
    await this.#delay();
    const user = this.#backendData.users.find(u => u.id === data.id);
    user.name = data.name;
    user.phone = data.phone;
    return user;
  }

  async deleteUser(id) {
    await this.#delay();
    this.#backendData.users.filter(u => u.id !== id)
  }

  async createUser(data) {
    await this.#delay();
    this.#backendData.counter += 1;
    const user = { ...data, id: this.#backendData.counter };
    this.#backendData.users.push(user);
    return user;
  }
}

export default RestService;