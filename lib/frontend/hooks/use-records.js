"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.useRecords = void 0;

var _react = require("react");

var _reactRouter = require("react-router");

var _useNotice = _interopRequireDefault(require("./use-notice"));

var _apiClient = _interopRequireDefault(require("../utils/api-client"));

var _useTranslation = require("./use-translation");

var _appendForceRefresh = require("../components/actions/utils/append-force-refresh");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const api = new _apiClient.default();

const useRecords = resourceId => {
  const [records, setRecords] = (0, _react.useState)([]);
  const [loading, setLoading] = (0, _react.useState)(false);
  const [perPage, setPerPage] = (0, _react.useState)(10);
  const [page, setPage] = (0, _react.useState)(1);
  const [total, setTotal] = (0, _react.useState)(0);
  const [direction, setDirection] = (0, _react.useState)('asc');
  const [sortBy, setSortBy] = (0, _react.useState)();
  const location = (0, _reactRouter.useLocation)();
  const history = (0, _reactRouter.useHistory)();
  const addNotice = (0, _useNotice.default)();
  const {
    translateMessage
  } = (0, _useTranslation.useTranslation)();
  const onNotice = (0, _useNotice.default)();

  const fetchData = () => {
    setLoading(true);
    const query = new URLSearchParams(location.search);
    const promise = api.resourceAction({
      actionName: 'list',
      resourceId,
      params: query
    });
    promise.then(response => {
      const listActionResponse = response.data;

      if (listActionResponse.notice) {
        onNotice(listActionResponse.notice);
      }

      if (listActionResponse.redirectUrl) {
        history.push(listActionResponse.redirectUrl);
        return;
      }

      setRecords(listActionResponse.records);
      setPage(listActionResponse.meta.page);
      setPerPage(listActionResponse.meta.perPage);
      setTotal(listActionResponse.meta.total);
      setDirection(listActionResponse.meta.direction);
      setSortBy(listActionResponse.meta.sortBy);
      setLoading(false);
    }).catch(() => {
      addNotice({
        message: translateMessage('errorFetchingRecords', resourceId),
        type: 'error'
      });
    });
    return promise;
  };

  (0, _react.useEffect)(() => {
    if ((0, _appendForceRefresh.hasForceRefresh)(location.search)) {
      history.replace([location.pathname, (0, _appendForceRefresh.removeForceRefresh)(location.search).toString()].join('?'));
    } else {
      fetchData();
    }
  }, [resourceId, location.search]);
  return {
    records,
    loading,
    page,
    total,
    direction,
    sortBy,
    perPage,
    fetchData
  };
};

exports.useRecords = useRecords;
var _default = useRecords;
exports.default = _default;