// 剧本

define(['jquery', 'iscroll', 'bootstrap', 'createjs'], function ($, iscroll)
{
    var self = {}

    self.open = function () {
        // 初始化动作绑定
        self.bindAction();

        // 画布层
        self.canvas();

        self.scene.showWelcome();
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

                    var target = $('<div class="col-lg-2 col-md-3 col-sm-4 col-xs-6"><img class="img-responsive" src="https://dummyimage.com/500/' + c + '" /><div class="link"><img class="img-responsive" src="https://dummyimage.com/200/" /><a href="#">项目链接</a><div></div>')

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
            $('.' + name).show();
            $('.' + name).siblings().hide();
        }
    }

    // 画布切换
    self.canvas = function () {
        var colors = ['#d30b49', '#0077db', '#7d61d2', '#2abcef', '#f5c70e'],
            ctx = document.getElementById('canvas').getContext('2d'),
            deg = Math.PI / 180,
            w = $('body').width(), h = $('body').height();

        ctx.canvas.width = w;
        ctx.canvas.height = h;

        // 先填充一个颜色
        ctx.fillStyle = colors[0];
        ctx.sector(w / 2, h + 100, w + h, 170 * deg, 0 * deg).fill();

        
        ctx.fillStyle = colors[1];

        var target = { x: 359, count: 0 }

        createjs.Tween.get(target, { onChange: handleChange, loop: true })
            .wait(1200)
            .to({ x: 170, count: 1 }, 500)
            

            //.to({ x: 800 }, 1000)
            //.addEventListener("change", handleChange)
            .call(handleComplete);


        var num = 1;

        function handleComplete() {
            if (num > 4) { num = 0; }
            ctx.fillStyle = colors[num++];
            //console.log('完成')
        }


        function handleChange(event) {
            if (event) {
                ctx.sector(w / 2, h + 100, w + h, parseInt(target.x) * deg, 0 * deg).fill();
            }
        }
    }
    
    return self;
    
});





















