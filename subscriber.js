const mqtt = require('mqtt');

const username = 'gepc-subs';
const password = '14d1b530';
const clientId = 'f44a7c6a-219f-417d-9a1d-f2bafd38ad53';
const host = '10.246.0.10:1883';
const MQTT_TOPIC = 'MC/V1/testing';
const MQTT_QOS = 1;
//var client = mqtt.connect('mqtt://test.mosquitto.org:1883');
const client = mqtt.connect(`mqtt://${username}:${password}@${host}`, {
    clientId,
    clean: true,
    rejectUnauthorized: false
});

client.on('connect', () => {
    console.log('Connected to Telenor Connexion MQTT broker');
});
// Subscribe to MQTT topic
client.subscribe(MQTT_TOPIC, { qos: MQTT_QOS }, function(err) {
    if (err) {
        console.error(`Failed to subscribe to topic: ${err}`);
    } else {
        console.log(`Subscribed to topic: ${MQTT_TOPIC}`);
    }
});


client.on('message', function(topic, message) {
    // Handle incoming message
    console.log(`Received message: ${message.toString()} on topic: ${topic}`);
});

client.on('error', function(err) {
    console.error(`Failed to connect to MQTT broker: ${err}`);
});