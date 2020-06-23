$(function(){
    //function入口函数,当文档加载完成时才会执行


    function resize(){
         //获取屏幕宽度
        var windowWidth = $(window).width();

        //判断屏幕属于大还是小
        var isSmallScreen = windowWidth<768;
        // 为每张轮播图设置背景
        // 1获取item的DOM对象
        $('#main_id > .carousel-inner > .item').each(function(index,item){
            //此时获取到的时DOM对象,需要转换
            var $item = $(item);

            var imgSrc =  $item.data(isSmallScreen?'image-xs':'image-lg');
            $item.css('backgroundImage','url("' + imgSrc + '")')
            if(isSmallScreen){

                //根据获取的视口宽度,设置要展示不同的尺寸图片
                //通过CSS设置背景图
                $item.html('<img src="'+imgSrc+'"></img>')
            }else{
                $item.empty()
            }
        })
    }
    
    //注册一个窗口监听事件,
    //trigger每次加载完页面时执行一次.
    $(window).on('resize',resize).trigger('resize');


    // =============================
    // 提示工具初始化
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })

    //===========================
    //标签横向滚动
    /**
     * 思路
     * 1.给UL加一个容器，使其有横向滚动条
     * 2，遍历每个li宽度，组成最终滚动条的宽度
     */
    var $myTabs = $('.nav-myTabs');
    //因为原本padding上有30px
    var widthSum = 0;
    var lis = $myTabs.children();
  
    lis.each(function(index,element){
        //获取元素宽度
        widthSum += element.clientWidth;
    });
    //此时widthSum等于所有li的值


    
    if($(window).width()<widthSum){
        $myTabs.css('width',widthSum).parent().css('overflow-x','scroll');
    }


    // 动态切换标签名
    // 思路通过点击事件切换目标标签内容
    var targetNews = $('#news-target') ;
    $('#news .nav-pills a').on('click',function(){
        $thisa = $(this);
        var news = $thisa.data('news');
        targetNews.text(news);
    });

    
/* =========轮播图左右滑动========= */
// 思路：获取轮播图容器，注册滑动事件
// 1，获取手指首次点击位置，
// 2，获取手指抬起位置，将抬起位置减点击位置，大于表示需要拖动轮播图
// 3，设置阈值当滑动幅度不足时不进行轮播图切换

    // 获取轮播图容器
    var $carousels = $('.carousel');
    // 记录首次点击变量
    var touchStart = 0;
    // 记录手指移动位置。
    var touchMove = 0;
    // 设置手指点击轮播图滑动阈值
    var offset = 100;

    // 为轮播图注册点击事件
    $carousels.on('touchstart',function(e){
        touchStart = e.originalEvent.touches[0].clientX;
       
    });

    // 手指移动
    $carousels.on('touchmove',function(e){
        touchMove = e.originalEvent.touches[0].clientX;
        
    });

    // 手指抬起
    $carousels.on('touchend',function(e){
        // 记录移动距离
        var distance = Math.abs(touchStart-touchMove);
        // 大于表示左移，小于右移
        // 判断是否大于阈值，大于才进行切换
        if(distance>offset){
           
            if(touchMove!=0){

                $carousels.carousel(touchStart>touchMove?'next':'prev');
                touchStart=0;
                touchMove=0;
            }
        }
    });
   
})