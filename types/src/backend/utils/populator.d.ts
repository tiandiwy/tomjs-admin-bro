import BaseRecord from '../adapters/base-record';
import PropertyDecorator from '../decorators/property-decorator';
/**
 * Populates all records references. If the record has a reference to let say `user_id`
 * it will fill record.populated['user_id'] with the corresponding User record.
 *
 * It mutates the `records` param
 *
 * @param {Array<BaseRecord>} records
 * @param {Array<PropertyDecorator>} [properties] when given it will only populate those properties
 * @private
 */
declare const populator: (records: Array<BaseRecord>, properties?: PropertyDecorator[] | undefined) => Promise<Array<BaseRecord>>;
export default populator;
