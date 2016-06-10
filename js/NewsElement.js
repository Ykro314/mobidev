(function(){

"use strict";

function NewsElement( data ) {
  this.data = new NewsBase( data );
  
  this.wrapperEl = document.querySelector( ".blog__wrapper" );
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
  
  this.templ = prepareTemplate( this.data.getTitle(), this.data.formatedDate );
  addTemplateToPage( this.wrapperEl, this.templ );
  removePreviousTemplate( this.wrapperEl, this.templ );
}


window.NewsElement = NewsElement;

})();