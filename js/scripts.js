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
var randomizedNewsArray = [];



//window.addEventListener( "DOMContentLoaded", function( event ) {
//  init( newsArray );
//})
//window.addEventListener( "newsFeedEnd", function( event ) {
//  init( newsArray );
//})



function init( array ) {
  var sortedArray = sortElementsInArray( array );
  sortedArray = createSecondLevelArrays( sortedArray );
  sortedArray.forEach( function( el, i, arr) {
    getRandomRecordFromArray( el );
  });
  showNewsFeed( randomizedNewsArray, 15000 );
}


function sortElementsInArray( array ) {
  array.sort( function( a, b ) {
    a = new Date( Date.parse( a.date ) ).getMonth();
    b = new Date( Date.parse( b.date ) ).getMonth();
    return a - b;
  });
  return array;
}


function createSecondLevelArrays( list ) {
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


function showNewsFeed( array, timeout ) {
  
  function createAndDispatchCustomEvent( eventType ) {
    var evt = new CustomEvent( eventType );
    window.dispatchEvent( evt );
  }
  
  var header = document.querySelector( ".blog .blog__news-title" );
  var date = document.querySelector( ".blog .blog__news-date" );
  var wrapper = document.querySelector( ".blog__wrapper" );
  
  for( var i = 0; i < array.length; i++ ) {
    
    (function(){
    var j = i;
    setTimeout( function timer() {
      
      addNews( header, date, wrapper, array, j );
      
      /**
      * restart algorithm if showed element is the last
      */
      if( j == array.length - 1 ) {
        createAndDispatchCustomEvent( "newsFeedEnd" );
      }
      
    }, timeout * j );
    })();
    
  }
} 


function addNews( headerEl, dateEl, wrapperEl, array, j ) {
  
  function formatDate( date ) {
    
    function getMonthName( monthNumber, enumMonthObj ) {
      for( key in enumMonthObj ) {
        if( key == monthNumber ) {
          return enumMonthObj[key];
        }
      }
    }
    
    date = new Date( Date.parse( array[j].date ) );
    var properDate = getMonthName( date.getMonth(), month ) + " " +  date.getDate() + ", " + date.getFullYear();
    
    return properDate; 
  }
  
  function prepareTemplate( headerContent, dateContent ) {
    var templateEl = document.querySelector( ".template__blog-content" );
    var template = templateEl.content.children[0].cloneNode( true );
    
    var header = template.querySelector( ".blog__news-title" );
    var date = template.querySelector( ".blog__news-date" );
    
    header.textContent = headerContent;
    date.textContent = dateContent;
    
    return template;
  }
  
  function addTemplateToPage( wrapperEl, templateEl ) {
    wrapperEl.appendChild( templateEl );
    templateEl.previousElementSibling.classList.add( "translate-to-top" );
  
    setTimeout( function() {
      templateEl.classList.add( "blog__content--top" );
    }, 10);
  }
  
  function removePreviousTemplate( wrapperEl, templateEl ) {
    
    function transitionEndHandler( event ) {
      this.removeEventListener( event.type, transitionEndHandler );
      wrapperEl.removeChild( this );
    }
    
    templateEl.previousElementSibling.addEventListener( "transitionend", transitionEndHandler );
  }
  
  var templ = prepareTemplate( array[j].header, formatDate( array[j].date ) );
  addTemplateToPage( wrapperEl, templ );
  removePreviousTemplate( wrapperEl, templ );
}







