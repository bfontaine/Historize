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
        complete: $.noop,

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

        if ( $this.val() !== '' ) {

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
            history = histories[ id ],
            h_len   = history.length;

        if ( id !== undefined && h_len !== 0 && index !== 0 ) {

            if ( index === null ) {

                index = h_len;

                $this.data( 'historize.val', $this.val() );

            }
            
            index--;

            $this.data( 'historize.index', index );

            $this.val( history[ index ] );

        }

        return false;

    }

    // called with the input as 'this' when the 'historyDown' key is pressed
    function goHistoryDown( ev, options ) {

        var $this   = $( this ),
            id      = $this.data( 'historize.id' ),
            index   = $this.data( 'historize.index' ),
            history = histories[ id ],
            h_len   = history.length;

        if ( id !== undefined && h_len !== 0 && index < h_len - 1 ) {

            index++;

            $this.data( 'historize.index', index );
            $this.val( history[ index ] );

        } else if ( index == h_len -1 ) {

            $this.val( $this.data( 'historize.val' ) );

            $this.data({

                'historize.val': null,
                'historize.index': null

            });

        }

        return false;

    }

    // called with the input as 'this' when the autocomplete key is pressed
    function autocomplete( ev, options ) {

        if ( !options || !options.hasOwnProperty( 'complete' ) ) {
        
            return;
        
        }

        var compl  = options.complete,
            $this  = $( this ),
            strings, strings_len;

        switch ( $.type( compl ) ) {

            case 'function':
                strings = compl.call( $this[0], ev, options ); break;

            case 'array':
                strings = compl.filter(function( e ) {

                    return ( e.indexOf( $this.val() ) === 0 );

                });
                break;

            default:
                strings = [];
        }

        if (!( strings_len = strings.length )) { return; }

        if ( strings_len === 1 ) {

            return $this.val( strings[0] );

        }
        
        //TODO display the possibilities

    }


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
        // historize.val keep the actual value if the user
        // go back in the history without validating it
        this.each(function( i, e ) {

            var id = histories_count++;

            histories[id] = [];

            $( e ).data({
                
                'historize.id': id,
                'historize.index': null,
                'historize.val': null 
            });

        });
        
        // 'keypress' is not triggered for arrows keys
        this.bind( 'keydown', function( ev ) {

            var fn = null;

            switch ( ev.which ) {

                case options.keys.enter       : fn = validInput    ; break;
                case options.keys.historyUp   : fn = goHistoryUp   ; break;
                case options.keys.historyDown : fn = goHistoryDown ; break;
                case options.keys.tab         : fn = autocomplete  ; break;


            }

            if ( fn !== null ) {

                ev.preventDefault();

            }

            return ( fn || $.noop ).call( this, ev, options );

        });

        return this;
    
    };

})( jQuery );
