(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1e44e698"],{"0f77":function(t,e,a){"use strict";a("98b7")},"98b7":function(t,e,a){},c24f:function(t,e,a){"use strict";a.d(e,"e",(function(){return o})),a.d(e,"a",(function(){return r})),a.d(e,"g",(function(){return l})),a.d(e,"c",(function(){return s})),a.d(e,"b",(function(){return c})),a.d(e,"d",(function(){return u})),a.d(e,"f",(function(){return d}));var n=a("b775"),i={list:"/admin/user/list",add:"/admin/user/add",info:"/admin/user/info",edit:"/admin/user/edit",delete:"/admin/user/delete",clockList:"/admin/user/clock_list",updatePassword:"/admin/update_password"};function o(t){return Object(n["b"])({url:i.list,method:"get",params:t})}function r(t){return Object(n["b"])({url:i.add,method:"post",data:t})}function l(t){return Object(n["b"])({url:i.info,method:"get",params:t})}function s(t){return Object(n["b"])({url:i.edit,method:"post",data:t})}function c(t){return Object(n["b"])({url:i.delete,method:"post",data:t})}function u(t){return Object(n["b"])({url:i.clockList,method:"get",params:t})}function d(t){return Object(n["b"])({url:i.updatePassword,method:"post",data:t})}},d3f8:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=this,a=e.$createElement,n=e._self._c||a;return n("page-header-wrapper",[n("a-card",{attrs:{bordered:!1}},[n("div",{staticClass:"table-page-search-wrapper"},[n("a-form",{attrs:{layout:"inline"}},[n("a-row",{attrs:{gutter:48}},[e._l(e.filter.columns,(function(t,a){return n("a-col",{key:a,attrs:{md:6}},[n("a-form-item",{attrs:{label:t.label}},["input"===t.type?n("a-input",{attrs:{placeholder:"请输入"+t.label},model:{value:e.filter.data[t.prop],callback:function(a){e.$set(e.filter.data,t.prop,a)},expression:"filter.data[item.prop]"}}):e._e(),"select"===t.type?n("a-select",{attrs:{placeholder:"请选择"+t.label},model:{value:e.filter.data[t.prop],callback:function(a){e.$set(e.filter.data,t.prop,a)},expression:"filter.data[item.prop]"}},e._l(t.option,(function(t,a){return n("a-select-option",{key:a,attrs:{value:t.value}},[e._v(" "+e._s(t.label)+" ")])})),1):e._e()],1)],1)})),n("a-col",{attrs:{md:24}},[n("span",{staticClass:"table-page-search-submitButtons",style:{float:"right",overflow:"hidden"}},[n("a-button",{attrs:{type:"primary"},on:{click:e.onSearch}},[e._v("查询")]),n("a-button",{staticStyle:{"margin-left":"8px"},on:{click:e.onResetSearch}},[e._v("重置")])],1)])],2)],1)],1),n("div",{staticClass:"table-operator"},[n("a-button",{attrs:{type:"primary",icon:"plus"},on:{click:function(){t.$router.push({name:"userAdd"})}}},[e._v("新增")])],1),n("a-table",{attrs:{dataSource:e.tableData.list,loading:e.tableData.loading,columns:e.tableData.column,pagination:e.tableData.pagination,rowKey:function(t,e){return e}},scopedSlots:e._u([{key:"img",fn:function(t,a){return[a.img?n("img",{attrs:{src:a.img,width:"100px"}}):n("div",[e._v("未采集人脸")])]}},{key:"action",fn:function(t,a){return[n("a-icon",{style:{color:"#1890ff"},attrs:{type:"carry-out"},on:{click:function(t){return e.onClockList(a)}}}),n("a-icon",{style:{color:"#1890ff"},attrs:{type:"edit"},on:{click:function(t){return e.onEdit(a)}}}),n("a-popconfirm",{attrs:{title:"确定要删除吗？","ok-text":"是","cancel-text":"否",visible:parseInt(a.id)===parseInt(e.visibleId)&&e.deleteVisible,"ok-button-props":e.okButtonProps},on:{confirm:function(t){return e.handleDelete(a)},cancel:e.onDeleteCancel}},[n("a-icon",{style:{color:"#1890ff"},attrs:{type:"delete"},on:{click:function(t){return e.onDelete(a)}}})],1)]}}])})],1)],1)},i=[],o=(a("4de4"),a("c24f")),r={name:"List",data:function(){return{filter:{columns:[{prop:"pin",label:"编号",type:"input"},{prop:"name",label:"姓名",type:"input"},{prop:"cardId",label:"身份证号",type:"input"},{prop:"phone",label:"电话",type:"input"},{prop:"status",label:"上岛/离岛",type:"select",option:[{value:"1",label:"上岛"},{value:"0",label:"离岛"},{value:"-1",label:"未知"}]}],data:{}},tableData:{column:[{title:"编号",dataIndex:"pin"},{title:"姓名",dataIndex:"name"},{title:"图片",dataIndex:"img",scopedSlots:{customRender:"img"}},{title:"性别",dataIndex:"sex"},{title:"联系电话",dataIndex:"phone"},{title:"备用联系电话",dataIndex:"mobile"},{title:"住址",dataIndex:"address"},{title:"上岛/离岛",dataIndex:"status"},{title:"操作",dataIndex:"action",class:"action",align:"right",scopedSlots:{customRender:"action"}}],list:[],pagination:{current:1,pageSize:20,total:0},loading:!1},deleteVisible:!1,visibleId:"",okButtonProps:{props:{loading:!1}}}},mounted:function(){this.getList()},methods:{getList:function(){var t=this;this.tableData.loading=!0,Object(o["e"])(this.filter.data).then((function(e){t.tableData.list=e.data.list;var a=e.data.pagination;t.tableData.pagination={current:a.page,pageSize:a.limit,total:a.total},t.tableData.loading=!1}))},onEdit:function(t){this.$router.push({path:"/user/add",query:{id:t.id}})},onDelete:function(t){this.visibleId=t.id,this.deleteVisible=!0},onDeleteCancel:function(){this.deleteVisible=!1},handleDelete:function(t){var e=this;this.okButtonProps.props.loading=!0;var a={id:this.visibleId,pin:t.pin};Object(o["b"])(a).then((function(t){t.status?e.$notification.error({message:t.msg}):(e.submit=!1,e.$notification.success({message:"删除成功"}),e.deleteVisible=!1,e.okButtonProps.props.loading=!1,e.getList())}))},onClockList:function(t){this.$router.push({name:"ClockList",query:{pin:t.pin}})},onSearch:function(){this.getList()},onResetSearch:function(){this.filter.data={},this.getList()}}},l=r,s=(a("0f77"),a("2877")),c=Object(s["a"])(l,n,i,!1,null,"2d110bcf",null);e["default"]=c.exports}}]);