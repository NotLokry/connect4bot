const Discord = require("discord.js")
const Client = new Discord.Client({intents:["GuildMembers","Guilds"]})

Client.on("ready",()=>{
    console.log("I hate life")

    Client.application.commands.set([{name:"c4",description:"Play C4"}])
})

Client.on("interactionCreate", async (i) => {
    if(i.isCommand()){
        if(i.commandName == "c4"){
            var redE = "<:Red:1195487091161841695>"
            var blueE = "<:Blue:1195487092508213448>"
            var BgE = "<:Empty:1195487088775282788>"
            let places = []
		    let abc = ['a','b','c','d','e','f','g','h']


            for(let y = 0; y < 6;y++){
                for(let x = 0; x < 7; x++){
                    places.push({emoji:BgE,name:`${abc[y]}${x}`,red:false,blue:false})
                }
            }

            let description = ''
            places.forEach(place => {
                if(Number(place.name.slice(-1)) === 6){description += `${place.emoji}\n`}else{description += place.emoji}
            })

            const reply = await i.reply({
                embeds:[
                    new Discord.EmbedBuilder()
                    .setDescription(`${description}`)
                ],
                fetchReply:true,
                components:[
                    new Discord.ActionRowBuilder().addComponents([
                        new Discord.ButtonBuilder()
                        .setCustomId("0")
                        .setLabel("1")
                        .setStyle(1),
                        new Discord.ButtonBuilder()
                        .setCustomId("1")
                        .setLabel("2")
                        .setStyle(1),
                        new Discord.ButtonBuilder()
                        .setCustomId("2")
                        .setLabel("3")
                        .setStyle(1),
                        new Discord.ButtonBuilder()
                        .setCustomId("3")
                        .setLabel("4")
                        .setStyle(1),
                        new Discord.ButtonBuilder()
                        .setCustomId("4")
                        .setLabel("5")
                        .setStyle(1)
                    ]),
                    new Discord.ActionRowBuilder().addComponents([
                        new Discord.ButtonBuilder()
                        .setCustomId("5")
                        .setLabel("6")
                        .setStyle(1),
                        new Discord.ButtonBuilder()
                        .setCustomId("6")
                        .setLabel("7")
                        .setStyle(1),
                    ])
                ]
            })

            const filter = inter => inter.user.id == i.user.id
            const collector = reply.createMessageComponentCollector({filter})

            collector.on("collect", async c => {
                function Filter(list){
                    for(let i = 0; i < 6; i++){
                        for(let x = 0; x < 7; x++){
                            if(x <= 3)if(list.find(y=>y.name == `${abc[i]}${x}`) && list.find(y=>y.name == `${abc[i]}${x+1}`) && list.find(y=>y.name == `${abc[i]}${x+2}`) && list.find(y=>y.name == `${abc[i]}${x+3}`))return true
                            if(i <= 2){
                                if(list.find(y=>y.name == `${abc[i]}${x}`) && list.find(y=>y.name == `${abc[i+1]}${x}`) && list.find(y=>y.name == `${abc[i+2]}${x}`) && list.find(y=>y.name == `${abc[i+3]}${x}`))return true
                                if(list.find(y=>y.name == `${abc[i]}${x}`) && list.find(y=>y.name == `${abc[i+1]}${x+1}`) && list.find(y=>y.name == `${abc[i+2]}${x+2}`) && list.find(y=>y.name == `${abc[i+3]}${x+3}`))return true
                            }
                            continue
                        }
                    }
                    return false
                }
                function Checker(){
                    var loc = FindLocation()
                    if(loc == null)return
                    places.find(x=>x==loc).red = true

                    var botLoc = BotLocation()
                    places.find(x=>x==botLoc).blue = true

                    
                    places.filter(x=>x.red == true).forEach(x => x.emoji = redE)
                    places.filter(x=>x.blue == true).forEach(x => x.emoji = blueE)

                    var red = Filter(places.filter(x=>x.red == true))
                    var blue = Filter(places.filter(x=>x.blue == true))

                    var embed = new Discord.EmbedBuilder()
                    var description = ''
                    if(red){
                        collector.stop()
                        embed.setTitle("You Won")
                    }
                    else if(blue){
                        collector.stop()
                        embed.setTitle("You Lost")
                    }

                    places.forEach(place => {
                        if(Number(place.name.slice(-1)) === 6){description += `${place.emoji}\n`}else{description += place.emoji}
                    })
                    embed.setDescription(description)
                    c.update({embeds:[embed]})
                }
                function FindLocation(){
                    var row = places.filter(x => Number(x.name.slice(-1)) == c.customId)
                    for(let i = 0; i < row.length ; i++){
                        if(row[i].red || row[i].blue){
                            if(i == 0)return null
                            return row[i-1]
                        }
                        if(i == 5)return row[5]
                    }
                }
                function BotLocation(){
                    var r = Math.floor(Math.random()*5)
                    var row = places.filter(x => Number(x.name.slice(-1)) == r)
                    for(let i = 0; i < row.length ; i++){
                        if(row[i].red || row[i].blue){
                            if(i == 0)return BotLocation()
                            return row[i-1]
                        }
                        if(i == 5)return row[5]
                    }
                }
                Checker()
            })
        }
    }
})

Client.login(require("./config.json").token)