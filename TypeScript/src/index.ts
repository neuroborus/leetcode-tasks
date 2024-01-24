import { _compare, _debug, _error, _log } from "./logger";

console.log("Started!");

_log("LOG");
_debug("DEBUG");
_error("ERROR");
_compare("The cat sat on the mat.", "The mat sat on the cat.");

console.log("Ended!");
