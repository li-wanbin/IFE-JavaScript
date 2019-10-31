(function(){
    var contentCt = document.getElementById('content-ct');
    var scratchInner = document.getElementById('scratch-inner');
    var cavCover = document.getElementById('cav-cover');
    var startGgBt = document.getElementById('start-gg-bt');
    var giftShowCt = document.getElementById('gift-show-ct');
    var giftShowCtInner = giftShowCt.getElementsByClassName('show-inner')[0];
    var giftCover = document.getElementById('gift-cover');
    var closeBt = document.getElementById('close-bt');
    var newImg = document.createElement('img');
    newImg.addEventListener('load', function(){
    var scratch = new Scratch({
        canvasId: 'scratch-canvas',
        // imageBackground: './img/gift-cover.jpg',
        // pictureOver: './img/gray-gg.jpg',
        cursor: {
            // png: 'piece.png',
            // cur: 'piece.cur',
            x: '20',
            y: '17'
        },
        sceneWidth: contentCt.clientWidth,
        sceneHeight: contentCt.clientHeight,
        radius: 20,
        nPoints: 300,
        percent: 50,
        onCovered: function() {
            var cmFrame = window.frames[0];
            var fd = null;
            if (cmFrame) {
                fd = cmFrame.document;
            }
            scratchInner.style.height = contentCt.clientHeight +'px';
            cavCover.style.width = contentCt.clientWidth +'px';
            cavCover.style.height = contentCt.clientHeight +'px';
            startGgBt.addEventListener('click', function(){
                cavCover.style.display = 'none';
                contentCt.style.visibility = 'visible';
                if (fd) {
                    var cmLogo = fd.getElementsByClassName('CMMOB_gglogo');
                    if (cmLogo) {
                        fd.getElementsByClassName('CMMOB_gglogo')[0].style.display='none';
                    }
                }
            });
            closeBt.addEventListener('click', function(){
                giftShowCtInner.setAttribute('class', giftShowCtInner.getAttribute('class').replace(' normal', ''));
                setTimeout(function(){
                    giftShowCt.style.display = 'none';
                }, 300);
            });
        },
        callback: function () {
            giftShowCt.style.display = 'block';
            setTimeout(function(){
                giftShowCt.setAttribute('class', giftShowCt.getAttribute('class').replace(/^ +| +/, '') +' with-shadow');
                giftShowCtInner.setAttribute('class', giftShowCtInner.getAttribute('class').replace(/small/, 'small normal'));
            }, 200);
        },
        pointSize: { x: 3, y: 3}
    });
    });
    newImg.src = giftCover.src;
    })();