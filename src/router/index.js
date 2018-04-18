import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
	
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/system/index',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: '',
      component: () => import('@/views/system/index')
    }]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/index',
    name: 'system',
    meta: { title: '系统', icon: 'example' },
    children: [
      {
        path: 'index',
        name: '系统预览',
        component: () => import('@/views/system/index'),
        meta: { title: '系统预览', icon: 'table' }
      },
      {
        path: 'safe',
        name: '安全中心',
        component: () => import('@/views/system/safe'),
        meta: { title: '安全中心', icon: 'form' }
      }
    ]
  }, {
    path: '/set',
    component: Layout,
    redirect: '/set/table',
    name: 'set',
    meta: { title: '设置', icon: 'form' },
    children: [
      {
        path: 'index',
        name: '基本设置',
        component: () => import('@/views/set/index'),
        meta: { title: '基本设置', icon: 'table' }
      },
      {
        path: 'visit',
        name: '访问配置',
        component: () => import('@/views/set/visit'),
        meta: { title: '访问配置', icon: 'tree' }
      },   {
        path: 'service',
        name: '客服配置',
        component: () => import('@/views/set/service'),
        meta: { title: '客服配置', icon: 'tree' }
      },   {
        path: 'else',
        name: '其他配置',
        component: () => import('@/views/set/else'),
        meta: { title: '其他配置', icon: 'tree' }
      },   {
        path: 'message',
        name: '短信配置',
        component: () => import('@/views/set/message'),
        meta: { title: '短信配置', icon: 'tree' }
      },   {
        path: 'register',
        name: '注册配置',
        component: () => import('@/views/set/register'),
        meta: { title: '注册配置', icon: 'tree' }
      }, {
        path: 'page',
        name: '页面配置',
        component: () => import('@/views/set/page'),
        meta: { title: '页面配置', icon: 'tree' }
      },
    ]
  }, {
    path: '/content',
    component: Layout,
    redirect: '/content/index',
    name: 'content',
    meta: { title: '内容', icon: 'table' },
    children: [
     {
        path: 'index',
        name: '文章管理',
        component: () => import('@/views/content/index'),
        meta: { title: '文章管理', icon: 'table' }
      },
      {
        path: 'tree1',
        name: '文章类型',
        component: () => import('@/views/tree/index'),
        meta: { title: '文章类型', icon: 'tree' }
      },
      {
        path: 'tree2',
        name: '广告管理',
        component: () => import('@/views/tree/index'),
        meta: { title: '广告管理', icon: 'tree' }
      },
      {
        path: 'tree3',
        name: '友情链接',
        component: () => import('@/views/tree/index'),
        meta: { title: '友情链接', icon: 'tree' }
      },
      {
        path: 'tree4',
        name: '多语言',
        component: () => import('@/views/tree/index'),
        meta: { title: '多语言', icon: 'tree' }
      },
      {
        path: 'tree5',
        name: '多语言类型',
        component: () => import('@/views/tree/index'),
        meta: { title: '多语言类型', icon: 'tree' }
      },
      {
        path: 'tree6',
        name: '导航配置',
        component: () => import('@/views/tree/index'),
        meta: { title: '导航配置', icon: 'tree' }
      }
    ]
  },{
    path: '/usermanager',
    component: Layout,
    redirect: '/usermanager/user/index',
    name: 'users',
    meta: { title: '用户', icon: 'user' },
    children: [
      {
        path: '/usermanager/user',
        name: '用户管理',
        component: () => import('@/views/usermanager/user/index'),
        meta: { title: '用户管理', icon: 'table' },
		children:[
			{
			 	path: 'index',
				name: '用户管理',
				component: () => import('@/views/usermanager/user/manager'),
				meta: { title: '用户管理'},
			},	{
			 	path: 'valitade',
				name: '用户验证',
				component: () => import('@/views/usermanager/user/manager'),
				meta: { title: '用户验证'},
			},
			{
				path: 'log',
				name: '操作日志',
				component: () => import('@/views/usermanager/user/log'),
				meta: { title: '操作日志'},
			},{
				path: 'wallet',
				name: '用户钱包',
				component: () => import('@/views/usermanager/user/wallet'),
				meta: { title: '用户钱包'},
			},{
				path: 'address',
				name: '提现地址',
				component: () => import('@/views/usermanager/user/address'),
				meta: { title: '提现地址'},
			},{
				path: 'property',
				name: '用户财产',
				component: () => import('@/views/usermanager/user/property'),
				meta: { title: '用户财产'},
			},{
				path: 'change',
				name: '转入地址',
				component: () => import('@/views/usermanager/user/change'),
				meta: { title: '转入地址'},
			},{
        path: 'create',
        name: '地址生成',
        component: () => import('@/views/usermanager/user/create'),
        meta: { title: '地址生成'},
      }
		]
      }, 
      {
        path: '/usermanager/admin',
        name: '管理员管理',
        component: () => import('@/views/usermanager/admin/index'),
        meta: { title: '管理员管理', icon: 'table' },
		children:[
			{
			 	path: 'index',
				name: '管理员管理',
				component: () => import('@/views/usermanager/admin/manager'),
				meta: { title: '管理员管理'},
			},
			{
				path: 'log',
				name: '管理员日志',
				component: () => import('@/views/usermanager/admin/log'),
				meta: { title: '管理员日志'},
			},{
				path: 'list',
				name: '权限列表',
				component: () => import('@/views/usermanager/admin/list'),
				meta: { title: '权限列表'},
			}
		]
      }, {
        path: '/usermanager/action',
        name: '行为管理',
        component: () => import('@/views/usermanager/action/index'),
        meta: { title: '行为管理', icon: 'table' },
		children:[
			{
			 	path: 'index',
				name: '行为管理',
				component: () => import('@/views/usermanager/action/index'),
				meta: { title: '行为管理'},
			},
			{
				path: 'log',
				name: '行为日志',
				component: () => import('@/views/usermanager/action/log'),
				meta: { title: '行为日志'},
			}
		]
      }, {
        path: 'vip',
        name: '会员管理',
        component: () => import('@/views/usermanager/vip/index'),
        meta: { title: '会员管理', icon: 'table' },
      }, 
    ]
  },{
    path: '/finance',
    component: Layout,
    redirect: '/finance/user/index',
    name: 'finance',
    meta: { title: '财务', icon: 'user' },
    children: [
      {
        path: '/finance/manager',
        name: '财务管理',
        component: () => import('@/views/finance/manager/index'),
        meta: { title: '财务管理', icon: 'table' },
		children:[
			{
			 	path: 'rechange',
				name: '万能充值',
				component: () => import('@/views/finance/manager/rechange'),
				meta: { title: '万能充值'},
			},
			{
				path: 'deduct',
				name: '万能扣钱',
				component: () => import('@/views/finance/manager/deduct'),
				meta: { title: '万能扣钱'},
			},{
				path: 'all',
				name: '财务统计',
				component: () => import('@/views/finance/manager/all'),
				meta: { title: '财务统计'},
			},{
				path: 'ranking',
				name: '资产排名',
				component: () => import('@/views/finance/manager/ranking'),
				meta: { title: '提现地址'},
			}
		]
      }, 
      {
        path: '/finance/withdraw',
        name: '充值提现',
        component: () => import('@/views/finance/withdraw/index'),
        meta: { title: '充值提现', icon: 'table' },
		children:[
			{
			 	path: 'rechange',
				name: '账户充值',
				component: () => import('@/views/finance/withdraw/rechange'),
				meta: { title: '账户充值'},
			},
			{
				path: 'method',
				name: '充值方式',
				component: () => import('@/views/finance/withdraw/method'),
				meta: { title: '充值方式'},
			},{
				path: 'config',
				name: '充值配置',
				component: () => import('@/views/finance/withdraw/config'),
				meta: { title: '充值配置'},
			},{
				path: 'turnout',
				name: '账户提现',
				component: () => import('@/views/finance/withdraw/turnout'),
				meta: { title: '账户提现'},
			},{
				path: 'configout',
				name: '提现配置',
				component: () => import('@/views/finance/withdraw/configout'),
				meta: { title: '提现配置'},
			}
		]
      }, {
        path: '/finance/fictitious',
        name: '虚拟币管理',
        component: () => import('@/views/finance/fictitious/index'),
        meta: { title: '虚拟币管理', icon: 'table' },
		children:[
			{
			 	path: 'turnin',
				name: '虚拟币转入',
				component: () => import('@/views/finance/fictitious/turnin'),
				meta: { title: '虚拟币转入'},
			},
			{
				path: 'turnout',
				name: '虚拟币转出',
				component: () => import('@/views/finance/fictitious/turnout'),
				meta: { title: '虚拟币转出'},
			}
		]
      }
    ]
  },{
    path: '/tools',
    component: Layout,
    redirect: '/tools/table',
    name: 'tools',
    meta: { title: '工具', icon: 'example' },
    children: [
      {
        path: 'table',
        name: '清理缓存',
        component: () => import('@/views/table/index'),
        meta: { title: '清理缓存', icon: 'table' }
      },
      {
        path: 'tree1',
        name: '列队检查',
        component: () => import('@/views/tree/index'),
        meta: { title: '列队检查', icon: 'tree' }
      },
      {
        path: 'tree12',
        name: '备份数据',
        component: () => import('@/views/tree/index'),
        meta: { title: '备份数据', icon: 'tree' }
      },
      {
        path: 'tree5',
        name: '还原数据',
        component: () => import('@/views/tree/index'),
        meta: { title: '还原数据', icon: 'tree' }
      },
      {
        path: 'tree4',
        name: '附件管理',
        component: () => import('@/views/tree/index'),
        meta: { title: '附件管理', icon: 'tree' }
      }
    ]
  },{
    path: '/market',
    component: Layout,
    redirect: '/market/trade/index',
    name: '市场',
    meta: { title: '市场', icon: 'tree' },
    children: [
      {
        path: '/market/trade',
        name: '交易管理',
        component: () => import('@/views/market/trade/index'),
        meta: { title: '交易管理', icon: 'table' },
		children:[
			{
			 	path: 'index',
				name: '交易订单',
				component: () => import('@/views/market/trade/manager'),
				meta: { title: '交易订单'},
			},
			{
				path: 'market',
				name: '交易市场',
				component: () => import('@/views/market/trade/market'),
				meta: { title: '交易市场'},
			},{
				path: 'zone',
				name: '市场分区',
				component: () => import('@/views/market/trade/zone'),
				meta: { title: '市场分区'},
			},{
				path: 'log',
				name: '市场记录',
				component: () => import('@/views/market/trade/log'),
				meta: { title: '市场记录'},
			},{
				path: 'cancel',
				name: '自动撤单',
				component: () => import('@/views/market/trade/cancel'),
				meta: { title: '自动撤单'},
			},{
				path: 'set',
				name: '交易设置',
				component: () => import('@/views/market/trade/set'),
				meta: { title: '交易设置'},
			}
		]
      }, 
       {
        path: 'count',
        name: '统计管理',
        component: () => import('@/views/market/count/index'),
        meta: { title: '成交统计', icon: 'table' },
      }, {
        path: 'test',
        name: '测试交易',
        component: () => import('@/views/market/test/index'),
        meta: { title: '测试交易', icon: 'table' },
      }, 
    ]
  },
  {
    path: '/extend',
    component: Layout,
    redirect: '/extend/subscribe/index',
    name: '拓展',
    meta: { title: '拓展', icon: 'tree' },
    children:[
      {
        path: '/extend/subscribe',
        name: '认购',
        component: () => import('@/views/extend/subscribe/index'),
        meta: { title: '认购管理', icon: 'table' },
        children: [
          {
            path: 'message',
            name: '认购管理',
            component: () => import('@/views/extend/subscribe/message'),
            meta: { title: '认购管理' },
          }, 
           {
            path: 'record',
            name: '认购纪录',
            component: () => import('@/views/extend/subscribe/record'),
            meta: { title: '认购纪录'},
          }, {
            path: 'market',
            name: '认购市场',
            component: () => import('@/views/extend/subscribe/market'),
            meta: { title: '认购市场'},
          }, {
            path: 'give',
            name: '认购赠送',
            component: () => import('@/views/extend/subscribe/give'),
            meta: { title: '认购赠送'},
          }, {
            path: 'title',
            name: '认购题目',
            component: () => import('@/views/extend/subscribe/title'),
            meta: { title: '认购题目'},
          }, 
        ],
         
      },
      {
        path: 'currency',
        name: '币种管理',
        component: () => import('@/views/extend/currency/index'),
        meta: { title: '币种管理', icon: 'table' },
  },
    ]
  },
  
//  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
//   mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

