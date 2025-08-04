// import { SlashCommand, TokenType } from "../types/slash_command_interpreter";

// const slashCommandRegex = /^[a-z0-9_-]$/i;
// //Lower case and not include space
// const argumentRegex = /^[a-z0-9_-]+$/i;

// class Lexer {
//   input: string;
//   position: number;
//   currentChar: string | null;
//   tokens: Array<{ type: TokenType; value: string }> = [];

//   constructor(input: string) {
//     this.input = input;
//     this.position = 0;
//     this.currentChar = this.input.length > 0 ? this.input[0] : null;
//   }

//   advance() {
//     this.position++;
//     if (this.position < this.input.length) {
//       this.currentChar = this.input[this.position];
//     } else {
//       this.currentChar = null;
//     }
//   }

//   peek() {
//     return this.position + 1 < this.input.length
//       ? this.input[this.position + 1]
//       : null;
//   }

//   //Slash command names must be between 1-32 characters and contain no capital letters, spaces, or symbols other than - and _.

//   lex() {
//     while (this.currentChar !== null && this.position < this.input.length) {
//       if (this.currentChar === "/") {
//         this.advance();
//         let commandName = "";
//         while (
//           this.currentChar !== null &&
//           slashCommandRegex.test(this.currentChar)
//         ) {
//           commandName += this.currentChar;
//           this.advance();
//         }
//         this.tokens.push({ type: "COMMAND_NAME", value: commandName });
//       } else if (this.currentChar === " ") {
//         this.advance();
//       } else if (identifierRegex.test(this.currentChar)) {
//         let identifier = "";
//         while (
//           this.currentChar !== null &&
//           identifierRegex.test(this.currentChar)
//         ) {
//           identifier += this.currentChar;
//           this.advance();
//         }
//         this.tokens.push({ type: "IDEN", value: identifier });
//       } else if (this.currentChar === ":") {
//         this.tokens.push({ type: "COLON", value: ":" });
//         this.advance();
//       }
//     }
//   }
// }
