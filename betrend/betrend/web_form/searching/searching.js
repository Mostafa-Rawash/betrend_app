	// prepare the requeest
	var num = 3;
	var search_query = "welcome";

	var requestOptions = {
		method: 'POST',
		redirect: 'follow'
	};


	function req(baseurl) {
		console.log(baseurl);
		fetch(baseurl, requestOptions)
			.then(response => response.json())
			.then(result => {
				var strings = '<div class="row d-flex justify-content-around">'
				console.log(result)
				for (const i in result.images){
					strings += `<img src="${result.images[i]}" class="col-3  m-2 images_search_results p-0" loading="lazy"     width="235" >`
				}
			
					strings += '</div>'
					frappe.web_form.set_value("search_results",strings)
				}
				
				)
			.catch(error => console.log('error', error));
	}

	frappe.ready(function (frm) {
		frappe.web_form.validate = () => {
			// return false if not valid
			num = frappe.web_form.get_value("number_of_images");
			search_query = frappe.web_form.get_value("query_text")
			var baseurl = `https://mind.betrend.live/search?text=${search_query}&num=${num}`
			console.log(baseurl);
			req(baseurl)
		}
		 
		// frappe.web_form.after_save = (e) => {
		// }


	})
