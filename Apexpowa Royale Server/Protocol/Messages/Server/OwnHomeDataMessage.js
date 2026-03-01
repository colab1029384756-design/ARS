const PiranhaMessage = require('../../PiranhaMessage')
const ClientHome = require('../../../Logic/ClientHome')
const ClientAvatar = require('../../../Logic/ClientAvatar')

class OwnHomeDataMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 21217
    this.client = client
    this.version = 1
  }

  async encode () {
    const home = new ClientHome()
    home.encode(this, this.client.player)
    const avatar = new ClientAvatar()
    avatar.encode(this, this.client.player)
  }
}

module.exports = OwnHomeDataMessage