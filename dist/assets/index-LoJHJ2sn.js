import{d as c,c as d,j as a}from"./index-9pddSbbk.js";import{r as _,P as l,b as y}from"./index-lUBK4fCm.js";import{P as b}from"./index-MS67Mj5h.js";import{m}from"./motion-K7Ua0Yyz.js";import"./index.esm-CNKC8f4X.js";import"./index-Itt9GokX.js";import"./useBound-dg3T1hIr.js";import"./index-KXBCEYlo.js";const p="_mainTextContainer_1ya5b_11",x="_actions_1ya5b_42",v="_catProps_1ya5b_56",g="_label_1ya5b_69",T="_dropdown_1ya5b_79",u="_dropBody_1ya5b_87",C="_inactive_1ya5b_117",h="_active_1ya5b_124",j="_categoryContainer_1ya5b_131",P="_categoryMain_1ya5b_135",f="_titleContainer_1ya5b_151",B="_mainText_1ya5b_11",N="_secondaryText_1ya5b_187",w="_resTitle_1ya5b_202",A="_advantageSection_1ya5b_226",M="_advanTitle_1ya5b_238",k="_advanP_1ya5b_255",S="_btnContainer_1ya5b_272",D="_scaleUp_1ya5b_1",R="_reveal_1ya5b_1",t={mainTextContainer:p,actions:x,catProps:v,label:g,dropdown:T,dropBody:u,inactive:C,active:h,categoryContainer:j,categoryMain:P,titleContainer:f,mainText:B,secondaryText:N,resTitle:w,advantageSection:A,advanTitle:M,advanP:k,btnContainer:S,"slide-in":"_slide-in_1ya5b_1",scaleUp:D,reveal:R},s="Бренды",U=150;function F(){const{data:n}=c.useGetAllBrandsDataQuery();console.log(n);const e=_.useMediaQuery({query:"(max-width: 1024px)"}),{t:r}=d();return a.jsx(l,{children:a.jsxs("div",{className:t.categoryContainer,children:[a.jsx("div",{style:{background:`linear-gradient(0deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.55) 100%), url(${y})`,backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat"},className:t.categoryMain,children:a.jsxs("div",{className:t.titleContainer,children:[!e&&a.jsx("div",{children:a.jsx("h1",{className:t.mainText,children:s.split("").map((o,i)=>a.jsx(m.div,{animate:{opacity:[0,1],translateY:[100,0]},transition:{duration:.8,delay:(U+i*20)/1e3},children:o},o+i))})}),a.jsx("h3",{className:t.secondaryText,children:"Arwana mebel"}),e&&a.jsx("h2",{className:t.resTitle,children:s})]})}),a.jsx(b,{sectionTitle:r("menu.brands"),tabs:n})]})})}export{F as default};