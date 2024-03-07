import {
  Action,
  ObjectType,
  StateDotNotationTypeMap,
  StateRequiredMap,
} from "../state/reducer";

function snakeToCamel(text: string) {
  return text
    .replace(/_([a-z])/g, function (_, letter) {
      return letter.toUpperCase();
    })
    .replace(/^([a-z])/, function (_, letter) {
      return letter.toUpperCase();
    });
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

function objectIsEmpty(obj: ObjectType) {
  for (const value of Object.values(obj)) {
    if (
      value !== null &&
      (typeof value === "object"
        ? !objectIsEmpty(value as ObjectType)
        : true) &&
      !(Array.isArray(value) && value.length === 0)
    ) {
      return false;
    }
  }

  return true;
}

function splitArrayDotNotation(dotNotation: string): [string, number, string] {
  const [firstPart, rest] = dotNotation.split(".[");
  const [arrayIndexStr, secondPart] = rest.split("].");
  const arrayIndex = parseInt(arrayIndexStr);

  return [firstPart, arrayIndex, secondPart];
}

function dotNotationContainArrayIndex(dotNotation: string) {
  const regex = /\.(\[\d+\])/;
  return regex.test(dotNotation);
}

function removeArrayIndexFromDotNotation(dotNotation: string) {
  if (!dotNotationContainArrayIndex(dotNotation)) return dotNotation;
  const [firstPart, , secondPart] = splitArrayDotNotation(dotNotation);
  return `${firstPart}.${secondPart}`;
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

function getType(dotNotation: string) {
  let key;
  if (dotNotationContainArrayIndex(dotNotation)) {
    key = removeArrayIndexFromDotNotation(dotNotation);
  } else {
    key = dotNotation;
  }

  const type = StateDotNotationTypeMap[key];
  return type ?? "string";
}

function isRequired(dotNotation: string) {
  let key;
  if (dotNotationContainArrayIndex(dotNotation)) {
    key = removeArrayIndexFromDotNotation(dotNotation);
  } else {
    key = dotNotation;
  }
  if (StateRequiredMap[key]) return true;
  return false;
}

function clearStateValue(
  state: ObjectType,
  dispatch: React.Dispatch<Action>,
  dotNotation: string,
) {
  let value;
  const keys = dotNotation.split(".");
  const lastKey = keys[keys.length - 1];
  const containsArray = dotNotationContainArrayIndex(dotNotation);
  const obj = getValueFromKey(state, dotNotation);
  const baseKeyCheck = (dotNotation: string) =>
    StateDotNotationTypeMap[removeArrayIndexFromDotNotation(dotNotation)];
  const isBaseKey = baseKeyCheck(dotNotation);

  let switchKey = containsArray
    ? splitArrayDotNotation(dotNotation)[0]
    : dotNotation;

  if (containsArray && lastKey.includes("[") && lastKey.includes("]")) {
    const [accessor, idx] = splitArrayDotNotation(dotNotation);
    const arr = getValueFromKey(state, accessor);
    arr.splice(idx, 1);
    value = arr;
  } else if (containsArray && typeof lastKey === "string") {
    const [accessor, idx, key] = splitArrayDotNotation(dotNotation);
    const arr = getValueFromKey(state, accessor);
    const obj = { ...arr[idx] };
    if (isBaseKey) {
      obj[key] = null;
    } else {
      delete obj[key];
    }
    arr[idx] = obj;
    value = arr;
  } else if (Array.isArray(getValueFromKey(state, dotNotation))) {
    value = [];
  } else if (typeof obj === "object" && !Array.isArray(obj) && obj !== null) {
    const tempObj = { ...obj };
    for (let key in tempObj) {
      if (baseKeyCheck(`${dotNotation}.${key}`)) {
        tempObj[key] = null;
      } else {
        delete tempObj[key];
      }
    }
    value = tempObj;
  } else {
    console.log(dotNotation);
    if (baseKeyCheck(dotNotation)) {
      value = null;
    } else {
      const k = keys.slice(0, -1).join(".");
      const nObj = getValueFromKey(state, k);
      delete nObj[lastKey];
      switchKey = k;
      value = nObj;
    }
  }

  dispatch({
    type: "SET_VALUE",
    payload: {
      key: switchKey,
      value,
    },
  });
}

export {
  getType,
  isRequired,
  snakeToCamel,
  editObjectField,
  keyExistsInObj,
  getValueFromKey,
  objectIsEmpty,
  clearStateValue,
  dotNotationContainArrayIndex,
  splitArrayDotNotation,
  parseNumericValueOrString,
  removeArrayIndexFromDotNotation,
  capitalizeBeforeDashOrUnderscore,
};
