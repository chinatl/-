import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import {
    Message
} from 'element-ui'
import {
    getToken
} from '@/utils/auth' // 验权

const whiteList = ['/login']; // 不重定向白名单

import Store from './store';
import Post from '@/api/post';
var login = sessionStorage.getItem('islogin');
if (login + '' === 'null') {
    Store.state.islogin = false
} else {
    Store.state.islogin = true;

}
router.beforeEach((to, from, next) => {
    NProgress.start();
    if (to.path === '/login') {
        next()
    } else {
        if (Store.state.islogin) {
            Post({
                url: 'function/findFunctionByUser',
                success: res => {
                    Store.state.menu = res.data;
                    var flag = false;
                    for (var i = 0; i < res.data.length; i++) {
                        if (res.data[i].codeName === to.name && res.data[i].showOrHide) {
                            flag = true
                        }
                        for (var k = 0; k < res.data[i].lf.length; k++) {
                            if (res.data[i].lf[k].codeName === to.name && res.data[i].lf[k].showOrHide) {
                                flag = true
                            }
                        }
                    }
                    NProgress.done();
                    if (flag || to.fullPath === '/dashboard') {
                        next()
                    } else {
                        next('/login')
                    }

                },
                fail: res => {
                    next({
                        path: '/login',
                    })
                }
            })
        } else {
            next({
                path: '/login',
            })
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
})
