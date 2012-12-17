(function($) {

    var $input,
        $body = $( 'body' ).first(),

        enter = $.Event( 'keydown' );

    enter.which = 13;


    function _test( str, fn ) {

        // setup
        $input = $( '<input/>' ).appendTo($body);

        test( str, fn );

        // teardown
        $input.remove();
    }


    _test( 'it should return itself', function() {

        equal( $input.historize(), $input );

    });

    _test( 'it should have an empty history at the beginning', function() {

        $input.historize();

        notStrictEqual( $input.data( 'historize.id' ), undefined );
        strictEqual( $input.data( 'historize.index' ), null );

    });

    _test( 'it should not extend the history on "Enter" if empty', function() {

        $input.historize().trigger( enter );

        strictEqual( $input.data( 'historize.index' ), null );

        deepEqual( $input.historize( 'get' ), [] );

    });

})(jQuery);
