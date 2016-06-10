"use strict";

var newsArray = data.news;
var sortedArray = [];
var randomizedNewsArray = [];



window.addEventListener( "DOMContentLoaded", function( event ) {
  initNewsFeed( newsArray, true );
})
window.addEventListener( "newsFeedEnd", function( event ) {
  randomizedNewsArray = [];
  initNewsFeed( newsArray, false );
})



/**
* Initialize newsFeed.
* @param {array} array,
* @param {boolean} firstInit
*/
function initNewsFeed( array, firstInit ) {
  
  function deepCopy( array ) {
    var copy;
    if( Array.isArray( array ) ) {
      copy = array.slice();
      for( var i = 0; i < copy.length; i++ ) {
        copy[i] = deepCopy( copy[i] );
      }
      return copy;
    }
    else {
      return array;
    }
  }
  
  if( firstInit && sortedArray.length === 0 ) {
    sortedArray = createNewsObjects( array );
    sortedArray = sortElementsInArray( sortedArray );
    sortedArray = createSecondLevelArrays( sortedArray );
  }
  
  var tempArray = deepCopy( sortedArray );
  tempArray.forEach( function( el, i, arr) {
    getRandomRecordFromArray( el );
  });
  showNewsFeed( randomizedNewsArray, 15000 );
}


/**
* Create Array with compontents from raw data.
* @param {array} array
* @return {array} array
*/
function createNewsObjects( array ) {
  array.forEach( function( el, i, arr ){
    sortedArray[i] = new NewsElement( el );
  });
  return sortedArray;
}


/**
* Sort objects in array by monthNumber.
* @param {array} array
* @return {array} array
*/
function sortElementsInArray( array ) {
  array.sort( function( a, b ) {
    return a.getMonthNumber() - b.getMonthNumber();
  });
  return array;
}


/**
* Group news objects within each month in second level arrays. 
* @param {array} list
*/
function createSecondLevelArrays( list ) {
  var array = [];
  var index = null;
  list.forEach( function( el, i, arr ){
    var x = el.getMonthNumber();
    if( index !== x ) {
      array.push( [] );
    }
    index = x;
    array[array.length - 1].push( el );
  })
  return array;
}


/**
* Get random element within second level array and push into other array.
* @param {array} array
*/
function getRandomRecordFromArray( array ) {
  
  function randomInteger( min, max ) {
    var rand = min - 0.5 + Math.random() * ( max - min + 1 )
    rand = Math.round( rand );
    return rand;
  }
  
  if( array.length > 0 ) {
    var index = randomInteger( 0, array.length - 1 );
    randomizedNewsArray.push( array[index] );
    array.splice( index, 1 );
    getRandomRecordFromArray( array );
  }
  else {
    return;
  }
}


/**
* Loop through array and show each element with timeout delay. Last iteration creates custom event "newsFeedEnd".
* @param {array} array
* @param {number} timeout
*/
function showNewsFeed( array, timeout ) {
  
  function createAndDispatchCustomEvent( eventType ) {
    var evt = new CustomEvent( eventType );
    window.dispatchEvent( evt );
  }
  
  for( var i = 0; i < array.length; i++ ) {
    (function(){
      var j = i;
      setTimeout( function timer() {
        
        array[j].show();
        if( j == array.length - 1 ) {
          createAndDispatchCustomEvent( "newsFeedEnd" );
        }

      }, timeout * j );
    })();
  }
} 









