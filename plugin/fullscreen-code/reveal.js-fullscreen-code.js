$('body').append("<div id='fullscreen-box'><pre><code></code></pre></div>" );
$('pre code').before( "<button class='fullscreen-button'>Full Screen</button>" );
var fullscreenBoxVisible = false;
$('button.fullscreen-button').click(function(e){
    var code = this.parentElement.children[1].innerHTML;
    if (fullscreenBoxVisible) {
        $('div#fullscreen-box pre code').html('');
        $('div#fullscreen-box').toggleClass('visible');
        fullscreenBoxVisible = false;
    } else {
        $('div#fullscreen-box pre code').html(code);
        $('div#fullscreen-box').toggleClass('visible');
        fullscreenBoxVisible = true;
    }
});