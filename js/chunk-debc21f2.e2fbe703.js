(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-debc21f2"],{"05c9":function(t,e,a){"use strict";a("8eed")},"8eed":function(t,e,a){},c24f:function(t,e,a){"use strict";a.d(e,"f",(function(){return o})),a.d(e,"a",(function(){return r})),a.d(e,"j",(function(){return s})),a.d(e,"c",(function(){return l})),a.d(e,"b",(function(){return c})),a.d(e,"e",(function(){return u})),a.d(e,"h",(function(){return d})),a.d(e,"d",(function(){return p})),a.d(e,"i",(function(){return f})),a.d(e,"g",(function(){return b}));var n=a("b775"),i={list:"/admin/user/list",add:"/admin/user/add",info:"/admin/user/info",edit:"/admin/user/edit",delete:"/admin/user/delete",clockList:"/admin/user/clock_list",updatePassword:"/admin/update_password",exportExcel:"/admin/user/export",updateUserStatus:"/admin/user/update_status",importExcel:"/admin/user/import"};function o(t){return Object(n["b"])({url:i.list,method:"get",params:t})}function r(t){return Object(n["b"])({url:i.add,method:"post",data:t})}function s(t){return Object(n["b"])({url:i.info,method:"get",params:t})}function l(t){return Object(n["b"])({url:i.edit,method:"post",data:t})}function c(t){return Object(n["b"])({url:i.delete,method:"post",data:t})}function u(t){return Object(n["b"])({url:i.clockList,method:"get",params:t})}function d(t){return Object(n["b"])({url:i.updatePassword,method:"post",data:t})}function p(t){return Object(n["b"])({url:i.exportExcel,method:"get",params:t,responseType:"blob"})}function f(t){return Object(n["b"])({url:i.updateUserStatus,method:"post",data:t})}function b(t){return Object(n["b"])({url:i.importExcel,method:"post",data:t,headers:{"Content-type":"multipart/form-data"}})}},d3f8:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=this,a=e.$createElement,n=e._self._c||a;return n("page-header-wrapper",[n("a-card",{attrs:{bordered:!1}},[n("div",{staticClass:"table-page-search-wrapper"},[n("a-form",{attrs:{layout:"inline"}},[n("a-row",{attrs:{gutter:48}},[e._l(e.filter.columns,(function(t,a){return n("a-col",{key:a,attrs:{md:6}},[n("a-form-item",{attrs:{label:t.label}},["input"===t.type?n("a-input",{attrs:{placeholder:"请输入"+t.label},model:{value:e.filter.data[t.prop],callback:function(a){e.$set(e.filter.data,t.prop,a)},expression:"filter.data[item.prop]"}}):e._e(),"select"===t.type?n("a-select",{attrs:{placeholder:"请选择"+t.label},model:{value:e.filter.data[t.prop],callback:function(a){e.$set(e.filter.data,t.prop,a)},expression:"filter.data[item.prop]"}},e._l(t.option,(function(t,a){return n("a-select-option",{key:a,attrs:{value:t.value}},[e._v(" "+e._s(t.label)+" ")])})),1):e._e()],1)],1)})),n("a-col",{attrs:{md:24}},[n("span",{staticClass:"table-page-search-submitButtons",style:{float:"right",overflow:"hidden"}},[n("a-button",{attrs:{type:"primary"},on:{click:e.onSearch}},[e._v("查询")]),n("a-button",{staticStyle:{"margin-left":"8px"},attrs:{type:"primary"},on:{click:e.onExport}},[e._v(" 导出 ")]),n("a-button",{staticStyle:{"margin-left":"8px"},on:{click:e.onResetSearch}},[e._v("重置")])],1)])],2)],1)],1),n("div",{staticClass:"table-operator"},[n("a-button",{attrs:{type:"primary",icon:"plus"},on:{click:function(){t.$router.push({name:"userAdd"})}}},[e._v("新增")]),n("a-upload",{attrs:{"show-upload-list":!1,customRequest:e.onUpload}},[n("a-button",{attrs:{type:"primary",icon:e.uploadLoading?"loading":"upload"}},[e._v("导入")])],1)],1),n("a-table",{attrs:{dataSource:e.tableData.list,loading:e.tableData.loading,columns:e.tableData.column,pagination:e.tableData.pagination,rowKey:function(t,e){return e}},on:{change:e.onChange},scopedSlots:e._u([{key:"img",fn:function(t,a){return[a.img?n("img",{attrs:{src:e.domain+a.img,width:"100px"}}):n("div",[e._v(e._s(a.ic_card))])]}},{key:"belong",fn:function(t,a){return[n("span",[e._v(e._s(1===a.belong?"小中坝":"大中坝"))])]}},{key:"status",fn:function(t,a){return[n("a-select",{attrs:{value:a.status.toString()},on:{change:function(t){return e.handleChange(t,a)}}},[n("a-select-option",{attrs:{value:"1"}},[e._v("上岛")]),n("a-select-option",{attrs:{value:"0"}},[e._v("离岛")]),n("a-select-option",{attrs:{value:"-1"}},[e._v("未知")])],1)]}},{key:"action",fn:function(t,a){return[n("a-icon",{style:{color:"#1890ff"},attrs:{type:"carry-out"},on:{click:function(t){return e.onClockList(a)}}}),n("a-icon",{style:{color:"#1890ff"},attrs:{type:"edit"},on:{click:function(t){return e.onEdit(a)}}}),n("a-popconfirm",{attrs:{title:"确定要删除吗？","ok-text":"是","cancel-text":"否",visible:parseInt(a.id)===parseInt(e.visibleId)&&e.deleteVisible,"ok-button-props":e.okButtonProps},on:{confirm:function(t){return e.handleDelete(a)},cancel:e.onDeleteCancel}},[n("a-icon",{style:{color:"#1890ff"},attrs:{type:"delete"},on:{click:function(t){return e.onDelete(a)}}})],1)]}}])},[n("template",{slot:"title"},[e._v(" 总人数："+e._s(e.tableData.pagination.total)+" 人 ")])],2)],1)],1)},i=[],o=a("5530"),r=(a("b64b"),a("ac1f"),a("841c"),a("4de4"),a("b0c0"),a("d3b7"),a("3ca3"),a("ddb0"),a("2b3d"),a("c24f")),s={name:"List",data:function(){return{filter:{columns:[{prop:"pin",label:"编号",type:"input"},{prop:"name",label:"姓名",type:"input"},{prop:"cardId",label:"身份证号",type:"input"},{prop:"phone",label:"电话",type:"input"},{prop:"belong",label:"所属岛",type:"select",option:[{value:1,label:"小中坝"},{value:2,label:"大中坝"}]},{prop:"status",label:"上岛/离岛",type:"select",option:[{value:"1",label:"上岛"},{value:"0",label:"离岛"},{value:"-1",label:"未知"}]}],data:{}},tableData:{column:[{title:"姓名",dataIndex:"name"},{title:"图片",dataIndex:"img",scopedSlots:{customRender:"img"}},{title:"性别",dataIndex:"sex"},{title:"联系电话",dataIndex:"phone"},{title:"备用联系电话",dataIndex:"mobile"},{title:"所属岛",dataIndex:"belong",scopedSlots:{customRender:"belong"}},{title:"住址",dataIndex:"address"},{title:"上岛/离岛",dataIndex:"status",scopedSlots:{customRender:"status"}},{title:"操作",dataIndex:"action",class:"action",align:"right",scopedSlots:{customRender:"action"}}],list:[],pagination:{current:1,pageSize:10,total:0},loading:!1},deleteVisible:!1,visibleId:"",okButtonProps:{props:{loading:!1}},domain:"http://36.133.203.166:8081",uploadLoading:!1,search:!1}},mounted:function(){this.getList()},methods:{getQueryParameter:function(){var t=this.$route.query;Object.keys(t).length>0&&(this.search=!0,this.tableData.pagination={current:parseInt(t.current),pageSize:parseInt(t.pageSize),total:parseInt(t.total)},this.filter.data={pin:t.pin,name:t.name,cardId:t.cardId,phone:t.phone,belong:parseInt(t.belong),status:parseInt(t.status)})},getList:function(){var t=this;this.tableData.loading=!0;var e=this.filter.data;e.page=this.tableData.pagination.current,e.limit=this.tableData.pagination.pageSize,Object(r["f"])(e).then((function(e){t.tableData.list=e.data.list;var a=e.data.pagination;t.tableData.pagination={current:a.page,pageSize:a.limit,total:a.total},t.tableData.loading=!1;var n={};t.search&&(n=Object(o["a"])(Object(o["a"])({},t.filterData),t.tableData.pagination)),t.$router.push({name:"userList",query:n})}))},onEdit:function(t){this.$router.push({path:"/user/add",query:{id:t.id}})},onDelete:function(t){this.visibleId=t.id,this.deleteVisible=!0},onDeleteCancel:function(){this.deleteVisible=!1},handleDelete:function(t){var e=this;this.okButtonProps.props.loading=!0;var a={id:this.visibleId,pin:t.pin};Object(r["b"])(a).then((function(t){t.status?e.$notification.error({message:t.msg}):(e.submit=!1,e.$notification.success({message:"删除成功"}),e.deleteVisible=!1,e.okButtonProps.props.loading=!1,e.getList())}))},onClockList:function(t){this.$router.push({name:"ClockList",query:{pin:t.pin}})},onSearch:function(){this.tableData.pagination.current=1,this.getList()},onResetSearch:function(){this.tableData.pagination.current=1,this.filter.data={},this.getList()},onExport:function(){Object(r["d"])(this.filter.data).then((function(t){var e=new Blob([t],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),a=URL.createObjectURL(e),n=document.createElement("a");n.href=a,n.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window})),window.URL.revokeObjectURL(e)}))},onChange:function(t){this.tableData.pagination=t,this.getList()},handleChange:function(t,e){var a=this,n={pin:e.pin,status:t};Object(r["i"])(n).then((function(t){t.status?a.$notification.error({message:"校准失败"}):(a.$notification.success({message:"校准成功"}),a.getList())}))},onUpload:function(t){var e=this;this.uploadLoading=!0;var a=new FormData;a.append("file",t.file),Object(r["g"])(a).then((function(t){e.uploadLoading=!1,t.status?e.$notification.error({message:t.msg}):(e.$notification.success({message:"导入成功"}),e.getList())}))}}},l=s,c=(a("05c9"),a("2877")),u=Object(c["a"])(l,n,i,!1,null,"208f3f9e",null);e["default"]=u.exports}}]);