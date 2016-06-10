(function(){
  
"use strict";
  
function NewsBase( data ) {
  this.data = data;
  
  this.dateObj = null;
  this.formatedDate = null;
  
  this.init();
}

/**
* Create date object and prepare date in string for view.
*/
NewsBase.prototype.init = function() {
  this.dateObj = this.prepareObjDate();
  this.formatedDate = this.getFormatedDate();
}

NewsBase.prototype.prepareObjDate = function(){
  var objDate = new Date( Date.parse( this.getRawDate() ) );
  return objDate; 
}

NewsBase.prototype.getFormatedDate = function() {
  var properDate = this.getMonthName() + " " +  this.getDay() + ", " + this.getYear();
  return properDate; 
}



/* ====== Getters ====== */

NewsBase.prototype.getTitle = function() {
  return this.data.header;
}

NewsBase.prototype.getRawDate = function() {
  return this.data.date;
}


NewsBase.prototype.getMonthNumber = function() {
  return this.dateObj.getMonth();
}

/**
* Loop through enum and return proper monthName.
*/

NewsBase.prototype.getDay = function() {
  return this.dateObj.getDate();
}


NewsBase.prototype.getYear = function() {
  return this.dateObj.getFullYear();
}


NewsBase.prototype.getDescription = function() {
  return this.data.body;
}


NewsBase.prototype.getMonthName = function() {
  for( var key in this.monthNames ) {
    if( key == this.getMonthNumber() ) {
      return this.monthNames[key];
    }
  }
}

/**
* @enum {string} monthNames
*/
NewsBase.prototype.monthNames = {
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


window.NewsBase = NewsBase;
  
})();













