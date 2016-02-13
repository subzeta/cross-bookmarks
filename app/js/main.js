var App = function()
{
    var that = this,
        endpoint = 'http://www.subzeta.com/bookmarks.txt';

    this.view = new View();
    this.parser = new Parser();
    this.storer = new Storer();

    this.init = function() {
        that.view.init();

        document.addEventListener('update-clicked', function() {
            that._download(that._saveAndPrint);
        });

        if (that._iAlreadyHaveBookmarks()) {
            that._print();
            that._check();
        } else {
            that._download(that._saveAndPrint);
        }
    };

    this._iAlreadyHaveBookmarks = function() {
        return that.storer.exists('bookmarks');
    };

    this._download = function(callback) {
        $.ajax({
            url: endpoint,
            complete : function(response) {
                try {
                    callback(that.parser.parse(response.responseText));
                } catch (e) {
                    that._error(e);
                }
            },
            error: function(){
                that._error('Couldn\'t load the file. It\'s the correct path?');
            }
        });
    };

    this._saveAndPrint = function(bookmarks) {
        that.storer.set('bookmarks', bookmarks);
        that._print();
    };

    this._check = function() {
        that._download(that._noticeIfOutdated);
    };

    this._noticeIfOutdated = function(bookmarks) {
        if (that.storer.equalTo('bookmarks', bookmarks)) {
            that.view.sourcesAreOutdated();
        }
    };

    this._print = function() {
        that.view.render(that.storer.get('bookmarks'));
    };

    this._error = function(message) {
        that.view.showError(message);
    };
};

$(document).ready(function(){
    (new App()).init();
});
