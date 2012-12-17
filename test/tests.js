(function($) {

    var $input,
        $body = $( 'body' ).first(),

        evs = {};


    // fill 'evs'
    $.each({

        enter : 13,
        up    : 38,
        down  : 40,
        tab   : 9

    }, function( k, v ) {
        evs[k] = $.Event( 'keydown' );
        evs[k].which = v;
    });

    // -------

    module( 'default options', {

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

        $input.historize().trigger( evs.enter );

        strictEqual( $input.data( 'historize.index' ), null );

        deepEqual( $input.historize( 'get' ), [] );

    });

    test( 'it should extend the history on "Enter" if not empty', function() {

        $input.historize().val( 'foo' ).trigger( evs.enter );

        strictEqual( $input.data( 'historize.index' ), null );
        deepEqual( $input.historize( 'get' ), [ 'foo' ] );

        $input.val( 'bar' ).trigger( evs.enter );

        strictEqual( $input.data( 'historize.index' ), null );
        deepEqual( $input.historize( 'get' ), [ 'foo', 'bar' ] );

    });

    test( 'Pressing "Down" with no value should do nothing at the beginning', function() {

        $input.historize().trigger( evs.down );

        strictEqual( $input.data( 'historize.index' ), null );
        deepEqual( $input.historize( 'get' ), [] );

    });

    test( 'Pressing "Down" should do nothing at the beginning with a value', function() {

        $input.historize().val( 'foo' ).trigger( evs.down );

        strictEqual( $input.data( 'historize.index' ), null );
        deepEqual( $input.historize( 'get' ), [] );

    });

    test( 'Pressing "Up" with no value should do nothing at the beginning', function() {

        $input.historize().trigger( evs.up );

        strictEqual( $input.data( 'historize.index' ), null );
        deepEqual( $input.historize( 'get' ), [] );

    });

    test( 'Pressing "Up" should do nothing at the beginning with a value', function() {

        $input.historize().val( 'foo' ).trigger( evs.up );

        strictEqual( $input.data( 'historize.index' ), null );
        deepEqual( $input.historize( 'get' ), [] );

    });

    test( 'Pressing "Up" with no value should go back in the history', function() {

        var val_1 = 'val_1',
            val_2 = 'val_2';

        $input.historize()
                .val( val_1 ).trigger( evs.enter )
                .val( val_2 ).trigger( evs.enter );


        equal( $input.val(), '' );

        deepEqual( $input.historize( 'get' ), [ val_1, val_2 ] );

        equal( $input.data( 'historize.index' ), null );

        equal( $input.trigger( evs.up ).val(), val_2 );
        equal( $input.data( 'historize.index' ), 1 );
        
        equal( $input.trigger( evs.up ).val(), val_1 );
        equal( $input.data( 'historize.index' ), 0 );

    });

})(jQuery);
