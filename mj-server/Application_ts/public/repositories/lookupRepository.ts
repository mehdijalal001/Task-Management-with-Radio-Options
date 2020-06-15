import { SQLDBProvider } from '../providers/dbProvider/sqlDBPovider';
import { ILookupRepository } from "../interfaces/iLookupRepository";
import { Lookup } from '../models/lookup';
import { LogErrors } from '../common/logErrors.controller';


export class LookupRepository implements ILookupRepository {
    constructor() {}

    public async getAllLookupByTableNames(req:any,res:any,next:any): Promise<any> {

        var tbl = req.params.tbl;

        console.log(tbl);
        var tablename = "";
        var tableArray: string[] = ['status', 'priority', 'country', 'province'];
        if (tableArray.includes(tbl)) {
            switch (tbl) {
                case "status":
                    tablename = "IAP.AA_Lookup_Status";
                    break;
                case "priority":
                    tablename = "IAP.AA_Lookup_Priority";
                    break;
                case "country":
                    tablename = "IAP.AA_Lookup_Countries";
                    break;
                case "province":
                    tablename = "IAP.AA_Lookup_ProvincesStates";
                    break;
                default:
                    tablename = "";
                    break;
            }

            const staticTableName = tablename;
            let lookupArray: Lookup[] = [];
            let provider = new SQLDBProvider();
            let inputParameters: any[] = [];
            let CustomQuery = `SELECT * FROM ${staticTableName}`;
            await provider
            .executeQuery(CustomQuery)
            .then(results => {
                if (results) {
                lookupArray = Lookup.MapDBToArray(results);
                }
            })
            .catch(err => {
                return LogErrors.logErrors(err);
            });
        
            return lookupArray;
        }else{
            res.send('Invalud table name');
        }
      }

}