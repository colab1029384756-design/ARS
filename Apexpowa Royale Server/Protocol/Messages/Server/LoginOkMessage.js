const PiranhaMessage = require('../../PiranhaMessage')

class LoginOkMessage extends PiranhaMessage {
  constructor (client) {
    super()
    this.id = 20758
    this.client = client
    this.version = 1
  }

  async encode () {
    this.writeLong(this.client.player.highID, this.client.player.lowID) // HighID, LowID
    this.writeLong(this.client.player.highID, this.client.player.lowID) // HighID, LowID
    this.writeString(this.client.player.token) // Token
    this.writeString() // BOOM // FacebookID
    this.writeString() // BOOM // GamecenterID
    this.writeVInt(this.client.playerData.Major) // Major
    this.writeVInt(this.client.playerData.Build) // Build
    this.writeVInt(this.client.playerData.Build) // Build
    this.writeVInt(this.client.playerData.Minor) // Minor
    this.writeString('prod') // Environment
    this.writeInt(0)
    this.writeInt(0)
    this.writeInt(0)
    this.writeInt(0)
    this.writeString() // BOOM // FacebookAppID
    this.writeString() // BOOM // ServerTime
    this.writeString() // BOOM // AccountCreatedDate
    this.writeString('RO') // Region
    this.writeString('Bucharest') // City
    this.writeString() // BOOM
    this.writeVInt(0)
    this.writeVInt(0)
    this.writeVInt(0)
    
    this.writeVInt(2)
    {
      this.writeString('https://game-assets.clashroyaleapp.com/')
      this.writeString('https://99faf1e355c749a9a049-2a63f4436c967aa7d355061bd0d924a1.ssl.cf1.rackcdn.com/')
    }
    this.writeVInt(1)
    {
      this.writeString('https://event-assets.clashroyale.com')
    }
  }
}

module.exports = LoginOkMessage