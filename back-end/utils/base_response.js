const result = (json) => ({ errorCode: 0, data: json });
const pagingResult = (data, pageInfo) => ({
    errorCode: 0,
    data: data,
    pageInfo: pageInfo,
})
const error = (code, mess) => ({
    errorCode: code,
    message: mess
});

module.exports = {
    Result: result,
    ErrorResult: error,
    PagingResult: pagingResult,
}