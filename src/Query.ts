import { PoolConnection, Connection } from 'mysql'


export default abstract class Query
{
    static async execute(
        query : string,
        params : any[],
        connection : Connection | PoolConnection,
        options? : { [key : string] : any }) : Promise<any>
    {
        return new Promise((resolve, reject)=> {
            let queryMade = connection!.query(query, params, (error, result)=> {

                // Log the query to the console
                if(options && options.logQuery === true)
                {
                    console.log(queryMade.sql)
                }

                // If error reject and return Promise
                if(error) { return reject(error) }

                // Release the current connection if this is not transaction
                // And if connection is of type PoolConnection
                // if(connection === undefined && this.isPoolConnection(conn))
                // {
                //     conn!.release()
                // }

                return resolve(result)
            })
        })
    }
}
