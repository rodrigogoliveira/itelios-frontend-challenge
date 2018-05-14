
(function() {
    var createProduct = function(data) {
            return '<li>' +
                '<div class="image">' +
                    '<a href="#?businessId=' + data.businessId + '"><img src="' + imgReplace(data.imageName) + '" alt="' + data.name + '" /></a>' +
                '</div>' +
                '<div class="title">' +
                    '<a href="#?businessId=' + data.businessId + '">' + ellipsisLongText(data.name) + '</a>' +
                '</div>' +
                '<div class="price">' +
                    '<div class="price">Por: <strong>' + data.price + '</strong></div>' +
                    '<div class="paceled-price">' + data.productInfo.paymentConditions + '</div>' +
                '</div>' +
                '<div class="actions">' +
                    '<a href="#?businessId=' + data.businessId + '" class="btn button-buy">adicionar ao carrinho<i class="material-icons">add_shopping_cart</i></a>' +
                '</div>' +
            '</li>';
        },
        imgReplace = function(link) {
            return link.replace("//www.itelios.com.br/arquivos/imagens/", "images/");
        },
        ellipsisLongText = function(text, maxTextSize = 80) {
            if(text.length > maxTextSize) {
                return text.substring(0, maxTextSize) + '...';
            }
            return text;
        },
        calculateImageRatio = function(srcWidth, srcHeight, maxWidth, maxHeight) {
            var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
            return { width: srcWidth*ratio, height: srcHeight*ratio };
         },
         makeBulets = function() {
             var products = $('#carouselUl li').length,
                 containerWidth = $('#carouselContainer .container-inner').outerWidth(),
                 itemWidth = $('#carouselUl li').outerWidth(),
                 visibleItemCount = containerWidth/itemWidth
                 totalBulet = Math.ceil(products/visibleItemCount),
                 bulets = [];
 
             for($i = 0; $i < totalBulet; $i++) {
                 bulets.push("<li>&nbsp;</li>");
             }

            if ($('#carouselPaginator ul').length && $('#carouselPaginator ul li').length != totalBulet) {
                $('#carouselPaginator').empty();
            }
            
            if (!$('#carouselPaginator ul').length) {
                $("<ul/>", {
                    html: bulets.join("")
                }).appendTo($('#carouselPaginator'));
            }
         },
         jqxhr = $.getJSON( "public/json/products.json", function(data) {
            var item,
                products = [];

            $.each(data, function(key, value) {
                if (value.data.item) {
                    item = createProduct(value.data.item);
                }
                if(value.data.recommendation) {
                    $.each(value.data.recommendation, function(productKey, productValue) {
                        products.push(createProduct(productValue))
                    })
                }
            });

            $("<ul/>", { "class": "container-ul", html: item }).appendTo($('#visited-item'));

            $("<ul/>", {
                "class": "container-ul",
                "id": "carouselUl",
                html: products.join("")
            }).appendTo($('#carouselInner'));
        }).done(
            function() { 
                $("#carouselUl li").each(function() {
                    var image = $(this).find("img"),
                        containerImage = $(this).find(".image"),
                        srcWidth = image.outerWidth(), 
                        srcHeight = image.outerHeight(), 
                        maxWidth = containerImage.outerWidth(), 
                        maxHeight = containerImage.outerHeight(),
                        ratioSize = calculateImageRatio(srcWidth, srcHeight, maxWidth, maxHeight);

                        image.css({"width": ratioSize.width, "height": ratioSize.height});
                });
                makeBulets();
            }
        ),
        getClickValue = function() {
            var containerWidth = $('#carouselContainer .container-inner').outerWidth(),
                itemWidth = $('#carouselUl li').outerWidth(),
                visibleItemCount = containerWidth/itemWidth
                totalAnimateArea = itemWidth*visibleItemCount;

            return totalAnimateArea;
        };

    $('#carouselUl li:first').before($('#carouselUl li:last'));

    $('#rightScroll img').click(function() {
        var totalAnimateArea = getClickValue(),
            leftIndent = parseInt($('#carouselUl').css('left')) - totalAnimateArea;

        $('#carouselUl:not(:animated)').animate(
            {'left' : leftIndent},
            400,
            function() {
                $('#carouselUl li:last').after($('#carouselUl li:first'));
                $('#carouselUl').css({'left' : - totalAnimateArea});
            }
        );

        makeBulets();
    });

    $('#leftScroll img').click(function(){
        var totalAnimateArea = getClickValue(),
            leftIndent = parseInt($('#carouselUl').css('left')) + totalAnimateArea;
        
        $('#carouselUl:not(:animated)').animate(
            {'left' : leftIndent},
            500,
            function() {
                $('#carouselUl li:first').before($('#carouselUl li:last'));
                $('#carouselUl').css({'left' : - totalAnimateArea});
            }
        );

        makeBulets();
    });

    setInterval(function() { $('#rightScroll img').trigger( "click" ) }, 5000);
})()
