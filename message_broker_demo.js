import { mqtt, iot } from 'aws-iot-device-sdk-v2';

const thingName = "sensor2";

const messageHandler = (topic, messageBody) => {
    const decoder = new TextDecoder('utf8');
    const message = decoder.decode(messageBody);
    console.log(`Received a message on topic ${topic}: ${message}`);
}

let config_builder = iot.AwsIotMqttConnectionConfigBuilder.new_mtls_builder_from_path("sensor2-certificate.pem.crt", "sensor2-public.pem.key");

console.log("===== CONNECTING =====");
config_builder.with_client_id(thingName);
config_builder.with_endpoint("a16vy80ou5ptdp-ats.iot.eu-west-1.amazonaws.com");
const config = config_builder.build();
const client = new mqtt.MqttClient();
const connection = client.new_connection(config);
connection.connect();

console.log("===== SUBSCRIBING =====");

await connection.subscribe(
    'sensor/+/room1',
    mqtt.QoS.AtLeastOnce,
    messageHandler
);

console.log("===== SUBSCRIBED =====");

console.log("===== PUBLISHINING =====");

for(let i = 0; i < 10; i++) {
    await connection.publish(
        'sensor/temperature/room1',
        JSON.stringify({
            message: `Test message ${i}`
        }),
        mqtt.QoS.AtLeastOnce
    );
}

console.log("===== DONE =====");
