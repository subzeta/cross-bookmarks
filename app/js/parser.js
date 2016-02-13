var Parser = function()
{
    this.parse = function(xml) {
        if (!window.DOMParser) {
            throw 'Couldn\'t parse the XML.';
        }

        try {
            return this._treat((new DOMParser()).parseFromString(xml, "text/xml"));
        } catch (e) {
            throw 'XML parse failed.';
        }
    };

    this._treat = function(xml) {
        var data = [],
            categories = xml.getElementsByTagName('category');

        for (var i = 0; i < categories.length; i++) {
            var title = categories[i].getAttribute('title'),
                items = categories[i].getElementsByTagName('item');

            data.push({'title': title, 'items': []});
            for (var j = 0; j < items.length; j++) {
                var url = items[j].getAttribute('url'),
                    description = items[j].getAttribute('description'),
                    keywords = items[j].getAttribute('keywords');

                data[data.length - 1]['items'].push({'url': url, 'description': description, 'keywords': keywords});
            }
        }

        return data;
    };
};
