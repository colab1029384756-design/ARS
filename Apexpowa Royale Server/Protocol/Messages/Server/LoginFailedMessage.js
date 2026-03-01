const PiranhaMessage = require('../../PiranhaMessage')

class LoginFailedMessage extends PiranhaMessage {
  constructor (client, errorCode, reason) {
    super()
    this.id = 20103
    this.client = client
    this.version = 4
    this.errorCode = errorCode
    this.reason = reason
  }

  async encode () {
    /*
    3 = Custom Message
    8 = Update Available
    9 = Connection Error
    10 = Maintenance
    11 = Banned
    */
   
    this.writeVInt(this.errorCode) // ErrorCode
    this.writeString(null) // Fingerprint
    this.writeString(null) // Redirect
    this.writeString(null) // UpdateURL
    this.writeString(this.reason) // Reason
    this.writeByte(127)
    this.writeVInt(0)
    this.writeString(null) // UpdateURL
    this.writeVInt(2) // Unknown
    this.writeString(null) // GameAssetsURL
    this.writeString(null) // ContentURL
  }
}

module.exports = LoginFailedMessage