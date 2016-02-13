var View = function()
{
    var that = this;

    this.$status = $('#status');
    this.$data = $('#bookmarks');
    this.$filtering = $('#filtering');
    this.$updateUpToDate = $('#update-uptodate');
    this.$updateOutdated = $('#update-outdated');

    this.init = function() {
        this.$filtering.on('keyup', function(){
            var needle = $(this).val();
            that.$data.find('p').each(function(){
                $(this).toggleClass('hidden', needle.length > 0 && $(this).filter(':contains("'+needle+'")').length == 0);
            });
            that.$data.find('h1').each(function(){
                $(this).toggleClass('hidden', that.$data.find('p[rel="'+$(this).html()+'"]:visible').length === 0);
            });
        });

        this.$updateOutdated.on('click', function() {
            that.$data.html('');
            document.dispatchEvent(new CustomEvent('update-clicked', {}));
            $(this).addClass('hidden');
            that.$updateUpToDate.removeClass('hidden');
        });
    };

    this.render = function(data) {
        for (var i = 0; i < data.length; i++) {
            var title = data[i]['title'],
                items = data[i]['items'];

            this.$data.append('<h1>'+title+'</h1>');
            for (var j = 0; j < items.length; j++) {
                var url = items[j]['url'],
                    description = items[j]['description'],
                    keywords = items[j]['keywords'];

                this.$data.append('<p rel="'+title+'"><a href="'+url+'" target="blank">'+description+'</a><br /><span class="keywords">'+keywords+'</span></p>');
            }
        }
    };

    this.sourcesAreOutdated = function() {
        that.$updateUpToDate.addClass('hidden');
        this.$updateOutdated.removeClass('hidden');
    };

    this.showError = function(message) {
        this.$status.html(message);
    };
};