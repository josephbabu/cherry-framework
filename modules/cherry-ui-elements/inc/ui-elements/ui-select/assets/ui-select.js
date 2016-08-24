/**
 * Select
 */
( function( $, CherryJsCore ){
	'use strict';

	CherryJsCore.utilites.namespace('ui_elements.select');
	CherryJsCore.ui_elements.select = {
		selectClass: '.cherry-ui-select[data-filter="true"]:not([name*="__i__"]), .cherry-ui-select[multiple]:not([name*="__i__"])',

		init: function () {
			$( document ).on( 'ready.cherry-ui-elements-init', this.render.bind( this ) );
			$( window ).on( 'cherry-ui-elements-init', this.render.bind( this ) );
		},
		render: function ( event ) {
			var target = ( event._target ) ? event._target : $( 'body' );

			// init filter-select
			$( this.selectClass , target ).each( this.select2Init.bind( this ) );
		},
		select2Init: function ( index, element ) {
			var $this   = $( element ),
				options = {
					placeholder: $this.attr('placeholder')
				};

			$this
				.select2( options )
				.on('change.cherrySelect2', this.changeEvent.bind( this ) )
				.trigger('change.cherrySelect2');
		},
		changeEvent: function ( event ) {
			this.switchState( event.currentTarget );
		},
		switchState: function ( item ) {
			var item = $( item ),
				i    = item[0].length,
				option,
				data;

			for (; i >= 0; i--) {
				option = $( item[0][ i ] );
				data   = option.data();

				if ( jQuery.isEmptyObject( data ) ) {
					continue;
				} else {
					$( '.' + data.slave )[ ( option[ 0 ].selected ) ? 'removeClass' : 'addClass' ]( 'hide' );
				}
			}

		}
	};

	CherryJsCore.ui_elements.select.init();

}( jQuery, window.CherryJsCore ) );
