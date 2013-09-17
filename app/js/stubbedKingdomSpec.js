define({
  modifierSources:
    {
      edicts: [
        {
          name: "Promotion Level",
          modifiers: {
            stability: 2,
            consumption: 2
          }
        },
        {
          name: "Taxation Level",
          modifiers: {
            economy: 1,
            loyalty: -1
          }
        },
        {
          name: "Festivals per year",
          modifiers: {
            loyalty: 2,
            consumption: 2
          }
        }
      ],
      leaders: [
        {
          role: "Ruler",
          name: "Renault Surtova", //for display purposes
          modifiers: {
            economy: 4
          },
          modifierReassignable: true
        },
        {
          role: "Councilor",
          name: "Eldrich Root",
          modifiers: {
            loyalty: 3
          }
        },
        {
          role: "Warden",
          name: "Kolinsky Sable",
          modifiers: {
            stability: 4
          }
        }

      ],
      buildings: [
        {
          type: "really good building",
          modifiers: {
            economy: 2,
            stability: 2,
            loyalty: 2,
            unrestWhenBuilt: -2
          }
        }
      ],
      unrest: [ //TODO: make calculator less brittle
        {
          modifiers: {
            economy: -1,
            stability: -1,
            loyalty: -1
          }
        }
      ]
    }
});
