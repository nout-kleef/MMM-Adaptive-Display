const NodeHelper = require("node_helper");
const exec = require("child_process").exec;

module.exports = NodeHelper.create({
	start: function () {
		this.started = false;
	},

	activateMonitor: function () {
		this.started = false;
	},

	deactivateMonitor: function () {
		this.started = false;
	},

	// Subclass socketNotificationReceived received.
	socketNotificationReceived: function (notification, payload) {
		if (notification === "MOTION_DETECTED" && this.started === false) {
			console.log("MMM-Adaptive-Display: MOTION_DETECTED, score " + payload.score);
			this.started = true;
			this.activateMonitor();
		}
		if (notification === "DEACTIVATE_MONITOR" && this.started === false) {
			console.log("MMM-Adaptive-Display: DEACTIVATE_MONITOR, percentage off: " + payload.percentageOff);
			this.started = true;
			this.deactivateMonitor();
		}
	}
});
