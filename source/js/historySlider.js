$(document).ready(function () {
    $(".news__mask").click(function (e) {

        e.preventDefault();
        var href = $(this).attr('href');
        historyClick(href);

        $(".view_slider").removeClass('close');

    });

    // получаем текущий uri, если uri не существует то присваиваем uri первой страницы
    var thisUri = getThisUri() ? getThisUri() : '/';
    thisUri = '/' + thisUri;

    console.log(thisUri);
    // клик на ссылки переключения страниц
    $('.history').click(function (e) {
        e.preventDefault();
        var href = $(this).attr('href');
        historyClick(href);
    });

    $('.svg-close-dims').click(goHomeClick);

    // обработчик нажатий на кнопки браузера назад/вперед
    window.addEventListener("popstate", function(e) {
        // Передаем текущий URL
        getContent(location.pathname, false);
    });

    /* Click function */
    function historyClick(href) {


        //создаем новую запись в истории только когда кликаем по ссылке
        history.pushState(null, null, href);
        // открываем страницу
        getContent(href, true);
        return false;
    }
    /* goHome function */
    function goHomeClick(e) {
        e.preventDefault();
        $(".view_slider").addClass('close');
        //создаем новую запись в истории только когда кликаем по ссылке
        history.pushState(null, null, thisUri);

        return false;
    }
    /*  Загрузка запрашиваемых страниц с сервера */

    function getContent(url, addEntry) {
        $.get(url).done(function(data) {
            var newSlide = $(data).find("#contentHolder");
            var slid = $('#contentHolder');

            // Обновление только текстового содержимого в сером блоке
            slid.html(newSlide);
            slid.on('click', '.history', function (e) {
                e.preventDefault();
                var href = $(this).attr('href');
                historyClick(href);
            });
            slid.on('click', '.svg-close-dims', goHomeClick);
            // Если был выполнен клик в меню - добавляем запись в стек истории сеанса
            // Если была нажата кнопка назад/вперед, добавлять записи в историю не надо
            if(addEntry == true) {
                // Добавляем запись в историю, используя pushState
                history.pushState(null, null, url);
            }
        });
    }

    /* Возвращает текущий URI страницы */

    function getThisUri() {
        var loc = event.location
            || ( event.originalEvent && event.originalEvent.location )
            || document.location;
        return loc.pathname.substr(1);
    }

});
