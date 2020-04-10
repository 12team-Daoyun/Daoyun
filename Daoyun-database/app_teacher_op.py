#!/usr/bin/python
# -*- coding: UTF-8 -*-

from flask import Blueprint,session
from flask import jsonify,request
from flask_web import db
from flask_web.databaseModel import Course,Teacher,USER,MENU,STUDENT,Course_Student,Course_Sign,SignData
import json
import time

mod = Blueprint('app_teacher_op', __name__)

@mod.route('/app/teacher/login_check', methods=['post'])
def login_check_student():
    username_password=request.get_data()
    username_password=json.loads(username_password)
    # print(username_password)
    # {u'password': u'123', u'id': u'123'}
    user=USER.query.filter_by(Loginname=str(username_password['id'])).first()
    if not user:
        return jsonify({'state':'0','error':''})
    user_json=user.to_json()
    user=json.loads(user_json)
    # print(user['roleid'])
    if not user['roleid']==2:
        return jsonify({'state':'0','error':''})
    if user['password']==username_password['password']:
        return jsonify({'state':'1','error':''})
    return jsonify({'state':'2','error':''})


@mod.route('/app/teacher_course/<int:TeachNumber>', methods=['get'])
def get_teach_course(TeachNumber):
    return_data=[]
    # print(StudentNumber)
    teacher=Teacher.query.filter_by(TeachNumber = TeachNumber).first()
    id=teacher.TeachId
    name=teacher.TeachName
    # print(id)
    course_ids=Course.query.filter_by(TeachId=id).all()
    for course_id in course_ids:
        # print(course_id.CourseId)
        course_data=course_id.to_json()
        course_data=json.loads(course_data)
        a={'courseID':course_data['CourseId']}
        a['courseName']=course_data['CourseName']
        a['shape']=course_data['Layout']
        a['classLocation']=course_data['CoursePlace']
        a['classOrder']=course_data['CourseTime']
        a['classDate']=course_data['CourseDay']
        a['CourseWeek']=course_data['CourseWeek']
        # print(a)
        return_data.append(a)
    # print(return_data)
    return jsonify({'courses':return_data,'data':'','error':'','name':name,'teacherId':id})

@mod.route('/app/teacher/course_shape/<CourseName>', methods=['get'])
def get_course_shape(CourseName):
    CourseName=str(CourseName)
    course_id=Course.query.filter_by(CourseName=CourseName).first()
    return jsonify({'course':{'shape':course_id.Layout}})

@mod.route('/app/teacher/<int:TeachNumber>', methods=['get'])
def get_name(TeachNumber):
	# print(StudentNumber)
	teacher=Teacher.query.filter_by(TeachNumber = TeachNumber).first()
	return jsonify({'personnel':{'Pname':teacher.TeachName,'ID':TeachNumber}})

@mod.route('/app/teacher/sign/<int:CourseId>', methods=['get'])
def start_sign(CourseId):
    sign_time=time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    sign = SignData(CourseId,sign_time)
    db.session.add(sign)
    SignId=SignData.query.filter_by(CourseId=CourseId).order_by(SignData.StartData.desc()).first()
    SignId=SignId.SignId
    students=Course_Student.query.filter_by(CourseId=CourseId).all()
    for student in students:
        student_id=student.Studentid
        course_sign=Course_Sign(SignId,CourseId,student_id,"0*0","旷课")
        db.session.add(course_sign)
    db.session.commit()
    return jsonify({'status':'sucess','error':''})


@mod.route('/app/teacher/new_sign/<int:CourseId>', methods=['get'])
def get_new_sign(CourseId):
    new_sign=Course_Sign.query.filter_by(CourseId=CourseId).order_by(Course_Sign.SignId.desc()).first()
    if not new_sign:
        return jsonify({'status':'error','error':"你还未发起签到"})
    new_sign_id=new_sign.SignId
    return_data=[]
    all_new_sign=Course_Sign.query.filter_by(SignId=new_sign_id).all()
    for sign in all_new_sign:
        student_sign=sign.to_json()
        student_sign=json.loads(student_sign)
        student=STUDENT.query.filter_by(Studentid = int(student_sign['Studentid'])).first()
        student_sign['StudentName'] = student.Studentname
        student_sign['StudentNumber'] = student.StudentNumber
        return_data.append(student_sign)
    return jsonify({'status':'sucess','data':return_data})


@mod.route('/app/teacher/course', methods=['put'])
def updata_course():
    up_data=request.get_data()
    up_data=json.loads(up_data)
    # {'CourseId': 1, 'CourseName': '智能技术', 'TeacherName': '叶东毅', 'CourseWeek': '1-18', 'CourseDay': '星期一', 'CourseTime': '3-4', 'CoursePlace': '东三209', 'Layout': '8*8'}
    teacher=Teacher.query.filter_by(TeachName=up_data['TeacherName']).first()
    if not teacher:
        return jsonify({'status':'error','data':'','error':'修改后的教师不存在'})
    teacherid=teacher.get_TeachId()
    up_course=Course.query.filter_by(CourseId=up_data['CourseId']).first()
    try:
        up_course.CourseName=up_data['CourseName']
        up_course.TeachId=teacherid
        up_course.CourseWeek=up_data['CourseWeek']
        up_course.CourseDay=up_data['CourseDay']
        up_course.CourseTime=up_data['CourseTime']
        up_course.CoursePlace=up_data['CoursePlace']
        up_course.Layout=up_data['Layout']
        db.session.commit()
    except:
        db.session.rollback()
        return jsonify({'status':'error','data':'','error':'更新课程错误'})
    return jsonify({'status':'success','data':'','error':''})

@mod.route('/app/teacher/courseid/<int:courseid>', methods=['get'])
def get_studentname_id(courseid):
    return_data=[]
    students=Course_Student.query.filter_by(CourseId=courseid).all()
    for student in students:
        a={}
        studentid=student.Studentid
        studen_data=STUDENT.query.filter_by(Studentid=studentid).first()
        a['Studentname']=studen_data.Studentname
        a['StudentNumber']=studen_data.StudentNumber
        return_data.append(a)
    return jsonify({'data':return_data})


@mod.route('/app/teacher/kaoqin/<int:courseid>', methods=['get'])
def get_kaoqin(courseid):
    return_data=[]
    students=Course_Student.query.filter_by(CourseId=courseid).all()
    for student in students:
        a={}
        studentid=student.Studentid
        studen_data=STUDENT.query.filter_by(Studentid=studentid).first()
        a['Studentname']=studen_data.Studentname
        a['StudentNumber']=studen_data.StudentNumber
        sign_datas=Course_Sign.query.filter_by(CourseId=courseid,Studentid=studentid).all()
        a['ok']=0
        a['later']=0
        a['no']=0
        for sign in sign_datas:
            if sign.Status == "签到":
                a['ok']+=1
            if sign.Status == "迟到":
                a['later']+=1
            if sign.Status == "旷课":
                a['no']+=1
        return_data.append(a)
    return jsonify({'data':return_data})


@mod.route('/app/teacher/change_pass', methods=['put'])
def change_pass():
    up_data=request.get_data()
    up_data=json.loads(up_data)
    print(up_data)
    user_data=USER.query.filter_by(Loginname=up_data['loginname']).first()
    user_data.password=up_data['password']
    db.session.commit()
    return jsonify({'status':'success','data':'','error':''})


