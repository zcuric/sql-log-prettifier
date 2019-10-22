export type Options = {
  format?: boolean;
  noColors?: boolean;
  settings?: Settings;
};

export type Settings = {
  topLevelWords?: Object;
  newLineWords?: Object;
  otherWords?: Object;
  strings?: Object;
  numbers?: Object;
};

export type OutputSettings = {
  color: string;
  modifiers: string[];
};
