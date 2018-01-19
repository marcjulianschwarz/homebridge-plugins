"use strict";
var fs = require("fs");
var rpio = require("rpio");
var Service, Characteristic, HomebridgeAPI;

module.exports = function(homebridge) {
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;
	HomebridgeAPI = homebridge;
	homebridge.registerAccessory("homebridge-mytemp", "MyTemp", MyTemp);
}

function MyTemp(log, config) {
	this.log = log;
	this.name = config.name;
        this.manufacturer = config.manufacturer;
        this.model = config.model;
        this.version = config.version;
        this.serial = config.serial;


	this._service = new Service.TemperatureSensor(this.name);
	this._service
		.getCharacteristic(Characteristic.CurrentTemperature)
		.setProps({ minValue: -100, maxValue: 100 })
		.on("get", this.getTemperatureState.bind(this));

        this.information = new Service.AccessoryInformation();
        this.information
               	.setCharacteristic(Characteristic.Manufacturer, this.manufacturer)
                .setCharacteristic(Characteristic.Model, this.model)
                .setCharacteristic(Characteristic.SerialNumber, this.serial)
                .setCharacteristic(Characteristic.FirmwareRevision, this.version);

}

MyTemp.prototype.getServices = function() {
	return [this._service, this.information];
}

MyTemp.prototype.getTemperatureState = function(callback) {

	var s = fs.readFileSync("/sys/bus/w1/devices/28-0000070fd5f2/w1_slave").toString()
	var i = s.indexOf("t=");
	s = s.substr(i + 2);
	var t = Math.round(parseInt(s) / 100)/10;

	callback(null, t);

	rpio.open(40, rpio.OUTPUT);
	rpio.write(40, rpio.HIGH);
	rpio.sleep(1);
	rpio.write(40, rpio.LOW);


}

