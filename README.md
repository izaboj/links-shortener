links-shortener
=======================================================================
Java Script library for shortening links depending on the search phrase.

## Features
* Very easy to understand
* Configurable max length of link
* Only one dependency

## Installation
* download from Github
* npm: `npm install links-shortener.js`

## makeURLShorter 
makeURLSHorter - main function for shortening link. 
Parameters: 
** link 
** searchValue
** maxLength
	
See examples below 

## Examples 
The examples below showing how the link is shortening depending on where the search phrase (searchValue) is. 

### Search phrase(searchValue) in url domain 
```javascript
	 var linkShortener = require('links-shortener');
	 
	 var link = "http://www.links-shortener.com/home/test/cat3?param1&param2&param3#fragment_part";
	 var searchValue = 'short'
	 var maxLength = 20;  // max lenght of link ( we want to shortener link to this length)
	 
	 var shortenedLink = linkShortener.makeURLShorter(link, searchValue, maxLength);
	 
	 console.log(shortenedLink);
```
### Search phrase(searchValue) in url path
```javascript
	 var searchValue = 'test'
	
	 var shortenedLink = linkShortener.makeURLShorter(link, searchValue, maxLength);
	 
	 console.log(shortenedLink);
```
### Search phrase(searchValue) in url query
```javascript
	 var searchValue = 'param2'
	
	 var shortenedLink = linkShortener.makeURLShorter(link, searchValue, maxLength);
	 
	 console.log(shortenedLink);
```
### Search phrase(searchValue) in url fragment
```javascript
	 var searchValue = 'fragment'
	
	 var shortenedLink = linkShortener.makeURLShorter(link, searchValue, maxLength);
	 
	 console.log(shortenedLink);
```





