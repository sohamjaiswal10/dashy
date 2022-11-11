import { guildsService } from '../../services/guilds.service';
import { guildedRestService } from '../../main';
import { Embed, Message } from 'guilded.js';
import { embedHelper } from '../embeds/embeds.helper';
import { IBotGuild } from '@dashy/api-interfaces';
import { RESTPostChannelsResult } from '@guildedjs/guilded-api-typings';
export const interactionResponseHandler = async (
    message: Message,
    content: Embed | string
) => {
    const guild = (await guildsService
        .getGuild(message.serverId)
        .catch((err) => console.log(err))) as IBotGuild;
    await message.reply(content).catch((err) => console.log(err));
    if (guild.helper.isHelper) {
        const channel = (
            (await guildedRestService
                .getChannel(guild.helper.helperChannel)
                .catch((err) => console.log(err))) as RESTPostChannelsResult
        ).channel;
        if (content instanceof Embed) {
            guildedRestService
                .sendMessageToChannel(channel.id, {
                    embeds: [embedHelper.convertEmbedToEmbedPayload(content)],
                })
                .catch((err) => console.log(err));
            return;
        }
        guildedRestService
            .sendMessageToChannel(channel.id, { content })
            .catch((err) => console.log(err));
    }
    return;
};
