function form_element_2_url(element_id,element_url)
{			
	var elem = document.getElementById(element_id).elements;
	var load_url = "";
	var temp_elem_name = "";

   for(var i = 0; i < elem.length; i++)
   {
		if(elem[i].checked == true)
		{	   
			if(temp_elem_name == elem[i].name)
			{
				load_url = load_url + "," + elem[i].value;
			}
			else
			{
				load_url = load_url + "&" + elem[i].name + "=" + elem[i].value;				
				temp_elem_name = elem[i].name;				
			}
		}
	}
	parent.window.location = element_url + ".html?" + load_url;
}

