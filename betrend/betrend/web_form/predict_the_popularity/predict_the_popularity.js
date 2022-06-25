var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
var regex = new RegExp(expression);
var t = 'www.google.com';




var requestOptions = {
	method: 'GET',
	redirect: 'follow'
};


function req(url ,image_url) {
	fetch(url, requestOptions)
		.then(response => response.json())
		.then((result) => {
			console.log(result)
			frappe.web_form.set_value("results",`<a href="${image_url}" download>
			
			<img src="${image_url}" alt="yoast seo" height="288" width="388">
			</a>
			<h1>${result.predect_result}</h1>`)
		})
		.catch(error => console.log('error', error));
}



frappe.ready(function () {
	frappe.web_form.after_save = (e) => {
		var image_url = frappe.web_form.get_value("images");
		if (image_url.match(regex)) {
			var url = new URL(`https://betrend.live:5000/predict?image_url=${image_url}`)
		}
		else {
			var url = new URL(`https://betrend.live:5000/predict?image_url=https://app.betrend.live/${image_url}`)
		}
		console.log(url.href);

		req(url ,image_url)
	}
})