var elixir = require('laravel-elixir');

elixir(function(mix) {
    mix.scripts([
        'src/jquery.scroller.js'
    ], 'dist/jquery.scroller.min.js', __dirname);

    mix.less([
        '/examples.less'
    ], 'demo/examples.css');
});