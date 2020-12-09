import { parse } from "@babel/parser";
import * as t from "@babel/types";
import evaluate from "./evaluate";
import lastValidLine from "./last-valid-line";

export default function enrichCode(cm, change, meta) {
  const code = cm.doc.getValue().split("\n");
  const last = lastValidLine(code);

  const evaluations = parse(code.slice(0, last).join("\n"))
    .program.body.filter((node) => t.isExpressionStatement(node))
    .map((node) => [node.loc.start.line, node.loc.end.line])
    .filter(
      ([, end], idx, arr) => idx === arr.length - 1 || end < arr[idx + 1][0]
    )
    .map(([, end]) => end)
    .map((end) => {
      const evaluation = JSON.stringify(
        evaluate(code.slice(0, end).join("\n")),
        null,
        2
      );

      return {
        targetLine: end,
        value: evaluation,
        numLines: evaluation.split("\n").length,
      };
    });

  return {
    code: cm.doc.getValue(),
    meta: { lastChange: change, lastValidLine: last, evaluations },
  };
}
