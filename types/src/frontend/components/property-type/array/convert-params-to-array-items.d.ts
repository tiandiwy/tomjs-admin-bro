import PropertyJSON from '../../../../backend/decorators/property-json.interface';
import RecordJSON from '../../../../backend/decorators/record-json.interface';
/**
 * Converts flatten params to array items when given property is an array.
 *
 * What problem it solves:
 * so let say user has a record with record.property:
 * ```
 * Item.0.imageVariants.0.dateCreated: "2019-09-19T10:00:00.000Z"
 * Item.0.imageVariants.0.imageURL: "url to help"
 * Item.0.imageVariants.0.isApproved: true
 * Item.0.imageVariants.0.isDeleted: false
 * Item.0.imageVariants.1.dateCreated: "2019-09-19T19:10:34.919Z"
 * Item.0.imageVariants.1.imageURL: "url 2"
 * ```
 *
 * this function for property: `Item.0.imageVariants` should return array with 2 items. Where for
 * property `Item` array with one element
 *
 * @param {PropertyJSON} property
 * @param {RecordJSON} record
 *
 * @private
 */
declare const convertParamsToArrayItems: (property: PropertyJSON, record: RecordJSON) => Array<string>;
export default convertParamsToArrayItems;
