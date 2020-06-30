const DCServicesSdk = require('@adobe/dc-services-node-sdk')

let credentials

try {
    credentials = DCServicesSdk.Credentials.serviceAccountCredentialsBuilder().fromFile("dc-services-sdk-credentials.json").build()
} catch (e){
    console.error('Auth error', e)
}

module.exports = credentials