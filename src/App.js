import React, { useEffect, useState, Fragment } from "react";
import CodeMirror from "@uiw/react-codemirror";
import isEqual from "lodash/isEqual";

import splitBlocks from "./utils/split-blocks";
import "./global.css";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import usePrevious from "./utils/use-previous";

function App() {
  const [code, setCode] = useState([
    { block: "const ans = { n: 42 };\nans\nans", evaluation: "" },
  ]);
  const prevCode = usePrevious(code);

  useEffect(() => {
    if (!isEqual(code, prevCode)) {
      setCode(
        splitBlocks(
          code
            .map((o) => o.block)
            .join("\n")
            .split("\n")
        )
      );
    }
  }, [code, prevCode]);

  return (
    <>
      {code.map(({ block, evaluation }, idx) => (
        <Fragment key={idx}>
          <CodeMirror
            value={block}
            className="codem"
            options={{
              mode: "javascript",
              lineNumbers: true,
              viewportMargin: Infinity,
            }}
            onChange={(cm) =>
              setCode((c) => {
                const newCode = [...c];
                newCode[idx].block = cm.doc.getValue();
                return newCode;
              })
            }
          />
          <pre
            style={{
              marginLeft: "36px",
              marginTop: "4px",
              marginBottom: "4px",
            }}
          >
            &gt; {evaluation}
          </pre>
        </Fragment>
      ))}
      <hr />
      <h6>Debug</h6>
      <pre>{JSON.stringify(code, null, 2)}</pre>
    </>
  );
}

export default App;
