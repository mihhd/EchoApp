import Bugsnag from "@bugsnag/expo";

const log = (error) => Bugsnag.notify(error);

const start = () => Bugsnag.start("46d8095f8dba9dccc5e9f1a202050dcb");

export default { log, start };
