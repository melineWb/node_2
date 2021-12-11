class UtilService {
    getTime() {
        return new Date().toLocaleString(undefined, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            hour12: false,
            minute: '2-digit',
            second: '2-digit',
        });
    }

    getActualRequestDurationInMilliseconds(start = process.hrtime()) {
        const NS_PER_SEC = 1e9; //  convert to nanoseconds
        const NS_TO_MS = 1e6; // convert to milliseconds
        const diff = process.hrtime(start);
        return `${((diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS).toLocaleString()} ms`;
    }
}

const SingletonFactory = (function () {
    let instance;

    return {
        getInstance: function () {
            if (!instance) {
                instance = new UtilService();
            }
            return instance;
        },
    };
})();

export default SingletonFactory.getInstance();
