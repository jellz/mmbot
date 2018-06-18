$(document).ready(() => {
    console.log('this script loaded');

    // init all tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // init typing animation on home screen
    new TypeIt('.jumbotron-home-typing', {
        speed: 50,
        autoStart: false,
    })
    .type('mmbot is a moderatio')
    .pause(500)
    .delete(9)
    .type('<strong>powerful</strong> moderation bot.')
    .pause(1000)
    .delete()
    .type('mmbot is a <strong>fun</strong> bot.')
    .pause(1000)
    .delete()
    .type('mmbot is a <strong>customizable</strong> bot.')
    .pause(1000)
    .delete()
    .type('mmbot is an <strong>advanced</strong> bot.')
    .pause(1000)
    .delete()
    .type('It\'s just a cool bot!');
});