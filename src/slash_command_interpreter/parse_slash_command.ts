// import { SlashCommand } from "../modules/types";

// const tokenTypes = {
//   commandName: "COMMAND_NAME",
//   identifier: "IDEN",
//   colon: "COLON",
//   string: "STRING",
//   number: "NUMBER",
//   bool: "BOOL",
//   end: "EOF",
// } as const;

// type ValueOf<T> = T[keyof T];

// type TokenType = ValueOf<typeof tokenTypes>;

// const idenRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

// const lexSlashCommand = (command: string): SlashCommand => {
//   let i = 0;
//   const len = command.length;
//   const tokens: Array<TokenType> = [];

//   const current = () => {
//     return tokens[tokens.length];
//   };

//   while (i < len) {
//     const char = command[i];
//     if (char === "/") {
//       while (i ) {
//     } else if (char === ":") {
//       tokens.push(tokenTypes.colon);
//     } else if (/\d/.test(char)) {
//       tokens.push(tokenTypes.number);
//     } else if (char === '"') {
//       tokens.push(tokenTypes.string);
//     } else {
//       tokens.push(tokenTypes.identifier);
//     }

//     i++;
//   }
// };
