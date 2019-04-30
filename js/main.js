(function () {
  'use strict';

  class EventEmitter {
    constructor() {
      this._handlers = new Map();
    }

    on(eventType, handler) {
      verifyEventType(eventType);
      verifyHandler(handler);

      let eventTypeHandlers = this._handlers.get(eventType);
      if (!eventTypeHandlers) {
        eventTypeHandlers = new Set();
        this._handlers.set(eventType, eventTypeHandlers);
      }
      eventTypeHandlers.add(handler);
    }

    remove(eventType, handler) {
      verifyEventType(eventType);
      verifyHandler(handler);

      const eventTypeHandlers = this._handlers.get(eventType);
      if (!eventTypeHandlers) {
        return;
      }

      eventTypeHandlers.delete(handler);
      if (eventTypeHandlers.size === 0) {
        this._handlers.delete(eventType);
      }
    }

    fire(eventType, ...args) {
      verifyEventType(eventType);

      const eventTypeHandlers = this._handlers.get(eventType);
      if (!eventTypeHandlers) {
        return;
      }

      for (const handler of eventTypeHandlers) {
        handler(...args);
      }
    }
  }

  const verifyEventType = (eventType) => {
    if (typeof eventType !== `string` && !(eventType instanceof String)) {
      throw new Error(`eventType must be a string`);
    }
  };

  const verifyHandler = (handler) => {
    if (typeof handler !== `function`) {
      throw new Error(`handler must be a const`);
    }
  };

  const createElement = (template, tagName = `div`) => {
    const el = document.createElement(tagName);
    el.innerHTML = template;
    return el;
  };

  class AbstractView {
    constructor() {
      if (new.target === AbstractView) {
        throw new Error(
            `Could not instantiate an AbstractView.` +
            ` Instantiate a concrete subclass instead.`
        );
      }
    }

    get element() {
      if (!this._element) {
        this._element = this._render();
        this._bind(this._element);
      }

      return this._element;
    }

    get _template() {
      throw new Error(`'_template' getter must be overrided`);
    }

    _render() {
      return createElement(this._template);
    }

    _bind(_element) {}
  }

  class ScreenView extends AbstractView {
    constructor() {
      if (new.target === ScreenView) {
        throw new Error(
            `Could not instantiate an ScreenView.` +
            ` Instantiate a concrete subclass instead.`
        );
      }

      super();
      this.eventEmitter = new EventEmitter();
    }

    get timerElement() {
      if (!this._timerElement) {
        this._timerElement = this.element.querySelector(`.game__timer`);
      }
      return this._timerElement;
    }

    updateTime(time) {
      const timerElement = this.timerElement;
      if (timerElement) {
        timerElement.textContent = time;
      }
    }

    blinkTime() {
      const timerElement = this.timerElement;
      if (timerElement) {
        timerElement.style.color = timerElement.style.color !== `black`
          ? `black`
          : `red`;
      }
    }

    _bind(_element) {
      const backBtn = _element.querySelector(`.back`);

      if (backBtn) {
        backBtn.addEventListener(`click`, () => {
          this.eventEmitter.fire(`reset`);
        });
      }
    }
  }

  // Интро
  class IntroView extends ScreenView {
    get _template() {
      return `<section class="intro">
      <button class="intro__asterisk asterisk" type="button">
        <span class="visually-hidden">Продолжить</span>*
      </button>
      <p class="intro__motto">
        <sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.
      </p>
    </section>`;
    }

    _bind(_element) {
      super._bind(_element);

      _element
        .querySelector(`.intro__asterisk`)
        .addEventListener(`click`, () => this.eventEmitter.fire(`next`));
    }
  }

  class IntroScreen {
    constructor(game) {
      this.game = game;
      this.view = new IntroView();
      this.view.eventEmitter.on(`next`, () => App.showGreeting());
    }
  }

  const render = (containerElement, element) => {
    containerElement.innerHTML = ``;
    containerElement.appendChild(element);
  };

  // Приветствие
  class GreetingView extends ScreenView {
    get _template() {
      return `<section class="greeting central--blur">
      <img class="greeting__logo" src="img/logo_ph-big.svg" width="201" height="89" alt="Pixel Hunter">
      <div class="greeting__asterisk asterisk"><span class="visually-hidden">Я просто красивая звёздочка</span>*</div>
      <div class="greeting__challenge">
        <h3 class="greeting__challenge-title">Лучшие художники-фотореалисты бросают тебе вызов!</h3>
        <p class="greeting__challenge-text">Правила игры просты:</p>
        <ul class="greeting__challenge-list">
          <li>Нужно отличить рисунок от фотографии и сделать выбор.</li>
          <li>Задача кажется тривиальной, но не думай, что все так просто.</li>
          <li>Фотореализм обманчив и коварен.</li>
          <li>Помни, главное — смотреть очень внимательно.</li>
        </ul>
      </div>
      <button class="greeting__continue" type="button">
        <span class="visually-hidden">Продолжить</span>
        <svg class="icon" width="64" height="64" viewBox="0 0 64 64" fill="#000000">
          <use xlink:href="img/sprite.svg#arrow-right"></use>
        </svg>
      </button>
    </section>`;
    }

    _bind(_element) {
      super._bind(_element);

      _element
        .querySelector(`.greeting__continue`)
        .addEventListener(`click`, () => this.eventEmitter.fire(`next`));
    }
  }

  class GreetingScreen {
    constructor(game) {
      this.game = game;
      this.view = new GreetingView(this.game);
      this.view.eventEmitter.on(`next`, () => App.showRules());
    }
  }

  const getBackButton = () => {
    return `<button class="back">
    <span class="visually-hidden">Вернуться к началу</span>
    <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
      <use xlink:href="img/sprite.svg#arrow-left"></use>
    </svg>
    <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
      <use xlink:href="img/sprite.svg#logo-small"></use>
    </svg>
  </button>`;
  };

  const getHeader = (game, {showState} = {showState: false}) => {
    return `<header class="header">
    ${getBackButton()}
    ${showState ? getState(game) : ``}
  </header>`;
  };

  const getState = (game) => {
    return getGameTimer(game) + ` ` + getGameLives(game);
  };

  const getGameTimer = (game) => {
    return `<div class="game__timer">${game.state.time}</div>`;
  };

  const getGameLives = (game) => {
    return `<div class="game__lives">
    ${getHearts(game)}
  </div>`;
  };

  const getHearts = (game) => {
    return Array.from({length: game.rules.lives}, (_, i) =>
      getHeart(i + 1 <= game.state.lives)
    ).join(` `);
  };

  const getHeart = (flag) => {
    const src = flag ? `img/heart__full.svg` : `img/heart__empty.svg`;
    const alt = flag ? `Life` : `Missed Life`;
    return `<img src="${src}" class="game__heart" alt="${alt}" width="31" height="27">`;
  };

  const getStats = (stats) => {
    return `<ul class="stats">
    ${getResults(stats)}
  </ul>`;
  };

  const getResults = (stats) => {
    return stats.map((statsItem) => getResult(statsItem)).join(` `);
  };

  const getResult = (statsItem = `unknown`) => {
    return `<li class="stats__result stats__result--${statsItem}"></li>`;
  };

  const getResult$1 = (game, gameResults) => {
    return `${getHeader(game)}
  <section class="result">
    <h2 class="result__title">
      ${game.isWin() ? `Победа!` : `Поражение!`}
    </h2>
    ${getResultTables(gameResults)}
  </section>`;
  };

  const getResultTables = (gameResults) => {
    return gameResults
      .map((gameResult, index) => getResultTable(gameResult, index))
      .join(` `);
  };

  const getResultTable = (gameResult, index) => {
    return `<table class="result__table">
    ${getGeneral(gameResult, index)}
    ${getSpeed(gameResult)}
    ${getLives(gameResult)}
    ${getSlow(gameResult)}
    ${getTotal(gameResult)}
  </table>`;
  };

  const getGeneral = (gameResult, index) => {
    return `<tr>
    <td class="result__number">${index + 1}.</td>
    <td colspan="2">
      ${getStats(gameResult.stats)}
    </td>
    <td class="result__points">× ${gameResult.getCorrectPoints()}</td>
    <td class="result__total">
      ${gameResult.isWin() ? gameResult.getCorrectTotal() : `Fail`}
    </td>
  </tr>`;
  };

  const getSpeed = (gameResult) => {
    return `<tr>
    <td></td>
    <td class="result__extra">Бонус за скорость:</td>
    <td class="result__extra">
      ${gameResult.getQuickCount()}
      <span class="stats__result stats__result--fast"></span>
    </td>
    <td class="result__points">× ${gameResult.getQuickPoints()}</td>
    <td class="result__total">${gameResult.getQuickTotal()}</td>
  </tr>`;
  };

  const getLives = (gameResult) => {
    return `<tr>
    <td></td>
    <td class="result__extra">Бонус за жизни:</td>
    <td class="result__extra">
      ${gameResult.getLivesCount()}
      <span class="stats__result stats__result--alive"></span>
    </td>
    <td class="result__points">× ${gameResult.getLivesPoints()}</td>
    <td class="result__total">${gameResult.getLivesTotal()}</td>
  </tr>`;
  };

  const getSlow = (gameResult) => {
    return `<tr>
    <td></td>
    <td class="result__extra">Штраф за медлительность:</td>
    <td class="result__extra">
      ${gameResult.getSlowCount()}
      <span class="stats__result stats__result--slow"></span>
    </td>
    <td class="result__points">× ${gameResult.getSlowPoints()}</td>
    <td class="result__total">${gameResult.getSlowTotal()}</td>
  </tr>`;
  };

  const getTotal = (gameResult) => {
    return `<tr>
    <td colspan="5" class="result__total result__total--final">
    ${gameResult.getFinalTotal()}
    </td>
  </tr>`;
  };

  // Общая статистика по всем игрокам
  class StatsView extends ScreenView {
    constructor(game, gameResults) {
      super();
      this.game = game;
      this.gameResults = gameResults;
    }

    get _template() {
      return getResult$1(this.game, this.gameResults);
    }
  }

  class StatsScreen {
    constructor(game, gameResults) {
      this.game = game;
      this.gameResults = gameResults;
      this.view = new StatsView(this.game, gameResults);

      this.view.eventEmitter.on(`reset`, () => {
        App.resetGame();
      });
    }
  }

  // Правила игры
  class RulesView extends ScreenView {
    constructor(game) {
      super();
      this.game = game;
      this.eventEmitter = new EventEmitter();
    }

    get _template() {
      return `${getHeader()}
    <section class="rules">
      <h2 class="rules__title">Правила</h2>
      <ul class="rules__description">
        <li>Угадай ${this.game.rules.questions} раз для каждого изображения фото
          <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
          <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
        <li>Фотографиями или рисунками могут быть оба изображения.</li>
        <li>На каждую попытку отводится ${this.game.rules.time} секунд.</li>
        <li>Ошибиться можно не более ${this.game.rules.lives} раз.</li>
      </ul>
      <p class="rules__ready">Готовы?</p>
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
    </section>`;
    }

    _bind(_element) {
      super._bind(_element);

      const nameInput = _element.querySelector(`.rules__input`);
      const submitBtn = _element.querySelector(`.rules__button`);
      const form = _element.querySelector(`.rules__form`);

      nameInput.addEventListener(`input`, (evt) => {
        submitBtn.disabled = !evt.target.value;
      });

      form.addEventListener(`submit`, (evt) => {
        evt.preventDefault();

        this.eventEmitter.fire(`submit`, {
          name: nameInput.value.trim()
        });
      });
    }
  }

  class RulesScreen {
    constructor(game) {
      this.game = game;
      this.view = new RulesView(this.game);

      this.view.eventEmitter.on(`submit`, ({name}) => {
        this.game.playerName = name;
        App.showGame();
      });

      this.view.eventEmitter.on(`reset`, () => {
        App.resetGame();
      });
    }
  }

  const getGame = (game, content, {showState} = {showState: true}) => {
    return `${getHeader(game, {showState})}
  <section class="game">
    ${content}
    ${getStats(game.stats)}
  </section>`;
  };

  const getGameQuestion1 = (question) => {
    return `<p class="game__task">${question.question}</p>
  <form class="game__content game__content--wide">
    ${getOption(question.answers[0].image, 0)}
  </form>`;
  };

  const getOption = (image, index) => {
    return `<div class="game__option">
    <img src="${image.url}"
      alt="${image.description}"
      width="${image.width}"
      height="${image.height}">
    <label class="game__answer game__answer--photo">
      <input class="visually-hidden" name="question${index + 1}" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer game__answer--paint">
      <input class="visually-hidden" name="question${index + 1}" type="radio" value="painting">
      <span>Рисунок</span>
    </label>
  </div>`;
  };

  // Игровой экран с одним изображением
  class Game1View extends ScreenView {
    constructor(game, question) {
      super();
      this.game = game;
      this.question = question;
      this.eventEmitter = new EventEmitter();
    }

    get _template() {
      return getGame(this.game, getGameQuestion1(this.question));
    }

    _bind(_element) {
      super._bind(_element);

      _element
        .querySelector(`.game__content`)
        .addEventListener(`input`, (event) => {
          if (event.target.tagName !== `INPUT`) {
            return;
          }

          const answer = {
            options: [event.target.value],
            time: this.game.state.time
          };

          this.eventEmitter.fire(`answer`, answer);
        });
    }
  }

  const QuestionType = Object.freeze({
    TINDER_LIKE: `tinder-like`,
    TWO_OF_TWO: `two-of-two`,
    ONE_OF_THREE: `one-of-three`
  });

  const getGameQuestion2 = (question) => {
    return `<p class="game__task">${question.question}</p>
  <form class="game__content">
    ${question.answers.map((option, index) => getOption$1(option.image, index)).join(` `)}
  </form>`;
  };

  const getOption$1 = (image, index) => {
    return `<div class="game__option">
    <img src="${image.url}"
      alt="${image.description}"
      width="${image.width}"
      height="${image.height}">
    <label class="game__answer game__answer--photo">
      <input class="visually-hidden" name="question${index + 1}" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer game__answer--paint">
      <input class="visually-hidden" name="question${index + 1}" type="radio" value="painting">
      <span>Рисунок</span>
    </label>
  </div>`;
  };

  // Игровой экран с двумя изображениями
  class Game2View extends ScreenView {
    constructor(game, question) {
      super();
      this.game = game;
      this.question = question;
      this.eventEmitter = new EventEmitter();
    }

    get _template() {
      return getGame(this.game, getGameQuestion2(this.question));
    }

    _getCheckedInputs() {
      const gameOptions = Array.from(this.element.querySelectorAll(`.game__option`));
      return Game2View._getCheckedInputs(gameOptions);
    }

    _bind(_element) {
      super._bind(_element);

      _element
        .querySelector(`.game__content`)
        .addEventListener(`input`, (event) => {
          if (event.target.tagName !== `INPUT`) {
            return;
          }

          const inputs = this._getCheckedInputs();

          if (inputs.length !== this.question.answers.length) {
            return;
          }

          const answer = {
            options: inputs.map((input) => input.value),
            time: this.game.state.time
          };

          this.eventEmitter.fire(`answer`, answer);
        });
    }

    static _getCheckedInputs(gameOptionElements) {
      const getCheckedInputs = (checkedInputs, gameOptionElement) => {
        const checkedInput = gameOptionElement.querySelector(`input[type=radio]:checked`);

        if (checkedInput) {
          return [...checkedInputs, checkedInput];
        }

        return checkedInputs;
      };
      return gameOptionElements.reduce(getCheckedInputs, []);
    }
  }

  const getGameQuestion3 = (question) => {
    return `<p class="game__task">${question.question}</p>
  <form class="game__content game__content--triple">
    ${question.answers.map((option) => getOption$2(option)).join(` `)}
  </form>`;
  };

  const getOption$2 = (option) => {
    return `<div class="game__option">
    <img src="${option.image.url}"
      alt="${option.image.description}"
      width="${option.image.width}"
      height="${option.image.height}">
  </div>`;
  };

  const AnswerType = Object.freeze({
    PHOTO: `photo`,
    PAINTING: `painting`,

    getOppositeType(type) {
      switch (type) {
        case this.PAINTING:
          return this.PHOTO;
        case this.PHOTO:
          return this.PAINTING;
      }
      throw new Error(`Couldn't get an opposite of ${type}`);
    }
  });

  // Игровой экран с тремя изображениями
  class Game3View extends ScreenView {

    constructor(game, question) {
      super();
      this.game = game;
      this.question = question;
      this.answerTypeContext = Game3View._getAnswerTypeContext(this.question);
      this.eventEmitter = new EventEmitter();
    }

    get _template() {
      return getGame(this.game, getGameQuestion3(this.question));
    }

    _getCheckedInputs() {
      return Array.from(this.element.querySelectorAll(`.game__option`));
    }

    _bind(_element) {
      super._bind(_element);

      _element
        .querySelector(`.game__content`)
        .addEventListener(`click`, (event) => {
          const target = event.target.closest(`.game__option`);

          if (!target) {
            return;
          }

          const gameOptions = this._getCheckedInputs();
          const answerIndex = gameOptions.indexOf(target);

          if (answerIndex === -1) {
            throw new Error(`game option doesn't exist`);
          }

          const options = Array.from(
              {length: this.question.answers.length},
              () => this.answerTypeContext.opposite
          );

          options[answerIndex] = this.answerTypeContext.expected;

          const answer = {
            options,
            time: this.game.state.time
          };

          this.eventEmitter.fire(`answer`, answer);
        });
    }

    static _getAnswerTypeContext(question) {
      const getAnswerTypeToQuestionCount = (map, answer) => {
        map[answer.type] = (map[answer.type] || 0) + 1;
        return map;
      };
      const answerTypeCount = question.answers.reduce(getAnswerTypeToQuestionCount, {});
      for (const answerType in answerTypeCount) {
        if (answerTypeCount[answerType] === 1) {
          return {
            expected: answerType,
            opposite: AnswerType.getOppositeType(answerType)
          };
        }
      }
      throw new Error(`Unable to define answer type context`);
    }
  }

  const CHALLENGE_GAME_SCREEN_MAP = {
    [QuestionType.TINDER_LIKE]: Game1View,
    [QuestionType.TWO_OF_TWO]: Game2View,
    [QuestionType.ONE_OF_THREE]: Game3View
  };

  const createGameView = (game) => {
    const question = game.questions[game.state.questionIndex];
    return new CHALLENGE_GAME_SCREEN_MAP[question.type](game, question);
  };

  const SECONDS = Object.freeze({
    HALF: 500,
    ONE: 1000,
    FIVE: 5000
  });

  class GameScreen {
    constructor(game) {
      this.game = game;
      this.view = createGameView(game);

      this.startTimer();

      this.view.eventEmitter.on(`answer`, (answer) => this.onAnswer(answer));

      this.view.eventEmitter.on(`reset`, () => {
        App.resetGame();
      });
    }

    onAnswer(answer) {
      this.stopTimer();
      this.game.setAnswer(answer);

      if (this.game.isOver()) {
        App.showStats();
      } else {
        App.showGame();
      }
    }

    startTimer() {
      this.tickInterval = setInterval(() => {
        this.game.tick();
        this.view.updateTime(this.game.state.time / SECONDS.ONE);
        this.checkTime();
      }, SECONDS.ONE);
      const blinkTime = this.game.rules.time - SECONDS.FIVE;
      this.blinkTimeout = setTimeout(() => {
        this.blinkInterval = setInterval(() => this.view.blinkTime(), SECONDS.HALF);
      }, blinkTime);
    }

    stopTimer() {
      clearInterval(this.tickInterval);
      clearTimeout(this.blinkTimeout);
      clearInterval(this.blinkInterval);
      this.game.resetTime();
    }

    checkTime() {
      if (this.game.state.time >= this.game.rules.time) {
        this.onAnswer({
          options: [],
          time: this.game.state.time
        });
      }
    }
  }

  const Result = {
    CORRECT: `correct`,
    WRONG: `wrong`,
    QUICK: `fast`,
    SLOW: `slow`,
    UNKNOWN: `unknown`
  };

  const scoring = Object.freeze({
    correct: 100,
    lives: 50,
    quick: 50,
    slow: -50
  });

  const rules = Object.freeze({
    questions: 10,
    lives: 3,
    time: 30000
  });

  const SpeedTime = Object.freeze({
    SLOW: 20000,
    QUICK: 10000
  });

  class Answer {
    constructor(isCorrect, time) {
      this.isCorrect = isCorrect;
      this.time = time;
    }

    getResultType() {
      if (!this.isCorrect) {
        return Result.WRONG;
      }

      if (this.time < SpeedTime.QUICK) {
        return Result.QUICK;
      }

      if (this.time > SpeedTime.SLOW) {
        return Result.SLOW;
      }

      return Result.CORRECT;
    }
  }

  class Game {
    constructor(rules$$1, questions, scoring$$1) {
      this.rules = rules$$1;
      this.questions = questions;
      this.scoring = scoring$$1;

      this.reset();
    }

    get playerName() {
      return this._playerName || ``;
    }

    set playerName(value) {
      this._playerName = value;
    }

    tick() {
      this.state.time += 1000;
    }

    reset() {
      this.state = {
        lives: this.rules.lives,
        time: 0,
        questionIndex: 0
      };

      this.answers = [];

      this.stats = Array.from(
          {length: this.rules.questions},
          () => Result.UNKNOWN
      );
    }

    resetTime() {
      this.state.time = 0;
    }

    isOver() {
      return (
        this.state.lives < 0 || this.questions.length === this.answers.length
      );
    }

    isWin() {
      return (
        this.state.lives >= 0 && this.questions.length === this.answers.length
      );
    }

    setAnswer(answer) {
      const question = this.questions[this.state.questionIndex];
      if (!question) {
        throw new Error(`question does not exist`);
      }

      const result = new Answer(
          Game.isAnswerCorrect(answer, question),
          answer.time
      );

      this.answers.push(result);
      this.stats[this.state.questionIndex] = result.getResultType();
      this._adjustLives(result);
      this.state.questionIndex++;
    }

    _adjustLives(answer) {
      if (!answer.isCorrect) {
        this.state.lives -= 1;
      }
    }

    static create(questions) {
      return new Game(rules, questions, scoring);
    }

    static isAnswerCorrect(answer, question) {
      return question.answers.every(
          (option, index) => answer.options[index] === option.type
      );
    }
  }

  class QuestionsRepository {
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

  // Модальное окно с ошибкой
  class ModalErrorView extends ScreenView {
    constructor(error) {
      super();
      this.error = error;
    }

    get _template() {
      return `<section class="modal">
      <div class="modal__inner">
        <h2 class="modal__title">Произошла ошибка!</h2>
        <p class="modal__text modal__text--error">${this.error}</p>
      </div>
    </section>`;
    }
  }

  class ErrorScreen {
    constructor(error) {
      this.view = new ModalErrorView(error);
    }
  }

  class StatsRepository {
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

  const config = {
    appId: 22101985
  };

  class GameResult {
    constructor({lives, stats}, rules, scoring) {
      this.lives = lives;
      this.rules = rules;
      this.stats = Array.from(
          {length: this.rules.questions},
          (_, i) => stats[i] || Result.UNKNOWN
      );
      this.scoring = scoring;
    }

    getCorrectPoints() {
      return this.scoring.correct;
    }

    getCorrectCount() {
      return this._getStatsLength(
          (statsItem) => statsItem !== Result.WRONG && statsItem !== Result.UNKNOWN
      );
    }

    getCorrectTotal() {
      return this.getCorrectCount() * this.getCorrectPoints();
    }

    getQuickPoints() {
      return this.scoring.quick;
    }

    getQuickCount() {
      return this._getStatsLength((statsItem) => statsItem === Result.QUICK);
    }

    getQuickTotal() {
      return this.getQuickCount() * this.getQuickPoints();
    }

    getSlowPoints() {
      return this.scoring.slow;
    }

    getSlowCount() {
      return this._getStatsLength((statsItem) => statsItem === Result.SLOW);
    }

    getSlowTotal() {
      return this.getSlowCount() * this.getSlowPoints();
    }

    getLivesPoints() {
      return this.scoring.lives;
    }

    getLivesCount() {
      return Math.max(this.lives, 0);
    }

    getLivesTotal() {
      return this.getLivesCount() * this.getLivesPoints();
    }

    getFinalTotal() {
      return (
        this.getCorrectTotal() +
        this.getQuickTotal() +
        this.getLivesTotal() +
        this.getSlowTotal()
      );
    }

    isWin() {
      return this.lives >= 0;
    }

    _getStatsLength(statsItemPredicate) {
      return this.stats.filter(statsItemPredicate).length;
    }
  }

  class App {
    static init(containerElement) {
      this.containerElement = containerElement;
    }

    static showIntro() {
      QuestionsRepository.getAll()
        .then((questions) => {
          this.game = Game.create(questions);
          this._renderScreen(new IntroScreen());
        })
        .catch((error) => this.showError(error));
    }

    static showGreeting() {
      this._renderScreen(new GreetingScreen(this.game));
    }

    static showRules() {
      this._renderScreen(new RulesScreen(this.game));
    }

    static showGame() {
      this._renderScreen(new GameScreen(this.game));
    }

    static resetGame() {
      this.game.reset();
      this.showGreeting();
    }

    static showStats() {
      const postData = {
        stats: this.game.stats,
        lives: this.game.state.lives
      };
      StatsRepository.postResult(config.appId, this.game.playerName, postData)
        .then(() =>
          StatsRepository.getResults(config.appId, this.game.playerName)
        )
        .then((res) => {
          const gameResults = res.map(
              (x) => new GameResult(x, this.game.rules, this.game.scoring)
          );
          this._renderScreen(new StatsScreen(this.game, gameResults));
        })
        .catch((error) => this.showError(error));
    }

    static showError(error) {
      this._renderScreen(new ErrorScreen(error));
    }

    static _renderScreen(screen) {
      render(this.containerElement, screen.view.element);
    }
  }

  const mainElement = document.querySelector(`#main`);
  App.init(mainElement);
  App.showIntro();

}());

//# sourceMappingURL=main.js.map
