import { useState } from 'react';
import styles from './index.module.css';

const directions = [
  [0, 1],
  [0, -1],
  [1, 1],
  [1, -1],
  [1, 0],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];

const getNearByBomb = (x: number, y: number, bombMap: number[][]) => {
  let result = 0;
  for (const direction of directions) {
    const [dx, dy] = direction;
    const nx = x + dx;
    const ny = y + dy;
    if (ny >= 0 && ny < bombMap.length && nx >= 0 && nx < bombMap[0].length) {
      if (bombMap[ny][nx] === 1) {
        result++;
      }
    }
  }
  return result;
};

const normalBoard = (normal = 0, row = 9, column = 9): number[][] =>
  Array.from({ length: row }, () => Array.from({ length: column }, () => normal));

const searchBomb = (bombMap: number[][], userInputs: number[][]) => {
  const board = normalBoard(-1);
  for (let y = 0; y < bombMap.length; y++) {
    for (let x = 0; x < bombMap[0].length; x++) {
      if (userInputs[y][x] === 1) {
        board[y][x] = getNearByBomb(x, y, bombMap);
      }
      if (bombMap[y][x] === 1) {
        board[y][x] = 11;
      }
    }
  }
  return board;
};

const Home = () => {
  const [bombMap, setbombMap] = useState(normalBoard());
  const [userInputs, setUserInputs] = useState(normalBoard());

  const pushCount = bombMap.flat().filter((cell) => cell === 0).length;

  const clickHandler = (x: number, y: number) => {
    const newBombMap = structuredClone(bombMap);
    const newUserInputs = structuredClone(userInputs);

    if (pushCount === 81) {
      let putBomb = 0;
      while (putBomb < 10) {
        const s = Math.floor(Math.random() * 9);
        const t = Math.floor(Math.random() * 9);
        if ((x !== t || y !== s) && newBombMap[s][t] !== 1) {
          newBombMap[s][t] = 1;
          putBomb += 1;
        }
      }
    }

    newUserInputs[y][x] = 1;
    setbombMap(newBombMap);
    setUserInputs(newUserInputs);
  };

  const numBomb = searchBomb(bombMap, userInputs);

  return (
    <div className={styles.container}>
      <div className={styles.Bigboard}>
        <div className={styles.squeaBoard}>
          <div className={styles.numberBoard}>111</div>
          <div className={styles.faceBoard} />
          <div className={styles.numberBoard}>123</div>
        </div>

        <div className={styles.board}>
          {numBomb.map((row, y) =>
            row.map((color, x) => (
              <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
                {userInputs[y][x] === 0 ? (
                  <div className={styles.stone}>{bombMap[y][x]}</div>
                ) : (
                  <div
                    className={styles.icon}
                    style={{ backgroundPosition: `${-30 * (color - 1)}px 0px` }}
                  />
                )}
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
