import type { GoogleSpreadsheet } from "google-spreadsheet";
import type { AwsClient, BaseExternalAccountClient, Compute, GoogleAuth, JWT, UserRefreshClient } from "googleapis-common";
import type { Impersonated } from "googleapis-common/node_modules/google-auth-library";

// declare module "@sapphire/framework" {
//   interface Container {
//     sheets: GoogleSpreadsheet;
//   }
// }

 declare module '@sapphire/pieces' {
   interface Container {
     sheets: any;
     googleClient: any;
     metaData: any;
     auth: GoogleAuth;
   }
 }