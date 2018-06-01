import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};


export const preview = {
    path: '/preview',
    name: 'preview',
    component: () => import('@/views/form/article-publish/preview.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/home/home.vue') },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
		{ path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') },
		{ path: 'product/:product_id', title: '商品详情', name: 'product-info', component: () => import('../views/products/products/component/product-detail.vue') },
		{ path: 'user/:product_id', title: '用户详情', name: 'user-info', component: () => import('../views/user/userInfo/userInfo.vue') },
		{ path: 'cardManagement/cardInfo', title: '录入卡券', name: 'card-info', component: () => import('../views/cardManagement/cardInfo/cardInfo.vue') },
	

    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/access',
        icon: 'key',
        name: 'access',
        title: '权限管理',
        component: Main,
        children: [
            { path: 'index', title: '权限管理', name: 'access_index', component: () => import('@/views/access/access.vue') }
        ]
    },
    {
        path: '/access-test',
        icon: 'lock-combination',
        title: '权限测试页',
        name: 'accesstest',
        access: 0,
        component: Main,
        children: [
            { path: 'index', title: '权限测试页', name: 'accesstest_index', access: 0, component: () => import('@/views/access/access-test.vue') }
        ]
    },
    {
        path: '/international',
        icon: 'earth',
        title: {i18n: 'international'},
        name: 'international',
        component: Main,
        children: [
            { path: 'index', title: {i18n: 'international'}, name: 'international_index', component: () => import('@/views/international/international.vue') }
        ]
    },
    {
        path: '/component',
        icon: 'social-buffer',
        name: 'component',
        title: '组件',
        component: Main,
        children: [
            {
                path: 'text-editor',
                icon: 'compose',
                name: 'text-editor',
                title: '富文本编辑器',
                component: () => import('@/views/my-components/text-editor/text-editor.vue')
            },
            {
                path: 'md-editor',
                icon: 'pound',
                name: 'md-editor',
                title: 'Markdown编辑器',
                component: () => import('@/views/my-components/markdown-editor/markdown-editor.vue')
            },
            {
                path: 'image-editor',
                icon: 'crop',
                name: 'image-editor',
                title: '图片预览编辑',
                component: () => import('@/views/my-components/image-editor/image-editor.vue')
            },
            {
                path: 'draggable-list',
                icon: 'arrow-move',
                name: 'draggable-list',
                title: '可拖拽列表',
                component: () => import('@/views/my-components/draggable-list/draggable-list.vue')
            },
            {
                path: 'area-linkage',
                icon: 'ios-more',
                name: 'area-linkage',
                title: '城市级联',
                component: () => import('@/views/my-components/area-linkage/area-linkage.vue')
            },
            {
                path: 'file-upload',
                icon: 'android-upload',
                name: 'file-upload',
                title: '文件上传',
                component: () => import('@/views/my-components/file-upload/file-upload.vue')
            },
            {
                path: 'scroll-bar',
                icon: 'android-upload',
                name: 'scroll-bar',
                title: '滚动条',
                component: () => import('@/views/my-components/scroll-bar/scroll-bar-page.vue')
            },
            {
                path: 'count-to',
                icon: 'arrow-graph-up-right',
                name: 'count-to',
                title: '数字渐变',
                // component: () => import('@/views/my-components/count-to/count-to.vue')
                component: () => import('@/views/my-components/count-to/count-to.vue')
            },
            {
                path: 'split-pane-page',
                icon: 'ios-pause',
                name: 'split-pane-page',
                title: 'split-pane',
                component: () => import('@/views/my-components/split-pane/split-pane-page.vue')
            }
        ]
    },
    {
        path: '/form',
        icon: 'android-checkbox',
        name: 'form',
        title: '表单编辑',
        component: Main,
        children: [
            { path: 'artical-publish', title: '文章发布', name: 'artical-publish', icon: 'compose', component: () => import('@/views/form/article-publish/article-publish.vue') },
            { path: 'workflow', title: '工作流', name: 'workflow', icon: 'arrow-swap', component: () => import('@/views/form/work-flow/work-flow.vue') }

        ]
	},
	{
        path: '/products',
        icon: 'grid',
        name: 'products',
        title: '商品',
        component: Main,
        children: [
			{ path: 'product', title: '商品管理', name: 'product', icon: 'grid', component: () => import('@/views/products/products/products.vue') },
			// { path: 'workflow', title: '工作流', name: 'workflow', icon: 'arrow-swap', component: () => import('@/views/form/work-flow/work-flow.vue') }

        ]
    },
    {
        path: '/marketing',
        icon: 'grid',
        name: 'marketing',
        title: '营销设置',
        component: Main,
        children: [
			{ path: 'market', title: '营销管理', name: 'market', icon: 'grid', component: () => import('@/views/marketing/marketing.vue') },
            { path: 'envelopes', title: '红包设置', name: 'envelopes', icon: 'arrow-swap', component: () => import('@/views/marketing/envelopes/envelopes.vue') },
            { path: 'grant', title: '红包发放途径设置', name: 'grant', icon: 'arrow-swap', component: () => import('@/views/marketing/grant/grant.vue') }
        ]
    },
    {
        path: '/user',
        icon: 'grid',
        name: 'user',
        title: '用户管理',
        component: Main,
        children: [
			{ path: 'users', title: '用户设置', name: 'users', icon: 'arrow-swap', component: () => import('@/views/user/user.vue') },
        ]
    },
    {
        path: '/cardManagement',
        icon: 'grid',
        name: 'cardManagement',
        title: '卡券管理',
        component: Main,
        children: [
			{ path: 'card', title: '卡券设置', name: 'card', icon: 'arrow-swap', component: () => import('@/views/cardManagement/cardManagement.vue') },
        ]
    },
{
        path: '/order',
        icon: 'android-checkbox',
        name: 'order',
        title: '订单管理',
        component: Main,
        children: [
            { path: 'ordermanagement', title: '订单管理', name: 'ordermanagement', icon: 'compose', component: () => import('@/views/order/ordermanagement/ordermanagement.vue') },
            { path: 'orderawait', title: '待配送订单', name: 'orderawait', icon: 'compose', component: () => import('@/views/order/orderawait/orderawait.vue') },
        ]
	},
    {
        path: '/app',
        icon: 'android-checkbox',
        name: 'app',
        title: 'APP首屏配置',
        component: Main,
        children: [
            { path: 'appHome', title: 'APP首屏配置', name: 'appHome', icon: 'compose', component: () => import('@/views/app/appHome/appHome.vue') },
            { path: 'appBanner', title: 'BANNER管理', name: 'appBanner', icon: 'compose', component: () => import('@/views/app/appBanner/appBanner.vue') },
            { path: 'appHomeOrder', title: '首页活动管理', name: 'appHomeOrder', icon: 'compose', component: () => import('@/views/app/appHomeOrder/appHomeOrder.vue') },
            { path: 'appRecommendedProducts', title: '推荐商品管理', name: 'appRecommendedProducts', icon: 'compose', component: () => import('@/views/app/appRecommendedProducts/appRecommendedProducts.vue') },
        ]
    },
    {
        path: '/activity',
        icon: 'android-checkbox',
        name: 'activity',
        title: '活动管理',
        component: Main,
        children: [
            { path: 'activityHome', title: '活动管理', name: 'activityHome', icon: 'compose', component: () => import('@/views/activity/activityHome/activityHome.vue') },
            { path: 'activityTeamwork', title: '拼团详情及编辑', name: 'activityTeamwork', icon: 'compose', component: () => import('@/views/activity/activityTeamwork/activityTeamwork.vue') },
            { path: 'activityCollection', title: '集锦详情及编辑', name: 'activityCollection', icon: 'compose', component: () => import('@/views/activity/activityCollection/activityCollection.vue') },
            { path: 'activityCoupon', title: '优惠券详情及编辑', name: 'activityCoupon', icon: 'compose', component: () => import('@/views/activity/activityCoupon/activityCoupon.vue') },
        ]
    },
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
];
