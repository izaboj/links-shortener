define([
    'uri/URI'

], function(Uri) {
    function makeShorterFromLeft (urlPart, prefix, maxPartLength) {
        if (!urlPart) {
            return;
        }
        if (!prefix){
            prefix = '...';
        }
        let shortPart = '';
        if ( urlPart.length <= maxPartLength ){
            shortPart = urlPart;
        }  else {
            shortPart = prefix + urlPart.substr(-(maxPartLength - prefix.length));
        }
        return shortPart;
    };

    function makeShorterFromRight(urlPart, suffix, maxPartLength){
        if (!urlPart) {
            return;
        }
        if (!suffix){
            suffix = '...';
        }
        let shortPart = '';
        if ( urlPart.length <= maxPartLength ){
            shortPart = urlPart;
        }  else {
            shortPart = urlPart.substr(0,(maxPartLength - suffix.length)) + suffix;
        }
        return shortPart;
    };

    function makePartShorter(urlPart, searchValue, prefix, maxPartLength) {
        if (!urlPart || !searchValue) {
            return;
        }
        if (!prefix){
            prefix = '...';
        }
        searchValue = searchValue.toLowerCase();

        let shortPart = '';
        let indexOfFirstInPart = urlPart.toLowerCase().indexOf(searchValue);
        let startIndex = ( indexOfFirstInPart >= 5 ) ? indexOfFirstInPart - 5 : indexOfFirstInPart;

        shortPart = prefix + urlPart.substr(startIndex, maxPartLength - prefix.length );
        return shortPart;
    };

    return {
        makeURLShorter : function(link, searchValue, maxLength) {
            if (!link) {
                return
            }
            searchValue = searchValue.toLowerCase();
            maxLength = maxLength || 38;
            let url = new Uri(link);

            let urlParts = {
                domain : url.authority(),
                path : url.path(),
                query : url.search(),
                fragment : url.hash()
            };
            let linkNoProtocol = urlParts.domain + urlParts.path + urlParts.query + urlParts.fragment;
            let shortUrl = linkNoProtocol;

            if (!searchValue.length) {
                return shortUrl;
            }

            if ((linkNoProtocol.toLowerCase().indexOf(searchValue) + searchValue.length) <= maxLength ) {
                shortUrl = linkNoProtocol;

            } else if (urlParts.domain && urlParts.domain.toLowerCase().indexOf(searchValue) !== -1) {
                let maxDomainLength = maxLength;

                //short urlParts.domain
                shortDomain = makePartShorter(urlParts.domain, searchValue, '...', maxDomainLength);
                shortUrl = shortDomain + urlParts.path + urlParts.query + urlParts.fragment;

            } else if (urlParts.path && urlParts.path.toLowerCase().indexOf(searchValue) !== -1){
                let maxDomainLength = parseInt(maxLength/2);
                let maxPathLength = parseInt(maxLength/2);

                let shortDomain = makeShorterFromLeft(urlParts.domain, '...', maxDomainLength);

                // shorting only urlParts.domain
                if ((urlParts.path.toLowerCase().indexOf(searchValue) + searchValue.length) <= maxPathLength ) {
                    shortUrl = shortDomain + urlParts.path + urlParts.query + urlParts.fragment;

                } else {
                    // shortnig urlParts.domain and urlParts.path
                    let shortPath = makePartShorter(urlParts.path, searchValue, '/...', maxPathLength);
                    shortUrl = shortDomain + shortPath + urlParts.query + urlParts.fragment;
                }

            } else if (urlParts.query && urlParts.query.toLowerCase().indexOf(searchValue) !== -1){
                let maxDomainLength = parseInt(maxLength/3);
                let maxPathLength = parseInt(maxLength/3);
                let maxQueryLength = parseInt(maxLength/3);

                let shortDomain = makeShorterFromLeft(urlParts.domain, '...', maxDomainLength);
                let shortPath = makeShorterFromRight(urlParts.path, '...', maxPathLength);

                // shorting urlParts.domain and urlParts.path
                if ((urlParts.query.toLowerCase().indexOf(searchValue) + searchValue.length) <= maxQueryLength ) {
                    shortUrl = shortDomain + shortPath  + urlParts.query + urlParts.fragment;

                } else {
                    maxQueryLength = urlParts.query.length;
                    let shortQuery = makePartShorter(urlParts.query, searchValue, '?...', maxQueryLength);
                    shortUrl = shortDomain + shortPath + shortQuery + urlParts.fragment;
                }

            } else if (urlParts.fragment && urlParts.fragment.toLowerCase().indexOf(searchValue) !== -1){

                let maxDomainLength = parseInt(maxLength/4);
                let maxPathLength = parseInt(maxLength/4);
                let maxQueryLength = parseInt(maxLength/4);
                let maxFragmentLength = parseInt(maxLength/4);

                let shortDomain = makeShorterFromLeft(urlParts.domain, '...', maxDomainLength);
                let shortPath = makeShorterFromRight(urlParts.path, '...', maxPathLength);
                let shortQuery = makeShorterFromRight(urlParts.query, '...', maxQueryLength);

                // shorting urlParts.domain and urlParts.path and urlParts.query
                if (( urlParts.fragment.toLowerCase().indexOf(searchValue) + searchValue.length) <= maxQueryLength ) {
                    shortUrl = shortDomain + shortPath  + shortQuery + urlParts.fragment;

                } else {
                    maxFragmentLength = urlParts.fragment.length;
                    let shortFragment = makePartShorter(urlParts.fragment, searchValue, '#...', maxFragmentLength);
                    shortUrl = shortDomain + shortPath + + shortQuery + shortFragment;
                }
            }

            return shortUrl;
        }
    };
});
