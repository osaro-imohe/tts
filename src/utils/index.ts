import { ObjectType } from "../components/recursive-input";

function snakeToCamel(text: string) {
  return text
    .replace(/_([a-z])/g, function (_, letter) {
      return letter.toUpperCase();
    })
    .replace(/^([a-z])/, function (_, letter) {
      return letter.toUpperCase();
    });
}

function extractNumberBetweenBrackets(numBracket: string) {
  const matches = numBracket.match(/\[(\d+)\]/);
  return matches ? parseInt(matches[1]) : null;
}

function editObjectField(obj: any, dotNotation: string, value: any) {
  const keys = dotNotation.split(".");
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }

  const lastKey = keys[keys.length - 1];
  current[lastKey] = value;
  return obj;
}

function keyExistsInObj(obj: any, dotNotation: string) {
  const keys = dotNotation.split(".");
  let current = obj;

  for (let i = 0; i < keys.length; i++) {
    if (current === null || current === undefined) return false;
    if (!current.hasOwnProperty(keys[i])) return false;

    current = current[keys[i]];
  }

  return true;
}

function getValueFromKey(obj: any, dotNotation: string) {
  const keys = dotNotation.split(".");
  let current = obj;

  for (let i = 0; i < keys.length; i++) {
    if (!current.hasOwnProperty(keys[i])) return null;
    current = current[keys[i]];
  }

  return current;
}

function removeArrayIndexFromDotNotation(dotNotation: string) {
  const [firstPart, rest] = dotNotation.split(".[");
  const [arrayIndexStr, secondPart] = rest.split("].");
  return `${firstPart}.${secondPart}`;
}

function dotNotationContainArrayIndex(dotNotation: string) {
  const regex = /\.(\[\d+\])/;
  return regex.test(dotNotation);
}

function splitArrayDotNotation(dotNotation: string): [string, number, string] {
  const regex = /\[(\d+)\]/;
  const [firstPart, rest] = dotNotation.split(".[");
  const [arrayIndexStr, secondPart] = rest.split("].");
  const arrayIndex = parseInt(arrayIndexStr);

  return [firstPart, arrayIndex, secondPart];
}

function parseNumericValueOrString(value: string | number): string | number {
  if (typeof value === "number" && !isNaN(value)) return value;
  if (typeof value === "string") {
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) return parsedValue;
  }
  return value.toString();
}

function capitalizeBeforeDashOrUnderscore(str: string) {
  return str
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export {
  snakeToCamel,
  editObjectField,
  keyExistsInObj,
  getValueFromKey,
  dotNotationContainArrayIndex,
  splitArrayDotNotation,
  parseNumericValueOrString,
  removeArrayIndexFromDotNotation,
  capitalizeBeforeDashOrUnderscore,
};
