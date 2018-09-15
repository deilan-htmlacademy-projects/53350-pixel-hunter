export default class QuestionsRepository {
  static getAll() {
    return fetch(`https://es.dump.academy/pixel-hunter/questions`, {
      method: `GET`,
      headers: {
        Accept: `application/json`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`${response.status} ${response.statusText}`);
    });
  }
}
