"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _notFoundError = _interopRequireDefault(require("../utils/not-found-error"));

var _populator = _interopRequireDefault(require("../utils/populator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @implements Action
 * @category Actions
 * @module EditAction
 * @description
 * Shows form for updating existing record
 * @private
 *
 * @classdesc
 * Uses {@link EditAction} component to render form
 */
const EditAction = {
  name: 'edit',
  isVisible: true,
  actionType: 'record',
  icon: 'Edit',
  showInDrawer: false,

  /**
   * Responsible for updating existing record.
   *
   * To invoke this action use {@link ApiClient#recordAction}
   *
   * @return  {RecordActionResponse}  populated record
   * @implements Action#handler
   * @memberof module:EditAction
   */
  handler: async (request, response, data) => {
    const {
      record,
      resource,
      currentAdmin,
      h,
      translateMessage
    } = data;

    if (!record) {
      throw new _notFoundError.default([`Record of given id ("${request.params.recordId}") could not be found`].join('\n'), 'Action#handler');
    }

    if (request.method === 'get') {
      return {
        record: record.toJSON(currentAdmin)
      };
    }

    await record.update(request.payload);
    const [populatedRecord] = await (0, _populator.default)([record]);

    if (record.isValid()) {
      var _resource$_decorated;

      return {
        redirectUrl: h.resourceUrl({
          resourceId: ((_resource$_decorated = resource._decorated) === null || _resource$_decorated === void 0 ? void 0 : _resource$_decorated.id()) || resource.id()
        }),
        notice: {
          message: translateMessage('successfullyUpdated', resource.id()),
          type: 'success'
        },
        record: populatedRecord.toJSON(currentAdmin)
      };
    }

    return {
      record: populatedRecord.toJSON(currentAdmin),
      notice: {
        message: translateMessage('thereWereValidationErrors'),
        type: 'error'
      }
    };
  }
};
var _default = EditAction;
exports.default = _default;