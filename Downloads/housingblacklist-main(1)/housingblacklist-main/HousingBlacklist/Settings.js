import { @Vigilant, @SwitchProperty, @TextProperty } from 'Vigilance';

@Vigilant("BlacklistModule")
class Settings {
    @SwitchProperty({
        name: "&aEnable Module",
        description: "&7Toggle the blacklist module on or off.",
        category: "General"
    })
    moduleEnabled = true;

    @SwitchProperty({
        name: "&aAutomatic Blacklist Search",
        description: "&7Automatically search the blacklist when a player enters the world.",
        category: "General"
    })
    autoBlacklistSearch = true;

    @SwitchProperty({
        name: "&aEnable Auto Demote",
        description: "&7Automatically execute a command if a player in the blacklist has a status of 'true'.",
        category: "Auto Demote"
    })
    autoDemoteEnabled = false;

    @TextProperty({
        name: "&aAuto Demote Command",
        description: "&7The command to execute automatically. Write the command without '/' and use &e%player% &7as a placeholder for the player's name.",
        category: "Auto Demote",
        placeholder: "demote %player%"
    })
    autoDemoteCommand = "demote %player%";

    @SwitchProperty({
        name: "&aExecute Command for Nicked Players",
        description: "&7Automatically execute a command if a player is detected as &c&lnicked&7.",
        category: "Nicked Players"
    })
    autoExecuteNickedCommand = false;

    @TextProperty({
        name: "&aNicked Player Command",
        description: "&7The command to execute automatically when a player is detected as &c&lnicked&7. Write the command without '/' and use &e%player% &7as a placeholder for the player's name.",
        category: "Nicked Players",
        placeholder: "ban %player%"
    })
    nickedCommand = "ban %player%";

    @SwitchProperty({
        name: "&aSilent Mode",
        description: "&7Execute commands without showing any messages in chat.",
        category: "General"
    })
    silentMode = false;

    constructor() {
        this.initialize(this);
    }
}

export default new Settings();
