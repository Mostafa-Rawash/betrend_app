// prepare the requeest
var num = 3;
var search_query = "welcome";

var requestOptions = {
	method: 'GET',
	redirect: 'follow'
};


function req(url) {
	fetch(url, requestOptions)
		.then(response => response.json())
		.then(result => {
			// var strings = '<br><hr><br><br><div class="container"><div class="row photos">'
			var strings = '<br><hr><br><br><div class="container"><div class="row photos"><div class="col-lg-4 col-md-12 mb-4 mb-lg-0">'
			console.log(result)
			for (const i in result.images){
				strings += `
				<img
				src=${result.images[i]}
				class="w-100 shadow-1-strong rounded mb-4"
				alt="Boat on Calm Water"
			   />`
				// strings += `<div class="col-12  col-md-4 col-lg-3 item"><a data-lightbox="photos" href="${result.images[i]}"><img class="img-fluid mb-4" src="${result.images[i]}"></a></div>`

			}
		
				// strings += '</div> </div>'
				strings += '</div> </div></div>'
				frappe.web_form.set_value("search_results",strings)
			}
			
			)
		.catch(error => console.log('error', error));
}

frappe.ready(function (frm) {

	frappe.web_form.after_load = () => {

	frappe.web_form.on("	" , (e) => {
		num = frappe.web_form.get_value("number_of_images");
		search_query = frappe.web_form.get_value("query_text")
		var url = `https://betrend.live:5000/search?text=${search_query}&num=${num}`
		req(url)
		console.log(url);
	})
	}

})
