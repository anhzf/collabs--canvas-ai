(function(t){function e(e){for(var r,u,i=e[0],a=e[1],s=e[2],f=0,b=[];f<i.length;f++)u=i[f],Object.prototype.hasOwnProperty.call(o,u)&&o[u]&&b.push(o[u][0]),o[u]=0;for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(t[r]=a[r]);l&&l(e);while(b.length)b.shift()();return c.push.apply(c,s||[]),n()}function n(){for(var t,e=0;e<c.length;e++){for(var n=c[e],r=!0,u=1;u<n.length;u++){var a=n[u];0!==o[a]&&(r=!1)}r&&(c.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},o={app:0},c=[];function u(t){return i.p+"js/"+({about:"about"}[t]||t)+"."+{about:"83c6b3ad"}[t]+".js"}function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(t){var e=[],n=o[t];if(0!==n)if(n)e.push(n[2]);else{var r=new Promise((function(e,r){n=o[t]=[e,r]}));e.push(n[2]=r);var c,a=document.createElement("script");a.charset="utf-8",a.timeout=120,i.nc&&a.setAttribute("nonce",i.nc),a.src=u(t);var s=new Error;c=function(e){a.onerror=a.onload=null,clearTimeout(f);var n=o[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),c=e&&e.target&&e.target.src;s.message="Loading chunk "+t+" failed.\n("+r+": "+c+")",s.name="ChunkLoadError",s.type=r,s.request=c,n[1](s)}o[t]=void 0}};var f=setTimeout((function(){c({type:"timeout",target:a})}),12e4);a.onerror=a.onload=c,document.head.appendChild(a)}return Promise.all(e)},i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/",i.oe=function(t){throw console.error(t),t};var a=window["webpackJsonp"]=window["webpackJsonp"]||[],s=a.push.bind(a);a.push=e,a=a.slice();for(var f=0;f<a.length;f++)e(a[f]);var l=s;c.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("cd49")},"9cdc":function(t,e,n){"use strict";n("c701")},c701:function(t,e,n){},cd49:function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23"),o={id:"nav"},c=Object(r["e"])("Home"),u=Object(r["e"])(" | "),i=Object(r["e"])("About");function a(t,e,n,a,s,f){var l=Object(r["t"])("router-link"),b=Object(r["t"])("router-view");return Object(r["o"])(),Object(r["d"])(r["a"],null,[Object(r["f"])("div",o,[Object(r["f"])(l,{to:"/"},{default:Object(r["z"])((function(){return[c]})),_:1}),u,Object(r["f"])(l,{to:"/about"},{default:Object(r["z"])((function(){return[i]})),_:1})]),Object(r["f"])(b)],64)}n("9cdc");const s={};s.render=a;var f=s,l=(n("d3b7"),n("6c02")),b={class:"home"};function d(t,e,n,o,c,u){return Object(r["o"])(),Object(r["d"])("div",b,[Object(r["f"])("canvas",{ref:"cvs",width:"500",height:"500",onMousemove:e[1]||(e[1]=function(){return t.showAxis.apply(t,arguments)})},null,544),Object(r["f"])("div",null,"X: "+Object(r["v"])(t.x),1),Object(r["f"])("div",null,"Y: "+Object(r["v"])(t.y),1)])}var p=n("d4ec"),h=n("262e"),v=n("2caf"),j=n("9ab4"),O=n("ce1f"),m=function(t){Object(h["a"])(n,t);var e=Object(v["a"])(n);function n(){return Object(p["a"])(this,n),e.apply(this,arguments)}return n}(O["b"]);m=Object(j["a"])([Object(O["a"])({data:function(){return{ctx:CanvasRenderingContext2D,x:0,y:0}},methods:{drawLine:function(t,e,n,r){this.ctx.beginPath(),this.ctx.strokeStyle="#333",this.ctx.lineWidth=1,this.ctx.moveTo(t,e),this.ctx.lineTo(n,r),this.ctx.stroke(),this.ctx.closePath()},showAxis:function(t){this.drawLine(this.x,this.y,t.offsetX,t.offsetY),this.x=t.offsetX,this.y=t.offsetY}},mounted:function(){var t=this.$refs.cvs,e=t.getContext("2d");this.ctx=e}})],m);var y=m;y.render=d;var x=y,g=[{path:"/",name:"Home",component:x},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))}}],w=Object(l["a"])({history:Object(l["b"])("/"),routes:g}),P=w;Object(r["c"])(f).use(P).mount("#app")}});
//# sourceMappingURL=app.277da695.js.map