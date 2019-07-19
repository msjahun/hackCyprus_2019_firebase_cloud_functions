const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});


  
exports.sendAutoNotificationAlert = functions.database.ref('/UserUsage/{pushId}/')
.onCreate(async (snapshot, context) => {
 // const deviceId = context.params.deviceId;
  const pushId = context.params.pushId;

 console.log('The push id of the UserUsage is '+pushId);
 // console.log('deviceId is '+deviceId);
console.log('Snapshop json is '+snapshot.val());

const obj = snapshot.val();

console.log('id '+obj.id);
console.log('parkingMessage '+obj.parkingMessage);
console.log('scannedQrCode/currentMobileUser/deviceId' +obj.scannedQrCode.currentMobileUser.deviceId);
console.log('Scanned by '+obj.id);


const deviceFCMToken =obj.scannedQrCode.currentMobileUser.deviceId;
const parkingMessage =obj.parkingMessage;
const carModelNo = "Anonymous";
const carPlateNo = "Anonymous";
const fromQrCode = obj.scannedBy.deviceId;
const title = "Collapsing A";
const body = "ParkingAlert";

  // Notification details.
  const payload = {
    "data" : {
        "body" : body,
        "title": title,
        "fromQrCode":fromQrCode,
        "carPlateNo" : carPlateNo,
        "carModelNo" : carModelNo,
      "parkingMessage": parkingMessage
    }
  };

  // Listing all tokens as an array.
  //tokens = Object.keys(tokensSnapshot.val());
  // Send notifications to all tokens.
 // const tokenDebugDevice="fluJ2dmK4P0:APA91bEk8A7AOVZG5K4eCCstIH9qgFrd4U2BP1uescnrin70c3EAp3-qgt3bSFDkOoeGz30Xu6QDiMpnVYsVV5GMebFBKtekb1TOvH9whMc1L55E4pSSGHujEInSf53MwCbrMXp40huO";
  //const responseDebug = await admin.messaging().sendToDevice(tokenDebugDevice, payload);
  const response = await admin.messaging().sendToDevice(deviceFCMToken, payload);
  // For each message check if there was an error.
  const tokensToRemove = [];


  return Promise.all(tokensToRemove);
});
