class HTTPRequest {
    method;
    headers;
    body;
    tokenHeader;

    constructor(url) {
        this.url = url;
    }

    headers(_headers) {
        this._headers = _headers;
    }

    method(_method) {
        this._method = _method;
    }

    body(_body) {
        this._body = _body;
    }

    token(_token) {
        this._token = token;
    }

    callback(_callback) {
        this._callback = _callback;
    }

}

module.exports = HTTPRequest;