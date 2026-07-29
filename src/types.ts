export type OutputSettings = {
  color?: string;
  modifiers?: string[];
};

export type SettingsKey =
  | 'functions'
  | 'keywords'
  | 'operators'
  | 'strings'
  | 'numbers';

export type Settings = Partial<Record<SettingsKey, OutputSettings>>;

export type Options = {
  format?: boolean;
  noColors?: boolean;
  settings?: Settings;
};
