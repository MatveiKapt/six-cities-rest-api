import { readFileSync } from 'node:fs';
import { Command } from './command.interface.js';

type PackageJSONConfig = {
  version: string;
}

const isPackageJSONConfig = (value: unknown): value is PackageJSONConfig => (
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value) &&
  'version' in value
);

export class VersionCommand implements Command {
  constructor(private readonly filePath: string = 'package.json') {}

  getName(): string {
    return '--version';
  }

  private readVersion(): string {
    const jsonContent = readFileSync(this.filePath, 'utf-8');
    const content = JSON.parse(jsonContent);

    if (!isPackageJSONConfig(content)) {
      throw new Error('Failed to parse json content.');
    }

    return content.version;
  }

  public execute(..._parameters: string[]): void {
    try {
      const version = this.readVersion();
      console.info(version);
    } catch (error: unknown) {
      console.error(`Failed to read version from ${this.filePath} file.`);

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
