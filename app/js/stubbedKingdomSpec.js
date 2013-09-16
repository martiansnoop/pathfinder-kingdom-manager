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
        }
      ],
      leaders: [
        {
          role: "Ruler",
          name: "name here", //for display purposes
          modifiers: {
            economy: 4
          }
        },
        {
          role: "Councilor",
          name: "can't spell it",
          modifiers: {
            loyalty: 3
          }
        },
        {
          role: "Warden",
          name: "hick with russian name",
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
      ]
    }
});
