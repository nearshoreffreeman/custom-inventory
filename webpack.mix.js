let mix = require( 'laravel-mix' );


// Autloading jQuery to make it accessible to all the packages, because, you know, reasons
// You can comment this line if you don't need jQuery.
mix.autoload({
	jquery: ['$', 'window.jQuery', 'jQuery'],
});

mix.setPublicPath( './build' )
.postCss('src/main.css', 'css', [
    require('tailwindcss'),
]);
mix.webpackConfig({   
    stats: {
        children: true
    }
});
// Compile assets.
mix.ts( 'src/index.tsx', 'js' )
.react()

	

