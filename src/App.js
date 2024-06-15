import { useState } from "react";

/* 
 * ボードの各マス目を表すコンポーネント
 * マス目の状態とクリック時の処理を行う関数を受け取る
 */
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// ゲーム盤を表示するメイン関数
export default function Board() {

  // プレイヤーのターンを管理するためのstate変数 
  const [xIsNext, setXIsNext] = useState(true);

  // マス目の状態をボード全体で管理するためここでstate変数を宣言
  const [squares, setSquares] = useState(Array(9).fill(null));

  // マス目がクリックされた時の処理
  function handleClick(i) {

    // 勝者が決まっている場合も何もせず、既に埋まっているマス目はクリックしても何もしない
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // 配列をコピー
    const nextSquares = squares.slice();
    // 現プレイヤーに応じてマス目に値をセット
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    // setSquares関数をコールしてstateの変更を通知、再レンダリング
    setSquares(nextSquares);
    // プレイヤー交代
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  // 勝者が決まっている場合は勝者を表示、そうでない場合は次のプレイヤーを表示
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  // React コンポーネントから返される要素は、単一のJSX要素である必要があるので、 <></> で囲む
  return (
    <>
      {/* 勝者が決まっている場合は勝者を表示、そうでない場合は次のプレイヤーを表示するステータス欄 */}
      <div className="status">{status}</div>
      <div className="board-row">
        {/* 各Squareコンポーネントに状態とクリック処理を渡す */}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// 勝利判定用関数
function calculateWinner(squares) {
  // ボードの縦横斜めのラインに対応するマス目のインデックス
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // マス目が入力済みかつ縦横斜めのライン上のマス目が全て同じ値の場合、その値（プレイヤー）を返す
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}