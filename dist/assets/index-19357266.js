import{r as l,M as n,j as e}from"./index-f1a77953.js";import{b as h}from"./user-98c17dfc.js";import{D as r}from"./index-e7d1e950.js";const u=s=>{const{id:a,name:o}=s,[t,c]=l.useState({});l.useState({});const i={user:"用户",admin:"管理员"},d=async()=>{const{code:m,data:b}=await h({id:a});m===200&&c(b)};return l.useEffect(()=>{d()},[]),n(r,{title:"用户详情",layout:"vertical",bordered:!0,style:{backgroundColor:"transparent"},children:[e(r.Item,{label:"用户名",children:e("span",{style:{fontSize:18},children:o})}),e(r.Item,{label:"昵称",children:"海盐荔枝"}),e(r.Item,{label:"手机号",children:t.phone}),e(r.Item,{label:"性别",children:"女"}),e(r.Item,{label:"身份证号",children:a}),e(r.Item,{label:"邮箱",children:t.email}),e(r.Item,{label:"权限",children:e("span",{style:{color:"rgb(255,86,86)",fontSize:16},children:i[t.role]})}),e(r.Item,{label:"注册天数",children:"365"}),e(r.Item,{label:"总消费额",children:"2400"}),n(r.Item,{label:"用户档案",children:["用户爱好: 旅行",e("br",{}),"职业: 学生",e("br",{}),"常住地: 上海徐汇",e("br",{})]})]})};export{u as default};
