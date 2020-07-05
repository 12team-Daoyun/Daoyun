// 后台服务器请求地址
const hostip = 'http://116.62.176.2:5000';

export const Constants = Object.freeze({
    loginUrl: hostip + '/login',
    registerUrl: hostip + '/regist',
    existUserUrl: hostip + '/isExist',
    getClassUrl: hostip + '/getclass',
    getUserByPhoneUrl: hostip + '/getUserByPhone',
    joinClassUrl: hostip + '/joinClass',
    createClassUrl: hostip + '/constructclass',
    quitClassUrl: hostip + '/quitclass',
    getAllClassesUrl: hostip + '/getAllClasses',
    getClassMemberUrl: hostip + '/getClassMember',
    getSignInMembersUrl: hostip + '/getSignInMembers',
    getDownloadHomeworksUrl: hostip + '/returnClassWork',
    getHomeworkListByClassIdUrl: hostip + '/getHomeworks',
    checkUploadFileUrl: hostip + '/checkUploadFile',
    publishHomeworkUrl: hostip + '/publishWork',
    uploadHomeworkUrl: hostip + '/uploadWork',
    getFilesByWorkIdUrl: hostip + '/getFilesByWorkId',
    downloadHomeworkUrl: hostip + '/downloadWork',
    beginSignInUrl: hostip + '/beginSignIn',
    cancelSignInUrl: hostip + '/cancelSignIn',
    recordSignInUrl: hostip + '/recordSign',
    isSignInUrl: hostip + '/isSignIn'
  });
