import React, { useReducer } from "react";
import { ObjectType } from "../components/recursive-input";
import { editObjectField } from "../utils";

type ActionType = "SET_VALUE";
export interface AppState extends ObjectType {}

export type Action = {
  type: ActionType;
  payload: {
    key: string;
    value: string | number | boolean | null | ObjectType | ObjectType[];
  };
};

export const initial_pronunciation_dictionary_locators: ObjectType = {
  pronunciation_dictionary_id: null,
  version_id: null,
};

export const StateDotNotationTypeMap: { [key: string]: string } = {
  "header.xi-api-key": "string",
  "path.voice_id": "string",
  "query.optimize_streaming_latency": "string",
  "query.output_format": "string",
  "body.text": "string",
  "body.model_id": "string",
  "body.voice_settings.similarity_boost": "number",
  "body.voice_settings.stability": "number",
  "body.voice_settings.style": "number",
  "body.voice_settings.use_speaker_boost": "boolean",
};

export interface AppState extends ObjectType {}
const initialState: AppState = {
  header: { "xi-api-key": null },
  path: { voice_id: null },
  query: {
    optimize_streaming_latency: null,
    output_format: null,
  },
  body: {
    model_id: null,
    pronunciation_dictionary_locators: [],
    text: null,
    voice_settings: {
      similarity_boost: null,
      stability: null,
      style: null,
      use_speaker_boost: null,
    },
  },
};

const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case "SET_VALUE":
      const { key, value } = action.payload;
      return {
        ...state,
        ...editObjectField(state, key, value),
      };
    default:
      return state;
  }
};

export { initialState, reducer };
