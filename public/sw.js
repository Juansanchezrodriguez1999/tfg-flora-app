if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let r={};const t=e=>a(e,n),o={module:{uri:n},exports:r,require:t};s[n]=Promise.all(c.map((e=>o[e]||t(e)))).then((e=>(i(...e),r)))}}define(["./workbox-1858adaa"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/services/flora/app/_next/static/chunks/04b3256c-f54ef166485a193f.js",revision:"kfc2PmGbbKRsuPdldC9EO"},{url:"/services/flora/app/_next/static/chunks/193-f2eb9c9a682dbcaf.js",revision:"kfc2PmGbbKRsuPdldC9EO"},{url:"/services/flora/app/_next/static/chunks/61e53026-5a1beb72a07713f0.js",revision:"kfc2PmGbbKRsuPdldC9EO"},{url:"/services/flora/app/_next/static/chunks/654-db3b03aded971440.js",revision:"kfc2PmGbbKRsuPdldC9EO"},{url:"/services/flora/app/_next/static/chunks/766-3d462510efaf07b2.js",revision:"kfc2PmGbbKRsuPdldC9EO"},{url:"/services/flora/app/_next/static/chunks/801-f5f0709b0157e4d4.js",revision:"kfc2PmGbbKRsuPdldC9EO"},{url:"/services/flora/app/_next/static/chunks/829-033d978e28221ce5.js",revision:"kfc2PmGbbKRsuPdldC9EO"},{url:"/services/flora/app/_next/static/chunks/85-77e87b889c4aea8f.js",revision:"kfc2PmGbbKRsuPdldC9EO"},{url:"/services/flora/app/_next/static/chunks/883-c497efbb6c864177.js",revision:"kfc2PmGbbKRsuPdldC9EO"},{url:"/services/flora/app/_next/static/chunks/899-3f3eea719fa513b2.js",revision:"kfc2PmGbbKRsuPdldC9EO"},{url:"/services/flora/app/_next/static/chunks/e0dceef3-e9eb1fb24ce580fb.js",revision:"kfc2PmGbbKRsuPdldC9EO"},{url:"/services/flora/app/_next/static/chunks/fd9c5921-0c40d0e0fc259b9a.js",revision:"kfc2PmGbbKRsuPdldC9EO"},{url:"/services/flora/app/_next/static/chunks/framework-b6df66cd0c4279a1.js",revision:"kfc2PmGbbKRsuPdldC9EO"},{url:"/services/flora/app/_next/static/chunks/main-6f2133ce0a2356fa.js",revision:"kfc2PmGbbKRsuPdldC9EO"},{url:"/services/flora/app/_next/static/chunks/pages/_app-eccfe17075d425d0.js",revision:"kfc2PmGbbKRsuPdldC9EO"},{url:"/services/flora/app/_next/static/chunks/pages/_error-55ddcbb4cdf6b723.js",revision:"kfc2PmGbbKRsuPdldC9EO"},{url:"/services/flora/app/_next/static/chunks/pages/edit/local/sample-1e8ea0b49b758873.js",revision:"kfc2PmGbbKRsuPdldC9EO"},{url:"/services/flora/app/_next/static/chunks/pages/edit/remote/%5Bid%5D-e18902e5c7cadbaa.js",revision:"kfc2PmGbbKRsuPdldC9EO"},{url:"/services/flora/app/_next/static/chunks/pages/form-f2b6927a71095ac3.js",revision:"kfc2PmGbbKRsuPdldC9EO"},{url:"/services/flora/app/_next/static/chunks/pages/form_np-1252ef3aefd742cf.js",revision:"kfc2PmGbbKRsuPdldC9EO"},{url:"/services/flora/app/_next/static/chunks/pages/index-d4186cda34d35ed4.js",revision:"kfc2PmGbbKRsuPdldC9EO"},{url:"/services/flora/app/_next/static/chunks/pages/samples-50aa3a996a45e7c6.js",revision:"kfc2PmGbbKRsuPdldC9EO"},{url:"/services/flora/app/_next/static/chunks/pages/signin-1b7fe190810d45ed.js",revision:"kfc2PmGbbKRsuPdldC9EO"},{url:"/services/flora/app/_next/static/chunks/pages/view/local/sample-fcd2964b817c6099.js",revision:"kfc2PmGbbKRsuPdldC9EO"},{url:"/services/flora/app/_next/static/chunks/pages/view/remote/%5Bid%5D-7eda2541d1a4fbd3.js",revision:"kfc2PmGbbKRsuPdldC9EO"},{url:"/services/flora/app/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"kfc2PmGbbKRsuPdldC9EO"},{url:"/services/flora/app/_next/static/chunks/webpack-84a1bb829725c9b5.js",revision:"kfc2PmGbbKRsuPdldC9EO"},{url:"/services/flora/app/_next/static/css/d4214dfed05bf17b.css",revision:"kfc2PmGbbKRsuPdldC9EO"},{url:"/services/flora/app/_next/static/kfc2PmGbbKRsuPdldC9EO/_buildManifest.js",revision:"kfc2PmGbbKRsuPdldC9EO"},{url:"/services/flora/app/_next/static/kfc2PmGbbKRsuPdldC9EO/_ssgManifest.js",revision:"kfc2PmGbbKRsuPdldC9EO"},{url:"/services/flora/app/favicon.ico",revision:"4259c17cb0b60f3b8a838b8a0e6543c5"},{url:"/services/flora/app/logo.jpg",revision:"9c984471d470ca55b858b807a3e1206c"},{url:"/services/flora/app/logo.png",revision:"f3d97f09bf44ea30a4cf939da78dc936"},{url:"/services/flora/app/manifest.json",revision:"e04bedd32fdf30a8a557ecb7afc73f10"},{url:"/services/flora/app/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/services/flora/app",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/^https?.*/,new e.NetworkFirst({cacheName:"offlineCache",plugins:[new e.ExpirationPlugin({maxEntries:200})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
