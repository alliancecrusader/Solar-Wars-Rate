export type SlashCommand = {
  command: string;
  args: {
    [key: string]: string;
  };
};

export const tokenTypes = {
  commandName: "COMMAND_NAME",
  identifier: "IDEN",
  colon: "COLON",
  string: "STRING",
  number: "NUMBER",
  bool: "BOOL",
  end: "EOF",
} as const;

export type TokenType = (typeof tokenTypes)[keyof typeof tokenTypes];
