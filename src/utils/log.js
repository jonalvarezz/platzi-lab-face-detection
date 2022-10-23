/**
 * Logger
 * Enable the logger by setting the URL parameter to the given context `?debug=context`
 *
 * @example
 * const myLogger = new Logger("myContext");
 * myLogger.log("Hello world");
 *
 * // Append `?debug=myContext` to your URL to enable the logger
 */
export class Logger {
  constructor(context, debug = false) {
    this.context = context;
    this.debug = debug || this.shouldDebug();
  }

  shouldDebug() {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get("debug") === this.context;
    } catch (error) {
      return false;
    }
  }

  log(...args) {
    if (this.debug) {
      console.log(`[${this.context}]`, ...args);
    }
  }

  warn(...args) {
    if (this.debug) {
      console.warn(`[${this.context}]`, ...args);
    }
  }

  error(...args) {
    if (this.debug) {
      console.error(`[${this.context}]`, ...args);
    }
  }
}
