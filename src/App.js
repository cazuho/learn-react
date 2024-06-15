import { useState } from "react";

// ボードの各マス目を表すコンポーネント
function Square() {

  // マス目の状態を記憶するためにuseStateを使う
  const [value, setValue] = useState(null);

  function handleClick() {
    // マスをクリックするとvalueを'X'に変更する
    setValue('X');
  }

  return (
    <button
      className="square"
      onClick={handleClick}
    >
      {value}
    </button>
  );
}


// このファイルのメイン関数 ゲーム盤を表示する
export default function Board() {
  // React コンポーネントから返される要素は、単一のJSX要素である必要があるので、 <></> で囲む
  return (
    <>
      <div className="board-row">
        {/* propsを受け取らなくなったので修正 */}
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}

