// 剧本

define(['jquery'], function ($)
{
    var self = {}

    self.open = function () {
        // 初始化动作绑定
        self.bindAction();

        alert(11)
    }

    self.bindAction = function () {
        $('.box .header span').on('click', function () {
            $('.box').hide();
        })
    }

    
    return self;
    
});





















