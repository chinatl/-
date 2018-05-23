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
    redirect: '/dashboard',
    name: '主页',
    hidden: true,
    children: [{
      path: '/dashboard',
      component: () => import('@/views/finance/statistics')
    }]
  },
    {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: '用户管理',
    meta: { title: '用户管理', icon: 'form' },
    children: [
      {
        path: 'list',
        name: '用户列表',
        component: () => import('@/views/user/list'),
        meta: { title: '用户列表', icon: 'table'}
      },
      {
        path: 'examine',
        name: '身份审核',
        component: () => import('@/views/user/examine'),
        meta: { title: '身份审核', icon: 'tree' }
      },   {
        path: 'log',
        name: '登录日志',
        component: () => import('@/views/user/log'),
        meta: { title: '登录日志', icon: 'tree' }
      },   {
        path: 'assets',
        name: '用户资产',
        component: () => import('@/views/user/assets'),
        meta: { title: '用户资产', icon: 'tree' }
      },   {
        path: 'address',
        name: '转入地址',
        component: () => import('@/views/user/address'),
        meta: { title: '转入地址', icon: 'tree' }
      },   {
        path: 'generate',
        name: '地址生成',
        component: () => import('@/views/user/generate'),
        meta: { title: '地址生成', icon: 'tree' }
      }, {
        path: 'vip',
        name: '会员管理',
        component: () => import('@/views/user/vip'),
        meta: { title: '会员管理', icon: 'tree' }
      }, {
        path: 'bill',
        name: '综合账单',
        component: () => import('@/views/user/bill'),
        meta: { title: '综合账单', icon: 'tree' }
      }, {
        path: 'review',
        name: '提现审核',
        component: () => import('@/views/user/review'),
        meta: { title: '提现审核', icon: 'tree' }
      },{
        path: 'rechangelog',
        name: '充值提现记录',
        component: () => import('@/views/user/rechangelog'),
        meta: { title: '充值提现记录', icon: 'tree' }
      },
    ]
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/list',
    name: '管理员管理',
    meta: { title: '管理员管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '管理员列表',
        component: () => import('@/views/admin/list'),
        meta: { title: '管理员列表', icon: 'table' }
      },
      {
        path: 'log',
        name: '管理员日志',
        component: () => import('@/views/admin/log'),
        meta: { title: '管理员日志', icon: 'form' }
      }
    ]
  }, {
    path: '/finance',
    component: Layout,
    redirect: '/finance/deduct',
    name: '财务管理',
    meta: { title: '财务管理', icon: 'example' },
    children: [
      {
        path: 'deduct',
        name: '万能冲',
        component: () => import('@/views/finance/deduct'),
        meta: { title: '万能冲', icon: 'table' }
      },
      {
        path: 'charge',
        name: '万能扣',
        component: () => import('@/views/finance/charge'),
        meta: { title: '万能扣', icon: 'form' }
      },
      {
        path: 'statistics',
        name: '财务统计',
        component: () => import('@/views/finance/statistics'),
        meta: { title: '财务统计', icon: 'form' }
      }
    ]
  }, {
    path: '/trade',
    component: Layout,
    redirect: '/trade/order',
    name: '交易管理',
    meta: { title: '交易管理', icon: 'example' },
    children: [
      {
        path: 'order',
        name: '交易订单',
        component: () => import('@/views/trade/order'),
        meta: { title: '交易订单', icon: 'table' }
      },
//      {
//        path: 'log',
//        name: '交易记录',
//        component: () => import('@/views/trade/log'),
//        meta: { title: '交易记录', icon: 'form' }
//      },
      {
        path: 'cancel',
        name: '自动撤单',
        component: () => import('@/views/trade/cancel'),
        meta: { title: '自动撤单', icon: 'form' }
      }
    ]
  }, {
    path: '/transaction',
    component: Layout,
    redirect: '/transaction/manager',
    name: '专业交易',
    meta: { title: '专业交易', icon: 'example' },
    children: [
      {
        path: 'manager',
        name: '币种管理',
        component: () => import('@/views/transaction/manager'),
        meta: { title: '币种管理', icon: 'table' }
      },
      {
        path: 'market',
        name: '交易市场',
        component: () => import('@/views/transaction/market'),
        meta: { title: '交易市场', icon: 'form' }
      },
      {
        path: 'partition',
        name: '市场分区',
        component: () => import('@/views/transaction/partition'),
        meta: { title: '市场分区', icon: 'form' }
      }
    ]
  },{
    path: '/tender',
    component: Layout,
    redirect: '/tender/config',
    name: '法币交易',
    meta: { title: '法币交易', icon: 'example' },
    children: [
//      {
//        path: 'config',
//        name: '交易配置',
//        component: () => import('@/views/tender/config'),
//        meta: { title: '交易配置', icon: 'table' }
//      },
      {
        path: 'handle',
        name: '交易处理',
        component: () => import('@/views/tender/handle'),
        meta: { title: '交易处理', icon: 'form' }
      },
      {
        path: 'list',
        name: '商家列表',
        component: () => import('@/views/tender/list'),
        meta: { title: '商家列表', icon: 'form' }
      },
//      {
//        path: 'approval',
//        name: '待审批',
//        component: () => import('@/views/tender/approval'),
//        meta: { title: '待审批', icon: 'form' }
//      }
    ]
  },{
    path: '/subscription',
    component: Layout,
    redirect: '/subscription/market',
    name: '认购管理',
    meta: { title: '认购管理', icon: 'example' },
    children: [
      {
        path: 'market',
        name: '认购市场',
        component: () => import('@/views/subscription/market'),
        meta: { title: '认购市场', icon: 'table' }
      },
      {
        path: 'config',
        name: '认购配置',
        component: () => import('@/views/subscription/config'),
        meta: { title: '认购配置', icon: 'form' }
      },
      {
        path: 'log',
        name: '认购记录',
        component: () => import('@/views/subscription/log'),
        meta: { title: '认购记录', icon: 'form' }
      },
      {
        path: 'theme',
        name: '认购主题',
        component: () => import('@/views/subscription/theme'),
        meta: { title: '认购主题', icon: 'form' }
      }
    ]
  },{
    path: '/give',
    component: Layout,
    redirect: '/give/time',
    name: '赠送管理',
    meta: { title: '赠送管理', icon: 'example' },
    children: [
      {
        path: 'time',
        name: '放行时间',
        component: () => import('@/views/give/time'),
        meta: { title: '放行时间', icon: 'table' }
      },
      {
        path: 'log',
        name: '赠送记录',
        component: () => import('@/views/give/log'),
        meta: { title: '赠送记录', icon: 'form' }
      },
//      {
//        path: 'statistics',
//        name: '赠送统计',
//        component: () => import('@/views/give/statistics'),
//        meta: { title: '赠送统计', icon: 'form' }
//      }
    ]
  },{
    path: '/rankings',
    component: Layout,
    redirect: '/rankings/matching',
    name: '交易排行榜',
    meta: { title: '交易排行榜', icon: 'example' },
    children: [
      {
        path: 'matching',
        name: '赠送匹配',
        component: () => import('@/views/rankings/matching'),
        meta: { title: '赠送匹配', icon: 'table' }
      },
      {
        path: 'theme',
        name: '主题',
        component: () => import('@/views/rankings/theme'),
        meta: { title: '主题', icon: 'form' }
      }
    ]
  },{
    path: '/set',
    component: Layout,
    redirect: '/set/service',
    name: '基本设置',
    meta: { title: '基本设置', icon: 'example' },
    children: [
      {
        path: 'service',
        name: '客服配置',
        component: () => import('@/views/set/service'),
        meta: { title: '客服配置', icon: 'table' }
      },
      {
        path: 'message',
        name: '短信配置',
        component: () => import('@/views/set/message'),
        meta: { title: '短信配置', icon: 'form' }
      },
      {
        path: 'register',
        name: '注册配置',
        component: () => import('@/views/set/register'),
        meta: { title: '注册配置', icon: 'form' }
      },
      {
        path: 'distribution',
        name: '分销说明',
        component: () => import('@/views/set/distribution'),
        meta: { title: '分销说明', icon: 'form' }
      },
//      {
//        path: 'rate',
//        name: '费率说明',
//        component: () => import('@/views/set/rate'),
//        meta: { title: '费率说明', icon: 'form' }
//      }
    ]
  },{
    path: '/jurisdiction',
    component: Layout,
    redirect: '/jurisdiction/manager',
    name: '权限管理',
    meta: { title: '权限管理', icon: 'example' },
    children: [
      {
        path: 'manager',
        name: '角色管理',
        component: () => import('@/views/jurisdiction/manager'),
        meta: { title: '角色管理', icon: 'table' }
      },
      {
        path: 'list',
        name: '权限列表',
        component: () => import('@/views/jurisdiction/list'),
        meta: { title: '权限列表', icon: 'form' }
      },
      {
        path: 'authorization',
        name: '用户授权',
        component: () => import('@/views/jurisdiction/authorization'),
        meta: { title: '用户授权', icon: 'form' }
      }
    ]
  },
/*    {
    path: '/system',
    component: Layout,
    redirect: '/system/backups',
    name: '系统工具',
    meta: { title: '系统工具', icon: 'example' },
    children: [
      {
        path: 'backups',
        name: '备份',
        component: () => import('@/views/system/backups'),
        meta: { title: '备份', icon: 'table' }
      },
      {
        path: 'reduction',
        name: '还原',
        component: () => import('@/views/system/reduction'),
        meta: { title: '还原', icon: 'form' }
      },
    ]
  },*/
    {
    path: '/notice',
    component: Layout,
    redirect: '/notice/config',
    name: '公告管理',
    meta: { title: '公告管理', icon: 'example' },
    children: [
//      {
//        path: 'config',
//        name: '内容配置',
//        component: () => import('@/views/notice/config'),
//        meta: { title: '内容配置', icon: 'table' }
//      }, 
    {
        path: 'history',
        name: '历史公告',
        component: () => import('@/views/notice/history'),
        meta: { title: '历史公告', icon: 'table' }
      },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
//   mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

