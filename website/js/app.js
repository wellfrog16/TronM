﻿require.config(
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
        'createjs': 'createjs-2015.11.26.min',  // 不支持amd且无法使用shim正确加载，目前仅仅加载并使用全局变量createjs
        //'weixin': '//res.wx.qq.com/open/js/jweixin-1.0.0',
        //'hammer': '//cdn.bootcss.com/hammer.js/2.0.8/hammer.min'
        //"jquery": "jquery-1.10.2",
        //"jqueryMobile": "jquery.mobile-1.4.5.min",

        'bootstrap': "//cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min"

    },

    //shim: {
    //    'swiper': ['jquery', 'css!swiper-3.4.0.min.css']
    //},
    waitSeconds: 15
});


require(["jquery", 'script'], function ($, script) {

    // 禁止拉动
    $("body").on("touchmove", function (e) {
        e.preventDefault();
    });

    //window.ontouchstart = function (e) { e.preventDefault(); };

    script.open();
});