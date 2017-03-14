// 剧本

define(['jquery', 'iscroll', 'bootstrap'], function ($, iscroll)
{
    var self = {}

    self.open = function () {
        // 初始化动作绑定
        // self.bindAction();

        // alert(11)


        self.initImg();

        //myScroll = new IScroll('#wrapper', { mouseWheel: true });

        setTimeout(function () {
            new iscroll('.index', { mouseWheel: true });
            new iscroll('.contact', { mouseWheel: true });
            alert('加载完成');

            $('.contact').hide();
        }, 2000)


        

        var link = $('#main-link a:gt(0)'),
            page = $('.content>div');

        link.each(function (i, item) {
            $(this).on('click', function () {
                page.hide();
                $(page[i]).show();

                $('#bs-example-navbar-collapse-1').removeClass('in');
            })
        })

        console.log(link)

        //alert(link.length)
    }

    self.initImg = function () {

        console.log(111);
        var color = ['f33', 'f3c', '93f', '36f', '3ff', '3f3', 'cf3', 'ff3', 'fc3', 'f93', 'f63'];

        $('.container-fluid .row img').each(function (i, item) {

            var c = color[parseInt(Math.random() * (color.length - 1))];
            $(this).attr('src', $(this).attr('src') + '/' + c);
        })
    }

    self.bindAction = function () {
        $('.box .header span').on('click', function () {
            $('.box').hide();
        })
    }

    
    return self;
    
});





















