require.config(
{
    baseUrl: "js/lib",
    map: {
            '*': {
                'css': 'css.min'
            }
    },

    paths: {
        //'swiper': 'swiper-3.4.0.jquery.min',
        'jquery': 'jquery-3.1.0.min',
        //'weixin': '//res.wx.qq.com/open/js/jweixin-1.0.0',
        //'hammer': '//cdn.bootcss.com/hammer.js/2.0.8/hammer.min'
        //"jquery": "jquery-1.10.2",
        //"jqueryMobile": "jquery.mobile-1.4.5.min"

    },

    //shim: {
    //    'swiper': ['jquery', 'css!swiper-3.4.0.min.css']
    //},
    waitSeconds: 15
});


require(["jquery", 'script'], function ($, script) {

    // 禁止拉动
    //$("body").on("touchmove", function (e) {
    //    e.preventDefault();
    //});

    //window.ontouchstart = function (e) { e.preventDefault(); };

    script.open();
});