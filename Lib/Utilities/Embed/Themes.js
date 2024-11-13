const Colors = {
    Success: 0x002afc,
    Cancel: 0xef3f4c,
    Pushing: 0x2bb4eb,
    Blocked: 0xa83b35,
    Failed: 0xe82b3a,

    LowLatency: 0x0f89e3,
    NormalLatency: 0x0e6cf9,
    HighLatency: 0x0e2af9,

    LowRisk: 0xf2d100,
    MediumRisk: 0xff490c,
    HighRisk: 0xff200c,

    ToggleOff: 0xe92d3b,
    ToggleOn: 0x00d300,

    Settings: 0xa6a6a8,
    Guilds: 0x42a4ee,
    Bugs: 0xa6a7ab
};

const Icons = {
    Success: "https://i.imgur.com/It9BNU8.png",

    Cancel: "https://i.imgur.com/U3HAPvp.png",
    Pushing: "https://i.imgur.com/tJgejcp.png",
    Blocked: "https://i.imgur.com/vlm4o6f.png",
    Failed: "https://i.imgur.com/HndJ0gv.png",

    LowLatency: "https://i.imgur.com/7Bi1miT.png",
    NormalLatency: "https://i.imgur.com/z4XR5BO.png",
    HighLatency: "https://i.imgur.com/uHZs7oz.png",

    LowRisk: "https://i.imgur.com/lQCdrh4.png",
    MediumRisk: "https://i.imgur.com/kGHdqBL.png",
    HighRisk: "https://i.imgur.com/Hc6OSpu.png",

    ToggleOff: "https://i.imgur.com/jMlPD2R.png",
    ToggleOn: "https://i.imgur.com/FLhQrUS.png",

    Settings: "https://i.imgur.com/BxFXaRr.png",
    Guilds: "https://i.imgur.com/xDR7eBr.png",
    Bugs: "https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_bug_report_48px-256.png",
};

/** @type {import("../../types.d.ts").IEmbedTypes} */
const EmbedThemes = {
    Success: {
        icon: Icons.Success,
        color: Colors.Success,
    },

    Cancel: {
        icon: Icons.Cancel,
        color: Colors.Failed,
    },
    Pushing: {
        icon: Icons.Pushing,
        color: Colors.Pushing,
    },
    Blocked: {
        icon: Icons.Blocked,
        color: Colors.Blocked,
    },
    Failed: {
        icon: Icons.Failed,
        color: Colors.Cancel,
    },

    LowLatency: {
        icon: Icons.LowLatency,
        color: Colors.LowLatency,
    },
    NormalLatency: {
        icon: Icons.NormalLatency,
        color: Colors.NormalLatency,
    },
    HighLatency: {
        icon: Icons.HighLatency,
        color: Colors.HighLatency,
    },

    LowRisk: {
        icon: Icons.LowRisk,
        color: Colors.LowRisk,
    },
    MediumRisk: {
        icon: Icons.MediumRisk,
        color: Colors.MediumRisk,
    },
    HighRisk: {
        icon: Icons.HighRisk,
        color: Colors.HighRisk,
    },

    ToggleOff: {
        icon: Icons.ToggleOff,
        color: Colors.ToggleOff,
    },
    ToggleOn: {
        icon: Icons.ToggleOn,
        color: Colors.ToggleOn,
    },

    Settings: {
        icon: Icons.Settings,
        color: Colors.Settings,
    },
    Guilds: {
        icon: Icons.Guilds,
        color: Colors.Guilds,
    },
    Bugs: {
        icon: Icons.Bugs,
        color: Colors.Bugs,
    }
};

module.exports = {
    Colors,
    Icons,
    EmbedThemes
};