
import dayjs from 'dayjs';

function LocalDate() {
    var utc = require("dayjs/plugin/utc");

    dayjs.extend(utc);

    // default local time
    dayjs().format(); //2019-03-06T17:11:55+08:00

    // UTC mode
    dayjs.utc().format(); // 2019-03-06T09:11:55Z

    // convert local time to UTC time
    dayjs().utc().format(); // 2019-03-06T09:11:55Z

    // While in UTC mode, all display methods will display in UTC time instead of local time.
    // And all getters and setters will internally use the Date#getUTC* and Date#setUTC* methods instead of the Date#get* and Date#set* methods.
    dayjs.utc().isUTC(); // true
    return dayjs.utc().local().format("YYYY-MM-DD"); //2019-03-06T17:11:55+08:00
};

function LocalDateTime() {
    var utc = require("dayjs/plugin/utc");

    dayjs.extend(utc);

    // default local time
    dayjs().format(); //2019-03-06T17:11:55+08:00

    // UTC mode
    dayjs.utc().format(); // 2019-03-06T09:11:55Z

    // convert local time to UTC time
    dayjs().utc().format(); // 2019-03-06T09:11:55Z

    // While in UTC mode, all display methods will display in UTC time instead of local time.
    // And all getters and setters will internally use the Date#getUTC* and Date#setUTC* methods instead of the Date#get* and Date#set* methods.
    dayjs.utc().isUTC(); // true
    return dayjs.utc().local().format("YYYY-MM-DD, hh:mm A "); //2019-03-06T17:11:55+08:00
};
function UTC_LocalDateTime(value) {
    var utc = require("dayjs/plugin/utc");

    dayjs.extend(utc);

    // default local time
    dayjs().format(); //2019-03-06T17:11:55+08:00

    // UTC mode
    dayjs.utc().format(); // 2019-03-06T09:11:55Z

    // convert local time to UTC time
    dayjs().utc().format(); // 2019-03-06T09:11:55Z

    // While in UTC mode, all display methods will display in UTC time instead of local time.
    // And all getters and setters will internally use the Date#getUTC* and Date#setUTC* methods instead of the Date#get* and Date#set* methods.
    dayjs.utc().isUTC(); // true
    return dayjs(value).utc().local().format("YYYY-MM-DD, hh:mm A "); //2019-03-06T17:11:55+08:00
};

export { LocalDate, LocalDateTime, UTC_LocalDateTime }