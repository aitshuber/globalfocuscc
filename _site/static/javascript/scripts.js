/**
 * Twit
 *  jQuery Plugin to Display Twitter Tweets on a Blog.
 *  http://code.google.com/p/jquery-twit/
 *
 * Copyright (c) 2009 Yusuke Horie
 *
 * Released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Since  : 0.1.0 - 08/26/2009
 * Version: 0.1.0 - 08/26/2009
 */
(function(jQuery){var _i=0;jQuery.fn.twit=function(user,options){if(typeof user!='string')return this;var opts=jQuery.extend({},jQuery.fn.twit.defaults,options),c=jQuery.isFunction(opts.callback)?opts.callback:_callback,url='',params={};opts.user=user;url='http://twitter.com/statuses/user_timeline/'+opts.user+'.json';params.count=opts.count;return this.each(function(i,e){var $e=$(e);if(!$e.hasClass('twit'))$e.addClass('twit');jQuery.ajax({url:url,data:params,dataType:'jsonp',success:function(o){c.apply(this,[(o.results)?o.results:o,e,opts])}})})};jQuery.fn.twit.defaults={user:null,callback:null,icon:true,username:true,text:true,count:200,limit:7,label:'Twitter',title:''};var _callback=function(o,e,opts){var $this=$(e);if(!o||o.length==0||$this.length==0)return false;$this.data('_inc',1);_i++;var username=o[0].user.screen_name,icon=o[0].user.profile_image_url;var h='<div class="twitHeader">'+' <span class="twitLabel">'+opts.label+'</span>&nbsp;&nbsp;'+' <span class="twitTitle">'+opts.title+'</span>'+'</div>';if(opts.icon||opts.username){h+='<div class="twitUser">';if(opts.icon)h+=' <a href="http://twitter.com/'+username+'/">'+'  <img src="'+icon+'" alt="'+username+'" title="'+username+'" style="vertical-align:middle;" />'+' </a>&nbsp;&nbsp;';if(opts.username)h+='<a href="http://twitter.com/'+username+'/">'+username+'</a>';h+='</div>'}h+='<ul class="twitBody" id="twitList'+_i+'">'+_build(o,$this,opts)+'</ul>';$this.html(h);$('#twitList'+_i+' a.twitEntryShow').live('click.twitEntryShow'+_i,function(event){event.preventDefault();var $t=$(this);$t.parent().fadeOut(400,function(){var i=$this.data('_inc');i++;$this.data('_inc',i);if($t.hasClass('twitEntryAll')){$t.die('click.twitEntryShow'+_i);var start=(i*opts.limit)-opts.limit;$(this).after(_build(o,$this,opts,start,o.length)).remove()}else{$(this).after(_build(o,$this,opts)).remove()}})})};var _build=function(o,$t,opts,s,e){var h='',inc=$t.data('_inc'),start=s||(inc*opts.limit)-opts.limit,end=e||((o.length>start+opts.limit)?start+opts.limit:o.length);for(var i=start;i<end;i++){var t=o[i],username=t.user.screen_name,icon=t.user.profile_image_url;h+='<li class="twitEntry">';if(opts.text){var text=t.text.replace(/(https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)/,function(u){var shortUrl=(u.length>30)?u.substr(0,30)+'...':u;return'<a href="'+u+'">'+shortUrl+'</a>'}).replace(/@([a-zA-Z_]+)/g,'@<a href="http://twitter.com/$1">$1</a>').replace(/(?:^|\s)#([^\s\.\+:!]+)/g,function(a,u){return' <a href="http://twitter.com/search?q='+encodeURIComponent(u)+'">#'+u+'</a>'});h+=' <span>'+text+'</span>'}h+='</li>'}if(o.length>end){h+='<li class="twitNavi">'+'<a href="#" class="twitEntryShow">more</a> &nbsp;/&nbsp;';if(o.length>opts.limit)h+='<a href="#" class="twitEntryShow twitEntryAll">all</a>';h+='</li>'}return h}})(jQuery);



/**
 * SimpleFlame Content rotator
 * Version 0.2 (28.04.2009)
 * Possible effects to use :
 *  - if UI effects have been added: 'blind', 'bounce', 'clip', 'drop', 'explode', 'fold', 'highlight', 'puff', 'pulsate', 'scale', 'shake', 'size', 'slide', 'transfer'
 *  - basic effects from jQuery: fadeIn, fadeOut, show, hide, slideUp, slideDown
 */
(function(){var sfRotator=function(el,options){this.settings={'item':'li','activeClass':'active','duration':5000,'autorotate':true,'effectIn':'fadeIn','optionsIn':{},'speedIn':'normal','effectOut':'fadeOut','optionsOut':{},'speedOut':'normal'};jQuery.extend(this.settings,options);this.$container=jQuery(el);this.build();};sfRotator.prototype.build=function(){this.$container.addClass('sf-items');this.$wrapper=jQuery('<div class="sf-rotator" />');this.$container.before(this.$wrapper);this.$wrapper.append(this.$container);this.$controls=jQuery('<ul class="sf-controls" />');this.$wrapper.append(this.$controls);this.$items=this.$container.children(this.settings.item);this.$current=this.$items.index(this.$items.filter('.'+this.settings.activeClass));if(this.$current<0){this.$current=0;}
var self=this;this.$items.addClass('sf-item').each(function(index,item){var trigger=jQuery('<li><a href="#">'+parseInt(index+1,10)+'</a></li>');self.$controls.append(trigger);trigger.find('a').data('item',item).bind('click',{self:self},self.trigger);});this.activate(this.$current,true);if(this.settings.autorotate){this.autorotate();}};sfRotator.prototype.trigger=function(event){event.preventDefault();var self=event.data.self;self.stopAutorotate();self.$rotationTerminated=true;var position=self.$items.index(jQuery(this).data('item'));self.activate(position);};sfRotator.prototype.activate=function(position){var instant=arguments[1]||false;var activeClass=this.settings.activeClass;var oldItem=this.$items.eq(this.$current);var newItem=this.$items.eq(position);var onHide=function(){oldItem.removeClass(activeClass);};var onShow=function(){newItem.addClass(activeClass).css('zIndex',10);};var effects=['blind','bounce','clip','drop','explode','fold','highlight','puff','pulsate','scale','shake','size','slide','transfer'];if(instant===true){oldItem.removeClass(activeClass).hide();newItem.addClass(activeClass).show();}
else{if(jQuery.inArray(this.settings.effectOut,effects)>-1){oldItem.hide(this.settings.effectOut,this.settings.optionsOut,this.settings.speedOut,onHide);}
else if(jQuery.isFunction(oldItem[this.settings.effectOut])){oldItem[this.settings.effectOut](this.settings.speedOut,onHide);}
else{throw"Unsupported hide transition";}
newItem.css('zIndex',100);if(jQuery.inArray(this.settings.effectIn,effects)>-1){newItem.show(this.settings.effectIn,this.settings.optionsIn,this.settings.speedIn,onShow);}
else if(jQuery.isFunction(newItem[this.settings.effectIn])){newItem[this.settings.effectIn](this.settings.speedIn,onShow);}
else{throw"Unsupported show transition";}}
this.$controls.find('a').removeClass('active').eq(position).addClass('active');this.$current=position;};sfRotator.prototype.autorotate=function(){this.$rotationTerminated=false;var self=this;this.$container.mouseenter(function(){self.stopAutorotate();});this.$container.mouseleave(function(){self.startAutorotate();});this.startAutorotate();};sfRotator.prototype.startAutorotate=function(){if(this.$rotationTerminated===true){return;}
var self=this;this.$rotationInterval=window.setInterval(function(){var next=self.$current+1;if(next===self.$items.length){next=0;}
self.activate(next);},this.settings.duration);};sfRotator.prototype.stopAutorotate=function(){if(this.settings.autorotate){window.clearInterval(this.$rotationInterval);}};jQuery.fn.sfRotator=function(options){options=options||{};return this.each(function(){var r=new sfRotator(this,options);});};})();

/**
 * jQuery UI Effects 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/
 */
jQuery.effects||(function(d){d.effects={version:"1.7.1",save:function(g,h){for(var f=0;f<h.length;f++){if(h[f]!==null){g.data("ec.storage."+h[f],g[0].style[h[f]])}}},restore:function(g,h){for(var f=0;f<h.length;f++){if(h[f]!==null){g.css(h[f],g.data("ec.storage."+h[f]))}}},setMode:function(f,g){if(g=="toggle"){g=f.is(":hidden")?"show":"hide"}return g},getBaseline:function(g,h){var i,f;switch(g[0]){case"top":i=0;break;case"middle":i=0.5;break;case"bottom":i=1;break;default:i=g[0]/h.height}switch(g[1]){case"left":f=0;break;case"center":f=0.5;break;case"right":f=1;break;default:f=g[1]/h.width}return{x:f,y:i}},createWrapper:function(f){if(f.parent().is(".ui-effects-wrapper")){return f.parent()}var g={width:f.outerWidth(true),height:f.outerHeight(true),"float":f.css("float")};f.wrap('<div class="ui-effects-wrapper" style="font-size:100%;background:transparent;border:none;margin:0;padding:0"></div>');var j=f.parent();if(f.css("position")=="static"){j.css({position:"relative"});f.css({position:"relative"})}else{var i=f.css("top");if(isNaN(parseInt(i,10))){i="auto"}var h=f.css("left");if(isNaN(parseInt(h,10))){h="auto"}j.css({position:f.css("position"),top:i,left:h,zIndex:f.css("z-index")}).show();f.css({position:"relative",top:0,left:0})}j.css(g);return j},removeWrapper:function(f){if(f.parent().is(".ui-effects-wrapper")){return f.parent().replaceWith(f)}return f},setTransition:function(g,i,f,h){h=h||{};d.each(i,function(k,j){unit=g.cssUnit(j);if(unit[0]>0){h[j]=unit[0]*f+unit[1]}});return h},animateClass:function(h,i,k,j){var f=(typeof k=="function"?k:(j?j:null));var g=(typeof k=="string"?k:null);return this.each(function(){var q={};var o=d(this);var p=o.attr("style")||"";if(typeof p=="object"){p=p.cssText}if(h.toggle){o.hasClass(h.toggle)?h.remove=h.toggle:h.add=h.toggle}var l=d.extend({},(document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle));if(h.add){o.addClass(h.add)}if(h.remove){o.removeClass(h.remove)}var m=d.extend({},(document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle));if(h.add){o.removeClass(h.add)}if(h.remove){o.addClass(h.remove)}for(var r in m){if(typeof m[r]!="function"&&m[r]&&r.indexOf("Moz")==-1&&r.indexOf("length")==-1&&m[r]!=l[r]&&(r.match(/color/i)||(!r.match(/color/i)&&!isNaN(parseInt(m[r],10))))&&(l.position!="static"||(l.position=="static"&&!r.match(/left|top|bottom|right/)))){q[r]=m[r]}}o.animate(q,i,g,function(){if(typeof d(this).attr("style")=="object"){d(this).attr("style")["cssText"]="";d(this).attr("style")["cssText"]=p}else{d(this).attr("style",p)}if(h.add){d(this).addClass(h.add)}if(h.remove){d(this).removeClass(h.remove)}if(f){f.apply(this,arguments)}})})}};function c(g,f){var i=g[1]&&g[1].constructor==Object?g[1]:{};if(f){i.mode=f}var h=g[1]&&g[1].constructor!=Object?g[1]:(i.duration?i.duration:g[2]);h=d.fx.off?0:typeof h==="number"?h:d.fx.speeds[h]||d.fx.speeds._default;var j=i.callback||(d.isFunction(g[1])&&g[1])||(d.isFunction(g[2])&&g[2])||(d.isFunction(g[3])&&g[3]);return[g[0],i,h,j]}d.fn.extend({_show:d.fn.show,_hide:d.fn.hide,__toggle:d.fn.toggle,_addClass:d.fn.addClass,_removeClass:d.fn.removeClass,_toggleClass:d.fn.toggleClass,effect:function(g,f,h,i){return d.effects[g]?d.effects[g].call(this,{method:g,options:f||{},duration:h,callback:i}):null},show:function(){if(!arguments[0]||(arguments[0].constructor==Number||(/(slow|normal|fast)/).test(arguments[0]))){return this._show.apply(this,arguments)}else{return this.effect.apply(this,c(arguments,"show"))}},hide:function(){if(!arguments[0]||(arguments[0].constructor==Number||(/(slow|normal|fast)/).test(arguments[0]))){return this._hide.apply(this,arguments)}else{return this.effect.apply(this,c(arguments,"hide"))}},toggle:function(){if(!arguments[0]||(arguments[0].constructor==Number||(/(slow|normal|fast)/).test(arguments[0]))||(arguments[0].constructor==Function)){return this.__toggle.apply(this,arguments)}else{return this.effect.apply(this,c(arguments,"toggle"))}},addClass:function(g,f,i,h){return f?d.effects.animateClass.apply(this,[{add:g},f,i,h]):this._addClass(g)},removeClass:function(g,f,i,h){return f?d.effects.animateClass.apply(this,[{remove:g},f,i,h]):this._removeClass(g)},toggleClass:function(g,f,i,h){return((typeof f!=="boolean")&&f)?d.effects.animateClass.apply(this,[{toggle:g},f,i,h]):this._toggleClass(g,f)},morph:function(f,h,g,j,i){return d.effects.animateClass.apply(this,[{add:h,remove:f},g,j,i])},switchClass:function(){return this.morph.apply(this,arguments)},cssUnit:function(f){var g=this.css(f),h=[];d.each(["em","px","%","pt"],function(j,k){if(g.indexOf(k)>0){h=[parseFloat(g),k]}});return h}});d.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(g,f){d.fx.step[f]=function(h){if(h.state==0){h.start=e(h.elem,f);h.end=b(h.end)}h.elem.style[f]="rgb("+[Math.max(Math.min(parseInt((h.pos*(h.end[0]-h.start[0]))+h.start[0],10),255),0),Math.max(Math.min(parseInt((h.pos*(h.end[1]-h.start[1]))+h.start[1],10),255),0),Math.max(Math.min(parseInt((h.pos*(h.end[2]-h.start[2]))+h.start[2],10),255),0)].join(",")+")"}});function b(g){var f;if(g&&g.constructor==Array&&g.length==3){return g}if(f=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(g)){return[parseInt(f[1],10),parseInt(f[2],10),parseInt(f[3],10)]}if(f=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(g)){return[parseFloat(f[1])*2.55,parseFloat(f[2])*2.55,parseFloat(f[3])*2.55]}if(f=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(g)){return[parseInt(f[1],16),parseInt(f[2],16),parseInt(f[3],16)]}if(f=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(g)){return[parseInt(f[1]+f[1],16),parseInt(f[2]+f[2],16),parseInt(f[3]+f[3],16)]}if(f=/rgba\(0, 0, 0, 0\)/.exec(g)){return a.transparent}return a[d.trim(g).toLowerCase()]}function e(h,f){var g;do{g=d.curCSS(h,f);if(g!=""&&g!="transparent"||d.nodeName(h,"body")){break}f="backgroundColor"}while(h=h.parentNode);return b(g)}var a={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]};d.easing.jswing=d.easing.swing;d.extend(d.easing,{def:"easeOutQuad",swing:function(g,h,f,j,i){return d.easing[d.easing.def](g,h,f,j,i)},easeInQuad:function(g,h,f,j,i){return j*(h/=i)*h+f},easeOutQuad:function(g,h,f,j,i){return -j*(h/=i)*(h-2)+f},easeInOutQuad:function(g,h,f,j,i){if((h/=i/2)<1){return j/2*h*h+f}return -j/2*((--h)*(h-2)-1)+f},easeInCubic:function(g,h,f,j,i){return j*(h/=i)*h*h+f},easeOutCubic:function(g,h,f,j,i){return j*((h=h/i-1)*h*h+1)+f},easeInOutCubic:function(g,h,f,j,i){if((h/=i/2)<1){return j/2*h*h*h+f}return j/2*((h-=2)*h*h+2)+f},easeInQuart:function(g,h,f,j,i){return j*(h/=i)*h*h*h+f},easeOutQuart:function(g,h,f,j,i){return -j*((h=h/i-1)*h*h*h-1)+f},easeInOutQuart:function(g,h,f,j,i){if((h/=i/2)<1){return j/2*h*h*h*h+f}return -j/2*((h-=2)*h*h*h-2)+f},easeInQuint:function(g,h,f,j,i){return j*(h/=i)*h*h*h*h+f},easeOutQuint:function(g,h,f,j,i){return j*((h=h/i-1)*h*h*h*h+1)+f},easeInOutQuint:function(g,h,f,j,i){if((h/=i/2)<1){return j/2*h*h*h*h*h+f}return j/2*((h-=2)*h*h*h*h+2)+f},easeInSine:function(g,h,f,j,i){return -j*Math.cos(h/i*(Math.PI/2))+j+f},easeOutSine:function(g,h,f,j,i){return j*Math.sin(h/i*(Math.PI/2))+f},easeInOutSine:function(g,h,f,j,i){return -j/2*(Math.cos(Math.PI*h/i)-1)+f},easeInExpo:function(g,h,f,j,i){return(h==0)?f:j*Math.pow(2,10*(h/i-1))+f},easeOutExpo:function(g,h,f,j,i){return(h==i)?f+j:j*(-Math.pow(2,-10*h/i)+1)+f},easeInOutExpo:function(g,h,f,j,i){if(h==0){return f}if(h==i){return f+j}if((h/=i/2)<1){return j/2*Math.pow(2,10*(h-1))+f}return j/2*(-Math.pow(2,-10*--h)+2)+f},easeInCirc:function(g,h,f,j,i){return -j*(Math.sqrt(1-(h/=i)*h)-1)+f},easeOutCirc:function(g,h,f,j,i){return j*Math.sqrt(1-(h=h/i-1)*h)+f},easeInOutCirc:function(g,h,f,j,i){if((h/=i/2)<1){return -j/2*(Math.sqrt(1-h*h)-1)+f}return j/2*(Math.sqrt(1-(h-=2)*h)+1)+f},easeInElastic:function(g,i,f,m,l){var j=1.70158;var k=0;var h=m;if(i==0){return f}if((i/=l)==1){return f+m}if(!k){k=l*0.3}if(h<Math.abs(m)){h=m;var j=k/4}else{var j=k/(2*Math.PI)*Math.asin(m/h)}return -(h*Math.pow(2,10*(i-=1))*Math.sin((i*l-j)*(2*Math.PI)/k))+f},easeOutElastic:function(g,i,f,m,l){var j=1.70158;var k=0;var h=m;if(i==0){return f}if((i/=l)==1){return f+m}if(!k){k=l*0.3}if(h<Math.abs(m)){h=m;var j=k/4}else{var j=k/(2*Math.PI)*Math.asin(m/h)}return h*Math.pow(2,-10*i)*Math.sin((i*l-j)*(2*Math.PI)/k)+m+f},easeInOutElastic:function(g,i,f,m,l){var j=1.70158;var k=0;var h=m;if(i==0){return f}if((i/=l/2)==2){return f+m}if(!k){k=l*(0.3*1.5)}if(h<Math.abs(m)){h=m;var j=k/4}else{var j=k/(2*Math.PI)*Math.asin(m/h)}if(i<1){return -0.5*(h*Math.pow(2,10*(i-=1))*Math.sin((i*l-j)*(2*Math.PI)/k))+f}return h*Math.pow(2,-10*(i-=1))*Math.sin((i*l-j)*(2*Math.PI)/k)*0.5+m+f},easeInBack:function(g,h,f,k,j,i){if(i==undefined){i=1.70158}return k*(h/=j)*h*((i+1)*h-i)+f},easeOutBack:function(g,h,f,k,j,i){if(i==undefined){i=1.70158}return k*((h=h/j-1)*h*((i+1)*h+i)+1)+f},easeInOutBack:function(g,h,f,k,j,i){if(i==undefined){i=1.70158}if((h/=j/2)<1){return k/2*(h*h*(((i*=(1.525))+1)*h-i))+f}return k/2*((h-=2)*h*(((i*=(1.525))+1)*h+i)+2)+f},easeInBounce:function(g,h,f,j,i){return j-d.easing.easeOutBounce(g,i-h,0,j,i)+f},easeOutBounce:function(g,h,f,j,i){if((h/=i)<(1/2.75)){return j*(7.5625*h*h)+f}else{if(h<(2/2.75)){return j*(7.5625*(h-=(1.5/2.75))*h+0.75)+f}else{if(h<(2.5/2.75)){return j*(7.5625*(h-=(2.25/2.75))*h+0.9375)+f}else{return j*(7.5625*(h-=(2.625/2.75))*h+0.984375)+f}}}},easeInOutBounce:function(g,h,f,j,i){if(h<i/2){return d.easing.easeInBounce(g,h*2,0,j,i)*0.5+f}return d.easing.easeOutBounce(g,h*2-i,0,j,i)*0.5+j*0.5+f}})})(jQuery);;

/**
 * jQuery UI Effects Slide 1.7.1
 */
(function(a){a.effects.slide=function(b){return this.queue(function(){var e=a(this),d=["position","top","left"];var i=a.effects.setMode(e,b.options.mode||"show");var h=b.options.direction||"left";a.effects.save(e,d);e.show();a.effects.createWrapper(e).css({overflow:"hidden"});var f=(h=="up"||h=="down")?"top":"left";var c=(h=="up"||h=="left")?"pos":"neg";var j=b.options.distance||(f=="top"?e.outerHeight({margin:true}):e.outerWidth({margin:true}));if(i=="show"){e.css(f,c=="pos"?-j:j)}var g={};g[f]=(i=="show"?(c=="pos"?"+=":"-="):(c=="pos"?"-=":"+="))+j;e.animate(g,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){if(i=="hide"){e.hide()}a.effects.restore(e,d);a.effects.removeWrapper(e);if(b.callback){b.callback.apply(this,arguments)}e.dequeue()}})})}})(jQuery);;

/*!
 * (v) Compact labels plugin
 * Takes one option: labelOpacity [default: true] set to false to disable label opacity change on empty input focus
 */
(function($){$.fn.compactize=function(options){var defaults={labelOpacity:true};options=$.extend(defaults,options);return this.each(function(){var label=$(this),input=$('#'+label.attr('for'));input.focus(function(){if(options.labelOpacity){if(input.val()===''){label.css('opacity','0.5');}}else{label.hide();}});if(options.labelOpacity){input.keydown(function(){label.hide();label.css('opacity',1);});} input.blur(function(){if(input.val()===''){label.show();} if(options.labelOpacity){label.css('opacity',1);}});window.setTimeout(function(){label.toggle();},50);});};})(jQuery);

/*!
 * (v) hrefID jQuery extention
 * returns a valid #hash string from link href attribute in Internet Explorer
 */
(function($){$.fn.extend({hrefId:function(){return $(this).attr('href').substr($(this).attr('href').indexOf('#'));}});})(jQuery);

/*!
 * Scripts
 *
 */
jQuery(function($) {
	var Engine = {
		utils : {
			links : function(){
				$('a[rel*=external]').click(function(e){
					e.preventDefault();
					window.open($(this).attr('href'));
				});
			},
			mails : function(){
				$('a[href^=mailto:]').each(function(){
					var mail = $(this).attr('href').replace('mailto:','');
					var replaced = mail.replace('/at/','@');
					$(this).attr('href','mailto:'+replaced);
					if($(this).text() == mail) {
						$(this).text(replaced);
					}
				});
			}
		},
		ui : {
			rotator : function(){
				$('.rotator-a li').not('li:first-child').hide();
				$('.rotator-a').sfRotator({ 'navigation':true, 'autorotate':true, 'effectIn': 'slide', 'optionsIn' : { 'direction' : 'right' }, 'effectOut': 'slide', 'optionsOut' : { 'direction' : 'left' } });
				if( $(".sf-items li").eq(0).hasClass('active') ){$(".sf-rotator p.sf-nav-prev").css('visibility','hidden');}
			},
			forms : function(){
				$('.search-form label, .newsletter-form label').compactize();
				// Chosen inputs value change on focus/blur
				var toggleInput = $('.cart-form table input, .product-form .quantity input');
				toggleInput.focus(function(){ defValue = $(this).val(); $(this).val(''); });
				toggleInput.blur(function(){ if($(this).val()==""){$(this).val(defValue);} });
			},
			tabs : function(){
				$(".tabs-area-a .tab-list li:first-child").addClass('active');
				$(".tabs-area-a .tabs .tab-content").not(".tabs-area-a .tabs .tab-content:first-child").hide();
				var tabLink = $(".tabs-area-a .tab-list li a");
				tabLink.click(function() {
					if($(this).parent().is('.active')) return false;
					tabLink.parent().removeClass('active');
					$(this).parent().addClass('active');
					$(".tabs-area-a .tab-content").hide();
					$($(this).hrefId()).show();
					return false;
				});
			},
			nav : function(){
			// For Internet Explorer support
			if($.browser.msie && parseInt($.browser.version,10) < 9){
			  $("#nav ul ul").each(function(){$(this).parent().addClass('parent');});
			  $("#nav li.parent").hover(function(){
				$(this).find("> ul").css('left','0');
			  },function(){
				$(this).find("> ul").css('left','-10001px');
			  });
			  $("#nav li li.parent").hover(function(){
				$(this).find("> ul").css('left','192px');
			  },function(){
				$(this).find("> ul").css('left','-10001px');
			  });
			};
		  }
		},
		
		tweaks : {
			
			cart : function() {
                
				if ($('#catCartSummary .cartSummaryItem').html() != 'Shopping cart is empty.') {
					var summary = $('#catCartSummary .cartSummaryItem').text().split(" ");
					
					var total = summary[0];
					
					$('span.cartTotal').html(total);
				}else{
					$('span.cartTotal').html("0");
				}
					  
               },// cart
			   
			   	ecom : function(){
					
					
					// hide empty cat
					if(jQuery("td.catalogueItemNotFound").text() == "This catalog has no sub-catalogs."){
					   jQuery("td.catalogueItemNotFound").hide();
					
					}
					
					// if we ARE on large product view
					if(typeof(productDetailRewrite) !== 'undefined') {
					
						// rebuild the page
						jQuery("div.cols-a").attr("class","two-cols-c");
						jQuery("div.secondary-a, div.box-b, div.story-a h2:first, div.story-a p:first, div.product-list-b").hide();
						jQuery("div.primary-a").removeClass("primary-a");
						jQuery("div.story-a").removeClass("story-a");
						
						// hack cat breadcrumbs from the page
						jQuery("p.breadcrumbs").html("<a href='/'>Home</a> : "+jQuery("div.catcrumbs").html()+" : <span>"+jQuery("div.story-b h2:first").text()+"</span>");
						
						jQuery("#content p.breadcrumbs, div.featured-products").show();
						
						// highlight main nav item
						jQuery("div#nav li#nav-main-products").addClass("selected");
						
						// grab reviews
						jQuery("div#tab-3").html(jQuery("div#ratingWrapper").html());					
						   
					}
					
					// if we are NOT on the product detail page.
					if(typeof(productDetailRewrite) === 'undefined') {
						
						if(jQuery("div.cat-description").length > 0){
							jQuery("div.cat-description").show(); // show cat desc
						}
						
						//if we are showing products
						if(jQuery("table.productSmall").length >0){
							//jQuery("div.product-list-b").hide();
							jQuery("div.box-b").hide();
						}
						
						// hack cat breadcrumbs from the page
						if(jQuery("div.catcrumbs").length > 0){
						jQuery("p.breadcrumbs").html("<a href='/'>Home</a> : "+jQuery("div.catcrumbs").html()+"");
						}
						jQuery("#content p.breadcrumbs").show();
						
						
						
						
						// if we are on the PRODUCT LISTING Page
						if(jQuery("div.productListingRewrite").length > 0){
							// hack cat breadcrumbs from the page
							jQuery("p.breadcrumbs").html("<a href='/'>Home</a> : "+jQuery("div.catcrumbs").html());
							// highlight main nav item
							jQuery("div#nav li#nav-main-products").addClass("selected");
							
							if(jQuery("td.catalogueItemNotFound").length >0){
								jQuery("div.product-list-b").hide();
							}
						}
						
					} // NOT product detail
					
					
					if ($('p.breadcrumbs').size() === 0 || jQuery("div.catCartDetails").length === 0) { 
						return;
					}else{
						// hack cat breadcrumbs from the page
						jQuery("p.breadcrumbs").html("<a href='/'>Home</a> : "+jQuery("div.catcrumbs").html());
						
						// fix breadcrumbs
						//var html = jQuery("p.breadcrumbs").html().replace(":","|");
						//jQuery("p.breadcrumbs").html(html);
					}
					
				
					
					  
				} ,// ecom
				
				tweetShareFix : function(){
					if(location.href.indexOf("worldsecuresystems") != -1){
						jQuery("div.tweetsContainer, a.addthis_button_tweet").remove();
					}else{
						// if we are not secure then run tweets
						if ($('#tweets').size() === 0) { return;}
				
							$('#tweets').twit('simpleflame', {
							  limit: 3,
							  icon: false
							});	
					}
				}, // tweetShareFix
				
				
				tweets : function(){
				  if ($('#tweets').size() === 0) { return;}
				
					$('#tweets').twit('simpleflame', {
					  limit: 3,
					  icon: false
					});
					
				}, // tweets
			
				
				ccvTip : function(){
					if(jQuery(".qtip").length > 0){
						$('.qtip').qtip({
							content: 'The CVV is a 3 or 4 digit code embossed or imprinted on the signature panel on the reverse side of Visa, MasterCard and Discover cards and on the front of American Express cards.',
							show: 'mouseover',
							hide: 'mouseout',
							style: { 
								  name: 'light' // Inherit from preset style
							   },
							position: {
								  corner: {
									 target: 'topRight',
									 tooltip: 'bottomLeft'
								  }
							   }
						});
					}
	
				},// ccvTip
				
				checkout : function(){
						// -----------------------------------------------------
					// This will copy over the shipping address value to the 
					// billing address.  Make sure the checkbox Id is "SameAsShipping"
					//
					// * Update - changed to check length and clear fields on unchecked
					// -----------------------------------------------------	
					$("#f-shipping-same").bind("change", function(e){
						
						var n = $("#f-shipping-same:checked").length
							if(n == 0){
								
								$("#BillingAddress").val('');
								$("#BillingCity").val('');
								$("#BillingState").val('');
								$("#BillingZip").val('');
								$("#BillingPhone").val('');
							}else{
								
								
								$("#BillingAddress").val($("#ShippingAddress").val());
								$("#BillingCity").val($("#ShippingCity").val());
								$("#BillingState").val($("#ShippingState").val());
								$("#BillingZip").val($("#ShippingZip").val());
								$("#BillingPhone").val($("#ShippingPhone").val());
							}
					
					});
					
					// paypal
					jQuery("#PaymentMethodType_5").click(function(){
						jQuery(".hide-cc").hide();
					});
					
					jQuery("#PaymentMethodType_1").click(function(){
						jQuery(".hide-cc").show();
					});
						 
					
					// if zero
					if (jQuery('input#Amount').val() === '0.00') {
						jQuery('#PaymentMethodType_9').attr('checked','checked');
						   jQuery('#credit-card-information').css('display','none');   
						   // alert($('input#Amount').val());   
						   }else{
							 //console.log('nope not zero');
						}
					   
						   
					// show amount in span from amount form field
					jQuery("span.amountSpan").text(jQuery("input#Amount").val());  
	
				},// checkout
		
				faqSlide : function(){
										 $("ul.questions li a").each(function(){
											  $(this).click(function(){
											   
												 $(this).parent().find("div.faqAnswer").slideToggle();
												 $(this).toggleClass("faqBold");
													return false;
										
											  });
										 });    
				}, // faqSlide
				
				welcomeMember : function(){
					if(jQuery("div#isLoggedIn").text() != "0"){
						jQuery("ul.top-links span.welcome").text("Welcome, "+jQuery('div#loggedInName').text()+"");	
						jQuery("span.welcome").show();
						jQuery("p.btn-register-login").hide();
						jQuery("p.btn-register-logout").show();
					}
				}, // welcomeMember
				
				IEfixes : function(){
					jQuery("ul.product-listing-a li:first-child").css("padding-left","0px");	
				}
				
				
			
		} // end tweaks
	};

	Engine.utils.links();
	Engine.utils.mails();
	Engine.ui.rotator();
	Engine.ui.forms();
	Engine.ui.tabs();
	Engine.ui.nav();
	
	Engine.tweaks.cart();
	Engine.tweaks.ecom();
	Engine.tweaks.tweetShareFix();
	//Engine.tweaks.tweets();
	Engine.tweaks.ccvTip();
	Engine.tweaks.checkout();
	Engine.tweaks.faqSlide();
	Engine.tweaks.welcomeMember();
	Engine.tweaks.IEfixes();
	

	
});

/*
jQuery(document).ready(function() {
if(jQuery("p.breadcrumbs").length > 0){
  var html = jQuery("p.breadcrumbs").html().replace(":","|");
  jQuery("p.breadcrumbs").html(html);
}
});
*/