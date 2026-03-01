const cardUtils = require('../Utils/cardUtils')
const utils = require('../Utils')
const global = require('../global.json')

class ClientHome {
  async encode (self, player) {
    self.writeLogicLong(player.highID, player.lowID)

    for (let i = 0; i < 12; i++) self.writeVInt(0)

    // Decks
    self.writeVInt(player.decks.length)
    player.decks.forEach(deck => {
        self.writeVInt(deck.length)
        deck.forEach(card => {
            self.writeVInt(card)
        })
    })

    self.writeVInt(8)
    self.writeHex('FF')

    // Current Deck
    let currentDeck = player.decks[player.selectedDeck]
    currentDeck.forEach(cardSCID => {
        let card = utils.findObjectByKey(player.cards, 'ID', cardUtils.SCIDtoInstanceID(cardSCID))
        self.writeVInt(card.ID) // CardID
        self.writeVInt(100/*card.level*/) // // CardLevel
        // CardStarLevel
        self.writeVInt(3)
        self.writeVInt(0/*card.xpPoints*/)
        // CardPoints
        self.writeVInt(0)
        self.writeVInt(0)
        self.writeVInt(0)
        self.writeVInt(0)
    })

    self.writeVInt(player.cards.length - 8)

    player.cards.forEach(card => {
        if (!currentDeck.includes(cardUtils.instanceIDtoSCID(card.ID))) {
          self.writeVInt(card.ID) // CardID
          self.writeVInt(100/*card.level*/) // // CardLevel
          // CardStarLevel
          self.writeVInt(3)
          self.writeVInt(0/*card.xpPoints*/)
          // CardPoints
          self.writeVInt(0)
          self.writeVInt(0)
          self.writeVInt(0)
          self.writeVInt(0)
        }
    })

    self.writeVInt(player.selectedDeck)

    self.writeVInt(8)

    for (let i = 0; i < 6; i++) self.writeVInt(0)

    self.writeVInt(1)
    self.writeVInt(0)

    // Events
    {
      self.writeVInt(global.Events.length)
      global.Events.forEach((event) => {
          self.writeVInt(event.ID)
          self.writeInt(0)

          for (let i = 0; i < 2; i++) self.writeVInt(0)

          self.writeVInt(event.Type)
          self.writeVInt(event.StartTime)
          self.writeVInt(event.EndTime)
          self.writeVInt(event.VisibleOn)

          for (let i = 0; i < 3; i++) self.writeInt(0)

          self.writeVInt(0)
          self.writeVInt(1)
          self.writeString(event.JSON)

          for (let i = 0; i < 6; i++) self.writeVInt(0)
      })
    }

    self.writeInt(0)

    for (let i = 0; i < 2; i++) self.writeVInt(0)

    self.writeVInt(0) // Timestamp

    for (let i = 0; i < 2; i++) self.writeVInt(0)

    self.writeInt(0)

    self.writeVInt(0) // array
    self.writeVInt(0) // array

    self.writeVInt(1)
    self.writeVInt(0)

    // Chests
    {
      self.writeVInt(player.chests.length) //ChestSlotCount
      if (player.chests.length > 0) {
        player.chests.forEach(chest => {
          self.writeVInt(1)
          
          self.writeVInt(19)
          self.writeVInt(chest.chestID)

          self.writeVInt(0) //Is opened??? 0 no 2 yep 4???? 6 opened but locked 8 new with anim 10 new with animation and opened 12 new with animation and closed 14 new with animation and opened but locked 16 unlocking
          self.writeVInt(player.chests.indexOf(chest) * 2 + 4) //Chest Index
          self.writeVInt(6)

          self.writeVInt(player.chests.indexOf(chest))

          self.writeInt(2)

          self.writeVInt(0)
          self.writeVInt(0)

          self.writeString() // BOOM
        })
      }
    }

    for (let i = 0; i < 27; i++) self.writeVInt(0)
      
    self.writeVInt(2)

    self.writeVInt(13)
    self.writeVInt(54)
    self.writeVInt(12)
    self.writeVInt(54)

    self.writeVInt(12)

    for (let i = 0; i < 21; i++) self.writeVInt(0)

    self.writeVInt(3)
    self.writeVInt(1945)
    self.writeVInt(1)

    for (let i = 0; i < 2; i++) self.writeVInt(0)

    self.writeVInt(1)
    self.writeVInt(13)

    for (let i = 0; i < 4; i++) self.writeVInt(0)

    self.writeVInt(2)

    self.writeVInt(8)
    self.writeHex('FF')

    // Current Deck
    player.decks[player.selectedDeck].forEach(cardSCID => {
        let card = utils.findObjectByKey(player.cards, 'ID', cardUtils.SCIDtoInstanceID(cardSCID))
        self.writeVInt(card.ID) // CardID
        self.writeVInt(100/*card.level*/) // // CardLevel
        // CardStarLevel
        self.writeVInt(3)
        self.writeVInt(0/*card.xpPoints*/)
        // CardPoints
        self.writeVInt(0)
        self.writeVInt(0)
        self.writeVInt(0)
        self.writeVInt(0)
    })

    for (let i = 0; i < 2; i++) self.writeVInt(0)
    self.writeVInt(1)
    self.writeVInt(0)

    for (let i = 0; i < 2; i++) self.writeVInt(0)
    self.writeVInt(1)

    for (let i = 0; i < 11; i++) self.writeVInt(0)

    self.writeVInt(5)
    self.writeVInt(32)

    self.writeVInt(1)

    for (let i = 0; i < 3; i++) self.writeVInt(0)

    self.writeVInt(-1) // Null

    self.writeVInt(0)
    self.writeVInt(1)
    
    for (let i = 0; i < 2; i++) self.writeVInt(0)

    self.writeVInt(1)
    self.writeVInt(2)
    self.writeVInt(1)
    self.writeVInt(3)

    self.writeVInt(0)
    self.writeVInt(1)

    for (let i = 0; i < 2; i++) self.writeVInt(0)

    self.writeVInt(7)

    // ShopCards
    {
      const ShopCards = [
        {
          ID: 14,
          Multiplier: 50,
          Cost: 2500
        },
        {
          ID: 2,
          Multiplier: 10,
          Cost: 10000
        },
        {
          ID: 3,
          Multiplier: 1,
          Cost: 1000
        }
      ]
      self.writeVInt(ShopCards.length)
      ShopCards.forEach((card, index) => {
          self.writeVInt(1)
          self.writeVInt(0)
          self.writeVInt(0)
          self.writeVInt(1)
          // Card Cost
          self.writeVInt(card.Cost)
          self.writeVInt(5)
          self.writeVInt(1)
          // Card SCID
          self.writeVInt(28)
          self.writeVInt(card.ID)
          self.writeVInt(card.Multiplier)
          self.writeVInt(index + 1)
          self.writeVInt(0)
          self.writeVInt(0)
          self.writeVInt(0)
          self.writeVInt(0)
      })
    }

    // ShopChests
    {
      self.writeVInt(global.ShopChests.length)
      global.ShopChests.forEach((chest) => {
        // SCID
        self.writeVInt(19)
        self.writeVInt(chest.ID)
        self.writeVInt(chest.Status)
        self.writeVInt(0)
        self.writeString(chest.Name)
        self.writeVInt(1)
        self.writeVInt(chest.Slot)
        self.writeVInt(0)
        self.writeVInt(-1) // Null
        self.writeVInt(0)
        self.writeVInt(-1) // Null
      })
    }

    self.writeHex('03 00 01 02 00 00 00 00 00 00 00 00 05 00 00 00 00 01 00 00 00 01 00 00 00 00 03 00 00 00 11 6B 69 6E 67 5F 68 61 70 70 79 5F 30 31 2E 77 61 76 00 00 00 37 2F 32 64 37 63 35 39 66 61 2D 66 34 37 66 2D 34 62 31 37 2D 61 35 35 61 2D 62 30 36 37 65 66 30 61 64 61 32 37 5F 6B 69 6E 67 5F 68 61 70 70 79 5F 30 31 2E 77 61 76 00 00 00 20 32 65 31 39 63 36 35 65 61 61 39 31 33 33 32 65 37 31 61 35 66 34 65 37 31 38 65 35 31 61 64 38 00 00 00 14 65 6D 6F 74 65 73 5F 6B 69 6E 67 5F 30 31 5F 64 6C 2E 73 63 00 00 00 3A 2F 62 33 61 35 37 61 30 65 2D 65 34 37 62 2D 34 37 61 31 2D 39 33 34 39 2D 37 63 31 36 62 65 62 38 31 34 30 38 5F 65 6D 6F 74 65 73 5F 6B 69 6E 67 5F 30 31 5F 64 6C 2E 73 63 00 00 00 20 33 32 66 38 62 64 39 64 37 39 37 64 36 39 62 39 62 33 36 31 30 39 36 61 65 62 36 30 30 39 63 63 01 00 88 02 00 00 00 01 00 00 00 00 00 00 00 01 00 00 00 01 00 00 00 01 00 00 00 02 00 00 00 01 00 00 00 03 00 00 00 02 00 00 00 00 00 00 00 02 00 00 00 01 00 00 00 02 00 00 00 02 00 00 00 02 00 00 00 03 00 00 00 03 00 00 00 00 00 00 00 03 00 00 00 01 00 00 00 03 00 00 00 02 00 00 00 03 00 00 00 03 00 00 00 04 00 00 00 00 00 00 00 04 00 00 00 01 00 00 00 04 00 00 00 02 00 00 00 04 00 00 00 03 00 00 00 05 00 00 00 00 00 00 00 05 00 00 00 01 00 00 00 05 00 00 00 02 00 00 00 05 00 00 00 03 00 00 00 06 00 00 00 00 00 00 00 06 00 00 00 01 00 00 00 06 00 00 00 02 00 00 00 06 00 00 00 03 00 00 00 07 00 00 00 00 00 00 00 07 00 00 00 01 00 00 00 07 00 00 00 02 00 00 00 07 00 00 00 03 00 00 00 08 00 00 00 00 00 00 00 08 00 00 00 01 00 00 00 08 00 00 00 02 00 00 00 08 00 00 00 03 00 00 00 09 00 00 00 00 00 00 00 09 00 00 00 01 00 00 00 09 00 00 00 02 00 00 00 09 00 00 00 03 00 00 00 0A 00 00 00 00 00 00 00 0A 00 00 00 01 00 00 00 0A 00 00 00 02 00 00 00 0A 00 00 00 03 00 00 00 0B 00 00 00 00 00 00 00 0B 00 00 00 01 00 00 00 0B 00 00 00 02 00 00 00 0B 00 00 00 03 00 00 00 0C 00 00 00 00 00 00 00 0C 00 00 00 01 00 00 00 0C 00 00 00 02 00 00 00 0C 00 00 00 03 00 00 00 0D 00 00 00 00 00 00 00 0D 00 00 00 01 00 00 00 0D 00 00 00 02 00 00 00 0D 00 00 00 03 00 00 00 0E 00 00 00 00 00 00 00 0E 00 00 00 01 00 00 00 0E 00 00 00 02 00 00 00 0E 00 00 00 03 00 00 00 0F 00 00 00 00 00 00 00 0F 00 00 00 01 00 00 00 0F 00 00 00 02 00 00 00 0F 00 00 00 03 00 00 00 10 00 00 00 00 00 00 00 10 00 00 00 01 00 00 00 10 00 00 00 02 00 00 00 10 00 00 00 03 00 00 00 11 00 00 00 00 00 00 00 11 00 00 00 01 00 00 00 11 00 00 00 02 00 00 00 11 00 00 00 03 00 00 00 12 00 00 00 00 00 00 00 12 00 00 00 01 00 00 00 12 00 00 00 02 00 00 00 12 00 00 00 03 00 00 00 14 00 00 00 00 00 00 00 15 00 00 00 00 00 00 00 15 00 00 00 01 00 00 00 16 00 00 00 00 00 00 00 16 00 00 00 01 00 00 00 17 00 00 00 00 00 00 00 17 00 00 00 01 00 00 00 17 00 00 00 02 00 00 00 17 00 00 00 03 00 00 00 18 00 00 00 00 00 00 00 18 00 00 00 01 00 00 00 18 00 00 00 02 00 00 00 18 00 00 00 03 00 00 00 19 00 00 00 00 00 00 00 19 00 00 00 01 00 00 00 19 00 00 00 02 00 00 00 1A 00 00 00 00 00 00 00 1A 00 00 00 01 00 00 00 1A 00 00 00 02 00 00 00 1B 00 00 00 00 00 00 00 1C 00 00 00 00 00 00 00 1C 00 00 00 01 00 00 00 1D 00 00 00 00 00 00 00 1D 00 00 00 01 00 00 00 1D 00 00 00 02 00 00 00 1D 00 00 00 03 00 00 00 1E 00 00 00 00 00 00 00 1E 00 00 00 01 00 00 00 1F 00 00 00 00 00 00 00 1F 00 00 00 01 00 00 00 1F 00 00 00 02 00 00 00 1F 00 00 00 03 00 00 00 20 00 00 00 00 00 00 00 20 00 00 00 01 00 00 00 20 00 00 00 02 00 00 00 20 00 00 00 03 00 00 00 21 00 00 00 00 00 00 00 22 00 00 00 00 00 00 00 24 00 00 00 00 00 00 00 24 00 00 00 01 00 00 00 24 00 00 00 02 00 00 00 24 00 00 00 03 00 00 00 25 00 00 00 00 00 00 00 27 00 00 00 00 00 00 00 28 00 00 00 00 00 00 00 28 00 00 00 01 00 00 00 28 00 00 00 02 00 00 00 29 00 00 00 00 00 00 00 29 00 00 00 01 00 00 00 2A 00 00 00 00 00 00 00 2C 00 00 00 00 00 00 00 2D 00 00 00 00 00 00 00 2E 00 00 00 00 00 00 00 2F 00 00 00 00 00 00 00 31 00 00 00 00 00 00 00 31 00 00 00 01 00 00 00 32 00 00 00 00 00 00 00 32 00 00 00 01 00 00 00 32 00 00 00 02 00 00 00 32 00 00 00 03 00 00 00 33 00 00 00 00 00 00 00 34 00 00 00 00 00 00 00 34 00 00 00 01 00 00 00 34 00 00 00 02 00 00 00 01 00 00 00 00 00 00 00 01 00 00 00 01 00 00 00 01 00 00 00 02 00 00 00 01 00 00 00 03 00 00 00 02 00 00 00 00 00 00 00 02 00 00 00 01 00 00 00 02 00 00 00 02 00 00 00 02 00 00 00 03 00 00 00 00 00 01 81 CE D2 59 00 00 00 19 74 6F 77 65 72 73 6B 69 6E 5F 73 65 61 73 6F 6E 5F 30 31 5F 64 6C 2E 73 63 00 00 00 3F 2F 33 66 32 38 30 33 61 30 2D 37 36 34 66 2D 34 62 61 39 2D 38 35 32 36 2D 63 37 39 61 32 37 38 30 36 37 62 33 5F 74 6F 77 65 72 73 6B 69 6E 5F 73 65 61 73 6F 6E 5F 30 31 5F 64 6C 2E 73 63 00 00 00 20 61 30 32 38 30 35 62 32 36 33 66 33 39 64 62 31 33 33 66 62 30 65 30 30 62 61 33 61 32 65 37 32 00 00 00 0A 53 68 61 72 6B 20 54 61 6E 6B 01 00 00 00 09 6B 69 6E 67 74 6F 77 65 72 01 00 00 00 10 73 68 61 72 6B 5F 6B 69 6E 67 5F 64 65 61 74 68 01 00 00 00 0D 70 72 69 6E 63 65 73 73 74 6F 77 65 72 01 00 00 00 14 73 68 61 72 6B 5F 70 72 69 6E 63 65 73 73 5F 64 65 61 74 68')

    for (let i = 0; i < 2; i++) self.writeVInt(0)

    self.writeVInt(0) // array
    self.writeVInt(0) // array

    for (let i = 0; i < 2; i++) self.writeVInt(0)
    self.writeVInt(1)
    self.writeVInt(1)

    self.writeVInt(-1) // Null
    self.writeVInt(0)
    self.writeVInt(1)

    self.writeVInt(104003009)

    self.writeVInt(1)
    self.writeVInt(1)
    self.writeVInt(7000)
    self.writeVInt(6900)

    for (let i = 0; i < 2; i++) self.writeVInt(0)
    self.writeVInt(1)
    self.writeVInt(600)

    self.writeVInt(600)
    self.writeVInt(600)
    self.writeVInt(1)
    self.writeVInt(13)

    self.writeVInt(600)
    for (let i = 0; i < 4; i++) self.writeVInt(0)

    self.writeVInt(1)

    for (let i = 0; i < 38; i++) self.writeVInt(0)
  }
}

module.exports = ClientHome