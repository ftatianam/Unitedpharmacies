            <!-- use on jquery UI Search top-->
			$( "#search_text" ).autocomplete({
				source: "search_text_query.php",minLength: 2,  
				select: function(event, ui) { 
						$("#search_text").val(ui.item.label);
						$("#header_search_Form").submit(); }				 
			});
			<!-- use on jquery UI Search top-->
