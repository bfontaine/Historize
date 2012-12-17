/**!
 * Historize v0.0.1
 *
 * Historize is a jQuery plugin which allows you to keep an history on an input and
 * a tab-completion system, like in a shell.
 *
 * Author: Baptiste Fontaine
 * Licence: MIT
 * Repository: github.com/bfontaine/Historize
 *
 **/
;(function( $ ) {

    // Default options
    var defaults = {

        // called with the input's text when the user press 'Tab'. A callback
        // may be given
        completion: null,

        // default keycodes
        keys: {

            enter       : 13, // Enter
            historyUp   : 38, // Up arrow
            historyDown : 40, // Down arrow
            tab         :  9  // Tab

        },

        // Target function, called when the user press 'Enter'. Two arguments
        // are passed: the event, and the options
        target: function() {
            
            $( this ).trigger( 'enter' );
        
        }

    };

    var // keep the histories of each input
        histories = [],

        // count of histories
        histories_count = 0;


    // called with the input as 'this' when 'Enter' is pressed
    function validInput( ev, options ) {

        var $this = $( this );

        histories[ $this.data( 'historize.id' ) ].push( $this.val() );
        
        ( options.target || $.noop ).call( this, ev, options );

    }

    // called with the input as 'this' when the 'historyUp' key is pressed
    function goHistoryUp( ev, options ) {/* TODO */}

    // called with the input as 'this' when the 'historyDown' key is pressed
    function goHistoryDown( ev, options ) {/* TODO */}

    // called with the input as 'this' when the autocomplete key is pressed
    function autocomplete( ev, options ) {/* TODO */}


    // Historize main function
    $.fn.historize = function( opts ) {

        var options;
        
        if ( typeof opts === 'object' ) {

            options = $.extend( true, {}, defaults, opts );

        } else {

            options = $.extend( true, {}, defaults );

        }

        // Set the history's id of each element
        this.each(function( i, e ) {

            var id = histories_count++;

            histories[id] = [];

            $(e).data( 'historize.id', id );

        });
        
        this.bind( 'keypress', function( ev ) {

            var fn;

            switch ( ev.which ) {

                case options.keys.enter        : fn = validInput    ; break;
                case options.keys.historyUp    : fn = goHistoryUp   ; break;
                case options.keys.historyDown  : fn = goHistoryDown ; break;
                case options.keys.autocomplete : fn = autocomplete  ; break;

                default: fn = $.noop;

            }

            fn.call( this, ev, options );

        });

        return this;
    
    };

})( jQuery );
