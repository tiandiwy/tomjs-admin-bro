import BaseResource from './base-resource';
/**
 * Representation of an ORM database in AdminBro
 * @category Base
 *
 * @mermaid
 *   graph LR
 *   A[BaseDatabase] -->|has many| B(BaseResource)
 *   B --> |has many|C(BaseRecord)
 *   B --> |has many|D(BaseProperty)
 */
declare class BaseDatabase {
    constructor(database: any);
    /**
     * Checks if given adapter supports database provided by user
     *
     * @param  {any}  database    database provided in AdminBroOptions#databases array
     * @return {Boolean}          if given adapter supports this database - returns true
     */
    static isAdapterFor(database: any): boolean;
    /**
     * returns array of all resources (collections/tables) in the database
     *
     * @return {BaseResource[]}
     */
    resources(): Array<BaseResource>;
}
export default BaseDatabase;
