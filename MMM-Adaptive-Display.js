Module.register("MMM-Adaptive-Display", {

	defaults: {
		captureIntervalTime: 3000, // 3 seconds
		scoreThreshold: 10,
		timeout: 120000, // 2 minutes
		adjustContrast: true
	},

        contrast: null, // display's contrast
	brightness: null, // display's brightness
	illumination: {
		curr: null,
	},
	error: null,

	getHeader: function () {
		return "MMM-Adaptive-Display";
	},

	getScripts: function () {
		return [
		];
	},

	getTemplate: function () {
		return "MMM-Adaptive-Display.njk";
	},

	getTemplateData: function () {
		return {
			contrast: this.contrast,
			brightness: this.brightness,
			illumination: this.illumination.curr,
			error: this.error
		};
	},

	start: function () {
		Log.info("MMM-Adaptive-Display: starting up");
		this.data.header = "MMM-Adaptive-Display";
	}
});
