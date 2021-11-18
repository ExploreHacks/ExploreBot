import type { GoogleSpreadsheet } from "google-spreadsheet";

// declare module "@sapphire/framework" {
//   interface Container {
//     sheets: GoogleSpreadsheet;
//   }
// }

 declare module '@sapphire/pieces' {
   interface Container {
     sheets: GoogleSpreadsheet;
   }
 }