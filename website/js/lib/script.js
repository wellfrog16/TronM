// 剧本

define(['jquery', 'iscroll', 'bootstrap', 'createjs'], function ($, iscroll)
{
    var self = {}

    self.open = function () {

        self.init();

        // 初始化动作绑定
        self.bindAction();

        // 画布层
        self.canvas();

        self.scene.showWelcome();
    }

    self.init = function () {

        if ($('body').width() <= 1024) {
            $('video').remove();
        }



    }

    // 动作绑定
    self.bindAction = function () {
        var link = $('#main-link a');

        link.each(function (i, item) {
            $(this).on('click', function () {
                switch (i) {
                    case 0: self.scene.showWelcome(); break;
                    case 1: self.scene.showProduct(); break;
                    case 2: self.scene.showContact(); break;
                }

                $('#bs-example-navbar-collapse-1').removeClass('in');
            })
        })

        $('.welcome .carousel .more').on('click', function () {

            $('.welcome .carousel').hide();
            $('.welcome .about').fadeIn();

        });

        $('.welcome .about .btn-contact').on('click', function () {
            self.scene.showContact();
        });

        $('.welcome .about .btn-product').on('click', function () {
            self.scene.showProduct();
        });

        //扇形
        CanvasRenderingContext2D.prototype.sector = function (x, y, radius, sDeg, eDeg) {
            // 初始保存
            this.save();
            // 位移到目标点
            this.translate(x, y);
            this.beginPath();
            // 画出圆弧
            this.arc(0, 0, radius, sDeg, eDeg);
            // 再次保存以备旋转
            this.save();
            // 旋转至起始角度
            this.rotate(eDeg);
            // 移动到终点，准备连接终点与圆心
            this.moveTo(radius, 0);
            // 连接到圆心
            this.lineTo(0, 0);
            // 还原
            this.restore();
            // 旋转至起点角度
            this.rotate(sDeg);
            // 从圆心连接到起点
            this.lineTo(radius, 0);
            this.closePath();
            // 还原到最初保存的状态
            this.restore();
            return this;
        }
    }


    self.scene = {

        showWelcome: function () {
            this.to('welcome');

            $('.welcome .carousel').show();
            $('.welcome .about').show();
        },

        flagProduct : false,
        showProduct: function () {

            this.to('index');

            // 初始化后再进入，切换即可退出
            if (this.flagProduct) { return; }

            var color = ['f33', 'f3c', '93f', '36f', '3ff', '3f3', 'cf3', 'ff3', 'fc3', 'f93', 'f63'];

            var _iscroll = new iscroll('.index', { mouseWheel: true }),
                box = $('.scene-main .index .row');

            for (var i = 0; i < 20; i++) {
                setTimeout(function () {
                    var c = color[parseInt(Math.random() * (color.length - 1))];

                    var target = $('<div class="col-sm-4 col-xs-6"><img class="img-responsive" src="https://dummyimage.com/500/' + c + '" /><div class="link"><img class="img-responsive" src="https://dummyimage.com/200/" /><a href="#">项目链接</a><div></div>')

                    box.append(target);

                    target.on('mouseenter', function () {
                        $('.link', target).animate({ 'top': '0' }, 200)
                    })

                    target.on('mouseleave', function () {
                        $('.link', target).animate({ 'top': '100%' }, 200)
                    })

                    _iscroll.refresh();
                }, i * 200);
            }

            this.flagProduct = true;
        },

        flagContact:false,
        showContact: function () {
            this.to('contact');

            // 初始化后再进入，切换即可退出
            if (this.flagContact) { return; }

            var _iscroll = new iscroll('.contact', { mouseWheel: true });
            this.flagContact = true;
        },

        to: function (name) {
            $('.' + name).fadeIn();
            $('.' + name).siblings().hide();
        }
    }

    // 画布切换
    self.canvas = function () {
        var colors = ['#d30b49', '#0077db', '#7d61d2', '#2abcef', '#f5c70e'],
            carousel = $('.carousel li'),
            ctx = document.getElementById('canvas').getContext('2d'),
            deg = Math.PI / 180,
            w = $('body').width(), h = $('body').height();

        ctx.canvas.width = w;
        ctx.canvas.height = h;

        $(window).resize(function () {
            w = $('body').width();
            h = $('body').height();

            ctx.canvas.width = w;
            ctx.canvas.height = h;

            ctx.fillStyle = colors[0]
            ctx.sector(w / 2, h + 100, w + h, 170 * deg, 0 * deg).fill();
            ctx.fillStyle = colors[1];
            num1 = 2
        });

        // 先填充一个颜色
        ctx.fillStyle = colors[0];
        ctx.sector(w / 2, h + 100, w + h, 170 * deg, 0 * deg).fill();

        // 显示第一个标语
        carousel.hide();
        carousel.eq(0).show();

        
        ctx.fillStyle = colors[1];

        var target = { x: 359, count: 0 }

        createjs.Tween.get(target, { onChange: handleChange, loop: true })
            .wait(3000)
            .to({ x: 170, count: 1 }, 500)
            

            //.to({ x: 800 }, 1000)
            //.addEventListener("change", handleChange)
            .call(handleComplete);


        var num1 = 2, num2 = 0;

        function handleComplete() {
            if (num1 > 4) { num1 = 0; }
            //if (num2++ >= carousel.length) { num2 = 0; }
            ctx.fillStyle = colors[num1++];

            num2++;
            
            //console.log('完成')

            console.log(num2)
        }

        //var xx = 0;

        function handleChange(event) {
            if (event) {
                ctx.sector(w / 2, h + 100, w + h, parseInt(target.x) * deg, 0 * deg).fill();

                if (target.x < 270) {
                    var o = carousel.eq(num2);
                    o.removeClass('in').addClass('out');
                    setTimeout(function () { o.hide(); }, 1000)
                }

                if (target.x < 359) {

                    if (num2 + 1 >= carousel.length) { num2 = -1;}

                    carousel.eq(num2+1).show().removeClass('out').addClass('in');
                }

                //console.log(target.x)
            }
        }
    }
    
    return self;
    
});





















