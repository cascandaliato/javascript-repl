export const ERROR = "f52cfa38-a46a-442d-853e-aa7ac7b6c97b";

export default function evaluate(code) {
  try {
    // eslint-disable-next-line no-eval
    const output = eval(code);
    switch (output) {
      case undefined:
        return "undefined";
      case null:
        return "null";
      default:
        return output;
    }
  } catch (e) {
    return ERROR;
  }
}
