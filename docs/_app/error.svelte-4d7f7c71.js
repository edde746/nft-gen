import{S as K,i as w,s as y,e as v,t as E,c as d,a as b,h as P,d as m,g as n,J as R,j,k as N,l as q,m as S,K as C}from"./chunks/vendor-7ae7a0f4.js";function H(r){let f,a=r[1].frame+"",t;return{c(){f=v("pre"),t=E(a)},l(l){f=d(l,"PRE",{});var s=b(f);t=P(s,a),s.forEach(m)},m(l,s){n(l,f,s),R(f,t)},p(l,s){s&2&&a!==(a=l[1].frame+"")&&j(t,a)},d(l){l&&m(f)}}}function J(r){let f,a=r[1].stack+"",t;return{c(){f=v("pre"),t=E(a)},l(l){f=d(l,"PRE",{});var s=b(f);t=P(s,a),s.forEach(m)},m(l,s){n(l,f,s),R(f,t)},p(l,s){s&2&&a!==(a=l[1].stack+"")&&j(t,a)},d(l){l&&m(f)}}}function z(r){let f,a,t,l,s=r[1].message+"",c,k,u,p,i=r[1].frame&&H(r),o=r[1].stack&&J(r);return{c(){f=v("h1"),a=E(r[0]),t=N(),l=v("pre"),c=E(s),k=N(),i&&i.c(),u=N(),o&&o.c(),p=q()},l(e){f=d(e,"H1",{});var _=b(f);a=P(_,r[0]),_.forEach(m),t=S(e),l=d(e,"PRE",{});var h=b(l);c=P(h,s),h.forEach(m),k=S(e),i&&i.l(e),u=S(e),o&&o.l(e),p=q()},m(e,_){n(e,f,_),R(f,a),n(e,t,_),n(e,l,_),R(l,c),n(e,k,_),i&&i.m(e,_),n(e,u,_),o&&o.m(e,_),n(e,p,_)},p(e,[_]){_&1&&j(a,e[0]),_&2&&s!==(s=e[1].message+"")&&j(c,s),e[1].frame?i?i.p(e,_):(i=H(e),i.c(),i.m(u.parentNode,u)):i&&(i.d(1),i=null),e[1].stack?o?o.p(e,_):(o=J(e),o.c(),o.m(p.parentNode,p)):o&&(o.d(1),o=null)},i:C,o:C,d(e){e&&m(f),e&&m(t),e&&m(l),e&&m(k),i&&i.d(e),e&&m(u),o&&o.d(e),e&&m(p)}}}function D({error:r,status:f}){return{props:{error:r,status:f}}}function A(r,f,a){let{status:t}=f,{error:l}=f;return r.$$set=s=>{"status"in s&&a(0,t=s.status),"error"in s&&a(1,l=s.error)},[t,l]}class F extends K{constructor(f){super();w(this,f,A,z,y,{status:0,error:1})}}export{F as default,D as load};
