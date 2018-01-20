# Homebridge on Raspberry Pi

Plugins for Homebridge.

## Getting Started

Install homebridge on your Raspberry Pi as described [here](https://github.com/nfarina/homebridge/blob/master/README.md).

## Install plugins for testing

To test a new plugin withut installing it globally you can use this command:

```
homebridge -P path/of/the/plugin/homebridge-myplugin/
```

For more plugins:

```
homebridge -P first/path/homebridge-firstplugin/ -P second/path/homebridge-secondplugin/
```

## Install plugins globally (unrecommended when testing plugins)

```
npm install -g homebridge-myplugin 
```

## Authors

* [**Marc Julian Schwarz**](https://github.com/marcschwarz)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.
