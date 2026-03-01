const SectorStateMessage = require('../../Messages/Server/SectorStateMessage')

class StartMatchmakingCommand {
  constructor () {}

  async decode(self) {
    this.data = {}

    this.data.StartTick = self.readVInt()
    this.data.EndTick = self.readVInt()
    this.data.AccountHighID = self.readVInt()
    this.data.AccountLowID = self.readVInt()
    this.data.Is2v2 = self.readVInt()
    this.data.Unknown = self.readVInt()
    this.data.BattleEventID = self.readVInt()

    //console.log(this.data)
  }

  async process(self) {
    await new SectorStateMessage(self.client, 0, self.client.player).send()
  }
}

module.exports = StartMatchmakingCommand