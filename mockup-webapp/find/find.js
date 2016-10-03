$(function() {
	// range slider
    var slider = document.getElementById('search-slider');
    noUiSlider.create(slider, {
        start: [0, 300],
        connect: true,
        step: 1,
        tooltips: true,
        range: {
            'min': 0,
            'max': 1500
        }
    });
})