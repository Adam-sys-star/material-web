import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
import Full from '@/containers/Full'
import Full2 from '@/containers/Full2'

import Buttons from '@/views/components/Buttons'

// Views - Pages
import Page404 from '@/views/errorPages/Page404'
import Page500 from '@/views/errorPages/Page500'


/* login */
const Login = _import('login/index');
Vue.use(Router);

export const constantRouterMap = [
    { path: '/login', component: Login, hidden: true },
    {path: '/pages',redirect: '/pages/p404', name: 'Pages',
          component: {
            render (c) { return c('router-view') }
              // Full,
          },
          children: [{path: '404',  name: 'Page404', component: _import('errorPages/Page404') },
                     {path: '500',name: 'Page500',component: _import('errorPages/Page404')},
                    ]
    }


]

export default new Router({
  mode: 'hash', 
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const asyncRouterMap = [

 {
    path: '/',
    redirect: '/dashboard',
    name: '首页',
    component: Full,
    hidden:false,
    children: [ 
     {path: '/dashboard',name: '首页',icon:'speedometer',component: _import('Dashboard')},
	 
	 // {path: '/itemsManage/itemTable',name: '商品维护',icon:'thumbsup',component: _import('itemsManage/itemTable')},
	 {path: '/itemsManage',name: '商品',redirect: '/itemsManage/itemTable',icon:'speedometer',meta: { role:["商品管理员"] },
	 		component: {render (c) { return c('router-view')} },
	 		children: [ {path: 'itemTable',name: '商品管理',icon:'speedometer',component: _import('itemsManage/itemTable') },
						{path: 'searchItems',name: '商品搜索',icon:'speedometer',component: _import('itemsManage/searchItems'),hidden:true},
						{path: 'maintainItem',name: '商品维护',icon:'speedometer',component: _import('itemsManage/maintainItem'),hidden:true},
	 		]
	 },
	 
	 {path: '/ordes',name: '订单管理', icon:'pie-graph',meta: { role:["订单管理员"] },
		component: {render (c) { return c('router-view') }},
		children: [ {path: 'order',name: '药品采购',icon:'stats-bars',component: _import('orders/order'), hidden:false, },
					{path: 'myorder',name: '订货单明细',icon:'arrow-graph-up-right',component: _import('orders/myOrder')}
				  ]
	  
	  },


	  {path: '/receives',name: '收货管理', icon:'pie-graph',meta: { role:["订单管理员"] },
	    component: {render (c) { return c('router-view') }},
	  		children: [ {path: 'receive',name: '收货列表',icon:'stats-bars',component: _import('receives/receive'), hidden:false, },
	  		            // {path: 'receiveDetail',name: '收货详情列表',icon:'arrow-graph-up-right',component: _import('receives/receiveDetail')}
	  		          ],
		},
	  
	  
	  {path: '/inRepoManage',name: '入库', icon:'arrow-graph-up-right',component:{render(c) {return c('router-view')}},meta:{role:["仓库管理员"]},
	  		children: [
	  			{path: 'selectInRepo',name: '入库管理',icon:'stats-bars',component: _import('inRepoManage/selectInRepo'), hidden:false, },
				{path: 'InRepositoryDetail',name: '入库维护',icon:'ios-analytics',component: _import('inRepoManage/InRepositoryDetail'), hidden:true, }
	  		]
	  },
	  {path: '/repoRemainManage',name: '库存', icon:'merge',component: {render (c) { return c('router-view') }},meta: { role:["仓库管理员"] },
		children: [
			{path: 'selectRemain',name: '库存管理',icon:'stats-bars',component: _import('repoRemainManage/selectRemain'), hidden:false, },
			{path: 'RemainDetail',name: '库存明细管理',icon:'ios-analytics',component: _import('repoRemainManage/RemainDetail'), hidden:true, },
		]
	  },
	  {path: '/employees',name: '员工信息',icon:'ios-list-outline',meta: { role:["超级管理员"] },component: _import('employees/Employees')},
	   {path: '/suppliers',name: '供应商信息',icon:'ios-list-outline',meta: { role:["超级管理员"] },component: _import('suppliers/supplier')},
      {path: '/tabledetail/:id',name: 'TableDetail', hidden:true, component: _import('TableDetail')},
      // {path: '/tinymce',name: 'Tinymce编辑器',icon:"android-document",component: _import('Tinymce')},
      {path: '/member',name: '会员管理',icon:"android-list",meta: { role:["超级管理员"] },
			component: {render (c) { return c('router-view') }},
			  children:[
				  {path: 'detail',name: '会员账号管理',icon:'ios-analytics',component: _import('member/MemberManage')},
				  {path: 'rule',name: '会员规则管理',icon:'ios-analytics',component: _import('member/MemberRule')}
			  ]
	  },
		{path: '/statistics',name: '统计查询',icon:"android-list",meta: { role:["超级管理员"] },
			component: {render (c) { return c('router-view') }},
			  children:[
				  // {path: 'Turnover',name: '会员账号管理',icon:'ios-analytics',component: _import('member/MemberManage')},
				  {path: 'Turnover',name: '营业额统计',icon:'ios-analytics',component: _import('statistics/Turnover')},
				  {path: 'Bestseller',name: '畅销榜',icon:'ios-analytics',component: _import('statistics/Bestseller')}]
		},
      {path: '/sale_list',name: '销售记录',icon:"android-list",meta: { role:["超级管理员"] },component: _import('goodsSale/SaleList')},
	  
	  
	  // {path: '/components',name: 'component组件',redirect: '/components/buttons',icon:'bookmark',
	  //    component: {render (c) { return c('router-view') }},
	  //    children: [ {path: 'buttons',name: 'Buttons按钮',icon:'social-youtube',component: _import('components/Buttons'), hidden:false, },
	  //                {path: 'hoverbuttons',name: '悬停特效按钮',icon:'wand',component: _import('components/HoverButtons')},
	  //                {path: 'alert',name: 'Alert警告提示',icon:'alert',component: _import('components/Alert')},
	  //                {path: 'card',name: 'Card卡片',icon:'ios-browsers-outline',component: _import('components/Card')},
	  //                {path: 'datepicker',name: 'DatePicker',icon:'ios-calendar-outline',component: _import('components/DatePicker')},
	  //                {path: 'form',name: 'Form表单',icon:'ios-list-outline',component: _import('components/Form')},
	  // 					// {path: 'employees',name: '员工信息',icon:'ios-list-outline',component: _import('components/Employees')},
	  // 				 {path: 'modal',name: 'Modal对话框',icon:'ios-chatbubble-outline',component: _import('components/Modal')},
	  //                {path: 'select',name: 'Select选择器',icon:'ios-arrow-down',component: _import('components/Select')},
	  //                {path: 'spin',name: 'Spin加载中',icon:'load-d ',component: _import('components/Spin')},
	  //                {path: 'steps',name: 'Steps步骤条',icon:'ios-checkmark-outline',component: _import('components/Steps')},
	  //                {path: 'timeline',name: 'Timeline时间轴',icon:'android-more-vertical',component: _import('components/Timeline')},
	  //                {path: 'transfer',name: 'Transfer穿梭框',icon:'ios-pause-outline',component: _import('components/Transfer')},
	  //                {path: 'timepicker',name: 'Timepicker',icon:'ios-clock-outline',component: _import('components/Timepicker')},
	  //                {path: 'upload',name: 'Upload上传',icon:'ios-cloud-upload-outline',component: _import('components/Upload')},
	  //              ]
	  //  },
	   //  {path: '/charts',name: 'echart图表', icon:'pie-graph',
	   //   component: {render (c) { return c('router-view') }},
	   //   children: [ {path: 'shopchart',name: '商场统计图表',icon:'stats-bars',component: _import('charts/ShopChart'), hidden:false, },
	   //               {path: 'radarchart',name: '雷达图',icon:'arrow-graph-up-right',component: _import('charts/RadarChart')},
	   //               {path: 'cakechart',name: '蛋糕销量图表',icon:'ios-analytics',component: _import('charts/CakeChart')},
				// 	 // {path: 'salechart',name: 'salechart ',icon:'ios-analytics',component: _import('charts/SaleChart')},
				// 	 // {path: 'DashChartLarge',name: 'DashChartLarge',icon:'ios-analytics',component: _import('charts/DashChartLarge')},
				// 	 // {path: 'DashChartVisitor',name: 'DashChartVisitor',icon:'ios-analytics',component: _import('charts/DashChartVisitor')},
				// 	 // {path: 'IntroChartCount',name: 'IntroChartCount',icon:'ios-analytics',component: _import('charts/IntroChartCount')},
				// 	 // {path: 'IntroChartPie',name: 'IntroChartPie',icon:'ios-analytics',component: _import('charts/IntroChartPie')},
				//    ]
	   // },
	   // {path: '/markdown',name: 'Markdown',icon:"android-list",component: _import('Markdown')},
	   // {path: '/introduction',name: '介绍',icon:'thumbsup',component: _import('Introduction')},
	   // {path: '/table', name: '表格综合实例',icon:'ios-paper',component: _import('Table'),meta: { role:["超级管理员"] }},
	   // {path: '/jsontree', name: 'JSON视图',icon:'merge',component: _import('JsonTree')},
    ]
  },
  //  {
  //   path: '/home1',
  //   redirect: '/home1/introduction',
  //   name: '首页2',
  //   component: Full2,
  //   hidden:false,
  //   children: [
  //    {path: '/home1/dashboard',name: 'Dashboard2',icon:'speedometer',component: _import('Dashboard2')},
  //    {path: '/home1/introduction',name: '介绍2',icon:'thumbsup',component: _import('Introduction')},
  //   ]
  // },
  


  {path: '*', redirect: '/pages/404', hidden: true },
  {path: '/cashier',name: '收银台',icon:"android-list",component: _import('Cashier')},
  {path: '/saleList',name: '销售列表',icon:"android-list",component: _import('goodsSale/SaleList')},
  {path: '/saleDetail',name: '销售明细',icon:"android-list",component: _import('goodsSale/SaleDetail')},
  // {path: '/member',name: '会员管理',icon:"android-list",component: _import('member/MemberManage')},
  {path: '/member_rule',name: '会员规则',icon:"android-list",component: _import('member/MemberRule')},
  {path: '/employeeDetail',name: '员工信息详情',icon:'ios-list-outline',component: _import('employees/EmployeeDetail')},
  {path: '/addEmployee',name: '添加员工',icon:'ios-list-outline',component: _import('employees/AddEmployee')},
  {path: '/receiveDetail',name: '收货详情列表',icon:'arrow-graph-up-right',component: _import('receives/receiveDetail')}
  
];
