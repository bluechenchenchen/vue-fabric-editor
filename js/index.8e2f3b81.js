var k=(w,i,r)=>new Promise((m,c)=>{var y=s=>{try{n(r.next(s))}catch(g){c(g)}},p=s=>{try{n(r.throw(s))}catch(g){c(g)}},n=s=>s.done?m(s.value):Promise.resolve(s.value).then(y,p);n((r=r.apply(w,i)).next())});import{_ as z,h as B,r as b,D as l,E as u,L as v,J as o,G as d,M as C,N as T,u as t,F as L,H as _,O,s as J,Y as S,a7 as K,A as $,n as W,K as x,I as Y,T as I,i as Q}from"./index.c6bfe06d.js";import{z as X,A as Z,B as ee,q as te,h as ae,w as oe,x as ne,y as se,_ as le}from"./usePageList.0df0b1e9.js";const ie={class:"banner"},re=["href"],de=["src","alt"],ce=O({name:"Banner"}),pe=Object.assign(ce,{setup(w){const i=B({autoplay:!1,autoplaySpeed:2e3,dots:"inside",radiusDot:!1,trigger:"click",arrow:"hover"}),r=b([]);return X.find({populate:"*"}).then(m=>{r.value=m.data}),(m,c)=>{const y=l("CarouselItem"),p=l("Carousel");return u(),v("div",ie,[o(p,{modelValue:m.value,"onUpdate:modelValue":c[0]||(c[0]=n=>m.value=n),height:250,autoplay:t(i).autoplay,"autoplay-speed":t(i).autoplaySpeed,dots:t(i).dots,"radius-dot":t(i).radiusDot,trigger:t(i).trigger,arrow:t(i).arrow},{default:d(()=>[(u(!0),v(C,null,T(t(r),n=>(u(),L(y,{class:"img-box",key:n.id},{default:d(()=>[_("a",{href:n.url,target:"_blank"},[_("img",{src:n.imgUrl,alt:n.title},null,8,de)],8,re)]),_:2},1024))),128))]),_:1},8,["modelValue","autoplay","autoplay-speed","dots","radius-dot","trigger","arrow"])])}}}),ue=z(pe,[["__scopeId","data-v-0129b211"]]);const _e={class:"home"},me={class:"left"},ge={class:"right"},ve={href:"https://pro.kuaitu.cc/",target:"_blank"},ye=["src"],fe={class:"search-box"},he={class:"img-box grid",id:"imgBox","transition-duration":"0.3s",gutter:10,"item-selector":".grid-item"},be=["src","alt","onClick"],xe=O({name:"Home"}),we=Object.assign(xe,{setup(w){const i=J(),r=b([]);(()=>k(this,null,function*(){const f=yield Z();r.value=f.data.data.map(e=>({id:e.id,name:e.attributes.name}))}))();const c=b([]),y=b(0),p=b(1),n=b(20),s=B({name:{$containsi:""},templ_type:{$in:[]}}),g=()=>k(this,null,function*(){const f={populate:{img:"*"},filters:K(s),fields:["name"],pagination:{page:p.value,pageSize:n.value}};$.Spin.show();try{const e=yield ee(te.stringify(f));c.value=[],yield W(),y.value=e.data.meta.pagination.total,c.value=e.data.data.map(h=>({id:h.id,name:h.attributes.name,src:ae(h.attributes.img)}))}catch(e){console.log(e)}$.Spin.hide()}),V=()=>{p.value=1,g()};g();const D=f=>{const e=i.resolve({path:"/",query:{tempId:f.id}});console.log(e,1111),window.open(e.href,"_blank")};return(f,e)=>{const h=l("Divider"),H=l("Button"),U=l("Header"),P=l("Input"),F=l("TagSelectOption"),N=l("TagSelect"),q=l("Tooltip"),A=l("Page"),E=l("Content"),R=l("Footer"),j=l("Layout"),M=S("masonry-tile"),G=S("masonry");return u(),v("div",_e,[o(j,null,{default:d(()=>[o(U,{style:{position:"fixed",width:"100%",zIndex:99}},{default:d(()=>[_("div",me,[o(oe),o(h,{type:"vertical"}),e[4]||(e[4]=x(" 在线设计工具 "))]),_("div",ge,[o(H,{type:"primary",to:"/",size:"smail",target:"_blank"},{default:d(()=>e[5]||(e[5]=[x("新建设计")])),_:1}),o(h,{type:"vertical"}),_("a",ve,[_("img",{width:"15",src:t(ne),alt:"vue-fbric-editor"},null,8,ye)]),o(t(se)),o(le)])]),_:1}),o(E,{style:{margin:"40px 20px 0",minHeight:"500px",minWidth:"1200px"}},{default:d(()=>[o(ue),_("div",fe,[o(P,{size:"large",class:"search-input",clearable:"",search:"",modelValue:t(s).name.$containsi,"onUpdate:modelValue":e[0]||(e[0]=a=>t(s).name.$containsi=a),"enter-button":"",placeholder:"请输入关键词",onOnSearch:V},null,8,["modelValue"]),o(N,{modelValue:t(s).templ_type.$in,"onUpdate:modelValue":e[1]||(e[1]=a=>t(s).templ_type.$in=a),onOnChange:V},{default:d(()=>[(u(!0),v(C,null,T(t(r),a=>(u(),L(F,{name:a.id,key:a.id},{default:d(()=>[x(Y(a.name),1)]),_:2},1032,["name"]))),128))]),_:1},8,["modelValue"])]),I((u(),v("div",he,[(u(!0),v(C,null,T(t(c),a=>I((u(),v("div",{class:"img-item grid-item",key:a.id},[o(q,{content:a.name,placement:"top"},{default:d(()=>[_("img",{src:a.src,alt:a.name,onClick:ke=>D(a)},null,8,be)]),_:2},1032,["content"])])),[[M]])),128))])),[[G]]),o(A,{class:"page",total:t(y),modelValue:t(p),"onUpdate:modelValue":e[2]||(e[2]=a=>Q(p)?p.value=a:null),onOnChange:g,onOnPageSizeChange:e[3]||(e[3]=a=>n.value=a),"page-size":t(n),"show-sizer":""},null,8,["total","modelValue","page-size"])]),_:1}),o(R,{class:"layout-footer-center"},{default:d(()=>e[6]||(e[6]=[x(" 2024 © 北京迅单科技有限公司 京ICP备2022034407号-2 ")])),_:1})]),_:1})])}}}),Se=z(we,[["__scopeId","data-v-d30c455f"]]);export{Se as default};
