/*
* функция вывода сообщения в модальном окне
*/
function modalMessage(mes){
    var modal       = $('.modal'),
        modText     = modal.find('.modal__text'),
        btn_close   = modal.find('#modal_close');

    modal.removeClass('close');
    modText.text(mes);

    btn_close.on('click',function(e){
        e.preventDefault;
        modal.addClass('close');

    });
}

/*
* Authorization blocks changing at the index page
 */

(function () {
    
    $('#forgot').on('click', function (e) {
        
        e.preventDefault();

            $(this).parents('.block').removeClass('block_active');

            $('.block').eq(2).addClass('block_active');
        
    });

    $('#registr').on('click', function (e) {

        e.preventDefault();

        $(this).parents('.block').removeClass('block_active');

        $('.block').eq(1).addClass('block_active');


    });
    
}());

/*
 * Logout requset
 */

(function () {
    function sendXHR(route){
        $.ajax({
            type: 'POST',
            url: route,
            statusCode:{200: function () {
                window.location.href = '/'
            }
            
            
        }
            
        })
    }

    $('#header_exit').on('click', function (e) {

        e.preventDefault();

        sendXHR('/logout')

    })

}());


/*
 * XmlHttpRequests from authorization page
 */

(function () {

    function sendXHR(route, data){
        $.ajax({
            type: 'POST',
            url: route,
            data: data
        })
    }

    $('#login_btn').on('click', function (e) {

        //e.preventDefault();

        var log = $('#emailLog').val(),
            pass = $('#passLog').val();

        var loginData = {
            login: log,
            password:pass
        };

        if (log != "" && pass != ""){
            $.ajax({
                type: 'POST',
                url: '/login',
                data: loginData,
                statusCode:{
                    403: function () {
                       modalMessage('Неправильный логин/пароль, попробуйте снова')
                    },
                    200: function () {
                        window.location.href = '/main'
                    }
                }
            })
        } else {
            //alert('Заполните все поля!')
            modalMessage('Заполните все поля')
        }

    });

    $('#create_account').on('click', function (e) {

        e.preventDefault();

        var name = $('#user').val(),
            log = $('#emailLogin').val(),
            pass = $('#pass').val();

        var loginData = {
            name: name,
            login: log,
            password:pass
        };
        console.log(loginData);

        if (name != "" && log != "" && pass != ""){
            $.ajax({
                type: 'POST',
                url: '/signUp',
                data: loginData,
                statusCode:{
                    403: function () {
                        alert('Ошибка')
                    },
                    200: function () {
                        window.location.href = '/main'
                    }
                }
            })
        } else {
            //alert('Заполните все поля!')
            modalMessage('Заполните все поля')
        }

    });

    $('#restore_btn').on('click', function (e) {

        e.preventDefault();

        var log = $('#email').val();


        var loginData = {
            email: log
        };

        var re = /@/;

        if (log != "" && re.test(log)){
            sendXHR('/restore', loginData)
        } else if (log == "") {
            modalMessage('Заполните все поля!')
        }  else if (!re.test(log)) {
            modalMessage('Вы ввели некорректный email, попробуйте снова')
        }

    });

}());

/*
 * Opening header editing mode
 */

(function () {

    $('#edit__profile_header').on('click', function (e) {
        e.preventDefault();
        console.log('click');
        var window = $('.edit');

        if (window.hasClass('close')){
            window.removeClass('close');
        }
    })

}());


/*
 * XmlHttpRequests from the main page
 */
(function () {

    function sendXHR(route, data){
        $.ajax({
            type: 'POST',
            url: route,
            data: data,
            processData: false,
            contentType: false,
            statusCode:{
                200: function () {
                    var window = $('.edit');

                    if (!window.hasClass('close')){
                        window.addClass('close');
                    }
                }
            }
        })
    }


    $('#edit__header_save').on('click', function (e) {
        e.preventDefault();


        var profileData = new FormData($('#edit__header_form')[0]);

        sendXHR('/profileUpload', profileData)
    });

}());


/*
* album popup
 */

(function () {

    
    $('#add__new_album_main').on('click', function (e) {
        e.preventDefault();
        console.log('clicknul');
        var popup = $('.add_album');

        if (popup.hasClass('close')) {
            popup.removeClass('close')
        }

    })
}());


/*
 * Albums creating
 */

(function () {


    function sendXHR(route, data){
        $.ajax({
            type: 'POST',
            url: route,
            data: data,
            processData: false,
            contentType: false
        })
    }

    $('#add__btn__save').on('click', function (e) {

        e.preventDefault();

        var albumData = new FormData($('#addAlbum')[0]);

        sendXHR('/createAlbum', albumData)

    })

}());


/*
 * Closing the album creating modal window
 */

(function () {

    $('#close__album_adding').on('click', function (e) {

        e.preventDefault();

        var window = $('.add_album');

        if (!window.hasClass('close')){
            window.addClass('close')
        }
    })
}());

 /*
 *  function scroll_btn
 */

  (function(){

       $('.btn_up').on('click',function(){
        

        $('html,body').animate(
            {
              'scrollTop': 0  },
               '900ms'
            ); 
         

       });
   
  }());


/*
 * Поиск
 */

(function () {

    $('#start_search').on('click keypress', function (e) {
        if (e.keyCode==13){
            var searchStr = $('#search_field').val();

            // $.ajax({
            //     type: 'GET',
            //     url:'/search/' + searchStr,
            //     data: searchStr,
            //     processData: false,
            //     contentType: false
            // })
            window.location.href = '/search/'+ searchStr
        } else {
            e.preventDefault();

            var searchStr = $('#search_field').val();

            // $.ajax({
            //     type: 'GET',
            //     url:'/search/' + searchStr,
            //     data: searchStr
            //     // processData: false,
            //     // contentType: false
            // })
            window.location.href = '/search/'+ searchStr
        }
    });
}());

  /*
  * flip card не допилено, допилить
  */
//   (function(){     // todo покв закоментил, дэдлайн поджимает, а у меня не особо работает
//
//
//     var forgot   = $('#forgot'),
//         enter    = $('#enter'),
//         enter_r  = $('#enter_r'),
//         registr  = $('#registr'),
//         flipElem = $('.flip'),
//         blocks   = flipElem.find('.block');
//
//
//         // function flip card
//     var _flip = function(btn) {
//
//       btn.on('click', function(e){
//
//         e.preventDefault();
//
//         if (btn.selector === '#forgot'){
//              $.each(blocks, function(index, val) {
//                 var block = $(val);
//                 if(block.data('id')==='#registr'){
//                     block.hide('fast');
//                     console.log('rrrr');
//                 };
//              });
//         };
//         if (btn.selector === '#registr'){
//              $.each(blocks, function(index, val) {
//                 var block = $(val);
//                 if(block.data('id')==='#forgot'){
//                     block.hide();
//                     console.log('ffff');
//                 };
//              });
//         };
//
//
//         flipElem.toggleClass('flipping');
//
//         if (btn.selector === '#enter'){
//              $.each(blocks, function(index, val) {
//                 var block = $(val);
//                 if(block.data('id')==='#forgot'){
//                     block.show('fast');
//                     console.log('ffff');
//                 };
//              });
//         };
//         if (btn.selector === '#enter_r'){
//              $.each(blocks, function(index, val) {
//                 var block = $(val);
//                 if(block.data('id')==='#registr'){
//                     block.show('fast');
//                     console.log('ffff');
//                 };
//              });
//         };
//
//        });
//     };
//
//
//     _flip(forgot);
//     _flip(enter);
//     _flip(enter_r);
//     _flip(registr);
//
// })();

/*
 * Открытие окна добавления фото

 */     //todo пока закоментил, так как необявленная функция и вообще есть вопросы


// (function () {
//
//     $('#add__photo_alb').on('click', function (e) {
//         e.preventDefault();
//         var window = $('.add_photos');
//
//         if (window.hasClass('close')){
//             window.removeClass('close');
//         }
//     });
//     $('#close__adding_photo').on('click', function (e) {
//         e.preventDefault();
//         var window = $('.add_photos');
//

//
//         $('#enter').on('click',_unflip);
//

//         if (!window.hasClass('close')){
//             window.addClass('close');
//         }
//     })
//
// }());



/*
 * подзагрузка фотографий с сервера
 */

(function () {

    var startn = 6,
        stepn = 6;


    $('.news__more').click(function (e) {
        e.preventDefault();
        
        $.ajax({
            type: "POST",
            url: "/more",
            data: {
                startn: startn,
                stepn: stepn
            },
            success: function (data) {
                startn = startn + stepn;
                $('.news__list').append(data);
            }
        });
    });
}());

    

/*
 * Показывание окна добавления фото
 */

(function () {

    $('#add__photo_alb').on('click', function (e) {
        e.preventDefault();

        var window = $('.add_photos');

        if (window.hasClass('close')){
            window.removeClass('close')
        }
    })

}());


/*
 * Отправка добавления фото
 */

(function () {

    $('#add__ph__save').on('click', function (e) {
        e.preventDefault();

        var data = new FormData($('#add_photo_form')[0]);
        var href = location.pathname;

        $.ajax({
            type: 'POST',
            url: href + '/addPhoto',
            data: data,
            processData: false,
            contentType: false
        })
    })

}());

/*
 * открытие окна редактирования фотографий
 */

(function () {

    $('.albums__edit').on('click', function (e) {
        //e.preventDefault();

        var window = $('.edit_photo');

        if (window.hasClass('close')){
            window.removeClass('close')
        }
    })

}());

/*
 * Редактирование фотографий, отправка запроса
 */

(function () {


    $('#edit__ph_save').on('click', function (e) {
        e.preventDefault();
        console.log('click');

        var data = {
            name: $('#edit_name_photo').val(),
            info: $('#edit__info_photo').val()
        };

        var album = location.pathname,
            photoID = location.hash.slice(1);


        $.ajax({
            type: 'POST',
            url: album + '/editPhoto/'+photoID,
            data: data
        })
    })
}());
