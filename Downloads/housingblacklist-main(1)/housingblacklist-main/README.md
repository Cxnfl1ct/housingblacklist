![Housing Blacklist](docs/banner.png)

# 🏠 Housing Blacklist

The Housing Blacklist module is an open-source tool specifically designed to help housing owners maintain a safe and enjoyable environment within their freebuilds. This module automates the detection and management of known griefers and players with a history of inappropriate behavior, ensuring your housing remains secure and fun for everyone.

✨ **Key Features**

- **Extensive Blacklist Database:** Protect your housing with a preloaded blacklist containing over 1,000 flagged users.
- **Nicked Players Detection:** Automatically identify players using nicknames, offering robust protection against disguised users.
- **Automatic Ban for Nicked Players:** Configurable commands allow for automatic banning of nicked players.
- **Automatic Ban for Blacklisted Players:** Execute customizable commands automatically for players on the blacklist.
- **Real-Time Blacklist Search:** Instantly checks players entering your housing against the blacklist.
- **Username-Based Search:** Easily verify users by their username to see if they have been flagged.
- **UUID-Based Search:** Provides an additional layer of accuracy by allowing searches based on UUIDs.
- **Automatic Fallback to UUID Search:** If a username-based search fails, a UUID search is automatically performed.
- **Persistent Tracking of Blacklisted Users:** Even if a player changes their username, the module will detect them using their UUID.
- **Public API Integration:** Seamlessly integrates with a publicly accessible API for updates and queries.
- **Global Blacklist Distribution:** The blacklist is distributed globally, providing fast lookup times with minimal latency.
- **Additional Features:** Includes various customizable settings and tools to enhance management of your housing.

⚙️ **Installation Guide** (CHAT TRIGGERS MOD REQUIRED, 2.2.X-1.8.9)

1. **Download the Module:**
   - First, download the ZIP file containing the Housing Blacklist module from the official website or repository.

2. **Extract the ZIP File:**
   - After downloading, extract the contents of the ZIP file. You should see a folder named `HousingBlacklist`.

3. **Move the Folder:**
   - Move the `HousingBlacklist` folder to your ChatTriggers `modules` directory. 
     - You can find this folder by navigating in-game with `/ct files` and clicking on the `modules` folder.
     - Alternatively, you can manually navigate to the folder. On Windows, the path is generally: 
       `C:\Users\yourname\AppData\Roaming\.minecraft\config\ChatTriggers\modules`
     - Replace "yourname" with your actual Windows username.

4. **Reload ChatTriggers:**
   - Once the folder is moved, type `/ct reload` in the Minecraft chat to load the Housing Blacklist module.

5. **Ensure Compatibility:**
   - Make sure you are using **ChatTriggers version 2.2.1 or later** and **Minecraft version 1.8.9**.

📜 **Command Examples**

- To check a player by username: `/check Hainjku`
- To check a player by UUID: `/check b5af7c49841a4522a191287984036537`
- To exclude a player: `/exclude Hainjku`
- To remove a player from the exclusion list: `/unexclude Hainjku`
- Open Settings GUI to toggle the automation of commands against demotes and nicked players and see detect blacklisted users automatically `/hbsettings` 

# 🌐 Housing Blacklist API

The Housing Blacklist API is a powerful tool designed to streamline the process of managing and preventing undesirable behavior in housing It provides quick access to a comprehensive blacklist database, helping you take swift action against griefers, lag machine builders, and other rule-breakers.

🚀 **Key Features**

- **Fast and Reliable:** Access real-time data to quickly identify players on the blacklist.
- **Secure:** The API is publicly accessible, allowing easy integration without the need for authentication.
- **Privacy-Focused:** No personal information is collected or stored, keeping user privacy intact.
- **Customizable:** Integrate the API seamlessly into your Minecraft modules or server-side scripts.

🔗 **API Endpoints**

| **Method** | **Endpoint** | **Description** | **Example** |
|------------|--------------|-----------------|-------------|
| GET | `/username/{username}` | Retrieve blacklist data using a player's username. | `https://api.housingblacklist.cloud/api/username/Hainjku` |
| GET | `/uuid/{uuid}` | Retrieve blacklist data using a player's UUID. | `https://api.housingblacklist.cloud/api/uuid/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |

💡 **Example Usage**

**Simple API Call**
```bash curl -X GET "https://api.housingblacklist.cloud/api/username/Hainjku"```

# </> **Example Code**

```javascript
import request from "request";

const apiUrl = "https://api.housingblacklist.cloud/api/username/Hainjku";

request({
    url: apiUrl
}, (error, response, body) => {
    if (!error && response.statusCode === 200) {
        let data = JSON.parse(body);
        if (data['blacklist-user-status'] === "true") {
            ChatLib.chat(`Player ${data.username} is on the blacklist:`);
            ChatLib.chat(`- UUID: ${data.uuid}`);
            ChatLib.chat(`- Blacklist ID: ${data['blacklist-user-id']}`);
            ChatLib.chat(`- Blacklisted by: ${data['blacklisted-by']}`);
            ChatLib.chat(`- Reason: ${data.reason}`);
            ChatLib.chat(`- Date: ${data.date}`);
            ChatLib.chat(`- Time: ${data.time}`);
            ChatLib.chat(`- Additional Info: ${data.additional}`);
        } else {
            ChatLib.chat(`Player ${data.username} is not on the blacklist.`);
        }
    } else {
        ChatLib.chat(`Error fetching data: ${error || body}`);
    }
});
```


🔒 **Security**

Secure Data Handling: The API only provides information necessary for managing blacklist data and does not store or expose any personal information.

🛡️ **Privacy Assurance**

No Data Collection: We respect user privacy and ensure that no personal data is collected or retained by the API.



## 🔗 **Useful Links**

- Website: [Housing Blacklist](https://housingblacklist.cloud)
- Discord: [Join Discord](https://go.housingblacklist.cloud/discord)
- Support, Reports, Appeal: [Get Support](https://go.housingblacklist.cloud/support)
- Hypixel Forums (Hainjku): [Hainjku's Profile](https://hypixel.net/members/hainjku.6638911/)
