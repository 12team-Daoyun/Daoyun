import pymysql
from flask import Flask, jsonify, request
import json
from flask_cors import *
import datetime
import os
from werkzeug.utils import secure_filename
from flask import send_file

app = Flask(__name__)
CORS(app, supports_credentials=True)
# 连接数据库，
conn = pymysql.connect(
    host='localhost',
    user='root',
    password='123456',
    port=3306,
    db='daoyun',
    charset='utf8',
)

#注册接口
@app.route('/regist', methods=["GET","POST"])  # 代表首页
def regist():  # 视图函数
    data = request.get_data()
    print(data)
    tel = request.form.get('tel')
    pwd = request.form.get('pwd')
    username = request.form.get('username')
    school = request.form.get('school')
    college = request.form.get('college')
    sex = request.form.get('sex')
    identity = request.form.get('identity')
    username = str(username)
    sex = str(sex)
    identity = str(identity)
    tel = str(tel)
    pwd = str(pwd)
    print("手机：", tel)
    print("密码：", pwd)
    # 建立游标
    cur = conn.cursor()
    # 返回的数据字典
    returndata = dict()
    try:
        insertsql = "insert into user(User_ID,User_Name,Password,school,college,sex,identity) values (%s, %s, %s, %s, %s, %s,%s)" % (tel, username, pwd, school, college, sex, identity)
        cur.execute("insert into user(User_ID,User_Name,Password,school,college,sex,identity) values (%s, %s, %s, %s, %s, %s,%s)",(tel, username, pwd, school, college, sex, identity))
    except Exception as e:
        returndata['status'] = 0  # 注册失败为0
        returndata['msg'] = ''
        returndata['data'] = ''
        print("插入数据失败:", e)
        cur.close()
    else:
        conn.commit()
        returndata['status'] = 1  # 注册成功为1
        returndata['msg'] = ''
        returndata['data'] = ''
        print("插入成功")
        # 关闭游标
        cur.close()

    return jsonify(returndata)  # 返回内容

#登录接口
@app.route('/login', methods=["GET","POST"])
def login():
    userid = request.form.get("tel")
    pwd = request.form.get("pwd")
    userid = str(userid)
    pwd = str(pwd)
    print(pwd)
    # 建立游标
    cur = conn.cursor()
    # 返回的数据字典
    returndata = dict()
    selectsql = "select * from user where User_ID = \"%s\" and Password = \"%s\"" %(userid, pwd)
    cur.execute(selectsql)
    result = cur.fetchone()
    if result:
        print("登录成功")
        # 返回的用户信息
        info_data = dict()
        cur.execute(selectsql)
        result = cur.fetchone()
        User_ID = result[0]
        User_Name = result[1]
        school = result[3]
        college = result[4]
        sex = result[5]
        identity = result[6]
        info_data['User_ID'] = User_ID
        info_data['User_Name'] = User_Name
        info_data['school'] = school
        info_data['college'] = college
        info_data['sex'] = sex
        info_data['identity'] = identity
        print("用户存在")
        returndata['status'] = 1
        returndata['msg'] = ''
        returndata['data'] =info_data
        cur.close()
    else:
        print("账号或密码错误")
        returndata['status'] = 0
        returndata['msg'] = ''
        returndata['data'] = ''
        cur.close()

    return jsonify(returndata)

# 创建班课接口
@app.route('/constructclass', methods=["GET", "POST"])
def constuctClass():
    userid = request.form.get('userid')
    classname = request.form.get('className')
    classname=str(classname)
    print(classname)
    teachername = request.form.get('teacherName')
    print(teachername)
    grade = request.form.get('grade')
    print(grade)
    grade = int(grade)
    comments = request.form.get('comments')
    print(comments)
    # 建立游标
    cur = conn.cursor()
    # 返回的数据字典
    returndata = dict()
    selectsql = "select count(*) from class_info"
    result=cur.execute(selectsql)
    count=cur.fetchall()
    class_id = count[0][0]+1
    print(class_id)
    try:

        insertsql1 = 'insert into sign_state values (%d,%d)' % (class_id, 0)
        cur.execute("insert into class_info(class_id,class_name,userid,teacher_name,grade,comments) values (%s,%s,%s,%s,%s,%s)",(class_id,classname,userid,teachername,grade,comments))
        cur.execute("insert into class_member(class_id,user_id) values (%s,%s)" % (class_id, userid))
        cur.execute(insertsql1)

    except Exception as e:
        returndata['status'] = 0  # 创建课程失败为0
        returndata['msg'] = ''
        returndata['data'] = ''
        print("创建课程失败:", e)
        cur.close()
    else:
        conn.commit()
        returndata['status'] = 1  # 创建课程成功为1
        returndata['msg'] = ''
        returndata['data'] = ''
        print("创建课程成功")
        cur.close()

    return jsonify(returndata)

#获取班课列表接口
@app.route('/getclass', methods=["GET","POST"])
def getClass():
    userid = request.form.get('userid')
    print(userid)
    classType = request.form.get('classType')
    classType = int(classType)
    print(classType)
    # 建立游标
    cur = conn.cursor()
    # 返回数据
    returndata = dict()
    if classType==1:  #为1代表创建的班级
        selectsql = "select * from class_info where userid = '%s'" % (userid)
        cur.execute(selectsql)
        contents = cur.fetchall()
        if contents is None:
            returndata['status'] = 0  #0表示没有创建的班级
            returndata['msg'] = ''
            returndata['data'] = ''
            return jsonify(returndata)
        else:
            # 创建列表
            dataList = []
            for row in contents:  # 遍历查询内容
                class_id = row[0]
                class_name = row[1]
                teacher_name = row[3]
                grade = row[4]
                comments = row[5]
                dataDic = dict()
                dataDic['class_id'] = class_id
                dataDic['class_name'] = class_name
                dataDic['teacher_name'] = teacher_name
                dataDic['grade'] = grade
                dataDic['comments'] = comments
                dataList.append(dataDic)
            returndata['status'] = 1  # 1表示有创建的班级
            returndata['msg'] = ''
            returndata['data'] = dataList
            cur.close()
            return jsonify(returndata)

    else:  #为0代表加入的课程
        selectsql  = "select * from class_info where class_id in (select class_id from class_member where user_id = %s)" %(userid)
        cur.execute(selectsql)
        contents = cur.fetchall()
        print(contents)
        if not contents:
            returndata['status'] = 0  # 0表示没有加入的班级
            returndata['msg'] = ''
            returndata['data'] = ''
            return jsonify(returndata)
        else:
            # 创建列表
            dataList = []
            for row in contents:  # 遍历查询内容
                class_id = row[0]
                class_name = row[1]
                teacher_name = row[3]
                grade = row[4]
                comments = row[5]
                dataDic = dict()
                dataDic['class_id'] = class_id
                dataDic['class_name'] = class_name
                dataDic['teacher_name'] = teacher_name
                dataDic['grade'] = grade
                dataDic['comments'] = comments
                dataList.append(dataDic)
            returndata['status'] = 1  # 1表示有创建的班级
            returndata['msg'] = ''
            returndata['data'] = dataList
            cur.close()
            return jsonify(returndata)

#加入班课接口
@app.route('/joinClass',methods=["GET","POST"])
def joinClass():
    my_Class_Id = request.form.get('classid')
    my_User_Id = request.form.get('userid')
    #建立游标
    cur = conn.cursor()
    #返回的数据字典
    returndata = dict()
    checkExistSql = "select * from class_info where class_id=%s"%(my_Class_Id)
    cur.execute(checkExistSql)
    contents = cur.fetchall()
    print(contents)
    if not contents:
        returndata['status'] = 0  # 加入失败
        returndata['msg'] = ''
        returndata['data'] = ''
        cur.close()
    else:
        try:
            insertsql = "insert into class_member(class_id,user_id) values (%s,%s)"%(my_Class_Id,my_User_Id)
            cur.execute(insertsql)
        except Exception as e:
            returndata['status']=0 #加入失败
            returndata['msg'] = ''
            returndata['data'] = ''
            print("插入数据失败:", e)
            cur.close()
        else:
            conn.commit()
            returndata['status'] = 1 #加入成功
            returndata['msg'] = ''
            returndata['data'] = ''
            print("插入成功")
            # 关闭游标
            cur.close()

    return jsonify(returndata)

#老师设置开始签到
@app.route('/beginSignIn',methods=["GET","POST"])
def beginSignIn():
    class_id = request.form.get('class_id')
    class_id=int(class_id)
    updatasql='update Sign_state set Is_sign = %d where class_id = %d'%(1,class_id)
    # 建立游标
    cur = conn.cursor()
    # 返回的数据字典
    returndata = dict()
    try:
        cur.execute(updatasql)
    except Exception as e:
        returndata['status']=0 #开启签到失败
        returndata['msg'] = ''
        returndata['data'] = ''
        print("开启签到失败:", e)
        cur.close()
    else:
        conn.commit()
        returndata['status'] = 1 #开启签到成功
        returndata['msg'] = ''
        returndata['data'] = ''
        print("开启签到成功")
        # 关闭游标
        cur.close()
    return jsonify(returndata)

#老师设置结束签到
@app.route('/cancelSignIn',methods=["GET","POST"])
def cancelSignIn():
    class_id = request.form.get('class_id')
    class_id = int(class_id)
    updatasql = 'update Sign_state set Is_sign = %d where class_id = %d' % (0, class_id)
    # 建立游标
    cur = conn.cursor()
    # 返回的数据字典
    returndata = dict()
    try:
        cur.execute(updatasql)
    except Exception as e:
        returndata['status'] = 0  # 结束签到失败
        returndata['msg'] = ''
        returndata['data'] = ''
        print("结束签到失败:", e)
        cur.close()
    else:
        conn.commit()
        returndata['status'] = 1  # 结束签到成功
        returndata['msg'] = ''
        returndata['data'] = ''
        print("结束签到成功")
        # 关闭游标
        cur.close()
    return jsonify(returndata)

#学生签到记录
@app.route('/recordSign',methods=["GET","POST"])
def recordSign():
    class_id=request.form.get('class_id')
    user_id=request.form.get('user_id')
    class_id=int(class_id)
    dateandtime = datetime.datetime.now().strftime("%Y-%m-%d%H:%M:%S")
    insertsql="insert into sign_in values (%s,%s,%s,%s)"%(class_id,user_id,1,dateandtime)
    # 建立游标
    cur = conn.cursor()
    # 返回的数据字典
    returndata = dict()
    selectsql='select Is_sign from sign_state where class_id = %s' %(class_id)
    cur.execute(selectsql)
    result=cur.fetchone()
    if result[0]==1:
        try:
            cur.execute("insert into sign_in values (%s,%s,%s,%s)",(class_id,user_id,1,dateandtime))
        except Exception as e:
            returndata['status'] = 0  # 签到失败
            returndata['msg'] = ''
            returndata['data'] = ''
            print("签到失败:", e)
            cur.close()
        else:
            conn.commit()
            returndata['status'] = 1  # 签到成功
            returndata['msg'] = ''
            returndata['data'] = ''
            print("签到成功")
            # 关闭游标
            cur.close()
    else:
        returndata['status'] = 0  # 签到失败
        returndata['msg'] = ''
        returndata['data'] = ''
        print("签到失败:")
        cur.close()

    return jsonify(returndata)

#判断用户名（即手机号）是否存在（使用手机验证码登录时使用到）
@app.route('/isExist',methods=["GET","POST"])
def isExist():
    tel=request.form.get('tel')
    selectsql = "select User_ID from user where User_ID = %s" %(tel)
    # 建立游标
    cur = conn.cursor()
    # 返回的数据字典
    returndata = dict()
    cur.execute(selectsql)
    result = cur.fetchone()
    if result:
        print("用户存在")
        returndata['status'] = 1
        returndata['msg'] = ''
        returndata['data'] = ''
        cur.close()
    else:
        print("用户不存在")
        returndata['status'] = 0
        returndata['msg'] = ''
        returndata['data'] = ''
        cur.close()

    return jsonify(returndata)

#根据手机号码，返回用户对象
@app.route('/getUserByPhone',methods=["GET","POST"])
def getUserByPhone():
    tel=request.form.get('tel')
    selectsql = "select User_ID, User_Name, school, college, sex, identity from user where User_ID = %s" % (tel)
    # 建立游标
    cur = conn.cursor()
    # 返回的数据字典
    returndata = dict()
    # 返回的用户信息
    info_data = dict()
    cur.execute(selectsql)
    result = cur.fetchone()
    if result:
        User_ID = result[0]
        User_Name = result[1]
        school = result[2]
        college = result[3]
        sex = result[4]
        identity = result[5]
        info_data['User_ID'] = User_ID
        info_data['User_Name'] = User_Name
        info_data['school'] = school
        info_data['college'] = college
        info_data['sex'] = sex
        info_data['identity'] = identity
        print("用户存在")
        returndata['status'] = 1 #用户存在
        returndata['msg'] = ''
        returndata['data'] = info_data
        cur.close()
    else:
        print("用户不存在")
        returndata['status'] = 0
        returndata['msg'] = ''
        returndata['data'] = ''
        cur.close()

    return jsonify(returndata)


##返回班课成员
@app.route('/getClassMember', methods=["GET", "POST"])
def getClassMember():
    class_id = request.form.get('class_id')
    class_id = int(class_id)
    selectsql = "select * from user where User_ID in (select user_id from class_member where class_id = %d)" % (class_id)
    # 建立游标
    cur = conn.cursor()
    # 返回的数据字典
    returndata = dict()
    # 返回的用户信息
    info_data = dict()
    cur.execute(selectsql)
    result = cur.fetchall()
    if result:
        # 创建列表
        dataList = []
        for row in result:
            info_data['userid'] = row[0]
            info_data['username'] = row[1]
            info_data['school'] = row[3]
            info_data['college'] = row[4]
            info_data['sex'] = row[5]
            info_data['identity'] = row[6]
            dataList.append(info_data)
        returndata['status'] = 1  # 返回成功
        returndata['msg'] = ''
        returndata['data'] = dataList
        cur.close()
    else:
        returndata['status'] = 0  # 返回成功
        returndata['msg'] = ''
        returndata['data'] = ''
        cur.close()
    return jsonify(returndata)


##返回作业列表
@app.route('/returnClassWork', methods=["GET", "POST"])
def returnClassWork():
    class_id = request.form.get('class_id')
    class_id = int(class_id)
    selectsql = "select work_name from wwork where class_id = %d" % (class_id)
    # 建立游标
    cur = conn.cursor()
    # 返回的数据字典
    returndata = dict()
    cur.execute(selectsql)
    result = cur.fetchall()
    if result:
        dataList = []
        for row in result:
            dataList.append(row[0])
        returndata['status'] = 1  # 返回成功
        returndata['msg'] = ''
        returndata['data'] = dataList
        cur.close()
    else:
        returndata['status'] = 0  # 返回成功
        returndata['msg'] = ''
        returndata['data'] = ''
        cur.close()
    return jsonify(returndata)

##接收上传ZIP文件
@app.route('/uploadWork', methods=["GET", "POST"])
def uploadWork():
    work_id=request.form.get('work_id')
    work_id=int(work_id)
    print(work_id)
    class_id = request.form.get('class_id')
    class_id=int(class_id)
    print(class_id)
    user_id = request.form.get('user_id')
    getfile = request.files.get('file')
    print(getfile)
    print('---')
    filename =secure_filename(getfile.filename) # 获取上传文件的文件名

    print(filename)
    dirname = "C:/Users/Administrator/Desktop/work"
    insersql = "insert into wwork values(%d,\"%s\",%d,%s)" % (class_id, filename,work_id,user_id)
    # 建立游标
    cur = conn.cursor()
    # 返回的数据字典
    returndata = dict()
    try:
        getfile.save(os.path.join(dirname, filename))  # 保存文件
        cur.execute(insersql)
    except Exception as e:
        returndata['status'] = 0  # 上传失败
        returndata['msg'] = ''
        returndata['data'] = ''
        cur.close()
        print(e)
    else:
        conn.commit()
        returndata['status'] = 1  # 上传成功
        returndata['msg'] = ''
        returndata['data'] = ''
        cur.close()
    return jsonify(returndata)

# 判断是否已经上传文件
@app.route('/checkUploadFile',methods=["POST"])
def checkUploadFile():
    workId = request.form.get('workId')
    workId = int(workId)
    print(workId)
    userId = request.form.get('userId')
    print(userId)

    classId = request.form.get('classId')
    classId = int(classId)
    print(classId)

    selectSQL = "select * from wwork where class_id=%d and work_id=%d and user_id=%s" % (classId, workId, userId)
    cur = conn.cursor()
    cur.execute(selectSQL)
    result = cur.fetchone()
    returndata = dict()
    if result:
        returndata['status'] = 1  # 已经上传
        returndata['msg'] = ''
        returndata['data'] = ''
    else :
        returndata['status'] = 0  # 还未上传
        returndata['msg'] = ''
        returndata['data'] = ''
    cur.close()
    return jsonify(returndata)

#下载课程作业
@app.route('/downloadWork',methods=["GET","POST"])
def downloadWork():
    filename=request.form.get('filename')
    dirname="C:/Users/Administrator/Desktop/work"
    file_path = os.path.join(dirname, filename)
     # 向api返回（图片）文件

    return send_file(file_path)

##退出班课
@app.route('/quitclass',methods=["GET","POST"])
def quitclass():
    class_id=request.form.get('class_id')
    class_id=int(class_id)
    user_id=request.form.get('user_id')
    selectSql = "select userid from class_info where class_id=%d"%(class_id)

    deletesql="delete from class_member where class_id=%d and user_id=%s"%(class_id,user_id)
    deletesql2="delete from class_info where class_id=%d"%(class_id)
    deletesql3="delete from class_member where class_id=%d"%(class_id)

    # 建立游标
    cur = conn.cursor()
    # 返回的数据字典
    returndata = dict()
    cur.execute(selectSql)
    result = cur.fetchone()
    print("---res:" + result[0])
    print("---userid:" + user_id)
    print(result[0] != user_id)
    if result[0] != user_id: #班课成员退出
        try:
            cur.execute(deletesql)
        except Exception as e:

            returndata['status'] = 0  # 删除失败
            returndata['msg'] = ''
            returndata['data'] = ''
            cur.close()
        else:
            conn.commit()
            returndata['status'] = 1  # 上传成功
            returndata['msg'] = ''
            returndata['data'] = ''
            cur.close()
    else:   #班课创建者退出
        try:
            cur.execute(deletesql2)
            cur.execute(deletesql3)
        except Exception as e:
            print(e)
            returndata['status'] = 0  # 删除失败
            returndata['msg'] = ''
            returndata['data'] = ''
            cur.close()
        else:
            conn.commit()
            returndata['status'] = 1  # 上传成功
            returndata['msg'] = ''
            returndata['data'] = ''
            cur.close()
    return jsonify(returndata)

##发布作业
@app.route('/publishWork',methods=["GET","POST"])
def publishWork():
    class_id=request.form.get('class_id')
    class_id = int(class_id)
    work_requirement=request.form.get('work_requirement')
    work_name=request.form.get('work_name')
    work_content=request.form.get('work_content')
    # 建立游标
    cur = conn.cursor()
    # 返回的数据字典
    returndata = dict()
    selectsql = "select count(*) from work_description"
    result = cur.execute(selectsql)
    count = cur.fetchall()
    work_id = count[0][0] + 1
    work_id=int(work_id)
    print(work_id)
    try:
        insertsql="insert into work_description(work_id,class_id,work_name,work_content,work_requirement) values(%d,%d,\"%s\",\"%s\",\"%s\")"%(work_id,class_id,work_name,work_content,work_requirement)
        cur.execute(insertsql)
    except Exception as e:
        returndata['status'] = 0  # 发布作业失败
        returndata['msg'] = ''
        returndata['data'] = ''
        cur.close()
        print(e)
    else:
        conn.commit()
        returndata['status'] = 1  # 发布作业成功
        returndata['msg'] = ''
        returndata['data'] = work_id
        cur.close()
    return jsonify(returndata)

##返回作业详情
@app.route('/queryWork',methods=["GET","POST"])
def queryWork():
    work_id=request.form.get('work_id')
    work_id=int(work_id)
    # 建立游标
    cur = conn.cursor()
    # 返回的数据字典
    returndata = dict()
    selecsql="select * from work_description where work_id=%d"%(work_id)
    cur.execute(selecsql)
    result=cur.fetchone()
    if result:
        info_data=dict()
        info_data['work_requirement']=result[1]
        info_data['work_cnotent']=result[2]
        returndata['status'] = 1  # 查询作业成功
        returndata['msg'] = ''
        returndata['data'] = info_data
        cur.close()
    else:
        returndata['status'] = 0  # 查询作业失败
        returndata['msg'] = ''
        returndata['data'] = ''
        cur.close()
    return jsonify(returndata)

##返回作业列表
@app.route('/getHomeworks', methods=["GET", "POST"])
def getHomeworks():
    class_id = request.form.get('class_id')
    class_id = int(class_id)
    selectsql = "select * from work_description where class_id = %d" % (class_id)
    # 建立游标
    cur = conn.cursor()
    # 返回的数据字典
    returndata = dict()
    # 返回的用户信息
    info_data = dict()
    cur.execute(selectsql)
    result = cur.fetchall()
    if result:
        # 创建列表
        dataList = []
        for row in result:
            info_data['workId'] = row[0]
            info_data['classId'] = row[1]
            info_data['workName'] = row[2]
            info_data['workContent'] = row[3]
            info_data['workRequirement'] = row[4]
            dataList.append(info_data)
            info_data = dict()
        print(dataList)
        returndata['status'] = 1  # 返回成功
        returndata['msg'] = ''
        returndata['data'] = dataList
        cur.close()
    else:
        returndata['status'] = 0  # 返回成功
        returndata['msg'] = ''
        returndata['data'] = ''
        cur.close()
    return jsonify(returndata)

if __name__ == '__main__':
    app.run(host='0.0.0.0')  # 运行程序