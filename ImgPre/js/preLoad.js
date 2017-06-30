
(function ($) {
    function PreLoad(imgs,options) {
        this.imgs=(typeof imgs === 'string')?[imgs]:imgs;//todo 判断输入的imgs是否为数组
        this.opts=$.extend({},PreLoad.Default,options);//todo 将默认的参数和输入的参数合并在一起。
        if(this.opts.order==='ordered'){
            this._ordered();
        }else{
            this._unordered();
        }
    }
    PreLoad.Default={//todo 定义默认的参数
        order:'unordered',
        each:null,//todo 一张加载完成后执行的函数。
        all:null// todo 所有图片加载完成执行的函数。
    };
    PreLoad.prototype._ordered=function () {
        let imgs=this.imgs,
            options=this.opts,
            count=0,
            len=imgs.length;
        load();
        function load() {
            let img=new Image();
            $(img).on('load error',function () {
                options.each && options.each(count);// todo 如果存在each 则调用
                if(count>=len){
                    options.all && options.all();
                }else{
                    load();
                }
                count++;
            });
            img.src=imgs[count];
        }
    };
    PreLoad.prototype._unordered=function () {
        let imgs=this.imgs,
            options=this.opts,
            count=0,
            len=imgs.length;
        $.each(imgs,function (index,src) {
            if(typeof src !='string') return;
            let img=new Image();
            $(img).on('load error',function () {
                options.each && options.each(count);// todo 如果存在each 则调用
                if(count>=len-1){
                    options.all && options.all();
                }
                count++;
            });
            img.src=src;
        });
    };
    $.extend({
        preload:function (imgs,options) {
            new PreLoad(imgs,options);
        }//todo 将函数暴露为插件
    });
})(jQuery);