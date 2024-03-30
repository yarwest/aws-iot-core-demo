# AWS IoT Core Client Frontend

React application simulating an IoT agent integrating with (AWS IoT Core)[https://aws.amazon.com/iot-core/].

## MQTT Pub Sub
This application allows sending and receiving messages by subscribing and publishing to the MQTT message broker.
During the loading of the page the application subscribes using a wildcard topic: `sensor/+/room1`, the incoming messages are shown on the page.
The application allows publishing to the topic `sensor/temperature/room1` using the input on the web page.

## Device Shadow
Additionally the application allows interacting with a Device Shadow through reserved MQTT topics provided by AWS.
It does so by publising a message to the `$aws/things/thingName/shadow/update` topic, with the `desired` state of the `featureEnabled` property. This can be done using the "Enable feature" & "Disable feature" buttons.
The application subscribes to the `$aws/things/thingName/shadow/update/accepted` & `$aws/things/thingName/shadow/update/rejected` topics to be notified upon changes to the device shadow & the success of our state update.
Additionally the application allows displaying the current shadow state by publishing to the `$aws/things/thingName/shadow/get` topic, using the "Fetch shadow" button.
