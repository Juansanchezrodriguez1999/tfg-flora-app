if(!self.define){let e,s={};const i=(i,c)=>(i=new URL(i+".js",c).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(c,a)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let r={};const t=e=>i(e,n),o={module:{uri:n},exports:r,require:t};s[n]=Promise.all(c.map((e=>o[e]||t(e)))).then((e=>(a(...e),r)))}}define(["./workbox-a7bdbf2e"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/services/flora/app/_next/static/chunks/318-e3a0089dcbfe894c.js",revision:"d_ihCHgSwho7pU60h6NcB"},{url:"/services/flora/app/_next/static/chunks/324-f190ef6253b7f029.js",revision:"d_ihCHgSwho7pU60h6NcB"},{url:"/services/flora/app/_next/static/chunks/35fcbfc9-fceaccdc6d616618.js",revision:"d_ihCHgSwho7pU60h6NcB"},{url:"/services/flora/app/_next/static/chunks/362-6fa294c0531e8aa2.js",revision:"d_ihCHgSwho7pU60h6NcB"},{url:"/services/flora/app/_next/static/chunks/423-fcf9122df0215a3c.js",revision:"d_ihCHgSwho7pU60h6NcB"},{url:"/services/flora/app/_next/static/chunks/455-f970cc3a74487277.js",revision:"d_ihCHgSwho7pU60h6NcB"},{url:"/services/flora/app/_next/static/chunks/678-fa6ee674a92d1cd4.js",revision:"d_ihCHgSwho7pU60h6NcB"},{url:"/services/flora/app/_next/static/chunks/780-97ed8c77db2b8917.js",revision:"d_ihCHgSwho7pU60h6NcB"},{url:"/services/flora/app/_next/static/chunks/833-79dcff770f3ae367.js",revision:"d_ihCHgSwho7pU60h6NcB"},{url:"/services/flora/app/_next/static/chunks/873-0b5b25c55f5ce29f.js",revision:"d_ihCHgSwho7pU60h6NcB"},{url:"/services/flora/app/_next/static/chunks/f693f939-b86e436bbb7009a4.js",revision:"d_ihCHgSwho7pU60h6NcB"},{url:"/services/flora/app/_next/static/chunks/framework-1fd5ea2b9c17a7ff.js",revision:"d_ihCHgSwho7pU60h6NcB"},{url:"/services/flora/app/_next/static/chunks/main-f53922c8895c0055.js",revision:"d_ihCHgSwho7pU60h6NcB"},{url:"/services/flora/app/_next/static/chunks/pages/_app-6095443f6ad39a8c.js",revision:"d_ihCHgSwho7pU60h6NcB"},{url:"/services/flora/app/_next/static/chunks/pages/_error-458a3f37cf082489.js",revision:"d_ihCHgSwho7pU60h6NcB"},{url:"/services/flora/app/_next/static/chunks/pages/edit/local/sample-f04a2ef18581b6e9.js",revision:"d_ihCHgSwho7pU60h6NcB"},{url:"/services/flora/app/_next/static/chunks/pages/form-e42e91f3cc215763.js",revision:"d_ihCHgSwho7pU60h6NcB"},{url:"/services/flora/app/_next/static/chunks/pages/form_np-99c52331dba9404e.js",revision:"d_ihCHgSwho7pU60h6NcB"},{url:"/services/flora/app/_next/static/chunks/pages/index-1ffb76c46ee4cea1.js",revision:"d_ihCHgSwho7pU60h6NcB"},{url:"/services/flora/app/_next/static/chunks/pages/samples-dba327672b655a02.js",revision:"d_ihCHgSwho7pU60h6NcB"},{url:"/services/flora/app/_next/static/chunks/pages/signin-f067d7dcf5242706.js",revision:"d_ihCHgSwho7pU60h6NcB"},{url:"/services/flora/app/_next/static/chunks/pages/view/local/sample-32b7d4fc6e5236f2.js",revision:"d_ihCHgSwho7pU60h6NcB"},{url:"/services/flora/app/_next/static/chunks/pages/view/remote/%5Bid%5D-e67683e4ca1dda1b.js",revision:"d_ihCHgSwho7pU60h6NcB"},{url:"/services/flora/app/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"d_ihCHgSwho7pU60h6NcB"},{url:"/services/flora/app/_next/static/chunks/webpack-687bfd447eb19a14.js",revision:"d_ihCHgSwho7pU60h6NcB"},{url:"/services/flora/app/_next/static/css/e916170e4954477d.css",revision:"d_ihCHgSwho7pU60h6NcB"},{url:"/services/flora/app/_next/static/d_ihCHgSwho7pU60h6NcB/_buildManifest.js",revision:"d_ihCHgSwho7pU60h6NcB"},{url:"/services/flora/app/_next/static/d_ihCHgSwho7pU60h6NcB/_ssgManifest.js",revision:"d_ihCHgSwho7pU60h6NcB"},{url:"/services/flora/app/android-chrome-192x192.png",revision:"7e271b2fc4548978e34c49da875b8d46"},{url:"/services/flora/app/apple-touch-icon.png",revision:"c02443d2f605dcf025a64de837b48b23"},{url:"/services/flora/app/favicon-16x16.png",revision:"9a49ce9cbb1a1d61d17b55354e74b245"},{url:"/services/flora/app/favicon-32x32.png",revision:"7ec54707c57fa4db16b8bace146bc49a"},{url:"/services/flora/app/favicon.ico",revision:"ecdedf8bea75fb83a89431435139c43c"},{url:"/services/flora/app/favicon.png",revision:"a6c4282d92b695f3654d6b62adeb49c8"},{url:"/services/flora/app/logo.png",revision:"f3d97f09bf44ea30a4cf939da78dc936"},{url:"/services/flora/app/manifest.json",revision:"719698a46b9b2f4f2229c2a88c05f85a"},{url:"/services/flora/app/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/services/flora/app",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/^https?.*/,new e.NetworkFirst({cacheName:"offlineCache",plugins:[new e.ExpirationPlugin({maxEntries:200})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
