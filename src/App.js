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

// ゲーム盤を表示するコンポーネント
function Board({ xIsNext, squares, onPlay }) {

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
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  // 勝者が決まっている場合は勝者を表示、そうでない場合は次のプレイヤーを表示
  if (winner) {
    status = "勝者: " + winner;
  } else {
    status = "次のプレイヤー: " + (xIsNext ? "X" : "O");
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

// メイン関数
export default function Game() {

  // プレイヤーのターンを管理するためのstate変数
  const [xIsNext, setXIsNext] = useState(true);
  // historyはマス目全体の状態を管理する配列を要素とする配列 
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // 現在見ているのが何手目かを管理するstate変数
  const [currentMove, setCurrentMove] = useState(0);
  // 現在選択されている着手をレンダー
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    // setHistory関数をコールしてstateの変更を通知、再レンダリング
    // スプレッド構文を使用して、過去に戻ったところまでの履歴と現在の盤面を新しい配列としてhistoryにセット
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    // プレイヤー交代
    setXIsNext(!xIsNext);
  }

  // 履歴をクリックした時に, currentMoveとxIsNextを更新
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  // 履歴の各要素に対して、ボタンを生成　moveには配列のインデックスが渡される
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = move + '手目に戻る';
    } else {
      description = 'ゲームの開始';
    }
    // 各リストアイテムにはkeyを設定することで、リストが変更された際にReactが効率的に再レンダリングできるようになる
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        {/* Boardコンポーネントにプレイヤーとマス目の状態、state更新用の処理を渡す */}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
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