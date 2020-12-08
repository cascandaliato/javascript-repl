import { parse } from "@babel/parser";

export default function lastValidLine(code) {
  let line = 1;
  try {
    for (; line <= code.length; line++) {
      parse(code.slice(0, line).join("\n"));
    }
  } catch (_) {
    return line - 1;
  }
  return code.length;
}
