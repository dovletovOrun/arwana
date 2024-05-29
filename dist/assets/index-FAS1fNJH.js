import{i as n,k as _,j as s,t as d}from"./index-9pddSbbk.js";import{r as p,P as u,b as m}from"./index-lUBK4fCm.js";import{$ as o}from"./index-9zatkEmO.js";import{a as y}from"./axios-zw96FDk0.js";import{P as b}from"./index-MS67Mj5h.js";import{m as C}from"./motion-K7Ua0Yyz.js";import"./index.esm-CNKC8f4X.js";import"./index-Itt9GokX.js";import"./useBound-dg3T1hIr.js";import"./index-KXBCEYlo.js";const g="http://192.168.11.2:8000",x={isCategoriesLoading:!1,errorStatus:"",categories:[]},c=n("categories/getAllCats",async(r,{rejectWithValue:t})=>{try{return(await y.get(`${g}category`)).data}catch(a){return t(a.response.status)}});n("categories/getOneCat",async(r,{rejectWithValue:t})=>{try{return(await y.get(`${g}category/${r}`)).data}catch(a){return t(a.response.status)}});n("categories/addCategory",async(r,{rejectWithValue:t})=>{try{return(await o.post("/api/category",r)).data}catch(a){return t(a.response.status)}});n("categories/editCat",async(r,{rejectWithValue:t})=>{try{return(await o.patch(`/api/category/${r.id}`,r.category)).data}catch{return t(e.response.status)}});n("categories/deleteCat",async(r,{rejectWithValue:t})=>{try{return(await o.delete(`/api/category/${r}`)).data}catch(a){return t(a.response.status)}});n("categories/uploadCatImage",async(r,{rejectWithValue:t})=>{try{return(await o.post(`/api/category/image/${r.id}`,r.image)).data}catch(a){return t(a.response.status)}});n("categories/deletecatImage",async(r,{rejectWithValue:t})=>{try{return(await o.delete(`/api/category/${r.itemId}/image/${r.imageId}`)).data}catch(a){return t(a.response.status)}});n("categories/bindBrandCat",async(r,{rejectWithValue:t})=>{try{return(await o.post(`/api/brand-category/${r.brandId}/${r.catId}`)).data}catch(a){return t(a.response.status)}});n("categories/deleteCatBrand",async(r,{rejectWithValue:t})=>{try{return(await o.delete(`/api/brand-category/${r.brandId}/${r.catId}`)).data}catch(a){return t(a.response.status)}});const v=_({name:"categories",initialState:x,extraReducers:r=>{r.addCase(c.pending,t=>{t.isCategoriesLoading=!0}).addCase(c.fulfilled,(t,a)=>{t.isCategoriesLoading=!1,a.payload&&(t.categories=a.payload.categories)}).addCase(c.rejected,(t,a)=>{t.isCategoriesLoading=!1,t.errorStatus=a.payload})}});v.reducer;const h="_mainTextContainer_1ya5b_11",T="_actions_1ya5b_42",$="_catProps_1ya5b_56",f="_label_1ya5b_69",w="_dropdown_1ya5b_79",j="_dropBody_1ya5b_87",P="_inactive_1ya5b_117",I="_active_1ya5b_124",S="_categoryContainer_1ya5b_131",k="_categoryMain_1ya5b_135",N="_titleContainer_1ya5b_151",A="_mainText_1ya5b_11",B="_secondaryText_1ya5b_187",M="_resTitle_1ya5b_202",L="_advantageSection_1ya5b_226",R="_advanTitle_1ya5b_238",U="_advanP_1ya5b_255",E="_btnContainer_1ya5b_272",q="_scaleUp_1ya5b_1",z="_reveal_1ya5b_1",i={mainTextContainer:h,actions:T,catProps:$,label:f,dropdown:w,dropBody:j,inactive:P,active:I,categoryContainer:S,categoryMain:k,titleContainer:N,mainText:A,secondaryText:B,resTitle:M,advantageSection:L,advanTitle:R,advanP:U,btnContainer:E,"slide-in":"_slide-in_1ya5b_1",scaleUp:q,reveal:z},l="menu.categories",D=150;function X(){const r=p.useMediaQuery({query:"(max-width: 1024px)"});return s.jsx(u,{children:s.jsxs("div",{className:i.categoryContainer,children:[s.jsx("div",{style:{background:`linear-gradient(0deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.55) 100%), url(${m})`,backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat"},className:i.categoryMain,children:s.jsxs("div",{className:i.titleContainer,children:[!r&&s.jsx("div",{children:s.jsx("h1",{className:i.mainText,children:d(l).split("").map((t,a)=>s.jsx(C.div,{animate:{opacity:[0,1],translateY:[100,0]},transition:{duration:.8,delay:(D+a*20)/1e3},children:t},t+a))})}),s.jsx("h3",{className:i.secondaryText,children:"Arwana mebel"}),r&&s.jsx("h2",{className:i.resTitle,children:l})]})}),s.jsx(b,{isAllCats:!0,sectionTitle:d("menu.categories")})]})})}export{X as default};
