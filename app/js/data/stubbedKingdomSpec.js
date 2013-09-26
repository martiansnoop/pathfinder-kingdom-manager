define({
  modifierSources:
    {
      edicts: {
        holidays: {
          label: "6 per year",
          modifiers: {
            loyalty: 2,
            consumption: 2
          }
        },
        taxation: {
          label: "Light",
          modifiers: {
            economy: 1,
            loyalty: -1
          }
        },
        promotion: {
          label: "Token",
          modifiers: {
            stability: 1,
            consumption: 1
          }
        }
      },
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
      resources: [
        {
          name: "Gold mine",
          modifiers: {
            economy: 2
          }
        }
      ],
      events: [
      ],
      unrest: [ //TODO: make calculator less brittle
        {
          modifiers: {
            economy: -1,
            stability: -1,
            loyalty: -1
          }
        }
      ],
      stats: {
          size: {
            hexes: 6,
            modifiers: {
              consumption: 6
            }
          },
          cities: {
            amount: 1,
            modifiers: {
              consumption: 1
            }
          },
          farms: {
            amount: 4,
            modifiers: {
              consumption: -8
            }
          }
      }

    }
});
