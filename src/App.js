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

    // 既に埋まっているマス目はクリックしても何もしない
    if (squares[i]) {
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

  // React コンポーネントから返される要素は、単一のJSX要素である必要があるので、 <></> で囲む
  return (
    <>
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

