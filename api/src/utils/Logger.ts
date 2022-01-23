import { inspect } from "util";

enum Color {
    ERROR = "\u001b[31m",
    WARN = "\u001b[33m",
    INFO = "\u001b[36m",
    DEBUG = "\u001b[37m",
    RESET = "\u001b[0m",
}

enum LogLevel {
    DEBUG,
    INFO,
    WARN,
    ERROR,
}

// All logger libs suck, so here we go
export default class Logger {
    private level: LogLevel;
    private tag: string;

    public constructor(level: string, tag?: string) {
        const logLevel = LogLevel[level.toUpperCase() as "DEBUG"];
        if (logLevel === undefined) throw new Error(`Invalid LogLevel: ${level}`);
        this.level = logLevel;
        this.tag = tag;
    }

    private static get timestamp() {
        return new Date().toLocaleString();
    }

    public static log(...args: any) {
        new Logger("DEBUG").log(LogLevel.DEBUG, args);
    }

    private write(color: string, message: string) {
        process.stdout.write(color + message + Color.RESET);
    }

    private log(level: LogLevel, args: any[]) {
        if (this.level > level) return this;

        const levelStr = LogLevel[level];
        const color = Color[levelStr as keyof typeof Color];
        this.write(color, `${Logger.timestamp} [${levelStr}] ${this.tag ? `[${this.tag}] ` : ""}`);

        args.forEach(arg => {
            // prettier-ignore
            const msg = typeof arg !== "object" 
                            ? String(arg) 
                            : arg instanceof Error 
                                ? arg.stack || arg.message 
                                : inspect(arg);

            this.write(color, msg);
            process.stdout.write("\n");
        });

        return this;
    }

    public debug(...args: any) {
        return this.log(LogLevel.DEBUG, args);
    }

    public info(...args: any) {
        return this.log(LogLevel.INFO, args);
    }

    public warn(...args: any) {
        return this.log(LogLevel.WARN, args);
    }

    public error(...args: any) {
        return this.log(LogLevel.ERROR, args);
    }
}