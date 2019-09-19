"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLs = {
    "PSP": "/api/v1/psp",
    "TRANSACTION": "/api/v1/transaction",
    "PAYABLE": "/api/v1/payable",
    "PAYABLE_CLIENT_ID": "/api/v1/payable/:clientId"
};
exports.tMsg = {
    "DANGER": "msgErro",
    "SUCCESS": "msgSuccesso",
    "INFO": "msgInfo",
    "ALERT": "msgAlert",
    "STRACE": "msgStrace"
};
exports.oMsg = {
    "OBJ": "obj",
    "LIST": "list",
    "SEARCH": "search",
    "LIST_MSG": "listMsg",
    "PAGE": "page",
    "TOTAL_PAGES": "totalPages",
    "FIELD_SORT": "fieldSort",
    "SORT": "sort",
    "LIMIT": "limit",
    "RANGE_START": "rangeStart",
    "RANGE_END": "rangeEnd",
    "TOTAL_ROWS": "totalRows",
};
exports.secretToken = {
    "TOKEN": "x-auth-token",
    "TIME": 84600,
    "SECRET": "lw52XD9w>KuiwD;`YWP5lpg5?hXKX#@!$T@$G@G@IQl8]XBkeso=38BNdam0w@fYLy8;Q/tj2tu"
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3Zhci93d3cvUFNQLWJhY2tlbmQvc3JjL3V0aWwvVmFsdWVzLnRzIiwic291cmNlcyI6WyIvdmFyL3d3dy9QU1AtYmFja2VuZC9zcmMvdXRpbC9WYWx1ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBYSxRQUFBLElBQUksR0FBRztJQUNoQixLQUFLLEVBQUcsYUFBYTtJQUNyQixhQUFhLEVBQUcscUJBQXFCO0lBQ3JDLFNBQVMsRUFBRyxpQkFBaUI7SUFDN0IsbUJBQW1CLEVBQUcsMkJBQTJCO0NBQ3BELENBQUM7QUFFVyxRQUFBLElBQUksR0FBRztJQUNoQixRQUFRLEVBQUUsU0FBUztJQUNuQixTQUFTLEVBQUUsYUFBYTtJQUN4QixNQUFNLEVBQUUsU0FBUztJQUNqQixPQUFPLEVBQUUsVUFBVTtJQUNuQixRQUFRLEVBQUUsV0FBVztDQUN4QixDQUFDO0FBRVcsUUFBQSxJQUFJLEdBQUc7SUFDaEIsS0FBSyxFQUFFLEtBQUs7SUFDWixNQUFNLEVBQUUsTUFBTTtJQUNkLFFBQVEsRUFBRSxRQUFRO0lBQ2xCLFVBQVUsRUFBRSxTQUFTO0lBQ3JCLE1BQU0sRUFBRSxNQUFNO0lBQ2QsYUFBYSxFQUFFLFlBQVk7SUFDM0IsWUFBWSxFQUFFLFdBQVc7SUFDekIsTUFBTSxFQUFFLE1BQU07SUFDZCxPQUFPLEVBQUUsT0FBTztJQUNoQixhQUFhLEVBQUUsWUFBWTtJQUMzQixXQUFXLEVBQUUsVUFBVTtJQUN2QixZQUFZLEVBQUUsV0FBVztDQUM1QixDQUFDO0FBRVcsUUFBQSxXQUFXLEdBQUU7SUFDdEIsT0FBTyxFQUFFLGNBQWM7SUFDdkIsTUFBTSxFQUFFLEtBQUs7SUFDYixRQUFRLEVBQUUsNkVBQTZFO0NBQzFGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgVVJMcyA9IHtcbiAgICBcIlBTUFwiIDogXCIvYXBpL3YxL3BzcFwiLFxuICAgIFwiVFJBTlNBQ1RJT05cIiA6IFwiL2FwaS92MS90cmFuc2FjdGlvblwiLFxuICAgIFwiUEFZQUJMRVwiIDogXCIvYXBpL3YxL3BheWFibGVcIixcbiAgICBcIlBBWUFCTEVfQ0xJRU5UX0lEXCIgOiBcIi9hcGkvdjEvcGF5YWJsZS86Y2xpZW50SWRcIlxufTtcblxuZXhwb3J0IGNvbnN0IHRNc2cgPSB7Ly9UaXBvcyBkZSBtZW5zYWdlbnNcbiAgICBcIkRBTkdFUlwiOiBcIm1zZ0Vycm9cIixcbiAgICBcIlNVQ0NFU1NcIjogXCJtc2dTdWNjZXNzb1wiLFxuICAgIFwiSU5GT1wiOiBcIm1zZ0luZm9cIixcbiAgICBcIkFMRVJUXCI6IFwibXNnQWxlcnRcIixcbiAgICBcIlNUUkFDRVwiOiBcIm1zZ1N0cmFjZVwiXG59O1xuXG5leHBvcnQgY29uc3Qgb01zZyA9IHsvL09iamV0b3MgZGUgcmV0b3Jub1xuICAgIFwiT0JKXCI6IFwib2JqXCIsXG4gICAgXCJMSVNUXCI6IFwibGlzdFwiLFxuICAgIFwiU0VBUkNIXCI6IFwic2VhcmNoXCIsXG4gICAgXCJMSVNUX01TR1wiOiBcImxpc3RNc2dcIixcbiAgICBcIlBBR0VcIjogXCJwYWdlXCIsXG4gICAgXCJUT1RBTF9QQUdFU1wiOiBcInRvdGFsUGFnZXNcIixcbiAgICBcIkZJRUxEX1NPUlRcIjogXCJmaWVsZFNvcnRcIixcbiAgICBcIlNPUlRcIjogXCJzb3J0XCIsXG4gICAgXCJMSU1JVFwiOiBcImxpbWl0XCIsXG4gICAgXCJSQU5HRV9TVEFSVFwiOiBcInJhbmdlU3RhcnRcIixcbiAgICBcIlJBTkdFX0VORFwiOiBcInJhbmdlRW5kXCIsXG4gICAgXCJUT1RBTF9ST1dTXCI6IFwidG90YWxSb3dzXCIsXG59O1xuXG5leHBvcnQgY29uc3Qgc2VjcmV0VG9rZW4gPXtcbiAgICBcIlRPS0VOXCI6IFwieC1hdXRoLXRva2VuXCIsXG4gICAgXCJUSU1FXCI6IDg0NjAwLFxuICAgIFwiU0VDUkVUXCI6IFwibHc1MlhEOXc+S3Vpd0Q7YFlXUDVscGc1P2hYS1gjQCEkVEAkR0BHQElRbDhdWEJrZXNvPTM4Qk5kYW0wd0BmWUx5ODtRL3RqMnR1XCJcbn07XG5cblxuIl19