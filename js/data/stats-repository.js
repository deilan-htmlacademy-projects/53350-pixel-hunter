export default class StatsRepository {
  static getResults(appId, username) {
    verifyAppId(appId);
    verifyUsername(username);
    username = username.toLowerCase();
    return fetch(
        `https://es.dump.academy/pixel-hunter/stats/:${appId}-:${username}`,
        {
          method: `GET`,
          headers: {
            Accept: `application/json`
          }
        }
    ).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`${response.status} ${response.statusText}`);
    });
  }

  static postResult(appId, username, data) {
    verifyAppId(appId);
    verifyUsername(username);
    verifyCreateData(data);
    username = username.toLowerCase();
    return fetch(
        `https://es.dump.academy/pixel-hunter/stats/:${appId}-:${username}`,
        {
          method: `POST`,
          headers: {
            "Content-Type": `application/json`
          },
          body: JSON.stringify(data)
        }
    ).then((response) => {
      if (response.ok) {
        return undefined;
      }
      return Promise.reject(`${response.status} ${response.statusText}`);
    });
  }
}

const verifyAppId = (appId) => {
  if (!Number.isInteger(appId)) {
    throw new Error(`appId must be an integer number`);
  }
};

const verifyUsername = (username) => {
  if (typeof username !== `string` && !(username instanceof String)) {
    throw new Error(`username must be a string`);
  }
  if (username.trim() === ``) {
    throw new Error(`username must be a non-empty string`);
  }
};

const verifyCreateData = (data) => {
  // an example of valid data:
  // {
  //   // Статистика ответа пользователя
  //   stats: ['correct', 'wrong', 'fast', 'slow', 'correct', 'wrong', 'fast', 'slow', 'correct', 'wrong'],
  //   // Кол-во оставшихся жизней
  //   lives: 0
  // }

  if (typeof data !== `object`) {
    throw new Error(`data must be an object`);
  }

  if (!Number.isInteger(data.lives)) {
    throw new Error(`data.lives must be an integer number`);
  }

  if (
    !Array.isArray(data.stats) ||
    !data.stats.every((stat) => typeof stat === `string`)
  ) {
    throw new Error(`data.stats must be an array of strings`);
  }
};
