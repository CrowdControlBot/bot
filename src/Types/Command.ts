import { ApplicationCommandOptionData, ApplicationCommandOptionType, CommandInteraction } from 'discord.js'
import CrowdControlClient from "../Client/CrowdControlClient";
import CrowdControlUtils from "../Client/CrowdControlUtils";

export default class Command {
    public client?: CrowdControlClient;
    public utils?: CrowdControlUtils;
    public readonly name: string;
    public readonly description: string;
    public readonly category: string;
    public readonly devOnly?: boolean;
    public readonly options?: ApplicationCommandOptionData[]
  
    public constructor(settings?: CommandOptions) {
      this.name = settings!.name;
      this.description = settings!.description;
      this.category = settings!.category;
      this.devOnly = settings!.devOnly ?? false;
      this.options = settings!.options;
    }
  
    run(int: CommandInteraction): any {}
}

interface CommandOptions {
    name: string;
    description: string;
    category: string;
    devOnly?: boolean;
    // maybe smth like ownerOnly: boolean; || or modOnly: boolean;
    options?: ApplicationCommandOptionData[]
  }