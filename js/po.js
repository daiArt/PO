$(function() {

    
    // widowサイズが変更された際に再設定する必要がある初期設定

    let pageWidth = 0;

    let pageSwichPosition = [0]

    function initialSetting() {
        pageWidth = $(window).width();

        for(i = 1; i<= 4; i++) {

            pageSwichPosition.push(pageWidth * i);

        }
    }

    initialSetting();
    $(window).resize(function() {

        pageSwichPosition = [0]

        initialSetting();

    })

    // workの子要素内のmenuを使用してきた場合

    let checkStorage = sessionStorage.getItem('jumpPage');

    if(checkStorage > 0) {
        $(".front").scrollLeft(pageWidth * (checkStorage - 1));

        sessionStorage.clear();
    }

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



    // トップのアニメーションの準備
    // テキスト編

    const topTextBox = ['','D','a','i','/','A','r','t','P','o','r','t','f','o','l','i','o'];
    let topTextTarget = '';

    for (i = 1; i <=16; i++) {

        if (i <= 7) {
            topTextTarget = 'upper'
        } else if (i > 7) {
            topTextTarget = 'lower'
        }

        $(".text-" + topTextTarget).append('<span class="top-text' + i + '"><h1>' + topTextBox[i] + '</h1></span>')
    }


    // 右側用

        const circleColor = ['','#709BB7','#142A49','#7D6459','#AC382C'];

        for(i = 1; i<= 4; i++) {
            $(".top-circle-box").prepend('<div class="color-circle top-right-circle" id="top-circle' + i + '" style="background: ' + circleColor[i] + '"></div>')
        }

        for(i = 1; i<= 4; i++) {
            $(".about-circle-box").prepend('<div class="color-circle about-circle" id="about-circle' + i + '" style="background: ' + circleColor[i] + '"></div>')
        }


    // ローディングアニメーションから

    triAnimation1();

    setTimeout(function() {

        $(".load").animate({
            opacity: 0
        },500)

        setTimeout(function() {
            $(".load").css({
                display: 'none'
            })

            $(".front").css({
                opacity: 1
            })

            // menuのアニメーション

            $(".menu").addClass('menu-load-animation');
            $(".nav-button").addClass('nav-button-animation');


            // topのアニメーション開始
            // テキスト編

            let topTextCount = 0;

            let topCircleCount = 0;


            let topTextAnimatinon = setInterval(function() {

                topTextCount += 1;

                if (topTextCount <= 16) {

                    $(".top-text" + topTextCount).addClass('top-text-animation');

                } else {
                    clearInterval(topTextAnimatinon);
                }

                topCircleCount += 1;

                if (topCircleCount <= 4) {

                    $("#top-circle" + topCircleCount).addClass('top-circle-animation');
                    
                }

            },50)

            // 画像 (左側)編

            setTimeout (function() {
                $(".top-my-img").addClass('top-my-img-animation');
            },400)

        },500)

    })//,2500



    // ユーザーが見ている位置によって表示を変化させるために

    let scrollScale = 0;
    let scrollScaleValue = 0;
    let pageCount = 1;
    let storagei = 0;
    


    $(".front").scroll(function() {

        // 現在の位置を取得

        scrollScale = $(".front > div:first").offset();
        scrollScaleValue = scrollScale.left * -1;

        for(i = 1; i <= 4; i++) {

            storagei = i -1;

            if (scrollScaleValue >= pageSwichPosition[storagei] && scrollScaleValue < pageSwichPosition[i]) {
                pageCount = i;
                console.log(pageCount)
            }
        }

        // 全てのページ時に共通で行うこと

        $(".nav-button h2").css({
            opacity: 0.5
        })

        $("#menu" + pageCount + " h2").css({
            opacity: 1
        })

    })

    
    // メニューをクリックした時の動作

    let menuClickGoal = '';

    $(".nav-button").click(function() {
        menuClickGoal = $(this).attr('id');
        menuClickGoal = menuClickGoal.slice(-1);
        menuClickGoal = Number(menuClickGoal);

        $(".front").scrollLeft(pageWidth * (menuClickGoal - 1));
    })

    // workの子要素内でmenuをクリック



    $(".work-nav").click(function() {

        $.when(
            menuClickGoal = $(this).attr('id'),
            menuClickGoal = menuClickGoal.slice(-1),
            menuClickGoal = Number(menuClickGoal),
            sessionStorage.setItem('jumpPage',menuClickGoal),
        ).done(function() {
            window.location.href = '/index.html';
        })

    })

})