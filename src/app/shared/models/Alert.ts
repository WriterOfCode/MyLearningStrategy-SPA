export interface Alert {
  duration: AlertDuration;
  theam: AlertTheam;
  title: string;
  message: string;
  debug: string;
}

export enum AlertDuration {
  Closable,
  SelfClosing
}

export enum AlertTheam {
  "muted",
  "important",
  "success",
  "information",
  "warning",
  "danger",
  "Secondary",
  "Dark",
  "Light"
}
