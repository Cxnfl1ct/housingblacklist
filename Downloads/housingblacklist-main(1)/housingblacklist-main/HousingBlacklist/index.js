/*
██╗  ██╗ ██████╗ ██╗   ██╗███████╗██╗███╗   ██╗ ██████╗ 
██║  ██║██╔═══██╗██║   ██║██╔════╝██║████╗  ██║██╔════╝ 
███████║██║   ██║██║   ██║███████╗██║██╔██╗ ██║██║  ███╗
██╔══██║██║   ██║██║   ██║╚════██║██║██║╚██╗██║██║   ██║
██║  ██║╚██████╔╝╚██████╔╝███████║██║██║ ╚████║╚██████╔╝
╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚═╝╚═╝  ╚═══╝ ╚═════╝ 

██████╗ ██╗      █████╗  ██████╗██╗  ██╗██╗     ██╗███████╗████████╗    ██╗   ██╗ ██╗    ██████╗     ██████╗ 
██╔══██╗██║     ██╔══██╗██╔════╝██║ ██╔╝██║     ██║██╔════╝╚══██╔══╝    ██║   ██║███║   ██╔═████╗   ██╔═████╗
██████╔╝██║     ███████║██║     █████╔╝ ██║     ██║███████╗   ██║       ██║   ██║╚██║   ██║██╔██║   ██║██╔██║
██╔══██╗██║     ██╔══██║██║     ██╔═██╗ ██║     ██║╚════██║   ██║       ╚██╗ ██╔╝ ██║   ████╔╝██║   ████╔╝██║
██████╔╝███████╗██║  ██║╚██████╗██║  ██╗███████╗██║███████║   ██║        ╚████╔╝  ██║██╗╚██████╔╝██╗╚██████╔╝
╚═════╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝╚══════╝   ╚═╝         ╚═══╝   ╚═╝╚═╝ ╚═════╝ ╚═╝ ╚═════╝ 
                                                                                                                                                                              
 
 * The Housing Blacklist module is a powerful tool designed to help housing owners and staff
 * maintain a safe and enjoyable environment in their housings. This module automatically checks
 * players entering your world against a curated blacklist, preventing known griefers and players with
 * a history of inappropriate behavior from causing harm to the housing freebuild community.
 *
 * Key Features:
 * - **Extensive Blacklist Database**: The module comes preloaded with over +1,000 blacklisted users, ensuring
 *   that your housing is protected from a wide range of known offenders.
 * - **Nicked Players Detection**: Automatically identifies players who are using nicknames, providing a
 *   robust defense against users attempting to disguise their identity.
 * - **Automatic Ban for Nicked Players**: Configurable commands allow you to automatically ban players who
 *   are detected as using nicknames, ensuring that your world remains secure.
 * - **Automatic Ban for Blacklisted Players**: The module can automatically execute customizable commands
 *   to ban players who are found on the blacklist, preventing them from causing harm.
 * - **Real-Time Blacklist Search**: As soon as players enter your world, the module performs an instant
 *   search to determine if they are on the blacklist, taking immediate action if necessary.
 * - **Username-Based Search**: Allows you to search for players on the blacklist by their username, making
 *   it easy to verify if a user has been flagged for inappropriate behavior.
 * - **UUID-Based Search**: Provides the ability to search the blacklist using a player’s UUID, offering
 *   another layer of accuracy and security.
 * - **Automatic Fallback to UUID Search**: If a username-based search fails, the module will automatically
 *   perform a search by UUID, ensuring that no blacklisted players slip through the cracks.
 * - **Persistent Tracking of Blacklisted Users**: Even if a player changes their username on their Minecraft
 *   account, the module will still detect them on the blacklist, thanks to UUID tracking.
 * - **Public API Integration**: The module integrates with a publicly accessible API, allowing for
 *   seamless updates and queries from anywhere in the world.
 * - **Global Blacklist Distribution**: The blacklist is distributed across servers around the world,
 *   providing near-instantaneous lookup times with minimal latency.
 * - **Additional Features**: The module includes a range of other customizable settings and tools designed
 *   to enhance your ability to manage and protect your Minecraft housing housings.
 *
 * ⚠️ **Warning**:
 * The Housing Blacklist module is not intended to replace or serve as a substitute for Hypixel's own
 * moderation and punishment systems. It does not interact with Hypixel's servers in any way. Instead,
 * this module serves as an additional tool to help you manage your own housing housing more effectively.
 * While the module can facilitate the moderation process by automating actions like demotes or bans
 * within your housing, the responsibility for managing your housing still rests with you, the housing owner.
 *
 * Additionally, no data is collected from any user by this module. The only functionality provided
 * is the retrieval of information from a public API regarding blacklisted players. This data is then
 * presented to you to aid in your decision-making process, and to streamline the execution of
 * customizable commands for managing your housing as you see fit.
 *
 * **Commands:**
 * - ** /check <username|uuid>**: Manually checks if a player (by username or UUID) is on the blacklist.
 * - ** /exclude <username>**: Excludes a player from automatic blacklist detections, preventing the module from automatically acting on them.
 * - ** /unexclude <username>**: Removes a player from the exclusion list, allowing the module to act on them automatically if they are blacklisted.
 * - ** /hbsettings**: Opens the settings GUI where you can configure various options such as auto-demote commands, silent mode, and more.
 * - ** In case you're wondering, the commands go without <>, <username> is a simple reference.
 * - ** Examples: /check Hainjku or /check b5af7c49841a4522a191287984036537 /exclude Hainjku, etc
 *
 * Housing Blacklist V1.0.0
 * Website: https://housingblacklist.cloud/
 * Discord Server: https://go.housingblacklist.cloud/discord
 * Support, Reports, Appeal: https://go.housingblacklist.cloud/support
 * Hypixel Forums Hainjku: https://hypixel.net/members/hainjku.6638911/
 * Developer Discord: hainjku
 */




import axios from 'axios';
import Settings from './Settings';

// Define the paths for the files that store demoted and excluded players
const demotedPlayersFile = "demoted_players.txt";
const excludedPlayersFile = "excluded_players.txt";

// Function to send a message in chat
function sendMessage(message) {
    if (!Settings.silentMode) {
        ChatLib.chat(message);
    }
}

// Function to read the list of demoted players from a file
function readDemotedPlayers() {
    try {
        const data = FileLib.read("HousingBlacklist", demotedPlayersFile);
        return data.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    } catch (err) {
        sendMessage(`&cError reading demoted players file: ${err.message}`);
        return [];
    }
}

// Function to write the list of demoted players to a file
function writeDemotedPlayers(demotedPlayers) {
    try {
        FileLib.write("HousingBlacklist", demotedPlayersFile, demotedPlayers.join('\n'));
    } catch (err) {
        sendMessage(`&cError writing to demoted players file: ${err.message}`);
    }
}

// Function to check if a player has already been demoted
function isPlayerDemoted(username) {
    const demotedPlayers = readDemotedPlayers();
    return demotedPlayers.includes(username.toLowerCase());
}

// Function to register a player as demoted
function registerDemotedPlayer(username) {
    const demotedPlayers = readDemotedPlayers();
    demotedPlayers.push(username.toLowerCase());
    writeDemotedPlayers(demotedPlayers);
}

// Function to read the list of excluded players from a file
function readExcludedPlayers() {
    try {
        const data = FileLib.read("HousingBlacklist", excludedPlayersFile);
        return data.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    } catch (err) {
        sendMessage(`&c[Housing Blacklist] &cError reading excluded players file: ${err.message}`);
        return [];
    }
}

// Function to write the list of excluded players to a file
function writeExcludedPlayers(excludedPlayers) {
    try {
        FileLib.write("HousingBlacklist", excludedPlayersFile, excludedPlayers.join('\n'));
    } catch (err) {
        sendMessage(`&c[Housing Blacklist] &cError writing to excluded players file: ${err.message}`);
    }
}

// Function to check if a player is excluded
function isPlayerExcluded(username) {
    const excludedPlayers = readExcludedPlayers();
    return excludedPlayers.includes(username.toLowerCase());
}

// Function to add a player to the exclusion list
function addExcludedPlayer(username) {
    const excludedPlayers = readExcludedPlayers();
    if (!excludedPlayers.includes(username.toLowerCase())) {
        excludedPlayers.push(username.toLowerCase());
        writeExcludedPlayers(excludedPlayers);
        sendMessage(`&c[Housing Blacklist] &7Player &e${username} &7has been excluded from automatic detections.`);
    } else {
        sendMessage(`&c[Housing Blacklist] &7Player &e${username} &7is already excluded.`);
    }
}

// Function to remove a player from the exclusion list
function removeExcludedPlayer(username) {
    let excludedPlayers = readExcludedPlayers();
    if (excludedPlayers.includes(username.toLowerCase())) {
        excludedPlayers = excludedPlayers.filter(player => player !== username.toLowerCase());
        writeExcludedPlayers(excludedPlayers);
        sendMessage(`&c[Housing Blacklist] &7Player &e${username} &7has been removed from the exclusion list.`);
    } else {
        sendMessage(`&c[Housing Blacklist] &7Player &e${username} &7is not in the exclusion list.`);
    }
}

// Function to convert a username to UUID using Mojang's API
function convertUsernameToUUID(username) {
    const apiURL = `https://api.mojang.com/users/profiles/minecraft/${username}`;
    return axios.get(apiURL)
        .then(response => {
            if (response.data && response.data.id) {
                return {
                    uuid: response.data.id,
                    username: response.data.name // Returns both the UUID and the username
                };
            } else {
                throw new Error("UUID not found");
            }
        })
        .catch(err => {
            if (err.response && err.response.status === 404) {
                return null; // If UUID is not found, return null
            } else {
                throw new Error("Error fetching UUID: " + (err.response?.data?.message || err.message));
            }
        });
}

// Function to check if a user is in the blacklist database
function checkBlacklist(identifier, autoDemote = false, silent = false, manualCheck = false) {
    if (!Settings.moduleEnabled) {
        if (!silent) {
            sendMessage('&c[Housing Blacklist] &7The module is currently disabled.');
        }
        return;
    }

    // Check if the player is excluded
    if (isPlayerExcluded(identifier)) {
        if (!silent) {
            sendMessage(`&c[Housing Blacklist] &7Player &e${identifier} &7is excluded from automatic detections.`);
        }
        return;
    }

    const isUUID = identifier.length > 16;  // Determine if the identifier is a UUID or a username
    const apiURL = isUUID
        ? `https://api.housingblacklist.cloud/api/uuid/${identifier}`
        : `https://api.housingblacklist.cloud/api/username/${identifier}`;

    if (!silent) {
        sendMessage(`&c[Housing Blacklist] &7Checking ${isUUID ? 'UUID' : 'username'}: ${identifier}...`);
    }

    axios.get(apiURL)
        .then(response => {
            if (response.data) {
                const username = response.data.username;
                const blacklistStatus = response.data['blacklist-user-status'];

                if (blacklistStatus === "true") {
                    if (!silent) {
                        sendMessage(`&c[Housing Blacklist] &aUser found in the blacklist with status 'true'.`);
                        displayUserInfo(response.data);
                    }

                    // Execute the auto demote command if enabled and the player hasn't been demoted before
                    if (autoDemote && Settings.autoDemoteEnabled) {
                        if (!isPlayerDemoted(username)) {
                            const command = Settings.autoDemoteCommand.replace("%player%", username);
                            if (!silent) {
                                sendMessage(`&c[Housing Blacklist] &7Executing command: /${command}`);
                            }
                            setTimeout(() => {
                                ChatLib.command(command);
                            }, 100); // Small delay to ensure command execution

                            registerDemotedPlayer(username); // Register the player as demoted
                        } else {
                            if (!silent) {
                                sendMessage(`&c[Housing Blacklist] &7The player &e${username} &7has already been demoted.`);
                            }
                        }
                    }
                } else if (blacklistStatus === "false") {
                    if (manualCheck) { // Only show results with status "false" on manual checks
                        if (!silent) {
                            sendMessage(`&c[Housing Blacklist] &7User found in the blacklist with status 'false'.`);
                            displayUserInfo(response.data);
                        }
                    } else {
                        if (!silent) {
                            sendMessage(`&c[Housing Blacklist] &7User found, but status is 'false', skipping action.`);
                        }
                    }
                }
            } else {
                if (!silent) {
                    sendMessage(`&c[Housing Blacklist] &7${identifier} was not found in the database.`);
                }
            }
        })
        .catch(err => {
            if (err.response && err.response.status === 404) {
                if (!isUUID) {
                    if (!silent) {
                        sendMessage(`&c[Housing Blacklist] &7${identifier} was not found by username, fetching UUID...`);
                    }
                    convertUsernameToUUID(identifier)
                        .then(data => {
                            if (data) {
                                if (!silent) {
                                    sendMessage(`&c[Housing Blacklist] &7UUID for ${identifier} retrieved, searching in the database by UUID ${data.uuid}...`);
                                }

                                return axios.get(`https://api.housingblacklist.cloud/api/uuid/${data.uuid}`)
                                    .then(response => {
                                        if (response.data) {
                                            const username = data.username;
                                            const blacklistStatus = response.data['blacklist-user-status'];

                                            if (blacklistStatus === "true") {
                                                if (!silent) {
                                                    sendMessage(`&c[Housing Blacklist] &aUser found in the blacklist by UUID with status 'true'.`);
                                                    displayUserInfo(response.data);
                                                }

                                                if (autoDemote && Settings.autoDemoteEnabled) {
                                                    if (!isPlayerDemoted(username)) {
                                                        const command = Settings.autoDemoteCommand.replace("%player%", username);
                                                        if (!silent) {
                                                            sendMessage(`&c[Housing Blacklist] &7Executing command: /${command}`);
                                                        }
                                                        setTimeout(() => {
                                                            ChatLib.command(command);
                                                        }, 100);

                                                        registerDemotedPlayer(username);
                                                    } else {
                                                        if (!silent) {
                                                            sendMessage(`&c[Housing Blacklist] &7The player &e${username} &7has already been demoted.`);
                                                        }
                                                    }
                                                }
                                            } else if (blacklistStatus === "false") {
                                                if (manualCheck) { // Only show results with status "false" on manual checks
                                                    if (!silent) {
                                                        sendMessage(`&c[Housing Blacklist] &7User found in the blacklist with status 'false'.`);
                                                        displayUserInfo(response.data);
                                                    }
                                                } else {
                                                    if (!silent) {
                                                        sendMessage(`&c[Housing Blacklist] &7User found, but status is 'false', skipping action.`);
                                                    }
                                                }
                                            }
                                        } else {
                                            if (!silent) {
                                                sendMessage(`&c[Housing Blacklist] &7UUID ${data.uuid} was not found in the database.`);
                                            }
                                        }
                                    })
                                    .catch(apiErr => {
                                        if (!silent) {
                                            if (apiErr.response && apiErr.response.data && apiErr.response.data.message === "User not found") {
                                                sendMessage(`&c[Housing Blacklist] &c[API Error] &7The user &e${identifier} &7was not found in the blacklist. &cAPI Message: ${apiErr.response.data.message}`);
                                            } else {
                                                sendMessage(`&c[Housing Blacklist] &7Error fetching blacklist data: ${apiErr.message}`);
                                            }
                                        }
                                    });
                            } else {
                                if (!silent) {
                                    sendMessage(`&c[Housing Blacklist] &7UUID not found for &e${identifier}. &7Probably not found or &c&lnicked&7.`);
                                }
                            }
                        })
                        .catch(err => {
                            if (!silent) {
                                sendMessage(`&c[Housing Blacklist] &7Error fetching UUID for ${identifier}: ${err.message}`);
                            }
                        });
                } else {
                    if (!silent) {
                        sendMessage(`&c[Housing Blacklist] &7${identifier} was not found in the database.`);
                    }
                }
            } else {
                if (!silent) {
                    sendMessage(`&c[Housing Blacklist] &cError: ${err.message || 'Unknown error occurred'}`);
                }
            }
        });
}

// Function to handle and process "nicked" players
function handleNickedPlayer(playerName) {
    if (!Settings.autoExecuteNickedCommand || isPlayerExcluded(playerName)) {
        return;
    }

    convertUsernameToUUID(playerName)
        .then(data => {
            if (data) {
                const uuidURL = `https://api.housingblacklist.cloud/api/uuid/${data.uuid}`;
                axios.get(uuidURL)
                    .then(response => {
                        if (!response.data) {
                            if (!Settings.silentMode) {
                                sendMessage(`&c[Housing Blacklist] &7UUID ${data.uuid} not found in the blacklist.`);
                            }
                        }
                    })
                    .catch(apiErr => {
                        if (apiErr.response && apiErr.response.data && apiErr.response.data.message === "User not found") {
                            if (!Settings.silentMode) {
                                sendMessage(`&c[Housing Blacklist] &7The user &e${playerName} &7was not found in the blacklist. &cAPI Message: ${apiErr.response.data.message}`);
                            }
                        } else {
                            if (!Settings.silentMode) {
                                sendMessage(`&c[Housing Blacklist] &7Error fetching blacklist data for ${playerName}: ${apiErr.message}`);
                            }
                        }
                    });
            } else {
                if (!Settings.silentMode) {
                    sendMessage(`&c[Housing Blacklist] &7The user &e${playerName} &7is likely &c&lnicked&7.`);
                }
                const command = Settings.nickedCommand.replace("%player%", playerName);
                if (!Settings.silentMode) {
                    sendMessage(`&c[Housing Blacklist] &7Executing command: /${command}`);
                }
                setTimeout(() => {
                    ChatLib.command(command);
                }, 100);
            }
        })
        .catch(err => {
            if (!Settings.silentMode) {
                sendMessage(`&c[Housing Blacklist] &7Error fetching UUID for ${playerName}: ${err.message}`);
            }
        });
}

// Register the /check command
register('command', (identifier) => {
    if (!identifier) {
        ChatLib.chat('&c[Housing Blacklist] &7Usage: &e/check <username|uuid>');
        return;
    }

    // Filter out brackets, angle brackets, and dashes from the identifier
    identifier = identifier.replace(/[\[\]<>\-]/g, ''); // This line removes brackets, angle brackets, and dashes

    checkBlacklist(identifier, false, false, true); // Manual check only
}).setName('check');

// Register the /exclude command
register('command', (username) => {
    if (!username) {
        ChatLib.chat('&c[Housing Blacklist] &eUsage: /exclude <username>');
        return;
    }
    addExcludedPlayer(username);
}).setName('exclude');

// Register the /unexclude command
register('command', (username) => {
    if (!username) {
        ChatLib.chat('&c[Housing Blacklist] &eUsage: /unexclude <username>');
        return;
    }
    removeExcludedPlayer(username);
}).setName('unexclude');

// Register chat event to detect system messages when players enter the world
register('chat', (event) => {
    const message = ChatLib.getChatMessage(event);

    // Regex to detect messages in the format [RANK] name entered the world
    const regex = /\[([^\]]+)\] (.+) entered the world/;
    const match = message.match(regex);
    if (match) {
        const playerName = match[2]; // Captures the player's name

        // Execute the search in the background if Auto Demote or Execute Nicked is enabled
        const shouldSearchInBackground = !Settings.autoBlacklistSearch;

        if (!isPlayerExcluded(playerName)) {
            if (Settings.autoBlacklistSearch || shouldSearchInBackground) {
                checkBlacklist(playerName, true, shouldSearchInBackground);
            }

            if (Settings.autoExecuteNickedCommand) {
                handleNickedPlayer(playerName); // Detect and handle "nicked" players entering the world
            }
        } else {
            sendMessage(`&c[Housing Blacklist] &7Player &e${playerName} &7is excluded from automatic detections.`);
        }
    } else {
        // For players without rank
        const noRankRegex = /(.+) entered the world/;
        const noRankMatch = message.match(noRankRegex);
        if (noRankMatch) {
            const playerName = noRankMatch[1]; // Captures the player's name

            const shouldSearchInBackground = !Settings.autoBlacklistSearch;

            if (!isPlayerExcluded(playerName)) {
                if (Settings.autoBlacklistSearch || shouldSearchInBackground) {
                    checkBlacklist(playerName, true, shouldSearchInBackground);
                }

                if (Settings.autoExecuteNickedCommand) {
                    handleNickedPlayer(playerName); // Detect and handle "nicked" players entering the world
                }
            } else {
                sendMessage(`&c[Housing Blacklist] &7Player &e${playerName} &7is excluded from automatic detections.`);
            }
        }
    }
}).setCriteria("${*}");

// Welcome message when the script is loaded
ChatLib.chat(`
&7╔═.✵.══════════╗
   &c&oHousing Blacklist V1.0.0
&7╚══════════.✵.═╝
&7&oThe Housing Blacklist module is a powerful tool designed to
&7help housing owners and staff maintain a safe and
&7enjoyable environment in their housings.
&7&oDeveloped By: &6[MVP&c++&6] Hainjku

&c&lCommands:
&c- &e/check <username|uuid>&f: &7Manually checks if a player (by username or UUID) is on the blacklist.
&c- &e/exclude <username>&f: &7Excludes a player from automatic blacklist detections, preventing the module from automatically acting on them.
&c- &e/unexclude <username>&f: &7Removes a player from the exclusion list, allowing the module to act on them automatically if they are blacklisted.
&c- &e/hbsettings&f: &7Opens the settings GUI where you can configure various options such as auto-demote commands, silent mode, and more.
`);

ChatLib.chat("&c[Housing Blacklist] &aModule version: V1.0.0");

ChatLib.chat("&c[Housing Blacklist] &aPlease remember to configure the commands from the GUI (&f/hbsettings&7&a)");

const supportMessage = new Message(
    new TextComponent("&c[Housing Blacklist] &bDiscord, &aSupport, Reports, Appeal: "),
    new TextComponent("&f&nClick Here")
        .setClick("open_url", "https://go.housingblacklist.cloud/support")
        .setHover("show_text", "&bClick here to open the link.")
);

ChatLib.chat(supportMessage);

// Register the command to open the settings GUI
register("command", () => Settings.openGUI()).setName("hbsettings");

// Function to display full user information in chat
function displayUserInfo(user) {
    const statusColor = user['blacklist-user-status'] === "true" ? "&2" : "&4"; // Green if true, red if false

    const message = new Message(
        new TextComponent("&8&l&m─────────────────────────\n"),
        new TextComponent("&c- &c&lHOUSING BLACKLIST &8(User records)\n"),
        new TextComponent(`&7- Username: &e${user.username} &7(&f${user['blacklist-user-id']}&7)\n`),
        new TextComponent(`&7- UUID: &7${user.uuid}\n`),
        new TextComponent(`&7- Blacklist status: ${statusColor}${user['blacklist-user-status']}\n`),
        new TextComponent(`&7- Blacklisted by: &a${user['blacklisted-by']}\n`),
        new TextComponent(`&7- Reason: &c${user.reason}\n`),
        new TextComponent(`&7- Date and time: &b${user.date} & ${user.time}\n`),
        new TextComponent(`&7- Additional info: &6${user.additional}\n`),
        new TextComponent(`&7- Evidence: `),
        new TextComponent(" &e&nClick here")
            .setClick("open_url", "https://go.housingblacklist.cloud/evidence")
            .setHover("show_text", "&bClick to view evidence."),
        new TextComponent("&8&l&m─────────────────────────\n")
    );

    ChatLib.chat(message);
}
