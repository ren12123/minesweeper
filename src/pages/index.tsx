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

const countBomb = (x, y) => {};

const normalBoard = (normal = 0, row = 9, column = 9): number[][] =>
  Array.from({ length: row }, () => Array.from({ length: column }, () => normal));

const searchBomb = (bombMap: number[][], userInputs: number[][]) => {
  const board = normalBoard(-1);
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      // const numberBomb = [0];
      if (userInputs !== undefined && userInputs[y][x] === 1) {
        board[y][x] = 0;
        console.log(y, x);
      }
      for (const direction of directions) {
        if (bombMap !== undefined && bombMap[y][x] === 1) {
          board[y][x] = 11;
          break;
        }
        // if (
        //   bombMap[y + direction[1]] !== undefined &&
        //   bombMap[y + direction[1]][x + direction[0]] === 1
        // ) {
        //   numberBomb[0] += 1;
        //   board[y][x] = numberBomb[0];
        // }
      }
    }
  }

  return board;
};

const Home = () => {
  const [bombMap, setbombMap] = useState(normalBoard());

  const [userInputs, setUserInputs] = useState(normalBoard());

  const pushCount = bombMap.flat().filter((cell) => cell === 0).length; //ゲーム開始したか

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
      setbombMap(newBombMap);
    }
    newUserInputs[y][x] = 1;

    setUserInputs(newUserInputs);
  };
  const numBomb = searchBomb(bombMap, userInputs);

  return (
    <div className={styles.container}>
      <div className={styles.Bigboard}>
        <div className={styles.squeaBoard}>
          <div className={styles.numberBoard}>111</div>
          <div className={styles.faceBoard}></div>
          <div className={styles.numberBoard}>123</div>
        </div>

        <div className={styles.board}>
          {numBomb.map((row, y) =>
            row.map((color, x) => (
              <div className={styles.cell} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
                {numBomb[y][x] === -1 ? (
                  <div className={styles.stone} />
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
