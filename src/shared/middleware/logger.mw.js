class Logger {

    static log(msg) {
        console.log(msg);
    }

    static error(error) {
        console.log('error', error);
    }

    static warn(...msg) {
        console.log('warn', msg);
    }
}

export { Logger }