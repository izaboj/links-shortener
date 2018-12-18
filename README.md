links-shortener
=======================================================================
Java Script library for shortening links depending on the search phrase.


[![github issue](https://img.shields.io/github/issues/izaboj/links-shortener.svg)](https://github.com/izaboj/links-shortener)

<!--[![npm ](https://img.shields.io/npm/v/izaboj/links-shortener.svg)](https://github.com/izaboj/links-shortener)
[![npm bundle size](https://img.shields.io/bundlephobia/min/izaboj/links-shortener.svg)](https://github.com/izaboj/links-shortener)-->



## Features
* Very easy to understand
* Configurable max length of link
* Only one dependency

## Installation
* download from GitHub
* npm: `npm install links-shortener.js`

## makeURLShorter
makeURLShorter - main function for shortening link.
Parameters:
* link
* searchValue
* maxLength

See examples below

## Examples
The examples below showing how the link is shortening depending on where the search phrase (searchValue) is.

### Search phrase in url domain
```javascript
	var linkShortener = require('links-shortener');

	var link = "http://www.subdomain.domain.com/directory2018/home/test/cat3?param1&param2&param3#lastpartofverylongurl";
	var maxLength = 40;      // max lenght of link
	var searchValue = 'com';

	var shortenedLink = linkShortener.makeURLShorter(link, searchValue, maxLength);
	console.log(shortenedLink);

	//prints 'www.subdomain.domain.com/directory2018/home/test/cat3?param1&param2&param3#lastpartofverylongurl'
```
### Search phrase in url path
```javascript
	var searchValue = 'test';

	var shortenedLink = linkShortener.makeURLShorter(link, searchValue, maxLength);
	console.log(shortenedLink);

	// prints '...domain.domain.com/...home/test/cat3?param1&param2&param3#lastpartofverylongurl'    
```
### Search phrase in url query
```javascript
	var searchValue = 'param2';

	var shortenedLink = linkShortener.makeURLShorter(link, searchValue, maxLength);
	console.log(shortenedLink);

	// prints '...domain.com/directory...?...ram1&param2&param#lastpartofverylongurl'
```
### Search phrase(searchValue) in url fragment
```javascript
	var searchValue = 'part';

	var shortenedLink = linkShortener.makeURLShorter(link, searchValue, maxLength);
	console.log(shortenedLink);

	//prints '...ain.com/direct...?param1...#lastpartofverylongurl'
```
