import {_debug, _error, _log} from "./logger";

console.log('Started!');

_log('LOG');
_debug('DEBUG');
_error('ERROR');

const message = "This is a message with " + "\x1b[31mred\x1b[0m" + " and " + "\x1b[34mblue\x1b[0m" + " colors.";
console.log(message);

console.log('Ended!');
