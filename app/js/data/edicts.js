define({
  holidays: [
    {
      label: "None",
      modifiers: {
        loyalty: -1,
        consumption: 0
      }
    },
    {
      label: "1 per year",
      modifiers: {
        loyalty: 1,
        consumption: 1
      }
    },
    {
      label: "6 per year",
      modifiers: {
        loyalty: 2,
        consumption: 2
      }
    },
    {
      label: "12 per year",
      modifiers: {
        loyalty: 3,
        consumption: 4
      }
    },
    {
      label: "24 per year",
      modifiers: {
        loyalty: 4,
        consumption: 8
      }
    }
  ],
  promotion: [
    {
      label: "None",
      modifiers: {
        stability: -1,
        consumption: 1
      }
    },
    {
      label: "Token",
      modifiers: {
        stability: 1,
        consumption: 1
      }
    },
    {
      label: "Standard",
      modifiers: {
        stability: 2,
        consumption: 2
      }
    },
    {
      label: "Agressive",
      modifiers: {
        stability: 3,
        consumption: 4
      }
    },
    {
      label: "Expansionist",
      modifiers: {
        stability: 4,
        consumption: 8
      }
    }
  ],
  taxation:[
    {
      label: "None",
      modifiers: {
        economy: 0,
        loyalty: 1
      }
    },
    {
      label: "Light",
      modifiers: {
        economy: 1,
        loyalty: -1
      }
    },
    {
      label: "Normal",
      modifiers: {
        economy: 2,
        loyalty: -2
      }
    },
    {
      label: "Heavy",
      modifiers: {
        economy: 3,
        loyalty: -4
      }
    },
    {
      label: "Overwhelming",
      modifiers: {
        economy: 4,
        loyalty: -8
      }
    }
  ]
});

