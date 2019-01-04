const EventEmitter = require('events')
const SocketIO = require('socket.io-client');
const uuid = require('uuid');

class App extends EventEmitter {

    constructor(appId) {
        super();
        this.appId = appId;
        this.map = new Map();
    }

    request(http) {
        let requestId = uuid.v1();
        this.map.set(requestId, http);
        let encodedHttp = {
            id: requestId,
            type: http._method,
            url: http.url,
            tokenHeader: http._token === undefined ? false: http._token,
            options: {
                body: http._body,
                headers: http._headers
            }
        };
        this.socket.emit('http', encodedHttp);
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
        this.socket = SocketIO(this.hostname + ":" + this.port);
        this.socket.on('connect', () => this.onConnect());
        this.socket.on('identity', (appId) => this.onIdentity(appId));
        this.socket.on('start', (payload) => this.onStart(payload));
        this.socket.on('http', (data) => this.onHttp(data));
    }

    onConnect() {
        this.socket.emit('identity', this.key);
    }

    onStart(payload) {
        if (payload.type === "start") {
            this.emit('start', payload);
        }
        if (payload.type === "message_create") {
            this.emit('message-create', payload);
        }
        else if (payload.type === "message_update") {
            this.emit('message-update', payload);
        }
        else if (payload.type === "message_delete") {
            this.emit('message-delete', payload);
        }
        else if (payload.type === "message_delete_bulk") {
            this.emit('message-delete-bulk', payload);
        }
        else if (payload.type === "message_reaction_add") {
            this.emit('message-reaction-add', payload);
        }
        else if (payload.type === "message_reaction_remove") {
            this.emit('message-reaction-remove', payload);
        }
        else if (payload.type === "message_reaction_remove_all") {
            this.emit('message-reaction-remove-all', payload);
        }
        else if (payload.type === "typing") {
            this.emit('typing', payload);
        }
        else if (payload.type === "guild_load") {
            this.emit('guild-load', payload);
        }
        else if (payload.type === "guild_join") {
            this.emit('guild-join', payload);
        }
        else if (payload.type === "guild_update") {
            this.emit('guild-update', payload);
        }
        else if (payload.type === "guild_delete") {
            this.emit('guild-delete', payload);
        }
        else if (payload.type === "guild_ban_add") {
            this.emit('guild-ban-add', payload);
        }
        else if (payload.type === "guild_ban_remove") {
            this.emit('guild-ban-remove', payload);
        }
        else if (payload.type === "guild_emojis_update") {
            this.emit('guild-emojis-update', payload);
        }
        else if (payload.type === "guild_integrations_update") {
            this.emit('guild-integrations-update', payload);
        }
        else if (payload.type === "guild_member_add") {
            this.emit('guild-member-add', payload);
        }
        else if (payload.type === "guild_member_remove") {
            this.emit('guild-member-remove', payload);
        }
        else if (payload.type === "guild_member_update") {
            this.emit('guild-member-update', payload);
        }
        else if (payload.type === "guild_role_add") {
            this.emit('guild-role-add', payload);
        }
        else if (payload.type === "guild_role_update") {
            this.emit('guild-role-update', payload);
        }
        else if (payload.type === "guild_role_delete") {
            this.emit('guild-role-delete', payload);
        }
        else if (payload.type === "channel_create") {
            this.emit('channel-create', payload);
        }
        else if (payload.type === "channel_update") {
            this.emit('channel-update', payload);
        }
        else if (payload.type === "channel_delete") {
            this.emit('channel-delete', payload);
        }
        else if (payload.type === "channel_pins") {
            this.emit('channel-pins', payload);
        }
    }

    onHttp(data) {
        let http = this.map.get(data.id);
        if (http._callback) {
            http._callback(data, data.response, data.body);
        }
    }

    log(print) {
        this.socket.emit('log', print);
    }

}

module.exports = App;
