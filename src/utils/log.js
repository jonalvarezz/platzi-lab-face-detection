/**
 * Enable the logger by setting the URL parameter `?debug=1`
 */
const DEBUG = window.location.search.includes("debug") || false;

export class Logger {
  constructor(context, debug = DEBUG) {
    this.context = context;
    this.debug = debug;
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
