// Logger
// A logging utility
// Has 3 Severity Levels - ERROR, INFO, WARN
export class Logger {

  // Initializer for the Logger
  constructor(private readonly save: boolean = false) { }

  // currentTime - returns the current date and time in GMT Time Zone
  private currentTime(): Date {
    return new Date();
  }

  // divider - prints a horizontal dashed line to the console
  private divider(): void {
    const divider = '-'.repeat(process.stdout.columns) + "\n";
    console.log(divider);
  }

  // logMessage - prints a message to the console
  private logMessage(severity: Logger.Severity, messages: Array<string | number>): void {
    const message = `[${this.currentTime()}]  |  ${severity} :::  ` + messages.join(" | ");
    console.log(message);
    this.divider();
  }

  // info - prints an INFO message to the console
  info(...messages: Array<string | number>): void {
    this.logMessage(Logger.Severity.INFO, messages);
  }

  // warn - prints a WARN message to the console
  warn(...messages: Array<string | number>): void {
    this.logMessage(Logger.Severity.WARN, messages);
  }

  // error - prints a ERROR message to the console
  error(...messages: Array<string | number>): void {
    this.logMessage(Logger.Severity.ERROR, messages);
  }

}


export namespace Logger {
  export enum Severity {
    ERROR = "ERROR",
    INFO = "INFO",
    WARN = "WARN"
  }
}