import { mqtt, iot } from 'aws-iot-device-sdk-v2';
import Swal from "sweetalert2";

const thingName = "";

let connection;
let messageCallback;

const messageHandler = (topic, messageBody) => {
    const decoder = new TextDecoder('utf8');
    const json = decoder.decode(messageBody);
    const message = JSON.parse(json);
    console.log(`Received a message on topic ${topic}: ${message}`);
    messageCallback(message);
}

export const connect = (callback) => {
    let config_builder = iot.AwsIotMqttConnectionConfigBuilder.new_mtls_builder_from_path("sensor1.cert.pem", "sensor1.public.key");

    const config = config_builder.build();
    const client = new mqtt.MqttClient();
    connection = client.new_connection(config);
    messageCallback = callback

    connection.subscribe(
        'sensor/+/room1',
        mqtt.QoS.AtLeastOnce,
        messageHandler
    );
    
    connection.subscribe(
        `$aws/things/${thingName}/shadow/update/accepted`,
        mqtt.QoS.AtLeastOnce,
        () => {
            Swal.fire(
                'Succesfully updated device shadow!',
                "",
                'success')
        }
    );
    
    connection.subscribe(
        `$aws/things/${thingName}/shadow/update/rejected`,
        mqtt.QoS.AtLeastOnce,
        () => {
            Swal.fire(
                'The device shadow update was rejected...',
                "",
                'error')
        }
    );
}

export const publishMessage = (message: string) => {
    connection.publish(
        'sensor/temperature/room1',
        JSON.stringify({
            message: message
        }),
        mqtt.QoS.AtLeastOnce
    );
}

export const fetchShadow = () => {
    connection.publish(
        `$aws/things/${thingName}/shadow/get`,
        JSON.stringify({}),
        mqtt.QoS.AtLeastOnce
    );
}

export const updateShadow = (featureFlag) => {
    connection.publish(
        `$aws/things/${thingName}/shadow/update`,
        JSON.stringify({
            state: {
                desired: {
                    featureEnabled: featureFlag
                }
            }
        }),
        mqtt.QoS.AtLeastOnce
    );
}

