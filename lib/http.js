class HTTPRequest {

    constructor(url) {
        this.url = url;
        return this;
    }

    headers(_headers) {
        this._headers = _headers;
        return this;
    }

    method(_method) {
        this._method = _method;
        return this;
    }

    body(_body) {
        this._body = _body;
        return this;
    }

    token(_token) {
        this._token = _token;
        return this;
    }

    callback(_callback) {
        this._callback = _callback;
        return this;
    }
}

module.exports = HTTPRequest;