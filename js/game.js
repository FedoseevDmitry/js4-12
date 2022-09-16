'use strict';

(() => {
  // записываем словари для английской и русской версий игры

  const langEn = {
    figure: ['rock', 'scissors', 'paper'],
    messages: {
      playerName: 'Player',
      playerWin: 'Player win this round!',
      opponentName: 'Computer',
      opponentWin: 'Computer win this round!',
      drawRound: 'Draw',
      anotherGame: 'Play again?',
      startMessage: 'Choose one of Rock, Scissors, Paper.',
      exitQuestion: 'You really want close the game?',
      exitMessage: 'Good luck!',
    },
  };
  const langRu = {
    figure: ['камень', 'ножницы', 'бумага'],
    messages: {
      playerName: 'Игрок',
      playerWin: 'Игрок выиграл раунд!',
      opponentName: 'Компьютер',
      opponentWin: 'Компьютер выиграл раунд!',
      drawRound: 'Ничья!',
      anotherGame: 'Сыграть еще раз?',
      startMessage: 'Выберите камень, ножницы или бумагу.',
      exitQuestion: 'Действительно хотите закрыть игру?',
      exitMessage: 'Удачи!',
    },
  };

  // генерируем случайные числа

  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // обрабатываем ввод игрока

  const getPlayerFigure = (lang) => {
    let playerFigure = prompt(lang.messages.startMessage);

    if (playerFigure === null) {
      return -1;
    } else {
      playerFigure = playerFigure[0];
      // проверка ввода
      let defaultFigure = -1;
      lang.figure.find((element, index) => {
        if (element[0] === playerFigure[0]) defaultFigure = index;
      });
      if (defaultFigure < 0) {
        return getPlayerFigure(lang);
      } else {
        return defaultFigure;
      }
    }
  };

  // Проверка результата
  const checkResult = (computerResult, playerResult) => (computerResult === 2 &&
    playerResult === 0 || computerResult === 0 && playerResult === 1 ||
    computerResult === 1 && playerResult === 2 ? 'c' : 'p');

  // Проверка клика на выход
  const getClickExit = (lang) => {
    confirm(`${lang.messages.exitQuestion}`);
  };

  // Основной функционал игры
  const runGame = (selectedLang) => {
    const getResult = {
      computer: 0,
      player: 0,
    };
    const lang = selectedLang === 'EN' || selectedLang === 'ENG' ? langEn :
    langRu;
    return function startGame() {
      // Получение фигуры компьютера
      const setComputerFigure = getRandomIntInclusive(0, 2);
      console.log('setComputerFigure: ', lang.figure[setComputerFigure]);
      // Получение фигуры игрока
      const setPlayerFigure = getPlayerFigure(lang);
      console.log('setPlayerFigure: ', lang.figure[setPlayerFigure]);
      if (setPlayerFigure >= 0) {
        if (setComputerFigure === setPlayerFigure) {
          alert(lang.messages.drawRound);
        } else {
          let winMessage = '';
          const win = checkResult(setComputerFigure, setPlayerFigure);
          if (win === 'c') {
            getResult.computer++;
            winMessage = lang.messages.opponentWin;
          } else if (win === 'p') {
            getResult.player++;
            winMessage = lang.messages.playerWin;
          }
          alert(`${lang.messages.opponentName}: ` +
            `${lang.figure[setComputerFigure]}\n` +
            `${lang.messages.playerName}: ${lang.figure[setPlayerFigure]}\n` +
            `${winMessage}`);
          console.log(getResult);
        }
        const anotherRound = confirm(`${lang.messages.anotherGame}`);
        if (anotherRound) {
          return startGame();
        } else {
          const exitGame = getClickExit(lang);
          if (!exitGame) {
            alert(`${lang.messages.opponentName} = ${getResult.computer}\n` +
              `${lang.messages.playerName} = ${getResult.player}`);
            alert(`${lang.messages.exitMessage}`);
          } else {
            return startGame();
          }
        }
      } else {
        const exitGame = getClickExit(lang);
        if (!exitGame) {
          alert(`${lang.messages.opponentName} = ${getResult.computer}\n` +
            `${lang.messages.playerName} = ${getResult.player}`);
          alert(`${lang.messages.exitMessage}`);
        } else {
          return startGame();
        }
      }
    };
  };
  window.gameRSP = runGame;
})();
