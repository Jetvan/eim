(function(module) {
try {
  module = angular.module('SeanApp');
} catch (e) {
  module = angular.module('SeanApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tpl/footer.html',
    '<div class="page-footer-inner">2016 &copy; Doggie Cloud.</div><div class="scroll-to-top"><i class="icon-arrow-up"></i></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('SeanApp');
} catch (e) {
  module = angular.module('SeanApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tpl/header.html',
    '<div class="page-header-inner"><div class="page-top"><div class="page-logo patac-logo"><img src="./css/PATAC-logo.png"alt="logo"class="logo-default"> <span>EIM设备管理系统</span></div><div class="btn-group m-t-sm"ng-hide="!settings.layout.setDeviceButton"><button type="button"class="btn btn-circle btn-outline white dropdown-toggle"data-toggle="dropdown"><span class="hidden-sm hidden-xs"ng-bind="deviceName">设备选择&nbsp;</span>&nbsp; <i class="fa fa-angle-down"></i></button><ul class="dropdown-menu"role="menu"><li ng-repeat="menu in equipMenu"ng-click="setDevice(menu.equipType,menu.equipNo,menu.equipName)"><a href="#"><span ng-bind="menu.equipName"></span></a></li></ul></div><div class="btn-group m-t-sm no-btn-active"ng-hide="!settings.layout.setLabButton"><button type="button"class="btn btn-circle btn-outline white"><span ng-bind="labName">实验室选择&nbsp;</span>&nbsp;</button></div><div class="top-menu pull-right"><ul class="nav navbar-nav pull-right"><li class="dropdown"ng-if="isLogin"><a href="#/dashboard"class="dropdown-toggle font-white"><i class="icon-home font-white"></i> 主页</a></li><li class="dropdown"ng-if="isLogin"><span class="username username-hide-on-mobile font-white">欢迎您，<span ng-bind="realName">鲁翔宇</span></span></li><li class="dropdown"ng-if="!isLogin"><a class="username username-hide-on-mobile font-white dropdown-toggle"ng-click="logInOut(true)"><i class="fa fa-user font-white"></i>登录</a></li><li class="dropdown"><span href="#"class="font-white"><span ng-bind="time">2016年9月28日</span></span></li><li class="dropdown"ng-if="isLogin"><a ng-click="logInOut(false)"class="dropdown-toggle font-white"alt="登出"><i class="icon-logout font-white"></i> 退出</a></li></ul></div><a href="javascript:;"class="menu-toggler responsive-toggler"data-toggle="collapse"data-target=".navbar-collapse"></a></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('SeanApp');
} catch (e) {
  module = angular.module('SeanApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('tpl/sidebar.html',
    '<div class="page-sidebar-wrapper"><div class="page-sidebar navbar-collapse collapse"><ul class="page-sidebar-menu page-header-fixed"data-keep-expanded="false"data-auto-scroll="true"data-slide-speed="200"style="padding-top: 20px"><li class="nav-item"ng-repeat="item in menu"><a href="javascript:;"class="nav-link nav-toggle"><i class="fa {{item.resourceType}}"></i> <span class="title">{{item.resourceName}}</span> <span class="arrow"ng-if="item.child"></span></a><ul class="sub-menu"ng-if="item.child"><li class="nav-item"ng-repeat="i in item.child"><a href="{{i.url}}"target="_blank"class="nav-link nav-toggle"><span class="title">{{i.resourceName}}</span> <span class="arrow"ng-if="i.child"></span></a><ul class="sub-menu"ng-if="i.child"><li class="nav-item"ng-repeat="j in i.child"><a class="nav-link nav-toggle"><span class="title"ng-click="open(j.url,$event)">{{j.resourceName}}</span> <span class="arrow"ng-if="j.child"></span></a><ul class="sub-menu"ng-if="j.child"><li class="nav-item"ng-repeat="k in j.child"><a href="{{k.url}}"target="_blank"class="nav-link">{{k.resourceName}}</a></li></ul></li></ul></li></ul></li></ul></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('SeanApp');
} catch (e) {
  module = angular.module('SeanApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/admin-log.html',
    '<div class="page-bar patac-breadcrumb"><ul class="page-breadcrumb"><li><i class="icon-home font-white"></i> <span class="font-white">数据维护</span> <i class="fa fa-angle-right"></i></li><li><i class="font-white"></i> <a ui-sref="admin.user"class="font-white">报警日志阀值维护</a></li></ul></div><div class="row"><div class="col-md-12"><div class="portlet patac-portlet"><div class="portlet-title"><div class="caption"><span class="caption-subject bold uppercase">报警日志阀值维护</span></div></div><div class="portlet-body"><table class="table table-striped table-bordered table-checkable order-column"id="warning"><thead><tr><th>设备号</th><th>设备名称</th><th>通知邮箱</th><th>报警是否可用</th><th>操作</th></tr></thead><tbody><tr class="odd gradeX"ng-repeat="data in datas"on-repeat-finished><td ng-bind="data.eqptNo"></td><td ng-bind="data.eqptName"></td><td ng-bind="data.email"></td><td ng-bind="data.isEffective | userStatus"></td><td><button class="btn btn-outline white"action="edit"data-toggle="modal"data-id="{{data.eqptNo}}"href="#draggable"ng-click="upData($event)">修改</button></td></tr></tbody></table></div></div></div></div><div class="modal fade draggable-modal"id="draggable"tabindex="-1"role="basic"aria-hidden="true"data-backdrop="static"><div class="modal-dialog"><form class="form-row-seperated"method="post"name="userForm"ng-submit="save(userForm)"ng-validate="validationOptions"><div class="modal-content"><div class="modal-header"><button type="button"class="close"data-dismiss="modal"aria-hidden="true"></button><h4 class="modal-title text-center font-green-sharp bold uppercase"ng-bind="action">HPU出油口温度维护</h4></div><div class="modal-body"><div class="row"><div class="col-md-12"><div class="portlet"><div class="portlet-body"><div class="form-body"><div class="row"><div class="col-md-4"><div class="form-group form-md-line-input"><input type="text"class="form-control"name="eqptNo"id="eqptNo"placeholder="请输入设备编号"ng-model="temp.eqptNo"disabled="disabled"><label for="eqptNo">设备编号</label></div></div><div class="col-md-4"><div class="form-group form-md-line-input"><input type="text"class="form-control"name="eqptNo"id="eqptName"placeholder="请输入设备编号"ng-model="temp.eqptName"disabled="disabled"><label for="eqptNo">设备名称</label></div></div><div class="col-md-3"><div class="form-inline form-md-line-input"><label for="isEffective"><input type="checkbox"class="form-control"id="isEffective"name="email"placeholder="请输入下限值"ng-model="temp.isEffective"ng-true-value="1"ng-false-value="0"style="position: relative;top:-2px"> 是否有效</label></div></div></div><div class="form-group form-md-line-input"><textarea rows="4"class="form-control"id="email"name="email"rows="3"ng-model="temp.email"email></textarea><label for="email">通知邮箱</label><error-msg></error-msg></div></div></div></div></div></div></div><div class="modal-footer"><button type="button"class="btn dark btn-outline"data-dismiss="modal">关闭</button> <button type="submit"class="btn green">保存</button></div></div></form></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('SeanApp');
} catch (e) {
  module = angular.module('SeanApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/admin-resource.html',
    '<div class="page-bar patac-breadcrumb"><ul class="page-breadcrumb"><li><i class="icon-home font-white"></i> <span class="font-white">权限配置</span> <i class="fa fa-angle-right"></i></li><li><i class="font-white"></i> <a ui-sref="admin.resource"class="font-white">资源管理</a></li></ul></div><div class="row"><div class="col-md-12"><div class="portlet patac-portlet"><div class="portlet-title"><div class="caption"><span class="caption-subject bold uppercase">资源管理</span></div><button class="btn btn-outline white modal-header pull-right"ng-click="create()"><i class="fa fa-plus"></i>添加</button></div><div class="portlet-body"><table class="table table-striped table-bordered table-checkable order-column hide"id="resource"><thead><tr><th>资源名称</th><th>链接</th><th>资源描述</th><th>排序号</th><th>资源类型</th><th>修改人</th><th>操作</th></tr></thead><tbody><tr ng-repeat="data in datas"on-repeat-finished><td>{{data.resourceName}}</td><td ng-bind="data.url "></td><td ng-bind="data.resourceDesc"></td><td ng-bind="data.seq "></td><td><i class="fa {{data.resourceType}}"></i> {{data.resourceType}}</td><td ng-bind="data.modifyUser"></td><td><button class="btn btn-outline white"action="edit"data-id="{{data.id}}"data-toggle="modal"href="#draggable"ng-click="upData($event)">修改</button> <button class="btn btn-danger"action="delete"data-id="{{data.id}}"ng-click="delData(data.id)">删除</button></td></tr></tbody></table></div></div></div></div><div class="modal fade draggable-modal"id="draggable"tabindex="-1"role="basic"aria-hidden="true"data-backdrop="static"><div class="modal-dialog"><form class="form-row-seperated"method="post"name="userForm"ng-submit="save(userForm)"ng-validate="validationOptions"><div class="modal-content"><div class="modal-header"><button type="button"class="close"data-dismiss="modal"aria-hidden="true"></button><h4 class="modal-title text-center font-green-sharp bold uppercase"ng-bind="action">资源编辑</h4></div><div class="modal-body"><div class="row"><div class="col-md-12"><div class="portlet"><div class="portlet-body"><div class="form-body"><div class="row"><div class="col-md-4"><div class="form-group form-md-line-input"><input type="text"class="form-control"name="resourceName"id="resourceName"placeholder="请输入资源名"ng-model="data.resourceName"required><label for="resourceName">资源名</label></div></div><div class="col-md-4"><div class="form-group form-md-line-input"><input type="number"class="form-control"name="seq"id="seq"placeholder="请输入排序号"ng-model="data.seq"number><label for="seq">排序号</label></div></div><div class="col-md-4"><div class="form-group form-md-line-input"><input type="text"class="form-control"id="resourceType"name="resourceType"placeholder="请输入资源类型"ng-model="data.resourceType"><label for="resourceType">资源类型</label></div></div></div><div class="row"><div class="col-md-6"><div class="form-group form-md-line-input"><input type="text"class="form-control"name="url"id="url"placeholder="请输入链接地址"ng-model="data.url"><label for="url">链接地址</label></div></div><div class="col-md-6"><div class="form-group form-md-line-input"><input type="text"class="form-control"name="parentId"id="parentId"placeholder="请输入上级id"ng-model="data.parentId"><label for="parentId">上级id</label></div></div></div><div class="form-group form-md-line-input"><textarea rows="4"class="form-control"id="resourceDesc"name="resourceDesc"rows="3"ng-model="data.resourceDesc"placeholder="请输入资源描述"></textarea><label for="userDesc">资源描述</label></div></div></div></div></div></div></div><div class="modal-footer"><button type="button"class="btn dark btn-outline"data-dismiss="modal">关闭</button> <button type="submit"class="btn green">保存</button></div></div></form></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('SeanApp');
} catch (e) {
  module = angular.module('SeanApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/admin-role.html',
    '<div class="page-bar patac-breadcrumb"><ul class="page-breadcrumb"><li><i class="icon-home font-white"></i> <span class="font-white">权限配置</span> <i class="fa fa-angle-right"></i></li><li><i class="font-white"></i> <a ui-sref="admin.role"class="font-white">角色管理</a></li></ul></div><div class="row"><div class="col-md-12"><div class="portlet patac-portlet"><div class="portlet-title"><div class="caption"><span class="caption-subject bold uppercase">角色管理</span></div><button class="btn btn-outline white modal-header pull-right"ng-click="create()"><i class="fa fa-plus"></i>添加</button></div><div class="portlet-body"><table class="table table-striped table-bordered table-checkable order-column hide"id="role"><thead><tr><th><input type="checkbox"class="group-checkable"data-set="#role .checkboxes"></th><th>角色名</th><th>角色描述</th><th>修改人</th><th>操作</th></tr></thead><tbody><tr class="odd gradeX"ng-repeat="data in datas"on-repeat-finished><td><input type="checkbox"class="checkboxes"value="1"></td><td ng-bind="data.roleName"></td><td ng-bind="data.roleDesc"></td><td ng-bind="data.modifyUser"></td><td><button class="btn btn-outline white"action="edit"data-id="{{data.id}}"data-toggle="modal"href="#draggable"ng-click="upData($event)">修改</button> <button class="btn btn-danger"action="delete"data-id="{{data.id}}"ng-click="delData(data.id)">删除</button></td></tr></tbody></table></div></div></div></div><div class="modal fade draggable-modal"id="draggable"tabindex="-1"role="basic"aria-hidden="true"data-backdrop="static"><div class="modal-dialog"><form class="form-row-seperated"method="post"name="roleForm"ng-submit="save(roleForm)"ng-validate="validationOptions"><div class="modal-content"><div class="modal-header"><button type="button"class="close"data-dismiss="modal"aria-hidden="true"></button><h4 class="modal-title text-center font-green-sharp bold uppercase"ng-bind="action">角色编辑</h4></div><div class="modal-body"><div class="row"><div class="col-md-12"><div class="portlet"><div class="portlet-body"><div class="form-body"><div class="row"><div class="col-md-36 col-sm-6"><div class="form-group form-md-line-input"><input type="text"class="form-control"name="roleName"id="resourceName"placeholder="请输入角色名"ng-model="data.roleName"required><label for="roleName">角色名 <span class="required">*</span></label></div></div><div class="col-md-6 col-sm-6"><div class="form-group form-md-line-input"><input type="text"class="form-control"id="roleDesc"name="roleDesc"placeholder="请输入角色描述限"ng-model="data.roleDesc"><label for="roleDesc">角色描述</label></div></div></div><div class="row"><div class="col-md-12"><div class="portlet light"><div class="portlet-title"><div class="caption"><span class="caption-subject font-green-sharp bold uppercase">资源列表</span></div></div><div class="portlet-body"><div id="tree_2"class="tree-demo scroller"style="height: 290px"></div></div></div></div></div></div></div></div></div></div></div><div class="modal-footer"><button type="button"class="btn dark btn-outline"data-dismiss="modal">关闭</button> <button type="submit"class="btn green">保存</button></div></div></form></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('SeanApp');
} catch (e) {
  module = angular.module('SeanApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/admin-user.html',
    '<div class="page-bar patac-breadcrumb"><ul class="page-breadcrumb"><li><i class="icon-home font-white"></i> <span class="font-white">权限配置</span> <i class="fa fa-angle-right"></i></li><li><i class="font-white"></i> <a ui-sref="admin.user"class="font-white">用户管理</a></li></ul></div><div class="row"><div class="col-md-12"><div class="portlet patac-portlet"><div class="portlet-title"><div class="caption"><span class="caption-subject bold uppercase">用户管理</span></div><button class="btn btn-outline white modal-header pull-right"ng-click="create()"><i class="fa fa-plus"></i>添加</button></div><div class="portlet-body"><table class="table table-striped table-bordered table-checkable order-column hide"id="user"><thead><tr><th>用户名</th><th>中文名</th><th>英文名</th><th>员工号</th><th>电子邮箱</th><th>状态</th><th>操作</th></tr></thead><tbody><tr class="odd gradeX"ng-repeat="d in datas"on-repeat-finished><td ng-bind="d.userName"></td><td ng-bind="d.realName"></td><td ng-bind="d.enName"></td><td ng-bind="d.employeeId"></td><td ng-bind="d.email"></td><td ng-bind="d.status | userStatus"></td><td><button class="btn btn-outline white"action="edit"data-id="{{d.id}}"data-toggle="modal"href="#draggable"ng-click="upDataUser($event)">修改</button> <button class="btn btn-danger"action="delete"data-id="{{d.id}}"ng-click="delData(d.id)">删除</button></td></tr></tbody></table></div></div></div></div><div class="modal fade draggable-modal"id="draggable"tabindex="-1"role="basic"aria-hidden="true"data-backdrop="static"><div class="modal-dialog"><form class="form-row-seperated"method="post"name="userForm"ng-submit="save(userForm)"ng-validate="validationOptions"><div class="modal-content"><div class="modal-header"><button type="button"class="close"data-dismiss="modal"aria-hidden="true"></button><h4 class="modal-title text-center font-green-sharp bold uppercase"ng-bind="action">用户编辑</h4></div><div class="modal-body"><div class="row"><div class="col-md-12"><div class="portlet"><div class="portlet-body"><div class="form-body"><div class="row"><div class="col-md-4 col-sm-4"><div class="form-group form-md-line-input"><input type="text"class="form-control"name="userName"id="userName"placeholder="请输入用户名"ng-model="data.userName"required><label for="userName">用户名 <span class="required">*</span></label></div></div><div class="col-md-4 col-sm-4"><div class="form-group form-md-line-input"><input type="text"class="form-control"name="employeeId"id="employeeId"placeholder="请输入员工号"ng-model="data.employeeId"><label for="employeeId">员工号</label></div></div><div class="col-md-4 col-sm-4"><div class="form-group form-md-line-input"><input type="text"class="form-control"id="email"name="email"placeholder="请输入电子邮箱"ng-model="data.email"><label for="email">电子邮箱</label><error-msg></error-msg></div></div></div><div class="row"><div class="col-md-6 col-sm-6"><div class="form-group form-md-line-input"><input type="text"class="form-control"id="realName"name="realName"placeholder="请输入中文名"ng-model="data.realName"required><label for="realName">中文名 <span class="required">*</span></label></div></div><div class="col-md-6 col-sm-6"><div class="form-group form-md-line-input"><input type="text"class="form-control"id="enName"name="enName"placeholder="请输入英文名"ng-model="data.enName"><label for="enName">英文名</label></div></div></div></div><div class="row"><div class="col-md-12"><div class="form-group form-md-line-input"><label for="userDesc">角色列表</label><div id="tree_2"class="tree-demo scroller"style="height: 150px"></div></div></div></div></div></div></div></div></div><div class="modal-footer"><button type="button"class="btn dark btn-outline"data-dismiss="modal">关闭</button> <button type="submit"class="btn green">保存</button></div></div></form></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('SeanApp');
} catch (e) {
  module = angular.module('SeanApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/admin-warning.html',
    '<div class="page-bar patac-breadcrumb"><ul class="page-breadcrumb"><li><i class="icon-home font-white"></i> <span class="font-white">数据维护</span> <i class="fa fa-angle-right"></i></li><li><i class="font-white"></i> <a ui-sref="admin.user"class="font-white">HPU出油口温度维护</a></li></ul></div><div class="row"><div class="col-md-12"><div class="portlet patac-portlet"><div class="portlet-title"><div class="caption"><span class="caption-subject bold uppercase">HPU出油口温度维护</span></div></div><div class="portlet-body"><table class="table table-striped table-bordered order-column"id="warning"><thead><tr><th>设备编码</th><th>设备名称</th><th>上限值</th><th>下限值</th><th>通知邮箱</th><th>报警是否可用</th><th>操作</th></tr></thead><tbody><tr class="odd gradeX"ng-repeat="data in datas"on-repeat-finished><td ng-bind="data.eqptNo"></td><td ng-bind="data.eqptName"></td><td ng-bind="data.highAlarmVal"></td><td ng-bind="data.lowAlarmVal"></td><td ng-bind="data.email"></td><td ng-bind="data.isEffective | userStatus"></td><td><button class="btn btn-outline white"action="edit"data-toggle="modal"data-id="{{data.eqptNo}}"href="#draggable"ng-click="upData($event)">修改</button></td></tr></tbody></table></div></div></div></div><div class="modal fade draggable-modal"id="draggable"tabindex="-1"role="basic"aria-hidden="true"data-backdrop="static"><div class="modal-dialog"><form class="form-row-seperated"method="post"name="userForm"ng-submit="save(userForm)"ng-validate="validationOptions"><div class="modal-content"><div class="modal-header"><button type="button"class="close"data-dismiss="modal"aria-hidden="true"></button><h4 class="modal-title text-center font-green-sharp bold uppercase"ng-bind="action">HPU出油口温度维护</h4></div><div class="modal-body"><div class="row"><div class="col-md-12"><div class="portlet"><div class="portlet-body"><div class="form-body"><div class="row"><div class="col-md-3"><div class="form-group form-md-line-input"><input type="text"class="form-control"name="eqptNo"id="eqptNo"placeholder="请输入设备编号"ng-model="temp.eqptNo"disabled="disabled"><label for="eqptNo">设备编号</label></div></div><div class="col-md-3"><div class="form-group form-md-line-input"><input type="number"class="form-control"name="highAlarmVal"id="highAlarmVal"placeholder="请输入上限值"ng-model="temp.highAlarmVal"><label for="highAlarmVal">上限值</label></div></div><div class="col-md-3"><div class="form-group form-md-line-input"><input type="number"class="form-control"id="lowAlarmVal"name="lowAlarmVal"placeholder="请输入下限值"ng-model="temp.lowAlarmVal"number><label for="lowAlarmVal">下限值</label></div></div><div class="col-md-3"><div class="form-inline form-md-line-input"><label for="isEffective"><input type="checkbox"class="form-control"id="isEffective"name="email"placeholder="请输入下限值"ng-model="temp.isEffective"ng-true-value="1"ng-false-value="0"style="position: relative;top:-2px"> 是否有效</label></div></div></div><div class="form-group form-md-line-input"><textarea rows="4"class="form-control"id="email"name="email"rows="3"ng-model="temp.email"email></textarea><label for="email">通知邮箱</label><error-msg></error-msg></div></div></div></div></div></div></div><div class="modal-footer"><button type="button"class="btn dark btn-outline"data-dismiss="modal">关闭</button> <button type="submit"class="btn green">保存</button></div></div></form></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('SeanApp');
} catch (e) {
  module = angular.module('SeanApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/admin.html',
    '<ui-view>');
}]);
})();

(function(module) {
try {
  module = angular.module('SeanApp');
} catch (e) {
  module = angular.module('SeanApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/bep.html',
    '<style>.col-md-4 > .patac-portlet > .portlet-title {\n' +
    '        margin-bottom: 0px;\n' +
    '    }\n' +
    '    .col-md-4 .portlet > .portlet-title{\n' +
    '        min-height: 10px;\n' +
    '    }\n' +
    '    .col-md-4 .portlet > .portlet-title > .caption{\n' +
    '        padding: 5px 0;\n' +
    '    }\n' +
    '    .col-md-4 .table-condensed > thead > tr > th{\n' +
    '        padding: 0;\n' +
    '    }\n' +
    '    .col-md-4 .portlet.patac-portlet {\n' +
    '        padding: 12px 20px 12.1px;\n' +
    '    }\n' +
    '    table.dataTable tbody th, table.dataTable tbody td {\n' +
    '        padding: 4px 4px;\n' +
    '    }</style><div class="row"><div class="col-md-8"><div class="portlet patac-portlet"style="height:400px"><div class="portlet-title"><div class="caption"><span class="caption-subject font-white uppercase">设备视频/照片</span></div></div><div class="portlet-body"><div class="device-image"><img src="./image/{{deviceId}}.jpg"></div></div></div><div class="row"><div class="col-md-6"><div class="portlet patac-portlet"><div class="portlet-title"><div class="caption"><span class="caption-subject font-white uppercase">设备启停状态</span></div></div><div class="portlet-body"><div><span ng-style="statusColor"style="color:#a6e528;line-height:100px;display:block;margin:0 40px;font-size:24px;text-align:center;font-size:60px;font-weight:bold"ng-bind="statusText">运 行</span></div><div id="TimeStatus"style="height:188px"></div></div></div></div><div class="col-md-6"><div class="portlet patac-portlet"><div class="portlet-title"style="margin-bottom:0px"><div class="caption"><span class="caption-subject font-white uppercase">工况参数</span></div></div><div class="portlet-body"><table class="hpu-table"><thead><tr><th width="33%">Roll Speed</th><th width="33%">Fan Speed</th><th width="33%">Tractive Power</th></tr></thead><tbody><tr><td><div class="hpu-label"><span ng-bind="getIndexMomentBEP.rollSpeed | number:2">45</span> Km/H</div></td><td><div class="hpu-label"><span ng-bind="getIndexMomentBEP.windSpeed | number:2">45</span> Km/H</div></td><td><div class="hpu-label"><span ng-bind="getIndexMomentBEP.tractiveEffort | number:2">45</span> N</div></td></tr></tbody></table><div style="position: absolute;top:138px;left:26px;color: #fff;font-size: 16px"><span>Tractive Power</span></div><div id="bar1"style="height:226px"></div></div></div></div></div></div><div class="col-md-4"><div class="portlet patac-portlet"style="padding: 7px 20px 2px"><div class="portlet-title"><div class="caption"><span class="caption-subject font-white uppercase">试验参数</span></div></div><div class="portlet-body"><table class="hpu-table table-condensed"><thead><tr><th width="50%">VIN</th><th width="50%">描述</th></tr></thead><tbody><tr><td><div class="hpu-label"><span ng-bind="getIndexMomentBEP.vin"></span></div></td><td><div class="hpu-label"><span ng-bind="getIndexMomentBEP.desc"></span></div></td></tr></tbody></table><table class="hpu-table table-condensed"><thead><tr><th width="50%">Grade</th><th width="50%">ETW Class</th></tr></thead><tbody><tr><td><div class="hpu-label"><span ng-bind="getIndexMomentBEP.grade | number:2"></span>%</div></td><td><div class="hpu-label"><span ng-bind="getIndexMomentBEP.vehicleWeight | number:2"></span>kg</div></td></tr></tbody></table></div></div><div class="portlet patac-portlet"style="padding: 6px 20px 1px"><div class="portlet-title"><div class="caption"><span class="caption-subject uppercase font-white">Roadload Coefficicents</span></div></div><div class="portlet-body"><div class="dtable-scrollable"><table class="table table-bordered patac-table table-condensed"><thead><tr><th></th><th>A<br>(N)</th><th>B<br>(N/(km/h))</th><th>C<br>(N/(km/h)^2)</th></tr></thead><tbody><tr class="odd gradeX"><td>Target</td><td>{{getIndexMomentBEP.targetA | number:2}}</td><td>{{getIndexMomentBEP.targetB | number:2}}</td><td>{{getIndexMomentBEP.targetC | number:2}}</td></tr><tr class="odd gradeX"><td>Dyno Set</td><td>{{getIndexMomentBEP.targetA - getIndexMomentBEP.coefA | number:2}}</td><td>{{getIndexMomentBEP.targetB - getIndexMomentBEP.coefB | number:2}}</td><td>{{getIndexMomentBEP.targetC - getIndexMomentBEP.coefC | number:2}}</td></tr><tr class="odd gradeX"><td>Vehicle Loss</td><td>{{getIndexMomentBEP.coefA | number:2}}</td><td>{{getIndexMomentBEP.coefB | number:2}}</td><td>{{getIndexMomentBEP.coefC | number:2}}</td></tr></tbody></table></div></div></div><div class="portlet patac-portlet"style="height: 365px"><div class="portlet-title"><div class="caption"><span class="caption-subject uppercase font-white">报警信息</span></div></div><div class="portlet-body"><table class="table table-bordered table-hover order-column"id="warningBEP"style="background: rgba(255,255,255,0);color:#fff"><thead><tr><th>时间</th><th>信息</th></tr></thead><tbody><tr ng-repeat="warning in getWarnningBEP"on-repeat-finished><td ng-bind="warning.time | date:\'MM-dd HH:mm:ss:sss\' "></td><td>{{warning.text}}</td></tr></tbody></table></div></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('SeanApp');
} catch (e) {
  module = angular.module('SeanApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/dashboard.html',
    '<div id="3d_view"style="width:100%;height:700px"></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('SeanApp');
} catch (e) {
  module = angular.module('SeanApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/hpu.html',
    '<style>.col-md-4>.patac-portlet > .portlet-title {\n' +
    '        margin-bottom: 0;\n' +
    '    }\n' +
    '    .portlet-body>.row{\n' +
    '        position: relative;\n' +
    '        top:-20px;\n' +
    '    }\n' +
    '    #bar4,#bar3{\n' +
    '        top:-42px;\n' +
    '    }</style><div class="row"><div class="col-md-8"><div class="portlet patac-portlet"style="height:400px"><div class="portlet-title"><div class="caption"><span class="caption-subject font-white uppercase">设备视频/照片</span></div></div><div class="portlet-body"><div class="device-image"><img src="./image/HPU.png"></div></div></div><div class="row"><div class="col-md-6 col-sm-6"><div class="portlet patac-portlet"style="height:400px"><div class="portlet-title"><div class="caption"><span class="caption-subject font-white uppercase">设备启停状态</span></div></div><div class="portlet-body"><div><span style="color:#31A82C;line-height:100px;display:block;margin:0 40px;font-size:24px;text-align:center;font-size:60px;font-weight:bold">运 行</span></div><div id="TimeStatus"style="height:200px"></div></div></div></div><div class="col-md-6 col-sm-6"><div class="portlet patac-portlet"style="height:190px"><div class="portlet-title"><div class="caption"><span class="caption-subject font-white uppercase">清洁度</span></div></div><div class="portlet-body"><table class="hpu-table"><thead><tr><th width="25%"></th><th width="25%">4U</th><th width="25%">6U</th><th width="25%">14U</th></tr></thead><tbody><tr><td>ISO</td><td><div class="hpu-label"><span class=""ng-bind="getIndexMomentHPU.iso4U | number:0">0</span></div></td><td><div class="hpu-label"><span ng-bind="getIndexMomentHPU.iso6U | number:0">0</span></div></td><td><div class="hpu-label"><span ng-bind="getIndexMomentHPU.iso14U | number:0">0</span></div></td></tr><tr><td>NAS</td><td colspan="3"><div class="hpu-label"style="width:100%"><span ng-bind="getIndexMomentHPU.nas | number:0">0</span></div></td></tr></tbody></table><div id="bar1"style="height:200px;display:none"></div></div></div><div class="portlet patac-portlet"style="height:190px"><div class="portlet-title"><div class="caption"><span class="caption-subject font-white uppercase">环境</span></div></div><div class="portlet-body"><table class="hpu-table"border="0"><thead><tr><th width="25%">环境温度</th><th width="25%">水压</th><th width="25%">油液压力</th><th width="25%">水饱和度</th></tr></thead><tbody><tr><td><div class="hpu-label"><span><span ng-bind="getIndexMomentHPU.t_Env | number:0">0</span>℃</span></div></td><td><div class="hpu-label"><span><span ng-bind="getIndexMomentHPU.waterPressure | number:0|waterPressureFilter">0</span></span></div></td><td><div class="hpu-label"><span><span ng-bind="getIndexMomentHPU.oilPressure | number:0"></span>psi</span></div></td><td><div class="hpu-label"><span><span ng-bind="getIndexMomentHPU.saturation | number:0">0</span>%</span></div></td></tr></tbody></table><div id="bar1"style="height:150px;display:none"></div></div></div></div></div></div><div class="col-md-4"><div class="portlet patac-portlet"style="height: 400px"><div class="portlet-title"><div class="caption"><span class="caption-subject font-white uppercase">冷却水温度</span></div></div><div class="portlet-body"><div class="row"><div class="col-lg-6 col-md-6 col-sm-6"><div id="waterIn"style="height:180px"></div></div><div class="col-lg-6 col-md-6 col-sm-6"><div id="waterOut"style="height:180px"></div></div></div><div id="bar3"style="height:200px"></div></div></div><div class="portlet patac-portlet"style="height: 400px"><div class="portlet-title"><div class="caption"><span class="caption-subject font-white uppercase">液压油温度</span></div></div><div class="portlet-body"><div class="row"><div class="col-lg-6 col-md-6 col-sm-6"><div id="oilIn"style="height:180px"></div></div><div class="col-lg-6 col-md-6 col-sm-6"><div id="oilOut"style="height:180px"></div></div></div><div id="bar4"style="height:200px"></div></div></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('SeanApp');
} catch (e) {
  module = angular.module('SeanApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/lab.html',
    '<style type="text/css">body {overflow:auto!important;}</style><div class="row num-row"><div class="num-col"><div class="num-div num-div-green"><span class="icon-control-play"></span> <span class="num"ng-bind="status[1]">0</span></div></div><div class="num-col"><div class="num-div num-div-blue"><span class="icon-control-pause"></span> <span class="num"ng-bind="status[4]">0</span></div></div><div class="num-col"><div class="num-div num-div-gray"><i class="fa fa-history"></i> <span class="num"ng-bind="status[3]">0</span></div></div><div class="num-col"><div class="num-div num-div-yellow"><i class="fa fa-square-o"></i> <span class="num"ng-bind="status[0]">0</span></div></div><div class="num-col"><div class="num-div num-div-red"><i class="fa fa-exclamation-triangle"></i> <span class="num"ng-bind="status[2]">0</span></div></div></div><div class="row chart-row"><div class="col-md-9"><div class="chart-wrapper chart-wrapper-m"id="chartWrapper"><div class="chart-meta"><h3>1.6</h3><p>实验效能指数</p><div class="progress"><div class="progress-bar"role="progressbar"data-val="45.45"></div></div><p><span class="left">同比</span> <span class="right"><i class="fa fa-long-arrow-up"></i> <span class="chart-num">45.45</span>%</span></p></div><div class="chart-div"id="efficiencyCoeffDiv"></div></div></div><div class="col-md-3"><div class="chart-wrapper chart-wrapper-m"style="padding:0"><div class="carousel slide"data-ride="carousel"id="carousel3D"><div class="carousel-inner"role="listbox"><div ng-class="{true:\'hidden\', false:\'item active\'}[doubleLabel]"><div class="portlet patac-portlet"style="height:220px"><div class="portlet-title"><div class="caption"><span class="caption-subject font-white uppercase"ng-bind="areaName[0]">LAB车身试验区</span></div></div><div class="portlet-body"><div id="3d_view1"></div></div></div></div><div ng-class="{true:\'item active\', false:\'hidden\'}[doubleLabel]"><div class="portlet patac-portlet"style="height:220px"><div class="portlet-title"><div class="caption"><span class="caption-subject font-white uppercase"ng-bind="areaName[1]">LAB车身试验区</span></div></div><div class="portlet-body"><div id="3d_view2"></div></div></div></div></div></div></div></div></div><div class="row chart-row"><div class="col-md-3"><div class="chart-wrapper"><div class="chart-meta"><h3 class="h3-red">91</h3><p>重点设备完好率(%)</p><div class="progress"><div class="progress-bar progress-bar-red"role="progressbar"data-val="3.19"></div></div><p><span class="left">同比</span> <span class="right"><i class="fa fa-long-arrow-down"></i> <span class="chart-num">3.19</span>%</span></p></div><div class="chart-div"id="intactRateDiv"></div></div></div><div class="col-md-3"><div class="chart-wrapper"><div class="chart-meta"><h3>54</h3><p>耐久型设备利用率(%)</p><div class="progress"><div class="progress-bar"role="progressbar"data-val="50"></div></div><p><span class="left">同比</span> <span class="right"><i class="fa fa-long-arrow-up"></i> <span class="chart-num">50</span>%</span></p></div><div class="chart-div"id="utilizRateDiv"></div></div></div><div class="col-md-3"><div class="chart-wrapper"><div class="chart-meta"><h3 class="h3-red">244</h3><p>非耐久型设备利用率(%)</p><div class="progress"><div class="progress-bar progress-bar-red"role="progressbar"data-val="13.48"></div></div><p><span class="left">同比</span> <span class="right"><i class="fa fa-long-arrow-down"></i> <span class="chart-num">13.48</span>%</span></p></div><div class="chart-div"id="durautilizRateDiv"></div></div></div><div class="col-md-3"><div class="chart-wrapper"><div class="chart-meta"><h3 class="h3-red">48</h3><p>在线设备开动率(%)</p><div class="progress"><div class="progress-bar progress-bar-red"role="progressbar"data-val="4"></div></div><p><span class="left">同比</span> <span class="right"><i class="fa fa-long-arrow-down"></i> <span class="chart-num">4</span>%</span></p></div><div class="chart-div"id="startRateDiv"></div></div></div></div><script type="text/javascript">$(function() {\n' +
    '		//模拟报表数据\n' +
    '		var hash = window.location.hash;\n' +
    '		if(hash=="#/lab/LAB02") {\n' +
    '			var dataObj = {\n' +
    '				efficiencyCoeff: [2.0, 3.1, 1.4, 2.3, 2.7, 3.1, 2.0, 1.6], //实验效能系数\n' +
    '				intactRate: [93, 93, 92, 92, 92, 91, 91, 91], //重点设备完好率\n' +
    '				utilizRate: [43, 45, 46, 48, 49, 51, 52, 54], //耐久型设备利用率\n' +
    '				durautilizRate: [266, 263, 260, 257, 254, 250, 247, 244], //非耐久型设备利用率\n' +
    '				startRate: [51, 48, 50, 51, 48, 50, 51, 48] //在线设备开动率\n' +
    '			};\n' +
    '			//初始化进度条\n' +
    '			$(".progress-bar").each(function() {\n' +
    '				var w = $(this).data("val") + "%";\n' +
    '				$(this).animate({\n' +
    '					width: w\n' +
    '				}, 800);\n' +
    '			});\n' +
    '		}else {\n' +
    '			var dataObj = {\n' +
    '				efficiencyCoeff: [2.0, 3.1, 1.4, 2.3, 2.7, 3.1, 2.0, 1.6], //实验效能系数\n' +
    '				intactRate: [93, 93, 92, 92, 92, 91, 91, 91], //重点设备完好率\n' +
    '				utilizRate: [0, 0, 0, 0, 0, 0, 0, 0], //耐久型设备利用率\n' +
    '				durautilizRate: [256, 214, 212, 256, 215, 257, 245, 233], //非耐久型设备利用率\n' +
    '				startRate: [42, 53, 51, 42, 53, 51, 42, 53] //在线设备开动率\n' +
    '			};\n' +
    '			//初始化进度条\n' +
    '			var numArr = [1.6, 91, 0, 233, 53];\n' +
    '			$(".chart-meta h3").each(function(i) {\n' +
    '				$(this).html(numArr[i]);\n' +
    '			});\n' +
    '			var perArr = [45.45, 3.19, 0, 15.58, 3.92];\n' +
    '			$(".progress-bar").each(function(i) {\n' +
    '				var w = perArr[i] + "%";\n' +
    '				$(this).animate({\n' +
    '					width: w\n' +
    '				}, 800);\n' +
    '			});\n' +
    '			$(".chart-num").each(function(i) {\n' +
    '				$(this).html(perArr[i]);\n' +
    '			});\n' +
    '		}\n' +
    '		\n' +
    '		//初始化报表\n' +
    '		var efficiencyCoeffChart = echarts.init(document.getElementById("efficiencyCoeffDiv")); //实验效能系数\n' +
    '		var intactRateChart = echarts.init(document.getElementById("intactRateDiv")); //重点设备完好率\n' +
    '		var utilizRateChart = echarts.init(document.getElementById("utilizRateDiv")); //耐久型设备利用率\n' +
    '		var durautilizRateChart = echarts.init(document.getElementById("durautilizRateDiv")); //非耐久型设备利用率\n' +
    '		var startRateChart = echarts.init(document.getElementById("startRateDiv")); //在线设备开动率\n' +
    '\n' +
    '		//报表配置项\n' +
    '		var optBar = {\n' +
    '			title: {show:false},\n' +
    '            grid: {\n' +
    '            	top: 0,\n' +
    '            	left: 0,\n' +
    '            	right: 0,\n' +
    '            	bottom: 0\n' +
    '            },\n' +
    '            tooltip: {\n' +
    '	        	show: true,\n' +
    '	        	formatter: "{b0}: {c0}%",\n' +
    '	        	trigger: \'item\',\n' +
    '		        axisPointer : {\n' +
    '		            type : \'shadow\'\n' +
    '		        }\n' +
    '	        },\n' +
    '            xAxis: [{\n' +
    '            	show: false,\n' +
    '            	type: "category",\n' +
    '                data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],\n' +
    '                axisLabel: {interval:0}\n' +
    '            }],\n' +
    '            yAxis: [{\n' +
    '            	show: false,\n' +
    '            	type: "value"\n' +
    '            }],\n' +
    '            series: [{\n' +
    '            	name: "",\n' +
    '                type: "bar",\n' +
    '                markLine: {\n' +
    '                	data: [{\n' +
    '                		name: "平均值",\n' +
    '                		type: "average"\n' +
    '                	}],\n' +
    '                	lineStyle: {\n' +
    '                		normal: {color:"#5c9bd1"}\n' +
    '                	}\n' +
    '                }\n' +
    '            }],\n' +
    '            color: ["#2b475d"]\n' +
    '		};\n' +
    '		var optLine = {\n' +
    '			title: {show:false},\n' +
    '            grid: {\n' +
    '            	top: 0,\n' +
    '            	left: 0,\n' +
    '            	right: 0,\n' +
    '            	bottom: 0\n' +
    '            },\n' +
    '            tooltip: {\n' +
    '	        	show: true,\n' +
    '	        	formatter: "{b0}: {c0}",\n' +
    '	        	trigger: \'axis\',\n' +
    '		        axisPointer : {\n' +
    '		            type : \'shadow\'\n' +
    '		        }\n' +
    '	        },\n' +
    '            xAxis: [{\n' +
    '            	show: false,\n' +
    '            	type: "category",\n' +
    '                data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],\n' +
    '                axisLabel: {interval:0}\n' +
    '            }],\n' +
    '            yAxis: [{\n' +
    '            	show: false,\n' +
    '            	type: "value"\n' +
    '            }],\n' +
    '            series: [{\n' +
    '            	name: "",\n' +
    '                type: "line",\n' +
    '                areaStyle: {normal: {}},\n' +
    '                markLine: {\n' +
    '                	data: [{\n' +
    '                		name: "平均值",\n' +
    '                		type: "average"\n' +
    '                	}],\n' +
    '                	lineStyle: {\n' +
    '                		normal: {color:"#ffc000"}\n' +
    '                	}\n' +
    '                }\n' +
    '            }],\n' +
    '            color: ["#ffbb00"]\n' +
    '		};\n' +
    '		\n' +
    '		//配置报表\n' +
    '		optLine.series[0].data = dataObj.efficiencyCoeff;\n' +
    '		efficiencyCoeffChart.setOption(optLine);\n' +
    '		optBar.series[0].data = dataObj.intactRate;\n' +
    '		intactRateChart.setOption(optBar);\n' +
    '		optBar.series[0].data = dataObj.utilizRate;\n' +
    '		utilizRateChart.setOption(optBar);\n' +
    '		optBar.series[0].data = dataObj.durautilizRate;\n' +
    '		durautilizRateChart.setOption(optBar);\n' +
    '		optBar.series[0].data = dataObj.startRate;\n' +
    '		startRateChart.setOption(optBar);\n' +
    '\n' +
    '		//点击切换\n' +
    '//		$(".chart-wrapper").on("click", function() {\n' +
    '//			if(!$(this).hasClass("chart-wrapper-m")) {\n' +
    '//				var chartId = $(this).find(".chart-div").attr("id");\n' +
    '//				console.log(chartId);\n' +
    '//				switch(chartId) {\n' +
    '//					case "efficiencyCoeff": \n' +
    '//						efficiencyCoeff.dispose();\n' +
    '//						break;\n' +
    '//					case "intactRate":\n' +
    '//						intactRateChart.dispose();\n' +
    '//						intactRateChart = echarts.init(document.getElementById("intactRate"));\n' +
    '//						optLine.series[0].data = dataObj.intactRate;\n' +
    '//						intactRateChart.setOption(optLine);\n' +
    '//						break;\n' +
    '//					case "utilizRate":\n' +
    '//						utilizRate.dispose();\n' +
    '//						break;\n' +
    '//					case "durautilizRate":\n' +
    '//						durautilizRate.dispose();\n' +
    '//						break;\n' +
    '//					case "startRate": \n' +
    '//						startRate.dispose();\n' +
    '//						break;\n' +
    '//					default: \n' +
    '//						break;\n' +
    '//				};\n' +
    '//				\n' +
    '//				var html1 = $(this).html();\n' +
    '//				$("#chartWrapper").empty().html(html1);\n' +
    '//				$(this).empty();\n' +
    '//			}\n' +
    '//		});\n' +
    '	});\n' +
    '	\n' +
    '	//浏览器窗口改变时，重置报表大小\n' +
    '	$(window).resize(function() {\n' +
    '		efficiencyCoeffChart.resize();\n' +
    '		intactRateChart.resize();\n' +
    '		utilizRateChart.resize();\n' +
    '		durautilizRateChart.resize();\n' +
    '		startRateChart.resize();\n' +
    '	});</script>');
}]);
})();

(function(module) {
try {
  module = angular.module('SeanApp');
} catch (e) {
  module = angular.module('SeanApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/mts.html',
    '<style>table.dataTable tbody th, table.dataTable tbody td {\n' +
    '        padding:2px 2px;\n' +
    '    }\n' +
    '    .table-scrollable tbody>tr>td {\n' +
    '        white-space: nowrap!important;\n' +
    '    }</style><div class="row"><div class="col-md-8"><div class="portlet patac-portlet"style="height:400px"><div class="portlet-title"><div class="caption"><span class="caption-subject font-white uppercase">设备视频/照片</span></div></div><div class="portlet-body"><div class="device-image"><img src="./image/{{deviceId}}.png"></div></div></div><div class="row"><div class="col-md-6"><div class="portlet patac-portlet"style="height:400px"><div class="portlet-title"><div class="caption"><span class="caption-subject font-white uppercase">设备启停状态</span></div></div><div class="portlet-body"><div><span ng-style="statusColor"style="color:#a6e528;line-height:100px;display:block;margin:0 40px;font-size:24px;text-align:center;font-size:60px;font-weight:bold"ng-bind="statusText">运 行</span></div><div id="TimeStatus"style="height:200px"></div></div></div></div><div class="col-md-6"><div class="portlet patac-portlet"style="height:400px"><div class="portlet-title"><div class="caption"><span class="caption-subject font-white uppercase">作动缸温度</span></div><div class="actions"><div class="btn-group"style="z-index: 1000"><a id="hoverBtn"class="btn btn-sm white btn-outline btn-circle"href="javascript:;"data-toggle="dropdown"data-hover="dropdown"data-close-others="true">通道 <i class="fa fa-angle-down"></i></a><div class="dropdown-menu hold-on-click dropdown-checkboxes pull-right"style="overflow-y: auto;max-height: 340px"id="CHList"><label ng-repeat="ch in chList"><input type="checkbox"data-id="{{ch}}"> CH{{ch}}</label></div></div></div></div><div class="portlet-body"><div id="bar2"style="height:240px;top:-48px"></div><div style="height:130px;max-width:420px;position: relative;top:-70px;left:-9px"><dl class="patac-temp"style="width: 110%"><dd ng-repeat="ch in chShowList"><span>CH{{ch.channelCode}}</span> <span class="temp"ng-class="{true:\'red\',false:\'\'}[ch.alarm==1]">{{ch.temp}}<span style="font-size:14px">°C</span></span><br></dd></dl></div></div></div></div></div></div><div class="col-md-4"><div class="portlet patac-portlet"style="min-height:400px"><div class="portlet-title"><div class="caption"><span class="caption-subject font-white uppercase">Station日志</span></div><div class="btn-group btn-group-circle pull-right"><button ng-click="getWarnning(\'Station\',\'warning\')"class="btn btn-sm white active">报警</button> <button ng-click="getWarnning(\'Station\',\'normal\')"class="btn btn-sm white">其他</button></div></div><div class="portlet-body"><table class="table table-striped table-bordered order-column m-t-lg hide"id="station"><thead><tr><th>Time</th><th>Log</th></tr></thead><tbody><tr class="odd gradeX"ng-repeat="data in station"on-repeat-finished><td ng-bind="data.time | date:\'yyyy-MM-dd hh:mm:ss:sss\' "></td><td ng-bind="data.msg">shuxer</td></tr></tbody></table></div></div><div class="portlet patac-portlet"style="min-height:400px"><div class="portlet-title"><div class="caption"><span class="caption-subject font-white uppercase">日志</span></div><div class="btn-group btn-group-circle pull-right"style="margin-left: 5px"><button class="btn btn-sm white active"href="javascript:;"ng-click="showWarnningData(\'RPC\')">RPC</button> <button class="btn btn-sm white"href="javascript:;"ng-click="showWarnningData(\'MPT\',\'warning\')">MPT</button></div><div class="btn-group btn-group-circle pull-right"ng-show="MPT.show==1"><button ng-click="showWarnningData(\'MPT\',\'warning\')"class="btn btn-sm white active"ng-class="{true :\'active\', false :\'\'}[mptWarning.show==1]">报警</button> <button ng-click="showWarnningData(\'MPT\',\'normal\')"class="btn btn-sm white"ng-class="{true :\'active\', false :\'\'}[mptNormal.show==1]">其他</button></div></div><div class="portlet-body"ng-show="RPC.show==1"><table class="table table-striped table-bordered order-column m-t-lg hide"id="rpc"><thead><tr><th>Time</th><th>Sequence</th><th>Channel</th><th>CurrentValue</th><th>LimitValue</th></tr></thead><tbody><tr class="odd gradeX"ng-repeat="data in RPC.data"on-repeat-finished2><td ng-bind="data.time | date:\'yyyy-MM-dd hh:mm:ss:sss\'"></td><td ng-bind="data.sequence"style="white-space:normal">shuxer</td><td ng-bind="data.channel">shuxer</td><td ng-bind="data.currentValue | number:2">shuxer</td><td ng-bind="data.limitValue | number:2">shuxer</td></tr></tbody></table></div><div class="portlet-body"ng-show="mptWarning.show==1"><table class="table table-striped table-bordered order-column m-t-lg"id="mpt-warning"><thead><tr><th>Time</th><th>EquipNo</th><th>Level</th><th>Log</th></tr></thead><tbody><tr class="odd gradeX"ng-repeat="data in mptWarning.data"on-repeat-finished3><td ng-bind="data.time | date:\'yyyy-MM-dd hh:mm:ss:sss\'"></td><td ng-bind="data.equipNo"style="white-space:normal">shuxer</td><td ng-bind="data.level">shuxer</td><td ng-bind="data.msg">shuxer</td></tr></tbody></table></div><div class="portlet-body"ng-show="mptNormal.show==1"><table class="table table-striped table-bordered order-column m-t-lg"id="mpt-normal"><thead><tr><th>Time</th><th>EquipNo</th><th>Level</th><th>Log</th></tr></thead><tbody><tr class="odd gradeX"ng-repeat="data in mptNormal.data"on-repeat-finished4><td ng-bind="data.time | date:\'yyyy-MM-dd hh:mm:ss:sss\'"></td><td ng-bind="data.equipNo"style="white-space:normal">shuxer</td><td ng-bind="data.level">shuxer</td><td ng-bind="data.msg">shuxer</td></tr></tbody></table></div></div></div></div>');
}]);
})();
