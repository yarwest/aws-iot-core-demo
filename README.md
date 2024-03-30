# AWS IoT Core demo

Demonstration of integration with AWS IoT Core.

## Frontend application
The `client` directory contains a React application which simulates an IoT client.
The application allows the sending and receiving of MQTT messages using the Message Broker.
Additionally, it is possible to interact with the Device Shadow API using AWS reserved MQTT topics.

## Light weight demo client
`message_broker_demo.js` contains a script showcasing the integration with the Message Broker.
Initially the script subscribes to IoT Core using a wildcard topic.
Afterwards a series of messages are published to a topic matching this wildcard.
Upon receiving the messages through the subscription they are printed.
