$(document).ready(function(){
    
    var $chirperList = $('#chirperList');
    var $user = $('#user');
    var $timeStamp = $('#timeStamp');
    var $message = $('#message');
  
    getTweets();
    
    function doubleDigit(value) {
        if (value < 10) {
            value = ('0' + value);
        } else {
            value = value;
        }
        return value;
    }
    
    function getTweets() {
        $.ajax({
            method: "GET",
            url: "/api/chirps",
            contentType: "application/json",
            success: function(chirp) {
                $.each(chirp, function(i, chirp){
                    $chirperList.append('<li>' + chirp.user + '@' + chirp.timeStamp + ': ' + chirp.message + '</li>');
                }); 
            } 
        });
    }
    
    function postTweet() {
        var date = new Date();
        var hours = doubleDigit(date.getHours());
        var mins = doubleDigit(date.getMinutes());
        var time = (hours + ':' + mins);
        var chirp = {
            user: $user.val(),
            message: $message.val(),
            timeStamp: time
        };
        $.ajax({
            method: "POST",
            url: "/api/chirps",
            contentType: "application/json",
            data: JSON.stringify(chirp)
        }).then(function() {
            $chirperList.append('<li>' + chirp.user + '@' + chirp.timeStamp + ': ' + chirp.message + '</li>');
        });
    }
    $('#btnText').on('click', function(){
        if($message.val().length > 0){
            postTweet();
        } else {
            alert('There is no Username or Message')
        };
    });
})