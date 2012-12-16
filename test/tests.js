(function($) {

    test( 'it returns itself', function() {

        var $input = $( 'input' );

        equal( $input.historize(), $input );

    });

})(jQuery);
