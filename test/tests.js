(function($) {

    test( 'it should returns itself', function() {

        var $input = $( 'input' );

        equal( $input.historize(), $input );

    });

})(jQuery);
