(function($) {

    var $input,
        $body = $( 'body' ).first(),

        enter = $.Event( 'keydown' );

    enter.which = 13;

    module( 'main', {

        setup:    function() {
            $input = $( '<input/>' ).appendTo($body);
        },
        
        teardown: function() {
            $input.remove();
        }

    });

    test( 'it should return itself', function() {

        equal( $input.historize(), $input );

    });

    test( 'it should have an empty history at the beginning', function() {

        $input.historize();

        notStrictEqual( $input.data( 'historize.id' ), undefined );
        strictEqual( $input.data( 'historize.index' ), null );

    });

    test( 'it should not extend the history on "Enter" if empty', function() {

        $input.historize().trigger( enter );

        strictEqual( $input.data( 'historize.index' ), null );

        deepEqual( $input.historize( 'get' ), [] );

    });

    test( 'it should extend the history on "Enter" if not empty', function() {

        $input.historize().val( 'foo' ).trigger( enter );

        strictEqual( $input.data( 'historize.index' ), null );
        deepEqual( $input.historize( 'get' ), [ 'foo' ] );

        $input.val( 'bar' ).trigger( enter );

        strictEqual( $input.data( 'historize.index' ), null );
        deepEqual( $input.historize( 'get' ), [ 'foo', 'bar' ] );

    });

})(jQuery);
