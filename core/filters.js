'use strict';

angular.module('InstantoClient')

    // Capitalizes the very first letter
    .filter('capitalize', function () {
        return function (input) {
            return [input.substr(0, 1).toUpperCase(), input.substr(1)].join('');
        };
    })

    // Filter to cut words or sentences to a number of characters when we don't have enough space
    .filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || '…');
        };
    })
    /* Use:
       ----
        wordwise (boolean) - if true, cut only by words bounds,
        max (integer) - max length of the text, cut to this number of chars,
        tail (string, default: ' …') - add this string to the input string if the string was cut.
    */

    // Detects links on a text, and wraps them with an <a> tag with the proper href attribute. Note
    // that should be used in conjunction with the ngBindHtml directive. Notice also that we are not
    // considering as a part of the link the strings (space-separated) . , ; ... if those are in the
    // last place. Thus, since they are valid URL characteres, links ending with them will not work 
    // as one might expect.
    .filter('linkify', function () {
    	return function (str, external) {
    		var parts = str.split(' '),
    			urlRegex = /^[((http|https):\/\/)|(www\.)][^ "]+$/,
    			result = [],
    			i = 0, len = parts.length,
    			lastChar, lastChars, tmpStr, strButLast, strButLast, 
    			extLink = '';
    		
    		if (external === true) extLink = ' target="_blank"';
    		
    		for ( ; i < len; i++) {
    			tmpStr = parts[i];
    			if (urlRegex.test(tmpStr)) {
    				lastChar = tmpStr.slice(-1);
    				lastChars = tmpStr.slice(-3);
    				if (lastChars == '...') {
    					strButLast = tmpStr.slice(0, -3);
    					tmpStr = '<a href="' + strButLast + '"' + extLink + '>' + strButLast + '</a>' + lastChars;
    				} else if (lastChar == ',' || lastChar == ';' || lastChar == '.') {
    					strButLast = tmpStr.slice(0, -1);
    					tmpStr = '<a href="' + strButLast + '"' + extLink + '>' + strButLast + '</a>' + lastChar;
    				} else {
    					tmpStr = '<a href="' + tmpStr + '"' + extLink + '>' + tmpStr + '</a>';
    				}
    			}
    			result.push(tmpStr);
    		}
    		return result.join(' ');
    	};
    })

    .filter('externalUrl', function () {
        return function (web) {
            return web.indexOf('http://') !== 0 
                && web.indexOf('https://') !== 0 ? 'http://' + web : web;
        };
    })

    .filter('dateMs', ['$filter', 'CONST', function ($filter, CONST) {
        return function (ms) {
            return $filter('date')(ms * 1000, CONST.dateFormat);
        };
    }])

    .filter('abs', function () {
        return function (value) {
            return Math.abs(value);
        };
    });
