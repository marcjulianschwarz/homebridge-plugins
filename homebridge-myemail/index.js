"use strict";

var request = require("request");
var Service, Characteristic, HomebridgeAPI;

module.exports = function(homebridge) {
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;
	HomebridgeAPI = homebridge;
	homebridge.registerAccessory("homebridge-myemail", "MyEmail", MyEmail);
}

function MyEmail(log, config) {
	this.log = log;
	this.name = config.name;
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

MyEmail.prototype.getServices = function() {
	return [this._service, this.information];
}

MyEmail.prototype._setOn = function(on, callback) {

	var msg = "";
	if(on){
		msg = "Ich+bin+von+Zuhause+weggegangen.";
	}else{
		msg = "Ich+bin+Zuhause+angekommen.";
	}

request({
  uri: "http:/" + "/www.your-domaine.de/mailer ---- " + msg + "-------",
  method: "GET"
});

  callback();
}
