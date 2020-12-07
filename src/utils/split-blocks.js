import { parse } from "@babel/parser";
import * as t from "@babel/types";
import evaluate, { ERROR } from "./evaluate";
import maxValidLine from "./max-valid-line";

export default function splitBlocks(code) {
  const maxLine = maxValidLine(code);
  const blocks = parse(code.slice(0, maxLine).join("\n"))
    .program.body.filter((node) => t.isExpressionStatement(node))
    .map((node) => [node.loc.start.line, node.loc.end.line])
    .filter(
      ([, end], idx, arr) => idx === arr.length - 1 || end < arr[idx + 1][0]
    )
    .map(([, end]) => end)
    .map((end, idx, ends) => ({
      block:
        idx === 0
          ? code.slice(0, end).join("\n")
          : code.slice(ends[idx - 1], end).join("\n"),
      evaluation: JSON.stringify(
        evaluate(code.slice(0, end).join("\n")),
        null,
        2
      ),
      end,
    }));

  if (maxLine < code.length) {
    blocks.push({
      block: code.slice(maxLine).join("\n"),
      evaluation: ERROR,
      end: code.length,
    });
  }

  return blocks;
}
