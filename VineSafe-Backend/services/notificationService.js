const https = require("https");
const db = require("../database/db");

// =====================================================
// SEND EXPO PUSH NOTIFICATION
// =====================================================

async function sendPushNotification(
  expoPushToken,
  title,
  body,
  data = {}
) {
  return new Promise((resolve, reject) => {

    const message = JSON.stringify({
      to: expoPushToken,
      sound: "default",
      title: title,
      body: body,
      priority: "high",
      channelId: "default",

      // Extra information available to the app
      data: data,
    });

    const options = {
      hostname: "exp.host",
      path: "/--/api/v2/push/send",
      method: "POST",

      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "application/json",
        "Content-Length":
          Buffer.byteLength(message),
      },
    };

    const request = https.request(
      options,
      (response) => {

        let responseData = "";

        response.on(
          "data",
          (chunk) => {
            responseData += chunk;
          }
        );

        response.on(
          "end",
          () => {

            console.log(
              "📱 Expo Push Response:",
              responseData
            );

            if (
              response.statusCode >= 200 &&
              response.statusCode < 300
            ) {

              resolve(responseData);

            } else {

              reject(
                new Error(
                  `Expo returned HTTP ${response.statusCode}`
                )
              );
            }
          }
        );
      }
    );

    request.on(
      "error",
      (error) => {

        console.error(
          "❌ Push notification request failed:",
          error.message
        );

        reject(error);
      }
    );

    request.write(message);

    request.end();
  });
}


// =====================================================
// SEND ALERT NOTIFICATION
// GET ALL SAVED EXPO TOKENS FROM MYSQL
// =====================================================

async function sendAlertNotification(
  title,
  body,
  data = {}
) {

  return new Promise((resolve) => {

    console.log(
      "========================================"
    );

    console.log(
      "🔔 AUTOMATIC ALERT NOTIFICATION"
    );

    console.log(
      "Title:",
      title
    );

    console.log(
      "Body:",
      body
    );


    // =================================================
    // GET PUSH TOKENS
    // =================================================

    const sql = `
      SELECT
        id,
        expo_push_token
      FROM push_tokens
    `;


    db.query(
      sql,
      async (err, results) => {

        if (err) {

          console.error(
            "❌ Failed to get push tokens:",
            err.message
          );

          resolve(false);

          return;
        }


        // =============================================
        // NO TOKENS
        // =============================================

        if (
          !results ||
          results.length === 0
        ) {

          console.log(
            "⚠️ No Expo push tokens found"
          );

          resolve(false);

          return;
        }


        console.log(
          `📱 Found ${results.length} push token(s)`
        );


        // =============================================
        // SEND TO EACH DEVICE
        // =============================================

        for (
          const row of results
        ) {

          const token =
            row.expo_push_token;


          if (!token) {

            console.log(
              "⚠️ Empty push token skipped"
            );

            continue;
          }


          try {

            console.log(
              "📤 Sending notification..."
            );

            console.log(
              "Token:",
              token
            );


            await sendPushNotification(
              token,
              title,
              body,
              data
            );


            console.log(
              "✅ Notification sent successfully"
            );

          } catch (error) {

            console.error(
              "❌ Notification failed:",
              error.message
            );
          }
        }


        console.log(
          "========================================"
        );


        resolve(true);
      }
    );
  });
}


// =====================================================
// EXPORT
// =====================================================

module.exports = {
  sendPushNotification,
  sendAlertNotification,
};