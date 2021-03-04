"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var flat = _interopRequireWildcard(require("flat"));

var _sortSetter = _interopRequireDefault(require("../services/sort-setter"));

var _filter = _interopRequireDefault(require("../utils/filter"));

var _populator = _interopRequireDefault(require("../utils/populator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const PER_PAGE_LIMIT = 500;
/**
 * @implements Action
 * @category Actions
 * @module ListAction
 * @description
 * Returns selected Records in a list form
 * @private
 */

const ListAction = {
  name: 'list',
  isVisible: true,
  actionType: 'resource',
  showFilter: true,
  showInDrawer: false,

  /**
   * Responsible for returning data for all records.
   *
   * To invoke this action use {@link ApiClient#recordAction}
   *
   * @implements Action#handler
   * @memberof module:ListAction
   * @return {Promise<ListActionResponse>} records with metadata
   */
  handler: async (request, response, context) => {
    const {
      query
    } = request;
    const {
      sortBy,
      direction,
      filters = {}
    } = flat.unflatten(query || {});
    const {
      resource
    } = context;
    let {
      page,
      perPage
    } = flat.unflatten(query || {});
    const listProperties = resource.decorate().getListProperties();

    if (perPage) {
      perPage = +perPage > PER_PAGE_LIMIT ? PER_PAGE_LIMIT : +perPage;
    } else {
      perPage = 10; // default
    }

    page = Number(page) || 1;
    const sort = (0, _sortSetter.default)({
      sortBy,
      direction
    }, listProperties[0].name(), resource.decorate().options);
    const filter = await new _filter.default(filters, resource).populate();
    const records = await resource.find(filter, {
      limit: perPage,
      offset: (page - 1) * perPage,
      sort
    });
    const populatedRecords = await (0, _populator.default)(records, listProperties); // eslint-disable-next-line no-param-reassign

    context.records = populatedRecords;
    const total = await resource.count(filter);
    return {
      meta: {
        total,
        perPage,
        page,
        direction: sort.direction,
        sortBy: sort.sortBy
      },
      records: populatedRecords.map(r => r.toJSON(context.currentAdmin))
    };
  }
};
var _default = ListAction;
/**
 * Response returned by List action
 * @memberof module:ListAction
 * @alias ListAction
 */

exports.default = _default;