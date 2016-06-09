var month = {
  "0": "Jan",
  "1": "Feb",
  "2": "Mar",
  "3": "Apr",
  "4": "May",
  "5": "Jun",
  "6": "Jul",
  "7": "Aug",
  "8": "Sep",
  "9": "Oct", 
  "10": "Nov",
  "11": "Dec",
}

var newsArray = data.news;
var helpArray = [];

//newsArray.sort( function( a, b) {
//  a = new Date( Date.parse( a.date ) ).getMonth();
//  b = new Date( Date.parse( b.date ) ).getMonth();
//  return a - b;
//});

function sortElementsInArray( array ) {
  array.sort( function( a, b) {
    a = new Date( Date.parse( a.date ) ).getMonth();
    b = new Date( Date.parse( b.date ) ).getMonth();
    return a - b;
  });
  return array;
}

//var groupedArray = createArrays( newsArray );


function createArrays( list ) {
  var array = [];
  var index = null;
  list.forEach( function( el, i, arr ){
    var x = new Date( Date.parse( el.date ) ).getMonth();
    if( index !== x ) {
      array.push( [] );
    }
    index = x;
    array[array.length - 1].push( el );
  })
  return array;
}

function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}

function getRandomRecordFromArray( array ) {
  if( array.length > 0 ) {
    var index = randomInteger(0, array.length - 1);
    console.log( array[index].header, index );
    helpArray.push( array[ index ] );
    array.splice( index, 1 );
    getRandomRecordFromArray( array );
  }
  else {
    console.warn( "end of array" );
    return;
  }
}

//groupedArray.forEach( function( el, i, arr) {
//  getRandomRecordFromArray( el );
//});

//console.log( helpArray );

function showNews( array ) {
  var header = document.querySelector( ".blog__news-title" );
  var date = document.querySelector( ".blog__news-date" );
  for( var i = 0; i < array.length; i++ ) {
    
    (function(){
    var j = i;
    setTimeout( function timer() {
      
      function formatDate( date ) {
        date = new Date( Date.parse( array[j].date ) );
        function getMonthName( monthNumber, enumMonthObj ) {
          for( key in enumMonthObj ) {
            if( key == monthNumber ) {
              return enumMonthObj[key];
            }
          }
        }
        var properDate = getMonthName( date.getMonth(), month ) + " " +  date.getDate() + ", " + date.getFullYear();
        return properDate;
      }
      function formatText( text, maxSymbols ) {
        if( text.length > maxSymbols ) {
          var formatedText = text.slice( 0, maxSymbols ) + "...";
          return formatedText;
        }
        else {
          return text;
        }
      }
      
      header.textContent = formatText( array[j].header, 45 );
      date.textContent = formatDate( array[j].date );
      if( j == array.length - 1 ) {
        createAndDispatchCustomEvent( "newsend" );
      }
    }, 15000 * j );
    })();
    
  }
} 

function createAndDispatchCustomEvent( eventType ) {
  var evt = new CustomEvent( eventType );
  window.dispatchEvent( evt );
}
//showNews( helpArray );

function init( array ) {
  var sortedArray = sortElementsInArray( array );
  var groupedArray = createArrays( sortedArray );
  groupedArray.forEach( function( el, i, arr) {
    getRandomRecordFromArray( el );
  });
  showNews( helpArray );
}

window.addEventListener( "newsend", function( event ) {
  init( newsArray );
})

init( newsArray );

//var testRandomArray = groupedArray[3];
//newsArray.forEach( function( el, i, arr ) {
//  var time = Date.parse( el.date );
//  time = new Date( time );
//  helpArray[i] = time;
//})




//console.log( groupedArray );
/**
groupedArray.forEach( function( el ) {
  console.log( "===========new array==============" );
  el.forEach( function( el ) {
    console.log( el.header );
  })
})
*/


//console.log( testRandomArray );

//testRandomArray.forEach( function( el, i, arr ){
//  var showedIndex = randomInteger( 0, arr.length-1 )
//  arr.splice( showedIndex, 1);
//  console.log( arr[ showedIndex ] );
//})

//getRandomARecordFromArray( testRandomArray );

//console.log( testRandomArray );








function rand( array ) {
  var showed = [];
  testRandomArray.forEach( r );
  
  function r( el, i, arr) {
    var showedIndex = randomInteger( 0, arr.length-1 );
    showedIndex = test( showedIndex );
    showed.push( showedIndex );
    
    function test( y ) {
      console.log( y );
      for( var i = 0; i < showed.length; i++ ) {
        if( showed[i] === y ) {
          console.log( y, showed[i] );
          console.log( "match" );
          y = randomInteger( 0, arr.length-1 );
          break;
        }
      }
      return y;
    }
    
  }
  
  
  console.log( showed );
}

//rand( testRandomArray[3] );