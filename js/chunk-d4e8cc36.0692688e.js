(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d4e8cc36"],{"01db":function(e,t,r){},"50fc":function(e,t,r){"use strict";r.d(t,"a",(function(){return a})),r.d(t,"d",(function(){return s})),r.d(t,"b",(function(){return o})),r.d(t,"c",(function(){return u})),r.d(t,"e",(function(){return l}));var n=r("b775"),i={add:"/admin/add",del:"/admin/delete",edit:"/admin/edit",detail:"/admin/detail",list:"/admin/list"};function a(e){return Object(n["b"])({url:i.add,method:"post",data:e})}function s(e){return Object(n["b"])({url:i.list,method:"get",params:e})}function o(e){return Object(n["b"])({url:i.del,method:"post",data:e})}function u(e){return Object(n["b"])({url:i.edit,method:"post",data:e})}function l(e){return Object(n["b"])({url:i.detail,method:"get",params:e})}},a6df:function(e,t,r){"use strict";r("01db")},e4e5:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("page-header-wrapper",[r("a-card",{attrs:{bordered:!1}},[r("a-spin",{attrs:{spinning:e.loading}},[r("a-form-model",{ref:"insert",attrs:{model:e.insertForm,rules:e.insertFormRules},on:{submit:e.handleSubmit}},[e._l(e.form,(function(t,n){return r("a-form-model-item",{key:n,attrs:{label:t.label,labelCol:{lg:{span:4},sm:{span:7}},wrapperCol:{lg:{span:t.wrapperCol},sm:{span:10}},prop:t.prop}},["input"===t.type?r("a-input",{attrs:{name:t.prop,placeholder:"请输入"+t.label},model:{value:e.insertForm[t.prop],callback:function(r){e.$set(e.insertForm,t.prop,r)},expression:"insertForm[item.prop]"}}):e._e(),"select"===t.type?r("a-select",{attrs:{placeholder:"请选择"+t.label},model:{value:e.insertForm[t.prop],callback:function(r){e.$set(e.insertForm,t.prop,r)},expression:"insertForm[item.prop]"}},e._l(t.option,(function(t,n){return r("a-select-option",{key:n,attrs:{value:t.key}},[e._v(" "+e._s(t.value)+" ")])})),1):e._e()],1)})),r("a-form-model-item",{staticStyle:{"text-align":"center"},attrs:{"wrapper-col":{span:24}}},[r("a-button",{attrs:{type:"primary","html-type":"submit",loading:e.submit}},[e._v(" 提交 ")])],1)],2)],1)],1)],1)},i=[],a=(r("b64b"),r("50fc")),s={name:"Add",data:function(){return{loading:!1,submit:!1,satellite:!1,form:[{label:"昵称",prop:"nickname",type:"input",wrapperCol:12,validate:!0},{label:"账户名",prop:"name",type:"input",wrapperCol:12},{label:"密码",prop:"password",type:"input",wrapperCol:12}],insertForm:{},insertFormRules:{nickname:[{required:!0,message:"请输入昵称",trigger:"blur"}],name:[{required:!0,message:"请输入账户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]},edit:!1,imgLoading:!1,imageUrl:""}},mounted:function(){this.getQueryParameter()},methods:{getQueryParameter:function(){var e=this,t=this.$route.query;Object.keys(t).length>0&&(this.loading=!0,Object(a["e"])({id:t.id}).then((function(t){e.insertForm=t.data,e.edit=!0,e.loading=!1,e.insertFormRules.password[0].required=!1})))},handleSubmit:function(e){var t=this;e.preventDefault(),this.$refs.insert.validate((function(e){e&&(t.submit=!0,t.edit?Object(a["c"])(t.insertForm).then((function(e){e.status?t.$notification.error({message:e.msg}):(t.submit=!1,t.$notification.success({message:"更新成功"}),setTimeout((function(){t.$router.push("/admin/list")}),1e3))})).catch((function(){t.submit=!1})):Object(a["a"])(t.insertForm).then((function(e){t.submit=!1,e.status?t.$notification.error({message:e.msg}):(t.$notification.success({message:"新增成功"}),t.$router.push({name:"adminList"}))})).catch((function(){t.submit=!1})))}))}}},o=s,u=(r("a6df"),r("2877")),l=Object(u["a"])(o,n,i,!1,null,"59f49137",null);t["default"]=l.exports}}]);