#!/usr/bin/python
# -*- coding: UTF-8 -*-

from flask import Blueprint,session
from flask import jsonify,request
from flask_web import db
from flask_web.databaseModel import Course,Teacher,check_role
import json

mod = Blueprint('course_op', __name__)


@mod.route('/course', methods=['GET'])
@check_role(19)
def get_all_course():
    courses=Course.query.all()
    return_data=[]
    for course in courses:
        course=course.to_json()
        course=json.loads(course)
        return_data.append(course)
    return jsonify({'status':'success','data':return_data,'error':''})

@mod.route('/course', methods=['post'])
@check_role(17)
def add_course():
    add_data=request.get_data()
    add_data=json.loads(add_data)
    # {'add_CourseName': '123', 'add_TeacherName': '123', 'add_CourseWeek': '123', 'add_CourseDay': '星期六', 'add_CourseTime': '123', 'add_CoursePlace': '123', 'add_Layout': '123'}
    teacher=Teacher.query.filter_by(TeachName=add_data['add_TeacherName']).first()
    if not teacher:
        return jsonify({'status':'error','data':'','error':'教师不存在'})
    teacherid=teacher.get_TeachId()
    course_data=Course(add_data['add_CourseName'],teacherid,add_data['add_CourseWeek'],add_data['add_CourseDay'],add_data['add_CourseTime'],add_data['add_CoursePlace'],add_data['add_Layout'])
    db.session.add(course_data)
    db.session.commit()
    return jsonify({'status':'success','data':'','error':''})

@mod.route('/course', methods=['put'])
@check_role(18)
def updata_course():
    up_data=request.get_data()
    up_data=json.loads(up_data)
    # {'CourseId': 1, 'CourseName': '智能技术', 'TeacherName': '叶东毅', 'CourseWeek': '1-18', 'C
    # ourseDay': '星期一', 'CourseTime': '3-4', 'CoursePlace': '东三209', 'Layout': '8*8'}
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


@mod.route('/course/<int:CourseId>', methods=['delete'])
@check_role(20)
def delet_course(CourseId):
    try:
        delete_course=Course.query.filter_by(CourseId=CourseId).first()
        db.session.delete(delete_course)
        db.session.commit()
    except:
        db.session.rollback()
        return jsonify({'status':'error','data':'','error':'删除失败'})
    
    return jsonify({'status':'success','data':'','error':''})


