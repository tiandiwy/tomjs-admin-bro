import BaseProperty from './base-property';
import BaseRecord, { ParamsType } from './base-record';
import Filter from '../utils/filter';
import ResourceDecorator from '../decorators/resource-decorator';
import { ResourceOptions } from '../decorators/resource-options.interface';
import AdminBro from '../../admin-bro';
/**
 * Representation of a ORM Resource in AdminBro. Visually resource is a list item in the sidebar.
 * Each resource has many records and many properties.
 *
 * Analogy is REST resource.
 *
 * It is an __abstract class__ and all database adapters should implement extend it implement
 * following methods:
 *
 * - (static) {@link BaseResource.isAdapterFor isAdapterFor()}
 * - {@link BaseResource#databaseName databaseName()}
 * - {@link BaseResource#name name()}
 * - {@link BaseResource#id id()}
 * - {@link BaseResource#properties properties()}
 * - {@link BaseResource#property property()}
 * - {@link BaseResource#count count()}
 * - {@link BaseResource#find find()}
 * - {@link BaseResource#findOne findOne()}
 * - {@link BaseResource#findMany findMany()}
 * - {@link BaseResource#create create()}
 * - {@link BaseResource#update update()}
 * - {@link BaseResource#delete delete()}
 * @category Base
 * @abstract
 * @hideconstructor
 */
declare class BaseResource {
    _decorated: ResourceDecorator | null;
    /**
     * Checks if given adapter supports resource provided by the user.
     * This function has to be implemented only if you want to create your custom
     * database adapter.
     *
     * For one time Admin Resource creation - it is not needed.
     *
     * @param  {any}  rawResource resource provided in AdminBroOptions#resources array
     * @return {Boolean}          if given adapter supports this resource - returns true
     * @abstract
     */
    static isAdapterFor(rawResource: any): boolean;
    /**
     * Creates given resource based on the raw resource object
     *
     * @param   {Object}  [resource]
     */
    constructor(resource?: any);
    /**
     * The name of the database to which resource belongs. When resource is
     * a mongoose model it should be database name of the mongo database.
     *
     * Visually, by default, all resources are nested in sidebar under their database names.
     * @return {String}         database name
     * @abstract
     */
    databaseName(): string;
    /**
     * Returns type of the database. It is used to compute sidebar icon for
     * given resource. Default: 'database'
     * @return {String}
     */
    databaseType(): string;
    /**
     * Each resource has to have uniq id which will be put to an URL of AdminBro routes.
     * For instance in {@link Router} path for the `new` form is `/resources/{resourceId}/new`
     * @return {String} uniq resource id
     * @abstract
     */
    id(): string;
    /**
     * returns array of all properties which belongs to resource
     * @return {BaseProperty[]}
     * @abstract
     */
    properties(): Array<BaseProperty>;
    /**
     * returns property object for given field
     * @param {String} path           path/name of the property. Take a look at
     *                                {@link BaseProperty} to learn more about
     *                                property paths.
     * @return {BaseProperty | null}
     * @abstract
     */
    property(path: string): BaseProperty | null;
    /**
     * Returns number of elements for given resource by including filters
     * @param  {Filter} filter        represents what data should be included
     * @return {Promise<Number>}
     * @abstract
     */
    count(filter: Filter): Promise<number>;
    /**
     * Returns actual records for given resource
     *
     * @param  {Filter} filters                        what data should be included
     * @param  {Object} options
     * @param  {Number} [options.limit]                  how many records should be taken
     * @param  {Number} [options.offset]                 offset
     * @param  {Object} [options.sort]                   sort
     * @param  {Number} [options.sort.sortBy]            sortable field
     * @param  {Number} [options.sort.direction]         either asc or desc
     * @return {Promise<BaseRecord[]>}                          list of records
     * @abstract
     * @example
     * // filters example
     * {
     *    name: 'Tom',
     *    createdAt: { from: '2019-01-01', to: '2019-01-18' }
     * }
     */
    find(filter: Filter, options: {
        limit?: number;
        offset?: number;
        sort?: {
            sortBy?: string;
            direction?: 'asc' | 'desc';
        };
    }): Promise<Array<BaseRecord>>;
    /**
     * Populates records with references for given property.
     *
     * Example: Let say resource `Article` has property `user_id` and it is a reference
     * to `User` resource. When you call this `User.populate([...articleRecords], userIdProperty)`
     * it should populate `articleRecords` with corresponding users.
     * So after that invoking `articleRecord.populated['user_id']` will return the user Record
     *
     * @param   {Array<BaseRecord>}  records  all records which should be populated
     * @param   {BaseProperty}  property      property which is a reference to `this` Resource
     *
     * @return  {Promise<Array<BaseRecord>>}  populated records
     */
    populate(records: Array<BaseRecord>, property: BaseProperty): Promise<Array<BaseRecord>>;
    /**
     * Finds one Record in the Resource by its id
     *
     * @param  {String} id      uniq id of the Resource Record
     * @return {Promise<BaseRecord> | null}   record
     * @abstract
     */
    findOne(id: string): Promise<BaseRecord | null>;
    /**
     * Finds many records based on the resource ids
     *
     * @param   {Array<string>}              list of ids to find
     *
     * @return  {Promise<Array<BaseRecord>>} records
     */
    findMany(ids: Array<string>): Promise<Array<BaseRecord>>;
    /**
     * Builds new Record of given Resource.
     *
     * Each Record is an representation of the resource item. Before it can be saved,
     * it has to be instantiated.
     *
     * This function has to be implemented if you want to create new records.
     *
     * @param  {Record<string, any>} params
     * @return {BaseRecord}
     */
    build(params: Record<string, any>): BaseRecord;
    /**
     * Creates new record
     *
     * @param  {Record<string, any>}     params
     * @return {Promise<Object>}         created record converted to raw Object which
     *                                   can be used to initiate new {@link BaseRecord} instance
     * @throws {ValidationError}         If there are validation errors it should be thrown
     * @abstract
     */
    create(params: Record<string, any>): Promise<ParamsType>;
    /**
     * Updates an object
     *
     * @param  {String} id               uniq id of the Resource Record
     * @param  {Record<string, any>}     params
     * @return {Promise<Object>}         created record converted to raw Object which
     *                                   can be used to initiate new {@link BaseRecord} instance
     * @throws {ValidationError}         If there are validation errors it should be thrown
     * @abstract
     */
    update(id: string, params: Record<string, any>): Promise<ParamsType>;
    /**
     * Delete given record by id
     *
     * @param  {String|Number}           id id of the Record
     * @throws {ValidationError}         If there are validation errors it should be thrown
     * @abstract
     */
    delete(id: string): Promise<void>;
    /**
     * Assigns given decorator to the Resource. Than it will be available under
     * resource.decorate() method
     *
     * @param  {BaseDecorator}  Decorator
     * @param  {AdminBro}       admin         current instance of AdminBro
     * @param  {ResourceOptions} [options]
     * @private
     */
    assignDecorator(admin: AdminBro, options?: ResourceOptions): void;
    /**
     * Gets decorator object for given resource
     * @return {BaseDecorator | null}
     */
    decorate(): ResourceDecorator;
}
export default BaseResource;
