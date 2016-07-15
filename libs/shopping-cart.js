// jCart v1.3
// http://conceptlogic.com/jcart/

$(function() {

   var JCART = (function() {

      function updateExternal() {
         var subtotal = $('#hiddencart-toolbar').text(), // Get the cart's subtotal text
            itemCount = $('#jcart-title').parent().text(), // Get the cart's header row text to extract the item count
            trimLeft = 0,
            trimRight = 0;

         itemCount = $.trim(itemCount); // Trim whitespace
         trimLeft = itemCount.indexOf('(') + 1; // The opening paren charecter and everything before it
         trimRight = itemCount.length - 1; // The closing paren character

         // Trim unneeded characters from the item count string
         itemCount = itemCount.substring(trimLeft);
         itemCount = itemCount.substring(0, trimRight);

         // Update the external elements
         $('#external-toolbar').text(subtotal);
         //$('#external-item-count').text(itemCount);
      }

      updateExternal();
	  
	  
      function updateExternalcartpage() {

		var b = $('#external-cartpage').html($('#hiddencart-cartpage').html());			  
      }

      updateExternalcartpage();
	  
	  

      // This script sends Ajax requests to config-loader.php and relay.php using the path below
      // We assume these files are in the 'jcart' directory, one level above this script
      // Edit as needed if using a different directory structure
      var path = 'shopping-cart',
         container = $('#jcart'),
		container2 = $('#jcart2'),		 
         token = $('[name=jcartToken]').val(),
         tip = $('#jcart-tooltip');

      var config = (function() {
         var config = null;
         $.ajax({
            url: path + '/config-loader.php',
            data: {
               "ajax": "true"
            },
            dataType: 'json',
            async: false,
            success: function(response) {
               config = response;
            },
            error: function() {
              /* alert('Ajax error: Edit the path in jcart.js to fix.');*/
            }
         });
         return config;
      }());

      var setup = (function() {
         if(config.tooltip === true) {
            tip.text(config.text.itemAdded);

            // Tooltip is added to the DOM on mouseenter, but displayed only after a successful Ajax request
            $('.jcart [type=submit]').mouseenter(
               function(e) {
                  var x = e.pageY + 25,
                     y = e.pageX + -10;
                  $('body').append(tip);
                  tip.css({top: y + 'px', left: x + 'px'});
               }
            )
            .mousemove(
               function(e) {
                  var y = e.pageY + 25,
                  x = e.pageX + -10;
                  tip.css({top: y + 'px', left: x + 'px'});
               }
            )
            .mouseleave(
               function() {
                  tip.hide();
               }
            );
         }

         // Remove the update and empty buttons since they're only used when javascript is disabled
         $('#jcart-buttons').remove();

         // Default settings for Ajax requests
         $.ajaxSetup({
            type: 'POST',
            url: path + '/relay.php',
            success: function(response) {
               // Refresh the cart display after a successful Ajax request
               container2.html(response);
               $('#jcart-buttons').remove();

               updateExternal();
			   updateExternalcartpage();
			   
            },
            // See: http://www.maheshchari.com/jquery-ajax-error-handling/
            error: function(x, e) {
               var s = x.status,
                  m = 'Ajax error: ' ;
               if (s === 0) {
                  m += 'Check your network connection.';
               }
               if (s === 404 || s === 500) {
                  m += s;
               }
               if (e === 'parsererror' || e === 'timeout') {
                  m += e;
               }
               alert(m);
            }
         });
      }());

      // Check hidden input value
      // Sent via Ajax request to jcart.php which decides whether to display the cart checkout button or the PayPal checkout button based on its value
      // We normally check against request uri but Ajax update sets value to relay.php

      // If this is not the checkout the hidden input doesn't exist and no value is set
      var isCheckout = $('#jcart-is-checkout').val();

      function add(form) {
         // Input values for use in Ajax post
         var itemQty = form.find('[name=' + config.item.qty + ']'),
            itemAdd = form.find('[name=' + config.item.add + ']');

         // Add the item and refresh cart display
         $.ajax({
            data: form.serialize() + '&' + config.item.add + '=' + itemAdd.val(),
            success: function(response) {

				//Tany Show the Lightbox Message Requert customer GO to Checkout or keep in shopping
               $('#sign_up').lightbox_me({centered: true, onLoad: function() { $('#sign_up').find('input:first').focus()}});
			   
               // Momentarily display tooltip over the add-to-cart button
               if (itemQty.val() > 0 && tip.css('display') === 'none') {
                  tip.fadeIn('100').delay('400').fadeOut('100');
               }

               container2.html(response);
               $('#jcart-buttons').remove();

               updateExternal();
			   updateExternalcartpage();
			   
            }
         });
      }

      function update(input) {
         // The id of the item to update
         var updateId = input.parent().find('[name="jcartItemId[]"]').val();

         // The new quantity
         var newQty = input.val();

         // As long as the visitor has entered a quantity
         if (newQty) {

            // Update the cart one second after keyup
            var updateTimer = window.setTimeout(function() {

               // Update the item and refresh cart display
               $.ajax({
                  data: {
                     "jcartUpdate": 1, // Only the name in this pair is used in jcart.php, but IE chokes on empty values
                     "itemId": updateId,
                     "itemQty": newQty,
                     "jcartIsCheckout": isCheckout,
                     "jcartToken": token
                  }
               });
            }, 1000);
         }

         // If the visitor presses another key before the timer has expired, clear the timer and start over
         // If the timer expires before the visitor presses another key, update the item
         input.keydown(function(e){
            if (e.which !== 9) {
               window.clearTimeout(updateTimer);
            }
         });
      }
	  
	  
      function update_shipping(input) {
         // The id of the item to update
         var updateId = input.parent().find('[name="jcartShipping[]"]').val();
         // The new quantity
         var newQty = input.val();

         // As long as the visitor has entered a quantity
         if (newQty) {

            // Update the cart one second after keyup
            var updateTimer = window.setTimeout(function() {

               // Update the item and refresh cart display
               $.ajax({
                  data: {
                     "jcartUpdate": 1, // Only the name in this pair is used in jcart.php, but IE chokes on empty values
                     "shipping": updateId,
                     "jcartIsCheckout": isCheckout,
                     "jcartToken": token
                  }
               });
            }, 1000);
         }

         // If the visitor presses another key before the timer has expired, clear the timer and start over
         // If the timer expires before the visitor presses another key, update the item
         input.click(function(e){
            if (e.which !== 9) {
               window.clearTimeout(updateTimer);
            }
         });
      }


      function update_discount(input) {
		  
         // The id of the item to update
         var updateId = input.parent().find('[name="jcartDiscount[]"]').val();

         // The new quantity
         var newQty = input.val();

         // As long as the visitor has entered a quantity
         if (newQty) {

            // Update the cart one second after keyup
            var updateTimer = window.setTimeout(function() {

               // Update the item and refresh cart display
               $.ajax({
                  data: {
                     "jcartUpdate": 1, // Only the name in this pair is used in jcart.php, but IE chokes on empty values
                     "discount": updateId,
                     "jcartIsCheckout": isCheckout,
                     "jcartToken": token
                  }
               });
            }, 1000);
         }

         // If the visitor presses another key before the timer has expired, clear the timer and start over
         // If the timer expires before the visitor presses another key, update the item
         input.change(function(e){
            if (e.which !== 9) {
               window.clearTimeout(updateTimer);
            }
         });
      }

	  

      function remove(link) {
         // Get the query string of the link that was clicked
         var queryString = link.attr('href');
         queryString = queryString.split('=');

         // The id of the item to remove
         var removeId = queryString[1];

         // Remove the item and refresh cart display
         $.ajax({
            type: 'GET',
            data: {
               "jcartRemove": removeId,
               "jcartIsCheckout": isCheckout
            }
         });
      }

      // Add an item to the cart
      $('.jcart').submit(function(e) {
         add($(this));
         e.preventDefault();
      });

      // Prevent enter key from submitting the cart
      container.keydown(function(e) {
         if(e.which === 13) {
            e.preventDefault();
         }
      });

      // Update an item in the cart
      container.delegate('[name="jcartItemQty[]"]', 'keyup', function(){
         update($(this));
      });

      container.delegate('[name="jcartShipping[]"]', 'click', function(){		  
         update_shipping($(this));
      });


      container.delegate('[name="jcartDiscount[]"]', 'change', function(){		  
         update_discount($(this));
      });


      // Remove an item from the cart
      container.delegate('.jcart-remove', 'click', function(e){
         remove($(this));
         e.preventDefault();
      });

   }()); // End JCART namespace

}); // End the document ready function