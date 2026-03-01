class ClientAvatar {
  async encode (self, player) {
    for (let i = 0; i < 3; i++) self.writeLogicLong(player.highID, player.lowID)

    self.writeString(player.name)
    self.writeVInt(player.arena)

    self.writeVInt(0)

    self.writeVInt(player.Trophies)
    self.writeVInt(0) // Legend Trophies
    self.writeVInt(0) // Season Record

    self.writeVInt(-1) // Null

    self.writeVInt(0) // BestSeasonRank
    self.writeVInt(7000) // BestSeasonTrophies

    for (let i = 0; i < 9; i++) self.writeVInt(0)

    self.writeVInt(9)

    // GameVariablesArray
    self.writeVInt(2)
    {
    // Gold
      self.writeVInt(5) // CSVID
      self.writeVInt(1) // ResourceID
      self.writeVInt(player.gold)

      // StarPoints
      self.writeVInt(5) // CSVID
      self.writeVInt(49) // ResourceID
      self.writeVInt(player.xpPoints)
    }

    for (let i = 0; i < 3; i++) self.writeVInt(0)

    // ProfileStatisticsArray
    self.writeVInt(4) 
    {
      // MaxScore
      self.writeVInt(5) // CSVID
      self.writeVInt(6) // ResourceID
      self.writeVInt(7000)

      // ThreeCrownWins
      self.writeVInt(5) // CSVID
      self.writeVInt(7) // ResourceID
      self.writeVInt(99999)

      // CardCount
      self.writeVInt(5) // CSVID
      self.writeVInt(8) // ResourceID
      self.writeVInt(95)

      // MaxArena
      self.writeVInt(5)   // CSVID
      self.writeVInt(27) // ResourceID
      self.writeVInt(12)
    }

    for (let i = 0; i < 4; i++) self.writeVInt(0)

    self.writeVInt(player.diamonds) // Diamonds
    self.writeVInt(player.diamonds) // FreeDiamonds

    self.writeVInt(player.xpPoints)
    self.writeVInt(player.level)

    self.writeVInt(0)

   self.writeVInt(1) // InClan (1 = No, 9 = Yes)

    // Battle Statistics
    self.writeVInt(0) // BattlesPlayed
    self.writeVInt(0) // TournamentBattlesPlayed
    self.writeVInt(0)
    self.writeVInt(0) // Wins
    self.writeVInt(0) // Loses

    self.writeVInt(0)

    // Tutorials
    for (let i = 0; i < 5; i++) self.writeVInt(0)

    self.writeVInt(-1) // Null

    for (let i = 0; i < 7; i++) self.writeVInt(0)
      
    self.writeVInt(1)

    self.writeVInt(0)

    self.writeVInt(1612095424)

    for (let i = 0; i < 4; i++) self.writeVInt(0)
  }
}

module.exports = ClientAvatar