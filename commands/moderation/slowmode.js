const { MessageEmbed } = require("discord.js")
const { ccEmbed } = require("../../utils/ccEmbed-utils")

const { checkModLogs } = require("../../utils/configChecker")

module.exports = {
    name: 'slowmode',
    description: 'Manages the slowmode of the current channel',
    aliases: ['sm', 'slow'],
    usage: '[amount]',
    category: 'moderation',
    permissions: 'MANAGE_MESSAGES',
    async run (client, message, args) {
        const modLogs = await checkModLogs(message)
        if (!modLogs) return message.channel.send({ embeds: [ccEmbed('error', 'Error', 'Oops! The moderation module is disabled because the mod logs channel is not set!')] })
        let amount = args[0]

        if (!amount) {
            const embed = ccEmbed('success', 'Slowmode Found!')
                .addField('Current Slowmode', message.channel.rateLimitPerUser !== 0 ? `\`${message.channel.rateLimitPerUser.toString()}\` seconds` : 'None')

            message.channel.send({ embeds: [embed] })
        } else {
            if (amount.toLowerCase() === "none") amount = 0
            
            if (isNaN(amount) || parseInt(amount) < 0 || parseInt(amount) > 3600) {
                const errEmbed = new MessageEmbed()
                    .setTitle('<:CrowdControl_Cross:887607566060888094> Invalid Amount!')
                    .setDescription('Please enter a valid slowmode between 1 & 3600!')
                    .setColor(0x0000FF)

                return message.channel.send({ embeds: [errEmbed]})
            }

            const embed = ccEmbed('success', 'Slowmode Successfully Set!')
                .addField('Initial Slowmode', message.channel.rateLimitPerUser !== 0 ? `\`${message.channel.rateLimitPerUser.toString()}\` seconds` : 'None')
                .addField('Final Slowmode', `\`${amount}\` seconds`)

            message.channel.setRateLimitPerUser(parseInt(amount)).then(() => message.channel.send({ embeds: [embed] }))
        }
    }
}