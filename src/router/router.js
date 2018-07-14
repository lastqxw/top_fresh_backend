import Main from '@/views/Main.vue';
// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () =>
        import ('@/views/login.vue')
};
export const preview = {
    path: '/preview',
    name: 'preview',
    component: () =>
        import ('@/views/form/article-publish/preview.vue')
};
export const locking = {
    path: '/locking',
    name: 'locking',
    component: () =>
        import ('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [{
            path: 'home',
            title: {
                i18n: 'home'
            },
            name: 'home_index',
            component: () =>
                import ('@/views/home/home.vue')
        },
        {
            path: 'ownspace',
            title: '个人中心',
            name: 'ownspace_index',
            component: () =>
                import ('@/views/own-space/own-space.vue')
        },
        {
            path: 'message',
            title: '消息中心',
            name: 'message_index',
            component: () =>
                import ('@/views/message/message.vue')
        },
        {
            path: 'product/:product_id',
            title: '商品详情',
            name: 'product-info',
            component: () =>
                import ('../views/products/products/component/product-detail.vue')
        },
        {
            path: 'user/users/:staffid',
            title: '用户详情',
            name: 'user-info',
            component: () =>
                import ('../views/user/userInfo/userInfo.vue')
        },
        {
            path: 'cardManagement/cardInfo',
            title: '录入卡券',
            name: 'card-info',
            component: () =>
                import ('../views/cardManagement/cardInfo/cardInfo.vue')
        },
        {
            path: 'market/:couponId',
            title: '优惠券详情',
            name: 'market-info',
            component: () =>
                import ('../views/marketing/marketingInfo/marketingInfo.vue')
        },
        {
            path: 'envelopes/:redEnvelopeId',
            title: '红包详情',
            name: 'envelope-info',
            component: () =>
                import ('../views/marketing/envelopesInfo/envelopeInfo.vue')
        },
        {
            path: 'activityHome/activityTeamwork/:activeId',
            title: '拼团详情及编辑',
            name: 'activityTeamwork',
            component: () =>
                import ('@/views/activity/activityTeamwork/activityTeamwork.vue')
        },
        {
            path: 'activityHome/activityCollection/:activeId',
            title: '集锦详情及编辑',
            name: 'activityCollection',
            component: () =>
                import ('@/views/activity/activityCollection/activityCollection.vue')
        },
        {
            path: 'activityHome/activityCoupon/:activeId',
            title: '优惠券详情及编辑',
            name: 'activityCoupon',
            component: () =>
                import ('@/views/activity/activityCoupon/activityCoupon.vue')
        },
        {
            path: 'activityHome/activityOuter/:activeId',
            title: '外链活动页详情及编辑',
            name: 'activityOuter',
            component: () =>
                import ('@/views/activity/activeOuter/activeOuter.vue')
        },
        {
            path: 'activityHome/activityStatic/:activeId',
            title: '静态活动页详情及编辑',
            name: 'activityStatic',
            component: () =>
                import ('@/views/activity/activeStatic/activeStatic.vue')
        },
        // ordermanagement
        {
            path: 'ordermanagement/:orderId',
            title: '订单详情',
            name: 'order-info',
            component: () =>
                import ('@/views/order/orderInfo/orderInfo.vue')
        },
        {
            path: 'product/:evaluateId',
            title: '评价信息',
            name: 'evaluate-info',
            component: () =>
                import ('../views/products/products/evaluate/evaluate.vue')
		},
		{
            path: 'headline/:topId',
            title: '头条信息',
            name: 'headline-info',
            component: () =>
                import ('../views/management/headline/headlineInfo/headlineInfo.vue')
        },
    ]
}

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [{
        path: '/products',
        icon: 'grid',
        name: 'products',
        title: '商品',
        component: Main,
        children: [{
                path: 'product',
                title: '商品管理',
                name: 'product',
                icon: 'grid',
                component: () =>
                    import ('@/views/products/products/products.vue')
            },
            // { path: 'workflow', title: '工作流', name: 'workflow', icon: 'arrow-swap', component: () => import('@/views/form/work-flow/work-flow.vue') }

        ]
    },
    {
        path: '/marketing',
        icon: 'grid',
        name: 'marketing',
        title: '营销设置',
        component: Main,
        children: [{
                path: 'market',
                title: '优惠券管理',
                name: 'market',
                icon: 'grid',
                component: () =>
                    import ('@/views/marketing/marketing.vue')
            },
            {
                path: 'envelopes',
                title: '红包设置',
                name: 'envelopes',
                icon: 'arrow-swap',
                component: () =>
                    import ('@/views/marketing/envelopes/envelopes.vue')
            },
            {
                path: 'grant',
                title: '红包发放途径设置',
                name: 'grant',
                icon: 'arrow-swap',
                component: () =>
                    import ('@/views/marketing/grant/grant.vue')
            },
            {
                path: 'score',
                title: '积分设置',
                name: 'score',
                icon: 'arrow-swap',
                component: () =>
                    import ('@/views/marketing/score/score.vue')
            }
        ]
    },
    {
        path: '/user',
        icon: 'grid',
        name: 'user',
        title: '用户管理',
        component: Main,
        children: [{
            path: 'users',
            title: '用户设置',
            name: 'users',
            icon: 'arrow-swap',
            component: () =>
                import ('@/views/user/user.vue')
        }, ]
    },
    {
        path: '/cardManagement',
        icon: 'grid',
        name: 'cardManagement',
        title: '卡券管理',
        component: Main,
        children: [{
            path: 'card',
            title: '卡券设置',
            name: 'card',
            icon: 'arrow-swap',
            component: () =>
                import ('@/views/cardManagement/cardManagement.vue')
        }, ]
    },
    {
        path: '/order',
        icon: 'android-checkbox',
        name: 'order',
        title: '订单管理',
        component: Main,
        children: [{
                path: 'ordermanagement',
                title: '订单管理',
                name: 'ordermanagement',
                icon: 'compose',
                component: () =>
                    import ('@/views/order/ordermanagement/ordermanagement.vue')
            },
            {
                path: 'orderawait',
                title: '待配送订单',
                name: 'orderawait',
                icon: 'compose',
                component: () =>
                    import ('@/views/order/orderawait/orderawait.vue')
            },
        ]
    },
    {
        path: '/app',
        icon: 'android-checkbox',
        name: 'app',
        title: 'APP首屏配置',
        component: Main,
        children: [{
                path: 'appBanner',
                title: 'BANNER管理',
                name: 'appBanner',
                icon: 'compose',
                component: () =>
                    import ('@/views/app/appBanner/appBanner.vue')
            },
            {
                path: 'appHomeOrder',
                title: '首页活动管理',
                name: 'appHomeOrder',
                icon: 'compose',
                component: () =>
                    import ('@/views/app/appHomeOrder/appHomeOrder.vue')
            },
            {
                path: 'appRecommendedProducts',
                title: '推荐商品管理',
                name: 'appRecommendedProducts',
                icon: 'compose',
                component: () =>
                    import ('@/views/app/appRecommendedProducts/appRecommendedProducts.vue')
            },
            {
                path: 'publicity',
                title: '宣传介绍',
                name: 'publicity',
                icon: 'compose',
                component: () =>
                    import ('@/views/app/publicity/publicity.vue')
            },
        ]
    },
    {
        path: '/activity',
        icon: 'android-checkbox',
        name: 'activity',
        title: '活动管理',
        component: Main,
        children: [{
            path: 'activityHome',
            title: '活动管理',
            name: 'activityHome',
            icon: 'compose',
            component: () =>
                import ('@/views/activity/activityHome/activityHome.vue')
        }]
    },
    {
        path: '/feedback',
        icon: 'grid',
        name: 'feedback',
        title: '用户反馈',
        component: Main,
        children: [{
            path: 'feedbacks',
            title: '用户反馈查看',
            name: 'feedbacks',
            icon: 'arrow-swap',
            component: () =>
                import ('@/views/feedback/feedback.vue')
        }, ]
	},
	{
        path: '/management',
        icon: 'android-checkbox',
        name: 'management',
        title: '官网管理',
        component: Main,
        children: [{
                path: 'headline',
                title: '官网头条管理',
                name: 'headline',
                icon: 'compose',
                component: () =>
                    import ('@/views/management/headline/headline.vue')
            },
            {
                path: 'leaving',
                title: '官网留言管理',
                name: 'leaving',
                icon: 'compose',
                component: () =>
                    import ('@/views/management/leaving/leaving.vue')
            }
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