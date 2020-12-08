import CodeMirror from "@uiw/react-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import React, { useEffect, useState } from "react";
import "./global.css";
import enrichCode from "./utils/enrich-code";

function App() {
  const [{ code, meta }, setState] = useState({
    code: "const ans = { n: 42 };\nans\nans",
    meta: {},
  });
  // const prevCode = usePrevious(code);

  useEffect(() => {
    setState(enrichCode({ doc: { getValue: () => code } }, null, meta));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ display: "flex", border: "4px solid pink" }}>
      <div style={{ borderRight: "4px solid pink" }}>
        <CodeMirror
          width={"50vw"}
          height={"calc(100vh - 8px)"}
          value={code}
          options={{
            mode: "javascript",
            lineNumbers: true,
            viewportMargin: Infinity,
          }}
          onChange={(cm, change) => setState(enrichCode(cm, change, meta))}
        />
      </div>
      <div style={{ padding: "8px" }}>
        <h6 style={{ margin: 0 }}>State</h6>
        <p
          style={{
            wordBreak: "break-all",
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
          }}
        >
          {JSON.stringify({ code, meta }, null, 2)}
        </p>
      </div>
    </div>
  );
}

export default App;
