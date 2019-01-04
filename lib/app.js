const EventEmitter = require('events')

class App extends EventEmitter {

    constructor(appId) {
        super();
        this.appId = appId;
    }

    start() {
        this.program = require('commander');
        this.program.option('-h, --hostname <hostname>');
        this.program.option('-p, --port <port>');
        this.program.option('-k, --key <key>');
        this.program.parse(process.argv);
        this.hostname = this.program.hostname;
        this.port = this.program.port;
        this.key = this.program.key;
        console.log("Hostname: ", this.hostname);
        console.log("Port: ", this.port);
        console.log("Key: ", this.key);
    }

}

module.exports = App;
