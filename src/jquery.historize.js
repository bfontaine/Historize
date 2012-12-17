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
;(function( $, undefined ) {

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
            
            $( this ).trigger( 'enter' ).val( '' );
        
        }

    };

    var /* keep the histories of each input
           each history is reversed, i.e. the first string is
           the older value for the input */
        histories = [],

        // count of histories
        histories_count = 0;


    // called with the input as 'this' when 'Enter' is pressed
    function validInput( ev, options ) {

        var $this = $( this );

        if ( $this.val !== '' ) {

            histories[ $this.data( 'historize.id' ) ].push( $this.val() );

            $this.data( 'historize.index', null );

        }

        return ( options.target || $.noop ).call( this, ev, options );

    }

    // called with the input as 'this' when the 'historyUp' key is pressed
    function goHistoryUp( ev, options ) {

        var $this   = $( this ),
            id      = $this.data( 'historize.id' ),
            index   = $this.data( 'historize.index' ),
            history = histories[ id ];

        if (   id !== undefined
            && history.length !== 0
            && index !== 0
           ) {
            
            if ( index === null ) {
                index = history.length;
            }

            $this.data( 'historize.index', index - 1 );
            $this.val( history[ index - 1 ] );

        }

        return false;

    }

    // called with the input as 'this' when the 'historyDown' key is pressed
    function goHistoryDown( ev, options ) {

        var $this   = $( this ),
            id      = $this.data( 'historize.id' ),
            index   = $this.data( 'historize.index' ),
            history = histories[ id ];

        if (   id !== undefined
            && history.length !== 0
            && index < history.length
           ) {

            $this.data( 'historize.index', index + 1 );
            $this.val( history[ index + 1 ] );

        } else if ( index == history.length ) {

            $this.val( '' );

        }

        return false;

    }

    // called with the input as 'this' when the autocomplete key is pressed
    function autocomplete( ev, options ) {/* TODO */}


    // Historize main function
    $.fn.historize = function( opts ) {

        var options;
        
        // return the history of the first element
        // of the current selected inputs set
        if ( opts === 'get' ) {

            return histories[ this.first().data( 'historize.id' ) ];

        }

        if ( $.type( opts ) === 'object' ) {

            options = $.extend( true, {}, defaults, opts );

        } else {

            options = $.extend( true, {}, defaults );

        }

        // Set the history's id & index of each element
        this.each(function( i, e ) {

            var id = histories_count++;

            histories[id] = [];

            $( e ).data( 'historize.id', id )
                  .data( 'historize.index', null );

        });
        
        // 'keypress' is not triggered for arrows keys
        this.bind( 'keydown', function( ev ) {

            var fn;

            switch ( ev.which ) {

                case options.keys.enter        : fn = validInput    ; break;
                case options.keys.historyUp    : fn = goHistoryUp   ; break;
                case options.keys.historyDown  : fn = goHistoryDown ; break;
                case options.keys.autocomplete : fn = autocomplete  ; break;

                default: fn = $.noop;

            }

            return fn.call( this, ev, options );

        });

        return this;
    
    };

})( jQuery );
