(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[375],{5218:(e,t,l)=>{Promise.resolve().then(l.bind(l,5842))},7711:(e,t,l)=>{"use strict";l.d(t,{default:()=>r.a});var n=l(1956),r=l.n(n)},1956:(e,t,l)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r}});let n=l(306)._(l(580));function r(e,t){var l;let r={};"function"==typeof e&&(r.loader=e);let u={...r,...t};return(0,n.default)({...u,modules:null==(l=u.loadableGenerated)?void 0:l.modules})}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9827:(e,t,l)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"BailoutToCSR",{enumerable:!0,get:function(){return r}});let n=l(3719);function r(e){let{reason:t,children:l}=e;if("undefined"==typeof window)throw new n.BailoutToCSRError(t);return l}},580:(e,t,l)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return s}});let n=l(5155),r=l(2115),u=l(9827),a=l(9214);function o(e){return{default:e&&"default"in e?e.default:e}}let d={loader:()=>Promise.resolve(o(()=>null)),loading:null,ssr:!0},s=function(e){let t={...d,...e},l=(0,r.lazy)(()=>t.loader().then(o)),s=t.loading;function i(e){let o=s?(0,n.jsx)(s,{isLoading:!0,pastDelay:!0,error:null}):null,d=!t.ssr||!!t.loading,i=d?r.Suspense:r.Fragment,f=t.ssr?(0,n.jsxs)(n.Fragment,{children:["undefined"==typeof window?(0,n.jsx)(a.PreloadChunks,{moduleIds:t.modules}):null,(0,n.jsx)(l,{...e})]}):(0,n.jsx)(u.BailoutToCSR,{reason:"next/dynamic",children:(0,n.jsx)(l,{...e})});return(0,n.jsx)(i,{...d?{fallback:o}:{},children:f})}return i.displayName="LoadableComponent",i}},9214:(e,t,l)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"PreloadChunks",{enumerable:!0,get:function(){return o}});let n=l(5155),r=l(7650),u=l(5861),a=l(8284);function o(e){let{moduleIds:t}=e;if("undefined"!=typeof window)return null;let l=u.workAsyncStorage.getStore();if(void 0===l)return null;let o=[];if(l.reactLoadableManifest&&t){let e=l.reactLoadableManifest;for(let l of t){if(!e[l])continue;let t=e[l].files;o.push(...t)}}return 0===o.length?null:(0,n.jsx)(n.Fragment,{children:o.map(e=>{let t=l.assetPrefix+"/_next/"+(0,a.encodeURIPath)(e);return e.endsWith(".css")?(0,n.jsx)("link",{precedence:"dynamic",href:t,rel:"stylesheet",as:"style"},e):((0,r.preload)(t,{as:"script",fetchPriority:"low"}),null)})})}},5842:(e,t,l)=>{"use strict";l.r(t),l.d(t,{default:()=>o});var n=l(5155);l(2115);var r=l(7711);let u=(0,r.default)(()=>Promise.all([l.e(353),l.e(161)]).then(l.bind(l,6161)),{loadableGenerated:{webpack:()=>[6161]},ssr:!1}),a=(0,r.default)(()=>l.e(869).then(l.bind(l,4869)),{loadableGenerated:{webpack:()=>[4869]},ssr:!1}),o=()=>(0,n.jsx)("div",{className:"flex w-full h-full",style:{background:"#87CEEB",width:"auto",height:"1000px"},children:(0,n.jsx)(a,{children:(0,n.jsx)(u,{})})})}},e=>{var t=t=>e(e.s=t);e.O(0,[441,517,358],()=>t(5218)),_N_E=e.O()}]);