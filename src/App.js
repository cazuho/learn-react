// ボードの各マス目を表すコンポーネント
function Square({ value }) {
  return <button className="square">{value}</button>;
}


// このファイルのメイン関数 ゲーム盤を表示する
export default function Board() {
  // React コンポーネントから返される要素は、単一のJSX要素である必要があるので、 <></> で囲む
  return (
    <>
      <div className="board-row">
        {/* Squareコンポーネントを呼び出し、propsとしてvalueを渡す */}
        <Square value="1"/>
        <Square value="2"/>
        <Square value="3"/>
      </div>
      <div className="board-row">
        <Square value="4"/>
        <Square value="5"/>
        <Square value="6"/>
      </div>
      <div className="board-row">
        <Square value="7"/>
        <Square value="8"/>
        <Square value="9"/>
      </div>
    </>
  );
}

