var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
var regex = new RegExp(expression);
var t = 'www.google.com';




var requestOptions = {
	method: 'GET',
};


function req(url, image_url) {
	fetch(url, requestOptions)
		.then(response => response.json())
		.then((results) => {
			frappe.web_form.set_value("results", `
			<div class="row">
			<div class="col-12 col-md-8"><img class="img-fluid" src="${image_url}"/></div>
			<div class="col-12 col-md-4">  
			<svg class="radial-progress" data-percentage="${results.resultOfPredicting[image_url].result}" viewBox="0 0 80 80">
   			<circle class="incomplete" cx="40" cy="40" r="35"></circle>
    			<circle class="complete" cx="40" cy="40" r="35" style="stroke-dashoffset: 39.58406743523136;"></circle>
    			<text class="percentage" x="50%" y="57%" transform="matrix(0, 1, -1, 0, 80, 0)">${results.resultOfPredicting[image_url].result}</text>
    			</svg> <svg class="radial-progress" data-percentage="33" viewBox="0 0 80 80">
			</div>
			</div>
			<style>
			
svg.radial-progress {
	height: auto;
	max-width: 200px;
	padding: 1em;
	transform: rotate(-90deg);
	width: 100%;
   }
   
   svg.radial-progress circle {
	fill: rgba(0,0,0,0);
	stroke: #fff;
	stroke-dashoffset: 219.91148575129; /* Circumference */
	stroke-width: 10;
   }
   
svg.radial-progress circle.incomplete { opacity: 0.25; }

svg.radial-progress circle.complete { stroke-dasharray: 219.91148575129; /* Circumference */ }

svg.radial-progress text {
  fill: #fff;
  font: 400 1em/1 'Oswald', sans-serif;
  text-anchor: middle;
}

/*** COLORS ***/
/* Primary */

svg.radial-progress circle { stroke: #fddc32; }
			</style>`);
			$('svg.radial-progress').each(function( index, value ) { 
				$('circle.complete').removeAttr( 'style' );
			});
			
			setTimeout(function() {
				
				$('svg.radial-progress').each(function( index, value ) { 
					// If svg.radial-progress is approximately 25% vertically into the window when scrolling from the top or the bottom
					       // Get percentage of progress
						   percent = parseFloat($(value).data('percentage'));
						   // Get radius of the svg's circle.complete
						   radius = parseFloat($('circle.complete').attr('r'));
						   // Get circumference (2πr)
						   circumference =  Math.PI * radius;
						   // Get stroke-dashoffset value based on the percentage of the circumference
						   strokeDashOffset = -((percent  *circumference) / 100);
                    console.log(percent , radius , circumference , strokeDashOffset)
						   // Transition progress for 1.25 seconds
						   $('circle.complete').animate({'stroke-dashoffset': strokeDashOffset}, 1250);
					    
					});
				}, 2000);
					
					
})
		.catch(error => console.info(error + " url: " + url))
};




frappe.ready(function () {
	frappe.web_form.validate = (e) => {
		var image_url = frappe.web_form.get_value("images");
		if (image_url.match(regex)) {
			image_url = image_url
		}
		else {
			image_url = `https://app.betrend.live/${image_url}`
		}
		var url = new URL(`https://mind.betrend.live/predict?image_url=${image_url}`)
		console.log(url.href);

		req(url, image_url)
	}



})


