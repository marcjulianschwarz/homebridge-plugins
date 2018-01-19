"use strict";

var request = require("request");
var rpio = require("rpio");
var Service, Characteristic, HomebridgeAPI;

module.exports = function(homebridge) {
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;
	HomebridgeAPI = homebridge;
	homebridge.registerAccessory("homebridge-mymotion", "MyMotion", MyMotion);
}

function MyMotion(log, config) {

	this.log = log;
	this.name = config.name;
        this.manufacturer = config.manufacturer;
        this.model = config.model;
        this.version = config.version;
        this.serial = config.serial;

	this._service = new Service.MotionSensor(this.name);

        this.information = new Service.AccessoryInformation();
        this.information
                .setCharacteristic(Characteristic.Manufacturer, this.manufacturer)
                .setCharacteristic(Characteristic.Model, this.model)
                .setCharacteristic(Characteristic.SerialNumber, this.serial)
                .setCharacteristic(Characteristic.FirmwareRevision, this.version);

	this._state = false;
	var self = this;

	function ledOn(){
		rpio.open(40, rpio.OUTPUT);
		rpio.write(40, rpio.HIGH);
		rpio.msleep(300);
		rpio.write(40, rpio.LOW);
	}

	function check() {
		var moving = false;
		rpio.open(35, rpio.INPUT);

		if(rpio.read(35) == 1){
			moving = true;
		}
		if(moving != self._state) {
			self._service.getCharacteristic(Characteristic.MotionDetected).setValue(moving);
			self._state = moving;
			ledOn();
		}
		setTimeout(check, 500);
	}

	check();

}


MyMotion.prototype.getServices = function() {
  return [this._service, this.information];
}

