window.TCG_SEED = {
  riftboundCards: [
    { id:'rb-001', name:'Jinx, Loose Cannon', set:'Origins', rarity:'Champion', type:'Champion', marketPrice:18.00 },
    { id:'rb-002', name:'Yasuo, Unforgiven', set:'Origins', rarity:'Champion', type:'Champion', marketPrice:22.00 },
    { id:'rb-003', name:'Demacian Shieldbearer', set:'Origins', rarity:'Common', type:'Unit', marketPrice:0.40 },
    { id:'rb-004', name:'Piltover Gadgeteer', set:'Origins', rarity:'Uncommon', type:'Unit', marketPrice:0.80 },
    { id:'rb-005', name:'Mystic Shot', set:'Origins', rarity:'Common', type:'Spell', marketPrice:0.50 },
    { id:'rb-006', name:'Noxian Ambush', set:'Origins', rarity:'Rare', type:'Spell', marketPrice:3.50 }
  ],
  topDecks: [
    { game:'pokemon', name:'Dragapult ex / Dusknoir', cost:95, strength:92, difficulty:'Medium', note:'Strong but not always cheapest. Good if you like planned spread damage.' },
    { game:'pokemon', name:'Charizard ex budget shell', cost:70, strength:84, difficulty:'Low-Medium', note:'Usually easier play pattern and upgrade path.' },
    { game:'pokemon', name:'Ancient Box budget', cost:55, strength:78, difficulty:'Low', note:'Cheaper aggressive plan; good starter competitive test.' },
    { game:'pokemon', name:'Gardevoir ex', cost:85, strength:86, difficulty:'High', note:'Powerful but more sequencing/reading load.' },
    { game:'riftbound', name:'Jinx Aggro Starter Upgrade', cost:60, strength:72, difficulty:'Low', note:'Seed placeholder until real Riftbound meta/prices mature.' },
    { game:'riftbound', name:'Demacia Midrange Budget', cost:45, strength:68, difficulty:'Low-Medium', note:'Low-cost local testing shell.' }
  ],
  agents: [
    { name:'Card Scan Agent', job:'Read phone photos, identify card names, set numbers and uncertainty.', status:'Next build' },
    { name:'Price Agent', job:'Check card prices and timestamp the source so deck costs stay honest.', status:'Later' },
    { name:'Meta Agent', job:'Import top deck lists from tournament/meta sources and estimate build cost.', status:'Later' },
    { name:'Budget Coach Agent', job:'Compare owned cards to top decks and suggest cheapest competitive upgrade path.', status:'High value' }
  ]
};
