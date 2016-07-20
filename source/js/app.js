
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
                        alert('Неправильный логин/пароль, попробуйте снова')
                    },
                    200: function () {
                        window.location.href = '/main'
                    }
                }
            })
        } else {
            alert('Заполните все поля!')
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
                        window.href.location = '/main'
                    }
                }
            })
        } else {
            alert('Заполните все поля!')
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
            alert('Заполните все поля!')
        }  else if (!re.test(log)) {
            alert('Вы ввели некорректный email, попробуйте снова')
        }

    });

}());

/*
 * XmlHttpRequests from the main page
 */
(function () {

    function sendXHR(route, data){
        $.ajax({
            type: 'POST',
            url: route,
            data: data
            //contentType: 'multipart/form-data'
        })
    }

    $('#edit__header_save').on('click', function (e) {
        e.preventDefault();

        var avatar = $('#header__user_ava').val(),
            background = $('#header__user_back').val(),
            username = $('#header__user_name').val(),
            userInfo = $('#user__header_description').val();

        var profileData = {
            avatar: avatar,
            background: background,
            username: username,
            userInfo: userInfo
        };

        sendXHR('/profileUpload', profileData)
    });

}());
