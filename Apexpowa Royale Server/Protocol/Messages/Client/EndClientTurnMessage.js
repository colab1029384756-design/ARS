const PiranhaMessage = require('../../PiranhaMessage')
const config = require('../../../config.json')

class EndClientTurnMessage extends PiranhaMessage {
  constructor (bytes, client) {
    super(bytes)
    this.client = client
    this.id = 14102
    this.version = 1
  }

  async decode () {
    this.data = {}
    
    this.data.Tick = this.readInt()
    this.data.Checksum = this.readInt()
    this.data.Count = this.readInt()
    this.data.CommandID = this.readInt()

    //console.log(this.data)
  }

  async process () {
    var Commands = {
    }

    if (this.data.CommandID === 0) return

    if (Commands[this.data.CommandID]) {
      var command = new Commands[this.data.CommandID](this.client)

      if (config.Server.Debug) {
        this.client.log(`Gotcha ${this.data.CommandID} (${command.constructor.name}) command! `)
      }

      await command.decode(this)
      await command.process(this)
    }
    else {
      this.client.log(`Gotcha undefined ${this.data.CommandID} command!`)
    }
  }
}

module.exports = EndClientTurnMessage