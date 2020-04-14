const NodeHelper = require("node_helper");
const childProcess = require("child_process");
const exec = require("util").promisify(childProcess.exec);

module.exports = NodeHelper.create({
	start: function () {
		const isMonitorOn = this.isMonitorOn();
		console.log("MMM-MotionDetector: monitor on " + isMonitorOn);
	},

	activateMonitor: async function () {
		const isMonitorOn = this.isMonitorOn();
		if (!isMonitorOn) {
			await exec("vcgencmd display_power 1");
		}
	},

	deactivateMonitor: async function () {
		const isMonitorOn = this.isMonitorOn();
		if (isMonitorOn) {
			await exec("vcgencmd display_power 0");
		}
	},

	isMonitorOn: async () => {
		try {
			const result = await exec("vcgencmd display_power");
			console.log("MMM-MotionDetector: monitor " + JSON.stringify(result.stdout));
			return result.stdout.includes("=1");
		} catch (error) {
			console.error("MMM-MotionDetector: error calling monitor status: " + error);
			return false;
		}
	},

	// Subclass socketNotificationReceived received.
	socketNotificationReceived: function (notification, payload) {
		if (notification === "MOTION_DETECTED") {
			console.log("MMM-MotionDetector: MOTION_DETECTED, score " + payload.score);
			this.activateMonitor().then(() => {
				console.log("MMM-MotionDetector: monitor has been activated");
			}).catch(error => {
				console.error("MMM-MotionDetector: error activating monitor: " + error);
			});
		}
		if (notification === "DEACTIVATE_MONITOR") {
			console.log("MMM-MotionDetector: DEACTIVATE_MONITOR, percentage off: " + payload.percentageOff);
			this.deactivateMonitor().then(() => {
				console.log("MMM-MotionDetector: monitor has been deactivated");
			}).catch(error => {
				console.error("MMM-MotionDetector: error deactivating monitor: " + error);
			});
		}
	}
});
