(function(){

"use strict";

function NewsElement( data ) {
  this.data = data;
  this.objDate = null;
  
  this.wrapperEl = document.querySelector( ".blog__wrapper" );
    
  this.init();
}


NewsElement.prototype.init = function() {
  this.objDate = this.prepareObjDate();
  this.formatedDate = this.getFormatedDate();
}


/**
* Show element on page.
*/
NewsElement.prototype.show = function() {
  
  /**
  * Get template and fill it with data.
  * @param {string} headerContent
  * @param {string} dateContent
  * @return {node} template
  */
  function prepareTemplate( headerContent, dateContent ) {
    var templateEl = document.querySelector( ".template__blog-content" );
    var template = templateEl.content.children[0].cloneNode( true );
    
    var header = template.querySelector( ".blog__news-title" );
    var date = template.querySelector( ".blog__news-date" );
    
    header.textContent = headerContent;
    date.textContent = dateContent;
    
    return template;
  }
  
  /**
  * Add template in wrapper element, use setTimeout for transitions.
  * @param {node} wrapperEl
  * @param {node} templateEl
  */
  function addTemplateToPage( wrapperEl, templateEl ) {
    wrapperEl.appendChild( templateEl );
    templateEl.previousElementSibling.classList.add( "translate-to-top" );
  
    setTimeout( function() {
      templateEl.classList.add( "blog__content--top" );
    }, 10);
  }
  
  /**
  * Remove previous template sibling on transitionend.
  * @param {node} wrapperEl
  * @param {node} templateEl
  */
  function removePreviousTemplate( wrapperEl, templateEl ) {
    
    function transitionEndHandler( event ) {
      this.removeEventListener( event.type, transitionEndHandler );
      wrapperEl.removeChild( this );
    }
    
    templateEl.previousElementSibling.addEventListener( "transitionend", transitionEndHandler );
  }
  
  this.templ = prepareTemplate( this.getTitle(), this.formatedDate );
  addTemplateToPage( this.wrapperEl, this.templ );
  removePreviousTemplate( this.wrapperEl, this.templ );
}


/**
* Create Date object using dateString.
* @return {Date} objDate
*/
NewsElement.prototype.prepareObjDate = function(){
  var objDate = new Date( Date.parse( this.getRawDate() ) );
  return objDate; 
}



/* ====== Getters ====== */

NewsElement.prototype.getRawDate = function() {
  return this.data.date;
}


NewsElement.prototype.getMonthNumber = function() {
  return this.objDate.getMonth();
}

/**
* Loop through enum and return proper monthName.
*/
NewsElement.prototype.getMonthName = function() {
  for( var key in this.monthNames ) {
    if( key == this.getMonthNumber() ) {
      return this.monthNames[key];
    }
  }
}

NewsElement.prototype.getFormatedDate = function() {
  var properDate = this.getMonthName() + " " +  this.getDay() + ", " + this.getYear();
  return properDate; 
}

NewsElement.prototype.getDay = function() {
  return this.objDate.getDate();
}


NewsElement.prototype.getYear = function() {
  return this.objDate.getFullYear();
}


NewsElement.prototype.getTitle = function() {
  return this.data.header;
}


NewsElement.prototype.getDescription = function() {
  return this.data.body;
}

/**
* @enum {string} monthNames
*/
NewsElement.prototype.monthNames = {
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


window.NewsElement = NewsElement;

})();