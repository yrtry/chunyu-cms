// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        '@/assets/css/main.css',
        'element-plus/dist/index.css',
        'element-plus/theme-chalk/display.css'
    ],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "assets/scss/var.scss";',
                }
            }
        }
    },
    app: {
        head: {
            viewport: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no',
            title: '淳渔影视CMS-Nodejs快速搭建影视类网站'
        }
    },
    runtimeConfig: {
        baseUrl: process.env.BASE_URL || 'http://127.0.0.1:4000',
        public: {
            apiBase: process.env.BASE_URL || 'http://127.0.0.1:4000',
            globalTitle: '淳渔影视'
        }
    },
    nitro: {
        devProxy: {
            '/server': {
                target: process.env.BASE_URL || 'http://127.0.0.1:4000',
                changeOrigin: true
            },
            '/external': {
                target: 'http://cms.yinchunyu.com/external',
                changeOrigin: true
            }
        }
    },
    plugins: [ { src:'@/plugins/baidu',mode:'client' }],
})
