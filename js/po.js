$(function() {


    // 背景の三角形の初期設定

    const triangleColor = ['','#E0F1F1','#E0F1F1','#97B7CA','#97B7CA','#354E70','#354E70','#DD6B4F','#DD6B4F'];

    for(i = 1; i <= 8; i++) {
        $(".triangle-upper").append('<div class="triangle" id="up-tri' + i +'" style="background: ' + triangleColor[i] + '"></div>')
        $(".triangle-lower").append('<div class="triangle" id="low-tri' + i +'" style="background: ' + triangleColor[i] + '"></div>')
    }


    // 三角形のアニメーション NO1

    let triAni1 = '';

    function triAnimation1() {

        let count = 0;

        triAni1 =  setInterval (function() {

            if (count <= 8) {

                count += 1;
                $("#up-tri" + count).addClass("triangle-animation");
                $("#low-tri" + count).addClass("triangle-animation");
            }
    
            else if (count > 8) {
    
                setTimeout(function() {
                    count = 0;
                    clearInterval();
                    $(".triangle").attr('class','triangle');
                },1000)
            }
        },200);

    }




    // ローディングアニメーション

    triAnimation1();

    setTimeout(function() {

        $(".load").animate({
            opacity: 0
        },500)

        setTimeout(function() {
            $(".load").css({
                display: 'none'
            })
        },500)

    },2500)




    // 自分の画像のところのアニメーション

    const circleColor = ['','#709BB7','#142A49','#7D6459','#AC382C'];

    for(i = 1; i<= 4; i++) {
        $(".top-circle-box").prepend('<div class="color-circle top-right-circle" id="circle' + i + '" style="background: ' + circleColor[i] + '"></div>')
    }




})