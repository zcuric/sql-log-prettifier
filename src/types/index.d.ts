export type Options = {
  format?: boolean;
  noColors?: boolean;
  settings?: Settings;
};

export type Settings = {
  functions?: Object;
  keywords?: Object;
  strings?: Object;
  numbers?: Object;
  operators?: Object;
};

export type OutputSettings = {
  color: Object | string;
  modifiers: string[];
};
