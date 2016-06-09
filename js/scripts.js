var newsArray = data.news;
var helpArray = [];

newsArray.sort( function( a, b) {
  a = new Date( Date.parse( a.date ) ).getMonth();
  b = new Date( Date.parse( b.date ) ).getMonth();
  return a - b;
})

var groupedArray = createArrays( newsArray );


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
    array.splice( index, 1 );
    getRandomRecordFromArray( array );
  }
  else {
    console.warn( "end of array" );
    return;
  }
}

groupedArray.forEach( function( el, i, arr) {
  getRandomRecordFromArray( el );
})

console.log( groupedArray );

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