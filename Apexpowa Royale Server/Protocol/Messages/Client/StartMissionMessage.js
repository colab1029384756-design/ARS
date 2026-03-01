const PiranhaMessage = require('../../PiranhaMessage')
const LoginFailedMessage = require('../Server/LoginFailedMessage')

class StartMissionMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 10459
    this.version = 1
  }

  async decode () {}

  async process () {
    await new LoginFailedMessage(this.client, 3, "I'm going to fucking crash out because of the OwnHomeDataMessage problem, It is literally identical to VitalikObject's source.").send()
    return
  }
}

module.exports = StartMissionMessage