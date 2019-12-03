(function framework7ComponentLoader(e,a){void 0===a&&(a=!0);document,window;var t=e.$,i=(e.Template7,e.utils),n=(e.device,e.support),s=e.Class;e.Modal,e.ConstructorMethods,e.ModalMethods;function l(e){var a=e.app;if(!e.resizableInitialized){i.extend(e,{resizable:!0,resizableWidth:null,resizableInitialized:!0});var s=t("html"),l=e.$el,o=e.$backdropEl,r=e.side,p=e.effect;if(l){var d,h,c,f,v,u,b,m,g={};0===e.$el.find(".panel-resize-handler").length&&e.$el.append('<div class="panel-resize-handler"></div>'),e.$resizeHandlerEl=e.$el.children(".panel-resize-handler"),l.addClass("panel-resizable");var w=!!n.passiveListener&&{passive:!0};e.$el.on(a.touchEvents.start,".panel-resize-handler",k,w),a.on("touchmove:active",y),a.on("touchend:passive",z),a.on("resize",B),e.on("beforeOpen",B),e.once("panelDestroy",(function(){l.removeClass("panel-resizable"),e.$resizeHandlerEl.remove(),e.$el.off(a.touchEvents.start,".panel-resize-handler",k,w),a.off("touchmove:active",y),a.off("touchend:passive",z),a.off("resize",B),e.off("beforeOpen",B)}))}}function C(e){if(!e)return null;if(e.indexOf("%")>=0||e.indexOf("vw")>=0)return parseInt(e,10)/100*a.width;var t=parseInt(e,10);return Number.isNaN(t)?null:t}function k(a){e.resizable&&l.hasClass("panel-resizable")&&(g.x="touchstart"===a.type?a.targetTouches[0].pageX:a.pageX,g.y="touchstart"===a.type?a.targetTouches[0].pageY:a.pageY,h=!1,d=!0,u=C(l.css("min-width")),b=C(l.css("max-width")),m=l.hasClass("panel-in-breakpoint"))}function y(i){if(d){var n="touchmove"===i.type?i.targetTouches[0].pageX:i.pageX;h||(f=l[0].offsetWidth,l.transition(0),l.addClass("panel-resizing"),s.css("cursor","col-resize"),("reveal"===p||m)&&(v=t(e.getViewEl())),"reveal"!==p||m||(o.transition(0),v.transition(0))),h=!0,i.preventDefault(),c=n-g.x;var w="left"===r?f+c:f-c;u&&!Number.isNaN(u)&&(w=Math.max(w,u)),b&&!Number.isNaN(b)&&(w=Math.min(w,b)),w=Math.min(Math.max(w,0),a.width),e.resizableWidth=w,l[0].style.width=w+"px","reveal"!==p||m?m&&v&&v.css("margin-"+r,w+"px"):(v&&v.transform("translate3d("+("left"===r?w:-w)+"px, 0, 0)"),o&&o.transform("translate3d("+("left"===r?w:-w)+"px, 0, 0)")),l.trigger("panel:resize",w),e.emit("local::resize panelResize",e,w)}}function z(){if(t("html").css("cursor",""),!d||!h)return d=!1,void(h=!1);d=!1,h=!1,s[0].style.setProperty("--f7-panel-"+r+"-width",e.resizableWidth+"px"),l[0].style.width="","reveal"!==p||m||(v.transform(""),o.transform("")),l.removeClass("panel-resizing"),i.nextFrame((function(){m||(l.transition(""),"reveal"===p&&(o.transition(""),v&&v.transition("")))}))}function B(){e.opened&&e.resizableWidth&&(u=C(l.css("min-width")),b=C(l.css("max-width")),u&&!Number.isNaN(u)&&e.resizableWidth<u&&(e.resizableWidth=Math.max(e.resizableWidth,u)),b&&!Number.isNaN(b)&&e.resizableWidth>b&&(e.resizableWidth=Math.min(e.resizableWidth,b)),e.resizableWidth=Math.min(Math.max(e.resizableWidth,0),a.width),s[0].style.setProperty("--f7-panel-"+r+"-width",e.resizableWidth+"px"))}}var o=function(e){function a(a,n){void 0===n&&(n={});var s=i.extend({on:{}},a.params.panel,n);e.call(this,s,[a]);var l;if(this.params=s,this.params.el?l=t(this.params.el).eq(0):this.params.content&&(l=t(this.params.content).filter((function(e,a){return 1===a.nodeType})).eq(0)),0===l.length)return this;if(l[0].f7Panel)return l[0].f7Panel;l[0].f7Panel=this;var o,r=this.params,p=r.side,d=r.effect,h=r.resizable;return void 0===p&&(p=l.hasClass("panel-left")?"left":"right"),void 0===d&&(d=l.hasClass("panel-cover")?"cover":"reveal"),void 0===h&&(h=l.hasClass("panel-resizable")),this.params.backdrop&&this.params.backdropEl?o=t(this.params.backdropEl):this.params.backdrop&&0===(o=a.root.children(".panel-backdrop")).length&&(o=t('<div class="panel-backdrop"></div>'),a.root.prepend(o)),i.extend(this,{app:a,side:p,effect:d,resizable:h,$el:l,el:l[0],opened:!1,$backdropEl:o,backdropEl:o&&o[0]}),this.useModules(),this.init(),this}return e&&(a.__proto__=e),a.prototype=Object.create(e&&e.prototype),a.prototype.constructor=a,a.prototype.getViewEl=function(){var e=this.app;return e.root.children(".views").length>0?e.root.children(".views")[0]:e.root.children(".view")[0]},a.prototype.enableVisibleBreakpoint=function(){return this.visibleBreakpointDisabled=!1,this.setVisibleBreakpoint(),this},a.prototype.disableVisibleBreakpoint=function(){return this.visibleBreakpointDisabled=!0,this.setVisibleBreakpoint(),this},a.prototype.toggleVisibleBreakpoint=function(){return this.visibleBreakpointDisabled=!this.visibleBreakpointDisabled,this.setVisibleBreakpoint(),this},a.prototype.setVisibleBreakpoint=function(e){var a,i,n;void 0===e&&(e=!0);var s=this,l=s.app;s.visibleBreakpointResizeHandler||(s.visibleBreakpointResizeHandler=function(){s.setVisibleBreakpoint()},l.on("resize",s.visibleBreakpointResizeHandler));var o=s.side,r=s.$el,p=s.params,d=s.visibleBreakpointDisabled,h=p.visibleBreakpoint,c=t(s.getViewEl()),f=r.hasClass("panel-in-breakpoint");l.width>=h&&null!=h&&!d?f?c.css(((i={})["margin-"+o]=r.width()+"px",i)):(t("html").removeClass("with-panel-"+o+"-reveal with-panel-"+o+"-cover with-panel"),r.addClass("panel-in-breakpoint").removeClass("panel-in panel-in-collapsed"),s.onOpen(!1),s.onOpened(),c.css(((a={})["margin-"+o]=r.width()+"px",a)),l.allowPanelOpen=!0,e&&(s.emit("local::breakpoint panelBreakpoint"),s.$el.trigger("panel:breakpoint"))):f&&(r.removeClass("panel-in-breakpoint panel-in"),s.onClose(),s.onClosed(),c.css(((n={})["margin-"+o]="",n)),e&&(s.emit("local::breakpoint panelBreakpoint"),s.$el.trigger("panel:breakpoint")))},a.prototype.enableCollapsedBreakpoint=function(){return this.collapsedBreakpointDisabled=!1,this.setCollapsedBreakpoint(),this},a.prototype.disableCollapsedBreakpoint=function(){return this.collapsedBreakpointDisabled=!0,this.setCollapsedBreakpoint(),this},a.prototype.toggleCollapsedBreakpoint=function(){return this.collapsedBreakpointDisabled=!this.collapsedBreakpointDisabled,this.setCollapsedBreakpoint(),this},a.prototype.setCollapsedBreakpoint=function(e){var a=this,i=a.app;a.collapsedBreakpointResizeHandler||(a.collapsedBreakpointResizeHandler=function(){a.setCollapsedBreakpoint()},i.on("resize",a.collapsedBreakpointResizeHandler));var n=a.side,s=a.$el,l=a.params,o=a.collapsedBreakpointDisabled;if(!s.hasClass("panel-in-breakpoint")){var r=l.collapsedBreakpoint,p=s.hasClass("panel-in-collapsed");i.width>=r&&null!=r&&!o?p||(t("html").removeClass("with-panel-"+n+"-reveal with-panel-"+n+"-cover with-panel"),s.addClass("panel-in-collapsed").removeClass("panel-in"),a.collapsed=!0,i.allowPanelOpen=!0,e&&(a.emit("local::collapsedBreakpoint panelCollapsedBreakpoint"),a.$el.trigger("panel:collapsedbreakpoint"))):p&&(s.removeClass("panel-in-collapsed panel-in"),a.collapsed=!1,e&&(a.emit("local::collapsedBreakpoint panelCollapsedBreakpoint"),a.$el.trigger("panel:collapsedbreakpoint")))}},a.prototype.enableResizable=function(){return this.resizableInitialized?(this.resizable=!0,this.$el.addClass("panel-resizable")):l(this),this},a.prototype.disableResizable=function(){return this.resizable=!1,this.$el.removeClass("panel-resizable"),this},a.prototype.enableSwipe=function(){return this.swipeInitialized?this.swipeable=!0:function(e){var a=e.app;if(!e.swipeInitialized){i.extend(e,{swipeable:!0,swipeInitialized:!0});var n,s,l,o,r,p,d,h,c,f,v,u,b=e.params,m=e.$el,g=e.$backdropEl,w=e.side,C=e.effect,k={},y=0;a.on("touchstart:passive",z),a.on("touchmove:active",B),a.on("touchend:passive",$),a.on("gesturestart",x),a.on("gestureend",O),e.on("panelDestroy",(function(){a.off("touchstart:passive",z),a.off("touchmove:active",B),a.off("touchend:passive",$),a.off("gesturestart",x),a.off("gestureend",O)}))}function z(d){if(e.swipeable&&!l&&a.panel.allowOpen&&(b.swipe||b.swipeOnlyClose)&&!s&&!(t(".modal-in:not(.toast):not(.notification), .photo-browser-in").length>0)){var h=(n=a.panel.get("left"===w?"right":"left")||{}).opened&&n.$el&&!n.$el.hasClass("panel-in-breakpoint");if((e.opened||!h)&&(b.swipeOnlyClose||!h)&&(!d.target||"input"!==d.target.nodeName.toLowerCase()||"range"!==d.target.type)&&!(t(d.target).closest(".range-slider, .tabs-swipeable-wrap, .calendar-months, .no-swipe-panel, .card-opened").length>0)&&(k.x="touchstart"===d.type?d.targetTouches[0].pageX:d.pageX,k.y="touchstart"===d.type?d.targetTouches[0].pageY:d.pageY,!b.swipeOnlyClose||e.opened)){if(b.swipeActiveArea&&!e.opened){if("left"===w&&k.x>b.swipeActiveArea)return;if("right"===w&&k.x<a.width-b.swipeActiveArea)return}y=0,u=t(e.getViewEl()),o=!1,s=!0,r=void 0,p=i.now(),v=void 0}}}function B(t){if(s&&!l&&!((y+=1)<2))if(t.f7PreventSwipePanel||a.preventSwipePanelBySwipeBack||a.preventSwipePanel)s=!1;else{var i="touchmove"===t.type?t.targetTouches[0].pageX:t.pageX,n="touchmove"===t.type?t.targetTouches[0].pageY:t.pageY;if(void 0===r&&(r=!!(r||Math.abs(n-k.y)>Math.abs(i-k.x))),r)s=!1;else{if(!v){if(v=i>k.x?"to-right":"to-left",b.swipeActiveArea>0&&!e.opened){if("left"===w&&k.x>b.swipeActiveArea)return void(s=!1);if("right"===w&&k.x<a.width-b.swipeActiveArea)return void(s=!1)}if(m.hasClass("panel-in-breakpoint"))return void(s=!1);if("left"===w&&"to-left"===v&&!m.hasClass("panel-in")||"right"===w&&"to-right"===v&&!m.hasClass("panel-in"))return void(s=!1)}var p=e.opened?0:-b.swipeThreshold;"right"===w&&(p=-p),o||(e.opened||(e.insertToRoot(),m.addClass("panel-in-swipe"),g.css("visibility","visible"),m.trigger("panel:swipeopen"),e.emit("local::swipeOpen panelSwipeOpen",e)),f=m[0].offsetWidth,"reveal"===C&&m.hasClass("panel-in-collapsed")&&(f-=parseFloat(u.css("margin-"+w))),m.transition(0)),o=!0,t.preventDefault(),d=i-k.x+p,"right"===w?"cover"===C?((h=d+(e.opened?0:f))<0&&(h=0),h>f&&(h=f)):((h=d-(e.opened?f:0))>0&&(h=0),h<-f&&(h=-f)):((h=d+(e.opened?f:0))<0&&(h=0),h>f&&(h=f)),"reveal"===C?(u.transform("translate3d("+h+"px,0,0)").transition(0),g.transform("translate3d("+h+"px,0,0)").transition(0),m.trigger("panel:swipe",Math.abs(h/f)),e.emit("local::swipe panelSwipe",e,Math.abs(h/f))):("left"===w&&(h-=f),m.transform("translate3d("+h+"px,0,0)").transition(0),g.transition(0),c=1-Math.abs(h/f),g.css({opacity:c}),m.trigger("panel:swipe",Math.abs(h/f)),e.emit("local::swipe panelSwipe",e,Math.abs(h/f)))}}}function $(a){if(!s||!o)return s=!1,void(o=!1);var n="gesturestart"===a.type||l;s=!1,o=!1;var r,c=(new Date).getTime()-p,v=0===h||Math.abs(h)===f,k=b.swipeThreshold||0;"swap"===(r=n?"reset":e.opened?"cover"===C?0===h?"reset":c<300&&Math.abs(h)>0?"swap":c>=300&&Math.abs(h)<f/2?"reset":"swap":h===-f?"reset":c<300&&Math.abs(h)>=0||c>=300&&Math.abs(h)<=f/2?"left"===w&&h===f?"reset":"swap":"reset":Math.abs(d)<k?"reset":"cover"===C?0===h?"swap":c<300&&Math.abs(h)>0?"swap":c>=300&&Math.abs(h)<f/2?"swap":"reset":0===h?"reset":c<300&&Math.abs(h)>0||c>=300&&Math.abs(h)>=f/2?"swap":"reset")&&(e.opened?e.close(!v):e.open(!v));var y=!0;if("reset"===r&&!e.opened)if(v)m.removeClass("panel-in-swipe");else{y=!1;var z="reveal"===C?u:m;t("html").addClass("with-panel-closing"),z.transitionEnd((function(){m.hasClass("panel-in")||(m.removeClass("panel-in-swipe"),t("html").removeClass("with-panel-closing"))}))}"reveal"===C&&i.nextFrame((function(){u.transition(""),u.transform("")})),y&&m.removeClass("panel-in-swipe"),m.transition("").transform(""),g.transform("").transition("").css({opacity:"",visibility:""})}function x(e){l=!0,$(e)}function O(){l=!1}}(this),this},a.prototype.disableSwipe=function(){return this.swipeable=!1,this},a.prototype.onOpen=function(e){void 0===e&&(e=!0);var a=this.app;this.opened=!0,a.panel.allowOpen=!1,this.$el.trigger("panel:beforeopen"),this.emit("local::beforeOpen panelBeforeOpen",this),e&&t("html").addClass("with-panel with-panel-"+this.side+"-"+this.effect),this.$el.trigger("panel:open"),this.emit("local::open panelOpen",this)},a.prototype.onOpened=function(){this.app.panel.allowOpen=!0,this.$el.trigger("panel:opened"),this.emit("local::opened panelOpened",this)},a.prototype.onClose=function(){var e=this.app;this.opened=!1,e.panel.allowOpen=!1,this.$el.trigger("panel:beforeclose"),this.emit("local::beforeClose panelBeforeClose",this),t("html").addClass("with-panel-closing"),t("html").removeClass("with-panel with-panel-"+this.side+"-"+this.effect),this.$el.trigger("panel:close"),this.emit("local::close panelClose",this)},a.prototype.onClosed=function(){this.app.panel.allowOpen=!0,t("html").removeClass("with-panel-closing"),this.$el.removeClass("panel-out"),this.$el.trigger("panel:closed"),this.emit("local::closed panelClosed",this)},a.prototype.toggle=function(e){void 0===e&&(e=!0);var a=this.params.visibleBreakpoint;return this.app.width>=a&&null!=a?this.toggleVisibleBreakpoint():(this.opened?this.close(e):this.open(e),this)},a.prototype.insertToRoot=function(){var e=this.$el,a=this.app,t=this.$backdropEl,i=e.parent(),n=e.parents(document).length>0;if(!i.is(a.root)||e.prevAll(".views, .view").length){var s=a.root.children(".panel, .views, .view").eq(0),l=a.root.children(".panel-backdrop").eq(0);s.length?e.insertBefore(s):l?e.insertBefore(l):a.root.prepend(e),t&&t.length&&(!t.parent().is(a.root)&&0===t.nextAll(".panel").length||t.parent().is(a.root)&&0===t.nextAll(".panel").length)&&t.insertBefore(e),this.once("panelClosed",(function(){n?i.append(e):e.remove()}))}},a.prototype.open=function(e){void 0===e&&(e=!0);var a=this,i=a.app;if(!i.panel.allowOpen)return!1;var n=a.effect,s=a.$el,l=a.$backdropEl,o=a.opened;if(!s||s.hasClass("panel-in"))return a;if(a.insertToRoot(),o||s.hasClass("panel-in-breakpoint")||s.hasClass("panel-in"))return!1;var r=i.panel.get(".panel-in");r&&r!==a&&r.close(e),s[e?"removeClass":"addClass"]("not-animated"),s.addClass("panel-in"),l[e?"removeClass":"addClass"]("not-animated"),"cover"===a.effect&&(a._clientLeft=s[0].clientLeft);var p="reveal"===n?s.nextAll(".view, .views").eq(0):s;return e?(l&&l.removeClass("not-animated"),function e(){p.transitionEnd((function(i){t(i.target).is(p)?s.hasClass("panel-out")?a.onClosed():a.onOpened():e()}))}(),s.removeClass("panel-out not-animated").addClass("panel-in"),a.onOpen()):(l&&l.addClass("not-animated"),s.removeClass("panel-out").addClass("panel-in not-animated"),a.onOpen(),a.onOpened()),!0},a.prototype.close=function(e){void 0===e&&(e=!0);var a=this,i=a.effect,n=a.$el,s=a.$backdropEl;if(!a.opened||n.hasClass("panel-in-breakpoint")||!n.hasClass("panel-in"))return a;n[e?"removeClass":"addClass"]("not-animated"),s[e?"removeClass":"addClass"]("not-animated");var l="reveal"===i?n.nextAll(".view, .views").eq(0):n;return e?(l.transitionEnd((function(){n.hasClass("panel-out")?a.onClosed():n.hasClass("panel-in")&&a.onOpened(),t("html").removeClass("with-panel-closing")})),n.removeClass("panel-in").addClass("panel-out"),a.onClose()):(n.addClass("not-animated").removeClass("panel-in").addClass("panel-out"),a.onClose(),a.onClosed()),a},a.prototype.init=function(){void 0!==this.params.visibleBreakpoint&&this.setVisibleBreakpoint(),void 0!==this.params.collapsedBreakpoint&&this.setCollapsedBreakpoint(),this.params.swipe&&this.enableSwipe(),this.resizable&&this.enableResizable()},a.prototype.destroy=function(){var e,a=this,n=a.app;if(a.$el){if(a.emit("local::beforeDestroy panelBeforeDestroy",a),a.$el.trigger("panel:beforedestroy"),a.visibleBreakpointResizeHandler&&n.off("resize",a.visibleBreakpointResizeHandler),a.collapsedBreakpointResizeHandler&&n.off("resize",a.collapsedBreakpointResizeHandler),a.$el.hasClass("panel-in-breakpoint")||a.$el.hasClass("panel-in-collapsed")){var s=t(a.getViewEl());a.$el.removeClass("panel-in-breakpoint panel-in-collapsed panel-in"),s.css(((e={})["margin-"+a.side]="",e)),a.emit("local::breakpoint panelBreakpoint"),a.$el.trigger("panel:breakpoint")}a.$el.trigger("panel:destroy"),a.emit("local::destroy panelDestroy"),a.el&&(a.el.f7Panel=null,delete a.el.f7Panel),i.deleteProps(a),a=null}},a}(s),r={name:"panel",params:{panel:{opened:void 0,side:void 0,effect:void 0,resizable:void 0,backdrop:!0,backdropEl:void 0,visibleBreakpoint:void 0,collapsedBreakpoint:void 0,swipe:!1,swipeOnlyClose:!1,swipeActiveArea:0,swipeThreshold:0,closeByBackdropClick:!0}},static:{Panel:o},instance:{panel:{allowOpen:!0}},create:function(){var e=this;i.extend(e.panel,{create:function(a){return new o(e,a)},get:function(e){if(void 0===e&&(e=".panel"),e instanceof o)return e;"left"!==e&&"right"!==e||(e=".panel-"+e);var a=t(e);return 0===a.length||a.length>1?void 0:a[0].f7Panel},destroy:function(a){void 0===a&&(a=".panel");var t=e.panel.get(a);if(t&&t.destroy)return t.destroy()},open:function(a,t){void 0===a&&(a=".panel"),"left"!==a&&"right"!==a||(a=".panel-"+a);var i=e.panel.get(a);return i&&i.open?i.open(t):i?void 0:(i=e.panel.create({el:a})).open(t)},close:function(a,t){void 0===a&&(a=".panel-in"),"left"!==a&&"right"!==a||(a=".panel-"+a);var i=e.panel.get(a);return i&&i.open?i.close(t):i?void 0:(i=e.panel.create({el:a})).close(t)},toggle:function(a,t){void 0===a&&(a=".panel"),"left"!==a&&"right"!==a||(a=".panel-"+a);var i=e.panel.get(a);return i&&i.toggle?i.toggle(t):i?void 0:(i=e.panel.create({el:a})).toggle(t)}})},on:{init:function(){var e=this;t(".panel-init").each((function(a,i){var n=Object.assign({el:i},t(i).dataset()||{});e.panel.create(n)}))},pageInit:function(e){var a=this;e.$el.find(".panel-init").each((function(e,i){var n=Object.assign({el:i},t(i).dataset()||{});a.panel.create(n)}))},pageBeforeRemove:function(e){var a=this;e.$el.find(".panel-init").each((function(e,t){var i=a.panel.get(t);i&&i.destroy&&i.destroy()}))}},clicks:{".panel-open":function(e,a){void 0===a&&(a={});this.panel.open(a.panel,a.animate)},".panel-close":function(e,a){void 0===a&&(a={});this.panel.close(a.panel,a.animate)},".panel-toggle":function(e,a){void 0===a&&(a={});this.panel.toggle(a.panel,a.animate)},".panel-backdrop":function(){var e=t(".panel-in:not(.panel-out)");if(e.length){var a=e[0]&&e[0].f7Panel;e.trigger("panel:backdrop-click"),a&&a.emit("backdropClick",a),this.emit("panelBackdropClick",a||e[0]),this.params.panel.closeByBackdropClick&&this.panel.close()}}}};if(a){if(e.prototype.modules&&e.prototype.modules[r.name])return;e.use(r),e.instance&&(e.instance.useModuleParams(r,e.instance.params),e.instance.useModule(r))}return r}(Framework7, typeof Framework7AutoInstallComponent === 'undefined' ? undefined : Framework7AutoInstallComponent))