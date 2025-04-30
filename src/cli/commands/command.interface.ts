export interface Command {
  getName(): string;
  execute(...parametrs: string[]): void;
}
