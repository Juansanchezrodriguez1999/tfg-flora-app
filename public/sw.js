if(!self.define){let e,s={};const i=(i,c)=>(i=new URL(i+".js",c).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(c,a)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let r={};const t=e=>i(e,n),o={module:{uri:n},exports:r,require:t};s[n]=Promise.all(c.map((e=>o[e]||t(e)))).then((e=>(a(...e),r)))}}define(["./workbox-1858adaa"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/services/flora/app/_next/static/MNbTiHlEEc6PVbfOo9viY/_buildManifest.js",revision:"MNbTiHlEEc6PVbfOo9viY"},{url:"/services/flora/app/_next/static/MNbTiHlEEc6PVbfOo9viY/_ssgManifest.js",revision:"MNbTiHlEEc6PVbfOo9viY"},{url:"/services/flora/app/_next/static/chunks/04b3256c-f54ef166485a193f.js",revision:"MNbTiHlEEc6PVbfOo9viY"},{url:"/services/flora/app/_next/static/chunks/193-f2eb9c9a682dbcaf.js",revision:"MNbTiHlEEc6PVbfOo9viY"},{url:"/services/flora/app/_next/static/chunks/366-277d3f9e96b9bd25.js",revision:"MNbTiHlEEc6PVbfOo9viY"},{url:"/services/flora/app/_next/static/chunks/61e53026-5a1beb72a07713f0.js",revision:"MNbTiHlEEc6PVbfOo9viY"},{url:"/services/flora/app/_next/static/chunks/654-6df74a351f7a33fa.js",revision:"MNbTiHlEEc6PVbfOo9viY"},{url:"/services/flora/app/_next/static/chunks/766-b119cb87ba6484e1.js",revision:"MNbTiHlEEc6PVbfOo9viY"},{url:"/services/flora/app/_next/static/chunks/801-f5f0709b0157e4d4.js",revision:"MNbTiHlEEc6PVbfOo9viY"},{url:"/services/flora/app/_next/static/chunks/85-77e87b889c4aea8f.js",revision:"MNbTiHlEEc6PVbfOo9viY"},{url:"/services/flora/app/_next/static/chunks/899-3f3eea719fa513b2.js",revision:"MNbTiHlEEc6PVbfOo9viY"},{url:"/services/flora/app/_next/static/chunks/903-4feb5025ace3c8b7.js",revision:"MNbTiHlEEc6PVbfOo9viY"},{url:"/services/flora/app/_next/static/chunks/e0dceef3-e9eb1fb24ce580fb.js",revision:"MNbTiHlEEc6PVbfOo9viY"},{url:"/services/flora/app/_next/static/chunks/fd9c5921-0c40d0e0fc259b9a.js",revision:"MNbTiHlEEc6PVbfOo9viY"},{url:"/services/flora/app/_next/static/chunks/framework-b6df66cd0c4279a1.js",revision:"MNbTiHlEEc6PVbfOo9viY"},{url:"/services/flora/app/_next/static/chunks/main-6f2133ce0a2356fa.js",revision:"MNbTiHlEEc6PVbfOo9viY"},{url:"/services/flora/app/_next/static/chunks/pages/_app-eccfe17075d425d0.js",revision:"MNbTiHlEEc6PVbfOo9viY"},{url:"/services/flora/app/_next/static/chunks/pages/_error-55ddcbb4cdf6b723.js",revision:"MNbTiHlEEc6PVbfOo9viY"},{url:"/services/flora/app/_next/static/chunks/pages/edit/local/sample-5c9f69746c787cc9.js",revision:"MNbTiHlEEc6PVbfOo9viY"},{url:"/services/flora/app/_next/static/chunks/pages/edit/remote/%5Bid%5D-66b4338fe9f2653f.js",revision:"MNbTiHlEEc6PVbfOo9viY"},{url:"/services/flora/app/_next/static/chunks/pages/form-cbd08b2930ba12ec.js",revision:"MNbTiHlEEc6PVbfOo9viY"},{url:"/services/flora/app/_next/static/chunks/pages/form_np-051449a416a4bbdd.js",revision:"MNbTiHlEEc6PVbfOo9viY"},{url:"/services/flora/app/_next/static/chunks/pages/index-d4186cda34d35ed4.js",revision:"MNbTiHlEEc6PVbfOo9viY"},{url:"/services/flora/app/_next/static/chunks/pages/samples-153fb375d1620060.js",revision:"MNbTiHlEEc6PVbfOo9viY"},{url:"/services/flora/app/_next/static/chunks/pages/signin-575a9c3bcb36fc10.js",revision:"MNbTiHlEEc6PVbfOo9viY"},{url:"/services/flora/app/_next/static/chunks/pages/view/local/sample-fcd2964b817c6099.js",revision:"MNbTiHlEEc6PVbfOo9viY"},{url:"/services/flora/app/_next/static/chunks/pages/view/remote/%5Bid%5D-7eda2541d1a4fbd3.js",revision:"MNbTiHlEEc6PVbfOo9viY"},{url:"/services/flora/app/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"MNbTiHlEEc6PVbfOo9viY"},{url:"/services/flora/app/_next/static/chunks/webpack-7d42c578d74506f8.js",revision:"MNbTiHlEEc6PVbfOo9viY"},{url:"/services/flora/app/_next/static/css/d4214dfed05bf17b.css",revision:"MNbTiHlEEc6PVbfOo9viY"},{url:"/services/flora/app/favicon.ico",revision:"4259c17cb0b60f3b8a838b8a0e6543c5"},{url:"/services/flora/app/logo.jpg",revision:"9c984471d470ca55b858b807a3e1206c"},{url:"/services/flora/app/logo.png",revision:"f3d97f09bf44ea30a4cf939da78dc936"},{url:"/services/flora/app/manifest.json",revision:"e04bedd32fdf30a8a557ecb7afc73f10"},{url:"/services/flora/app/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/services/flora/app",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/^https?.*/,new e.NetworkFirst({cacheName:"offlineCache",plugins:[new e.ExpirationPlugin({maxEntries:200})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
