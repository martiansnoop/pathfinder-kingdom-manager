define({
  modifierSources:
    {
//      edicts2: {
//        holidays: {
//          label: "6 per year",
//          modifiers: {
//            loyalty: 2,
//            consumption: 2
//          }
//        },
//        taxation: {
//          label: "Light",
//          modifiers: {
//            economy: 1,
//            loyalty: -1
//          }
//        },
//        promotion: {
//          label: "Token",
//          modifiers: {
//            stability: 1,
//            consumption: 1
//          }
//        }
//      },
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
          name: "really good building",
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
