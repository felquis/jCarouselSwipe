/*
 *  Project: jCarouselSwipe.js
 *  Description: Plugin that add touch controls for jCarousel.
 *  Author: @felquis
 *  License: MIT
 *  GitHub : github.com/felquis/jCarouselSwipe
 */
;(function(a,b,c){function g(b,c){this.element=b;this.options=a.extend({},f,c);this._defaults=f;this._name=d;this.init()}var d="touch",e=b.document,f={};g.prototype.init=function(){if(Hammer==c||Modernizr==c)return false;if(!Modernizr.touch)return false;var b=a(this.element);if(!b.data("jcarousel"))return false;var d=new Hammer(b.get(0));direction={left:function(){b.jcarousel("scroll","+=1")},right:function(){b.jcarousel("scroll","-=1")}},init=init=parseFloat(b.find("ul").css("left").replace("px","")),oudGo=0,goDirection="left";d.ondragstart=function(){init=init=parseFloat(b.find("ul").css("left").replace("px",""))};d.ondrag=function(a){var c=a.distanceX*.5,d=init+c;if(oudGo>c){if(c<900){b.find("ul").css("left",d);goDirection="left"}}else if(oudGo<c){if(c<900){b.find("ul").css("left",d);goDirection="right"}}oudGo=c};d.ondragend=function(a){oudGo=0;direction[goDirection](a)}};a.fn[d]=function(b){return this.each(function(){if(!a.data(this,"plugin_"+d)){a.data(this,"plugin_"+d,new g(this,b))}})}})(jQuery,window);