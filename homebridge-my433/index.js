"use strict";

var rpi433 = require("rpi-433");
var rpio = require("rpio");

var Service, Characteristic, HomebridgeAPI;

module.exports = function(homebridge) {
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;
	HomebridgeAPI = homebridge;
	homebridge.registerAccessory("homebridge-my433", "My433", My433);
}

function My433(log, config) {
	this.log = log;
	this.name = config.name;
	this.pin = config.pin;
	this.codeOn = config.codeOn;
	this.codeOff = config.codeOff;
	this.pulse = config.pulseLength;
	this.last  = config.last;
        this.manufacturer = config.manufacturer;
        this.model = config.model;
        this.version = config.version;
        this.serial = config.serial;

	this._service = new Service.Switch(this.name);
	this._service.getCharacteristic(Characteristic.On).on('set', this._setOn.bind(this));

        this.information = new Service.AccessoryInformation();
        this.information
                .setCharacteristic(Characteristic.Manufacturer, this.manufacturer)
                .setCharacteristic(Characteristic.Model, this.model)
                .setCharacteristic(Characteristic.SerialNumber, this.serial)
                .setCharacteristic(Characteristic.FirmwareRevision, this.version);


}

My433.prototype.getServices = function() {
	return [this._service, this.information];
}

My433.prototype._setOn = function(on, callback) {

	var rfEmitter = rpi433.emitter({
			pin: this.pin,
			pulseLength: this.pulse
		});

	if(on){
		rfEmitter.sendCode(this.codeOn, function(error, stdout) {
			if(!error) console.log(stdout);
		});
	}else{
		rfEmitter.sendCode(this.codeOff, function(error, stdout) {
       		        if(!error) console.log(stdout);
    	 	});
	}

callback();


}
