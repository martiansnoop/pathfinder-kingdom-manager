define({
  modifierSources: {"alignments": {"lawful": {"modifiers": {"economy": 2}}, "neutral": {"modifiers": {"stability": 2}}}, "edicts": {"holidays": {"label": "6 per year", "modifiers": {"loyalty": 2, "consumption": 2}}, "taxation": {"label": "None", "modifiers": {"economy": 0, "loyalty": 1}}, "promotion": {"label": "Standard", "modifiers": {"stability": 2, "consumption": 2}}}, "leaders": [
    {"role": "Councilor", "name": "Eldrich Root", "modifiers": {"loyalty": 3}},
    {"role": "Warden", "name": "Kolinsky Sable", "modifiers": {"loyalty": 4}},
    {"name": "Kira Ismoort", "modifiers": {"stability": 2}},
    {"name": "Jhod Kavkin", "modifiers": {"stability": 4}},
    {"name": "Perlivash", "modifiers": {"economy": 3}},
    {"name": "Fey", "modifiers": {"economy": 4}},
    {"name": "Svetlana", "modifiers": {"economy": 3}},
    {"name": "Renault", "modifiers": {"loyalty": 4}},
    {"name": "Faunra", "modifiers": {"loyalty": 3}},
    {"name": "Kesten Garess", "modifiers": {"stability": 2}}
  ], "buildings": [
    {"name": "Inn", "modifiers": {"economy": 1, "loyalty": 1}},
    {"name": "Shop", "modifiers": {"economy": 1}},
    {"name": "Trade Shop", "modifiers": {"economy": 1, "stability": 1}},
    {"name": "Shrine", "modifiers": {"loyalty": 1}},
    {"name": "Mill", "modifiers": {"economy": 1, "stability": 1}},
    {"name": "Brewery (Loyal Patriot)", "modifiers": {"stability": 1, "loyalty": 1, "bp_cost": 6}},
    {"name": "House", "modifiers": {"unrest": -1, "bp_cost": 6}},
    {"name": "Herbalist", "modifiers": {"stability": 1, "loyalty": 1, "bp_cost": 10}},
    {"name": "Park", "modifiers": {"loyalty": 1, "unrest": -1, "bp_cost": 4}},
    {"name": "Castle", "modifiers": {"economy": 2, "stability": 2, "loyalty": 2, "unrest": -4}}
  ], "events": [], "tileImprovements": [
    {"name": "Gold mine", "modifiers": {"economy": 3}},
    {"name": "Silver Mine", "modifiers": {"economy": 3, "bp_cost": 6}},
    {"name": "Saw Mill", "modifiers": {"stability": 1, "bp_cost": 3}},
    {"name": "Saw Mill", "modifiers": {"stability": 1}}
  ], "unrest": [
    {"modifiers": {"economy": -1, "stability": -1, "loyalty": -1}}
  ], "size": {"hexes": 6, "modifiers": {"consumption": 6}}, "cities": {"amount": 1, "modifiers": {"consumption": 1}}, "farms": {"amount": 4, "modifiers": {"consumption": -8}}}

});
