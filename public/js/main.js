
(function() {
    $('#carouselUl li:first').before($('#carouselUl li:last'));

    $('#rightScroll img').click(function() {
        var containerWidth = $('#carouselContainer .container-inner').outerWidth(),
            itemWidth = $('#carouselUl li').outerWidth(),
            visibleItemCount = containerWidth/itemWidth
            totalAnimateArea = itemWidth*visibleItemCount,
            leftIndent = parseInt($('#carouselUl').css('left')) - totalAnimateArea;

        $('#carouselUl:not(:animated)').animate(
            {'left' : leftIndent},
            400,
            function() {
                $('#carouselUl li:last').after($('#carouselUl li:first'));
                $('#carouselUl').css({'left' : - totalAnimateArea});
            }
        );
    });

    $('#leftScroll img').click(function(){
        var containerWidth = $('#carouselContainer .container-inner').outerWidth(),
            itemWidth = $('#carouselUl li').outerWidth(),
            visibleItemCount = containerWidth/itemWidth
            totalAnimateArea = itemWidth*visibleItemCount,
            leftIndent = parseInt($('#carouselUl').css('left')) + totalAnimateArea;
        
        $('#carouselUl:not(:animated)').animate(
            {'left' : leftIndent},
            500,
            function() {
                $('#carouselUl li:first').before($('#carouselUl li:last'));
                $('#carouselUl').css({'left' : - totalAnimateArea});
            }
        );
    });

    setInterval(function() { $('#rightScroll img').trigger( "click" ) }, 5000);
})()
