var Storer = function()
{
    this.set = function(key, data) {
        window.localStorage.setItem(key, JSON.stringify(data));
    };

    this.get = function(key) {
        return JSON.parse(window.localStorage.getItem(key));
    };

    this.exists = function(key) {
        return window.localStorage.getItem(key) !== null;
    };

    this.clear = function(key) {
        window.localStorage.clear(key);
    };

    this.equalTo = function(key, object) {
        return JSON.stringify(this.get(key)) !== JSON.stringify(object);
    };
};