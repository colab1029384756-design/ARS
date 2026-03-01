const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../../config.json')

//Creating schema
const playersSchema = new Schema({
    highID: {
        type: Number,
        required: true
    },
    lowID: {
        type: Number,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: 'You'
    },
    nameChangesCount: {
        type: Number,
        default: 0
    },
    facebookID: {
        type: String,
        default: ''
    },
    trophies: {
        type: Number,
        default: config.Player.StartDefault ? 0 : config.Player.StartingScore
    },
    highestTrophies: {
        type: Number,
        default: config.Player.StartDefault ? 0 : config.Player.StartingScore
    },
    arena: {
        type: Number,
        default: config.Player.StartDefault ? 0 : config.Player.StartingArena
    },
    level: {
        type: Number,
        default: config.Player.StartDefault ? 1 : config.Player.StartingLevel
    },
    xpPoints: {
        type: Number,
        default: config.Player.StartDefault ? 0 : config.Player.StartingExperience
    },
    gold: {
        type: Number,
        default: config.Player.StartDefault ? 750 : config.Player.StartingResources.Gold
    },
    diamonds: {
        type: Number,
        default: config.Player.StartDefault ? 500 : config.Player.StartingResources.Diamonds
    },
    victories: {
        type: Number,
        default: 0
    },
    tutorialSteps: {
        type: Number,
        default: 0
    },
    decks: {
        type: Object,
        default: [
            [26000000, 26000001, 26000002, 26000003, 26000004, 26000005, 26000006, 26000007],
            [26000000, 26000001, 26000002, 26000003, 26000004, 26000005, 26000006, 26000007],
            [26000000, 26000001, 26000002, 26000003, 26000004, 26000005, 26000006, 26000007],
            [26000000, 26000001, 26000002, 26000003, 26000004, 26000005, 26000006, 26000007],
            [26000000, 26000001, 26000002, 26000003, 26000004, 26000005, 26000006, 26000007]
        ]
    },
    selectedDeck: {
        type: Number,
        default: 0
    },
    cards: {
        type: Object,
        default: [
            { ID: 1, level: 0, xpPoints: 1 },
            { ID: 2, level: 0, xpPoints: 1 },
            { ID: 3, level: 0, xpPoints: 1 },
            { ID: 4, level: 0, xpPoints: 1 },
            { ID: 5, level: 0, xpPoints: 1 },
            { ID: 6, level: 0, xpPoints: 1 },
            { ID: 7, level: 0, xpPoints: 1 },
            { ID: 8, level: 0, xpPoints: 1 }
        ]
    },
    chests: {
        type: Array,
        default: [
            {
                chestID: 384,
                isUnlocked: false
            },
            {
                chestID: 381,
                isUnlocked: false
            },
            {
                chestID: 382,
                isUnlocked: false
            },
            {
                chestID: 380,
                isUnlocked: false
            }
        ]
    },
    inClan: {
        type: Number,
        default: 0
    },
    clan: {
        ClanHighID: {
            type: Number,
            default: 0
        },
        ClanLowID: {
            type: Number,
            default: 1
        }
    }
})

mongoose.model('players', playersSchema);