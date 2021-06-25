// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'

// const RouteView = {
//   name: 'RouteView',
//   render: h => h('router-view')
// }

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        path: '/dashboard/workplace',
        name: 'Workplace',
        component: () => import('@/views/dashboard/Workplace'),
        meta: { title: '首页', keepAlive: true, icon: 'home', permission: ['dashboard'] }
      },
      {
        path: '/user/list',
        name: 'userList',
        component: () => import('@/views/user/List'),
        meta: { title: '居民管理', keepAlive: true, icon: 'unordered-list', permission: ['dashboard'] }
      },
      {
        path: '/user/add',
        name: 'userAdd',
        hidden: true,
        component: () => import('@/views/user/Add'),
        meta: { title: '新增居民', keepAlive: true, permission: ['dashboard'] }
      },
      {
        path: '/clock_list',
        name: 'clockList',
        component: () => import('@/views/clock/List'),
        meta: { title: '乘船记录', keepAlive: true, icon: 'medicine-box', permission: ['dashboard'] }
      },
      {
        path: '/map',
        name: 'MapList',
        component: () => import('@/views/map/List'),
        meta: { title: '电子围栏', keepAlive: true, icon: 'heat-map', permission: ['dashboard'] }
      },
      {
        path: '/map/add',
        name: 'AddMap',
        hidden: true,
        component: () => import('@/views/map/Add'),
        meta: { title: '新增电子围栏', keepAlive: true, permission: ['dashboard'] }
      },
      {
        path: '/clock',
        name: 'ClockList',
        hidden: true,
        component: () => import('@/views/clock/ListForUser'),
        meta: { title: '乘船记录', keepAlive: true, permission: ['dashboard'] }
      },
      {
        path: '/device',
        name: 'DeviceList',
        component: () => import('@/views/device/List'),
        meta: { title: '设备管理', keepAlive: true, icon: 'medicine-box', permission: ['dashboard'] }
      },
      {
        path: '/device/add',
        name: 'DeviceAdd',
        hidden: true,
        component: () => import('@/views/device/Add'),
        meta: { title: '新增设备', keepAlive: true, permission: ['dashboard'] }
      },
      {
        path: '/account/center',
        name: 'UserCenter',
        hidden: true,
        component: () => import('@/views/user/Center'),
        meta: { title: '修改密码', keepAlive: true, permission: ['dashboard'] }
      },
      {
        path: '/admin/list',
        name: 'adminList',
        component: () => import('@/views/admin/List'),
        meta: { title: '管理员管理', keepAlive: true, icon: 'medicine-box', permission: ['dashboard'] }
      },
      {
        path: '/admin/add',
        name: 'addAdmin',
        hidden: true,
        component: () => import('@/views/admin/Add'),
        meta: { title: '新增管理员', keepAlive: true, permission: ['dashboard'] }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/404')
  }
]
