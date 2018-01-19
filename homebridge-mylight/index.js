
"use strict";

var rpio = require("rpio");

var Service, Characteristic, HomebridgeAPI;

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  HomebridgeAPI = homebridge;
  homebridge.registerAccessory("homebridge-mylight", "MyLight", MyLight);
}

function MyLight(log, config) {
  this.log = log;
  this.name = config.name;

  this._service = new Service.LightSensor(this.name);
var self = this;
  this.information = new Service.AccessoryInformation();
  this.information
  .setCharacteristic(Characteristic.Manufacturer, "Marc Julian Schwarz")
  .setCharacteristic(Characteristic.Model, "iBright")
  .setCharacteristic(Characteristic.SerialNumber, "1-2-3")
  .setCharacteristic(Characteristic.FirmwareRevision, "1.0.0");

	function checkLight(){
        	var pin = 11;
        	var startZeit = Date.now();
        	rpio.open(pin, rpio.OUTPUT);
        	rpio.write(pin, rpio.LOW);
        	rpio.msleep(100);
        	rpio.open(pin, rpio.INPUT);
        		while(rpio.read(pin) == 0){
				if(Date.now() - startZeit > 5000){
					rpio.msleep(500);
					self._service.getCharacteristic(Characteristic.CurrentAmbientLightLevel).setValue(500);
				}
	        	}
        	var x = Date.now() - startZeit;

		self._service.getCharacteristic(Characteristic.CurrentAmbientLightLevel).setValue(x);
		setTimeout(checkLight, 500);
	}

	checkLight();

}


MyLight.prototype.getServices = function() {
  return [this._service, this.information];
}

