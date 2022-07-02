// var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
// var regex = new RegExp(expression);
// var t = 'www.google.com';

// // prepare the requeest
// var requestOptions = {
// 	method: 'GET',
// 	redirect: 'follow',
// };


// function get_data(template_name) {
// 	var title = frappe.web_form.get_value("profile_name");
// 	var title = frappe.web_form.get_value("title");
// 	var subtitle = frappe.web_form.get_value("subtitle");
// 	var size = frappe.web_form.get_value("size");
// 	var image = frappe.web_form.get_value("image_url");
// 	var backgroundColor = frappe.web_form.get_value("backgroundColor");
// 	var profileImage = frappe.web_form.get_value("profileImage");
// 	var textColor = frappe.web_form.get_value("textColor");
// 	var fontUrl = frappe.web_form.get_value("fontUrl");
// 	var fontSize = frappe.web_form.get_value("fontSize ");
// 	var fontWeight = frappe.web_form.get_value("fontWeight");
// 	var logoMargin = frappe.web_form.get_value("logoMargin");
// 	var logoPadding = frappe.web_form.get_value("logoPadding");
// 	var logoSize = frappe.web_form.get_value("logoSize");
// 	var eyebrow = frappe.web_form.get_value("eyebrow");
// 	var logo = frappe.web_form.get_value("logo");
// 	var split = frappe.web_form.get_value("split");
// 	var location = frappe.web_form.get_value("location");
// 	var rate = frappe.web_form.get_value("rate");
// 	var mugshot = frappe.web_form.get_value("mugshot");
// 	backgroundColor = `%23${color}`
// 	return { template_name, title, subtitle, size, image, backgroundColor, profileImage, textColor, fontUrl, fontSize, fontWeight, googleFont, logoMargin, logoPadding, logoSize }
// }

// function req(data) {
// 	if (!data.image.match(regex))
// 		data.image = `https://app.betrend.live/${image}`

// 	if (data.template_name == null) {
// 		url = `https://ogi.sh/preview?title=${data.title}&imageUrl=${data.image}&subtitle=${data.subtitle}&size=${data.size}&backgroundColor=${data.color}&profileImage=${data.profileImage}&textColor=${data.textColor}&&&&`

// 	} else {
// 		url = `https://ogi.sh/preview?template=${data.template_name}&title=${data.title}&imageUrl=${data.image}&subtitle=${data.subtitle}&size=${data.size}&backgroundColor=${data.color}&profileImage=${data.profileImage}&textColor=${data.textColor}&&&&`
// 	}
// 	console.log(url);
// 	fetch(url, requestOptions)
// 		.then(response => response.blob())
// 		.then(result => {
// 			let image = URL.createObjectURL(result)
// 			var strings = '<br><hr><br><br><div class="container"><div class="row photos">'
// 			console.log(result)
// 			strings += `<div class="col-12 item"><a data-lightbox="photos" href="${image}"><img class="img-fluid shadow rounded" src="${image}"></a></div>`
// 			strings += '</div> </div>'

// 			frappe.web_form.set_value("results", strings)
// 		}).then(() => {
// 			$("img.img-fluid").mousemove(function (e) {
// 				if (e.offsetX > ($(this).offset().left + $(this).width() / 2)) {
// 					nmpX = ((($(this).offset().left + $(this).width() / 2) - e.offsetX) / ($(this).offset().left + $(this).width() / 2)) * 10
// 				} else {
// 					nmpX = ((e.offsetX - ($(this).offset().left + $(this).width() / 2)) / ($(this).offset().left + $(this).width() / 2)) * 10
// 				}
// 				if (e.offsetY > ($(this).offset().top + $(this).height() / 2)) {
// 					nmpY = ((($(this).offset().top + $(this).height() / 2) - e.offsetY) / ($(this).offset().top + $(this).height() / 2)) * 10
// 				} else {
// 					nmpY = ((e.offsetY - ($(this).offset().top + $(this).height() / 2)) / ($(this).offset().top + $(this).height() / 2)) * 10
// 				}
// 				console.log(e.offsetX, "   ", ($(this).offset().left + $(this).width() / 2), nmpX, nmpY);
// 				$(this).css({ "transform": `perspective(1000px) rotateX(${nmpX}deg) rotateY(${nmpY}deg) scale3d(1, 1, 1)` })


// 			})
// 		})
// 		.catch(error => console.log('error', error));
// 	}
	
	
frappe.ready(function (frm) {
		console.log("ready");
		// $(".templates .img-fluid").each(function (index, value) {
	
		// 		$(this).on("click", function () {
		// 			console.log(index);
	
		// 			if (index == '0') {
		// 				frappe.web_form.set_df_property('logo', 'hidden', 1);
		// 				frappe.web_form.set_df_property('profile_name', 'hidden', 1);
		// 				frappe.web_form.set_df_property('subtitle', 'hidden', 1);
		// 				frappe.web_form.set_df_property('profileImage', 'hidden', 1);
		// 				frappe.web_form.set_df_property('rate', 'hidden', 1);
		// 				frappe.web_form.set_df_property('location ', 'hidden', 1);
	
		// 				frappe.web_form.set_df_property('textColor', 'hidden', 1);
		// 				frappe.web_form.set_df_property('fontUrl', 'hidden', 1);
		// 				frappe.web_form.set_df_property('mugshot', 'hidden', 1);
		// 				frappe.web_form.set_df_property('brand', 'hidden', 1);
		// 				frappe.web_form.set_df_property('fontSize', 'hidden', 1);
		// 				frappe.web_form.set_df_property('eyebrow', 'hidden', 1);
		// 				frappe.web_form.set_df_property('fontWeight', 'hidden', 1);
		// 				frappe.web_form.set_df_property('googleFont', 'hidden', 1);
		// 				frappe.web_form.set_df_property('logoMargin', 'hidden', 1);
		// 				frappe.web_form.set_df_property('split', 'hidden', 1);
		// 				frappe.web_form.set_df_property('logoPadding', 'hidden', 1);
		// 				frappe.web_form.set_df_property('logoSize', 'hidden', 1);
		// 				get_data("gzzIXzt5-")}
		// 			else if (index == '1') {
		// 				frappe.web_form.set_df_property('size', 'hidden', 1);
		// 				frappe.web_form.set_df_property('logo', 'hidden', 1);
		// 				frappe.web_form.set_df_property('profile_name', 'hidden', 1);
		// 				frappe.web_form.set_df_property('eyebrow', 'hidden', 1);
		// 				frappe.web_form.set_df_property('profileImage', 'hidden', 1);
		// 				frappe.web_form.set_df_property('textColor', 'hidden', 1);
		// 				frappe.web_form.set_df_property('image_url', 'hidden', 1);
		// 				frappe.web_form.set_df_property('fontSize ', 'hidden', 1);
		// 				frappe.web_form.set_df_property('fontWeight', 'hidden', 1);
		// 				frappe.web_form.set_df_property('logoMargin', 'hidden', 1);
		// 				frappe.web_form.set_df_property('split', 'hidden', 1);
		// 				frappe.web_form.set_df_property('logoPadding', 'hidden', 1);
		// 				frappe.web_form.set_df_property('logoSize', 'hidden', 1);
		// 				frappe.web_form.set_df_property('mugshot', 'hidden', 1);
		// 				frappe.web_form.set_df_property('brand', 'hidden', 1);
		// 				frappe.web_form.set_df_property('backgroundColor', 'hidden', 1);
		// 				frappe.web_form.set_df_property('rate', 'hidden', 1);
		// 				frappe.web_form.set_df_property('location ', 'hidden', 1);
		// 				frappe.web_form.set_df_property('fontUrl', 'hidden', 1);
		// 				get_data("T8iD-enZo")}
		// 			else if (index == '2') {
		// 				frappe.web_form.set_df_property('rate', 'hidden', 1);
		// 				frappe.web_form.set_df_property('mugshot', 'hidden', 1);
		// 				frappe.web_form.set_df_property('brand', 'hidden', 1);
		// 				frappe.web_form.set_df_property('location ', 'hidden', 1);
		// 				frappe.web_form.set_df_property('split', 'hidden', 1);
		// 				frappe.web_form.set_df_property('size', 'hidden', 1);
		// 				frappe.web_form.set_df_property('title', 'hidden', 1);
		// 				frappe.web_form.set_df_property('logo', 'hidden', 1);
		// 				frappe.web_form.set_df_property('image_url', 'hidden', 1);
		// 				frappe.web_form.set_df_property('eyebrow', 'hidden', 1);
		// 				get_data(null)}
		// 			else if (index == '3') {
		// 				frappe.web_form.set_df_property('logo', 'hidden', 1);
		// 				frappe.web_form.set_df_property('profile_name', 'hidden', 1);
		// 				frappe.web_form.set_df_property('profileImage', 'hidden', 1);
		// 				frappe.web_form.set_df_property('textColor', 'hidden', 1);
		// 				frappe.web_form.set_df_property('fontSize ', 'hidden', 1);
		// 				frappe.web_form.set_df_property('rate', 'hidden', 1);
		// 				frappe.web_form.set_df_property('location ', 'hidden', 1);
		// 				frappe.web_form.set_df_property('mugshot', 'hidden', 1);
		// 				frappe.web_form.set_df_property('brand', 'hidden', 1);
		// 				frappe.web_form.set_df_property('fontWeight', 'hidden', 1);
		// 				frappe.web_form.set_df_property('split', 'hidden', 1);
		// 				frappe.web_form.set_df_property('logoMargin', 'hidden', 1);
		// 				frappe.web_form.set_df_property('logoPadding', 'hidden', 1);
		// 				frappe.web_form.set_df_property('logoSize', 'hidden', 1);
		// 				frappe.web_form.set_df_property('backgroundColor', 'hidden', 1);
		// 				frappe.web_form.set_df_property('fontUrl', 'hidden', 1);
		// 				get_data("article")}
		// 			else if (index == '4') {
		// 				frappe.web_form.set_df_property('eyebrow', 'hidden', 1);
		// 				frappe.web_form.set_df_property('logo', 'hidden', 1);
		// 				frappe.web_form.set_df_property('profile_name', 'hidden', 1);
		// 				frappe.web_form.set_df_property('profileImage', 'hidden', 1);
		// 				frappe.web_form.set_df_property('textColor', 'hidden', 1);
		// 				frappe.web_form.set_df_property('mugshot', 'hidden', 1);
		// 				frappe.web_form.set_df_property('brand', 'hidden', 1);
		// 				frappe.web_form.set_df_property('fontSize', 'hidden', 1);
		// 				frappe.web_form.set_df_property('fontWeight', 'hidden', 1);
		// 				frappe.web_form.set_df_property('logoMargin', 'hidden', 1);
		// 				frappe.web_form.set_df_property('logoPadding', 'hidden', 1);
		// 				frappe.web_form.set_df_property('logoSize', 'hidden', 1);
		// 				frappe.web_form.set_df_property('backgroundColor', 'hidden', 1);
		// 				frappe.web_form.set_df_property('fontUrl', 'hidden', 1);
		// 				frappe.web_form.set_df_property('rate', 'hidden', 1);
		// 				frappe.web_form.set_df_property('location ', 'hidden', 1);
		// 				get_data("fiftyfifty")}
		// 			else if (index == '5') {
		// 				frappe.web_form.set_df_property('subtitle', 'hidden', 1);
		// 				frappe.web_form.set_df_property('image_url', 'hidden', 1);
		// 				frappe.web_form.set_df_property('split', 'hidden', 1);
		// 				frappe.web_form.set_df_property('eyebrow', 'hidden', 1);
		// 				frappe.web_form.set_df_property('logo', 'hidden', 1);
		// 				frappe.web_form.set_df_property('profile_name', 'hidden', 1);
		// 				frappe.web_form.set_df_property('mugshot', 'hidden', 1);
		// 				frappe.web_form.set_df_property('brand', 'hidden', 1);
		// 				frappe.web_form.set_df_property('profileImage', 'hidden', 1);
		// 				frappe.web_form.set_df_property('textColor', 'hidden', 1);
		// 				frappe.web_form.set_df_property('fontSize ', 'hidden', 1);
		// 				frappe.web_form.set_df_property('fontWeight', 'hidden', 1);
		// 				frappe.web_form.set_df_property('logoMargin', 'hidden', 1);
		// 				frappe.web_form.set_df_property('logoPadding', 'hidden', 1);
		// 				frappe.web_form.set_df_property('logoSize', 'hidden', 1);
		// 				frappe.web_form.set_df_property('backgroundColor', 'hidden', 1);
		// 				frappe.web_form.set_df_property('fontUrl', 'hidden', 1);
		// 				get_data("wellpaid")}
		// 			else if (index == '6') {
		// 				frappe.web_form.set_df_property('rate', 'hidden', 1);
		// 				frappe.web_form.set_df_property('location ', 'hidden', 1);
		// 				frappe.web_form.set_df_property('subtitle', 'hidden', 1);
		// 				frappe.web_form.set_df_property('image_url', 'hidden', 1);
		// 				frappe.web_form.set_df_property('split', 'hidden', 1);
		// 				frappe.web_form.set_df_property('eyebrow', 'hidden', 1);
		// 				frappe.web_form.set_df_property('profileImage', 'hidden', 1);
		// 				frappe.web_form.set_df_property('textColor', 'hidden', 1);
		// 				frappe.web_form.set_df_property('fontSize ', 'hidden', 1);
		// 				frappe.web_form.set_df_property('fontWeight', 'hidden', 1);
		// 				frappe.web_form.set_df_property('logoMargin', 'hidden', 1);
		// 				frappe.web_form.set_df_property('logoPadding', 'hidden', 1);
		// 				frappe.web_form.set_df_property('logoSize', 'hidden', 1);
		// 				frappe.web_form.set_df_property('backgroundColor', 'hidden', 1);
		// 				frappe.web_form.set_df_property('fontUrl', 'hidden', 1);
		// 				get_data("-QqZSSkoa")}
		// 		})
		// 	})

		
		frappe.web_form.after_load = () => {
			console.log("loaded");
			
		}
			
})
