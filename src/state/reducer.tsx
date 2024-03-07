import { editObjectField } from "../utils";

export type ObjectType = {
  [key: string]:
    | string
    | number
    | boolean
    | null
    | Record<string, string | number | boolean | null>
    | Record<string, string | number | boolean | null>[]
    | ObjectType;
};

export interface AppState extends ObjectType {}

export type Action =
  | { type: "RESET" }
  | {
      type: "SET_VALUE";
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
  "query.optimize_streaming_latency": "number",
  "query.output_format": "string",
  "body.text": "string",
  "body.model_id": "string",
  "body.voice_settings.similarity_boost": "number",
  "body.voice_settings.stability": "number",
  "body.voice_settings.style": "number",
  "body.voice_settings.use_speaker_boost": "boolean",
  "body.pronunciation_dictionary_locators.pronunciation_dictionary_id":
    "string",
  "body.pronunciation_dictionary_locators.version_id": "string",
};

export const StateRequiredMap: { [key: string]: boolean } = {
  "body.text": true,
  "body.voice_settings.similarity_boost": true,
  "body.voice_settings.stability": true,
  "body.pronunciation_dictionary_locators.pronunciation_dictionary_id": true,
  "body.pronunciation_dictionary_locators.version_id": true,
};

export interface AppState extends ObjectType {}

export const bodyPlaceholder = {
  model_id: "<string>",
  pronunciation_dictionary_locators: [
    {
      pronunciation_dictionary_id: "<string>",
      version_id: "<string>",
    },
  ],
  text: "<string>",
  voice_settings: {
    similarity_boost: 123,
    stability: 123,
    style: 123,
    use_speaker_boost: true,
  },
};

const initialState: AppState = {
  header: { "xi-api-key": null },
  path: { voice_id: null },
  query: {
    output_format: null,
    optimize_streaming_latency: null,
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
    case "RESET":
      return {
        header: { "xi-api-key": null },
        path: { voice_id: null },
        query: {
          output_format: null,
          optimize_streaming_latency: null,
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
    default:
      return state;
  }
};

export { initialState, reducer };
