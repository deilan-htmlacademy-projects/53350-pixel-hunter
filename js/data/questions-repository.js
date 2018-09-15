export default class QuestionsRepository {
  static getAll() {
    return fetch(`https://es.dump.academy/pixel-hunter/questions`).then(
        (response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(`${response.status} ${response.statusText}`);
        }
    );
  }
}
