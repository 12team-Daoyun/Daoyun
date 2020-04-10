#!/usr/bin/python
# -*- coding: UTF-8 -*-

from flask import Blueprint
from flask import jsonify,request
from flask_web import db
from flask_web.databaseModel import Role,STUDENT,USER,RoleRightRelation,Right
import json

mod = Blueprint('role',__name__)

@mod.route('/role',methods = ['GET'])
def role_data():
    students=Role.query.all()
    #print(students)
    return_data=[]
    for data in students:
        data_json=data.to_json()
        #print(data_json)
      	# dictionary_detail=data.get_dictionary_detail()
        data=json.loads(data_json)
       #  dictionary_detail=json.loads(dictionary_detail)
       #  data['childen']=dictionary_detail
        return_data.append(data)
        #print(return_data)
    return jsonify({'status':'success','data':return_data,'error':''})

@mod.route('/rights',methods = ['GET'])
def rights():
    rights = Right.query.all()
    #print(students)
    return_data=[]
    for data in rights:
        data_json=data.to_json()
        #print(data_json)
      	# dictionary_detail=data.get_dictionary_detail()
        data=json.loads(data_json)
       #  dictionary_detail=json.loads(dictionary_detail)
       #  data['childen']=dictionary_detail
        return_data.append(data)
        #print(return_data)
    return jsonify({'status':'success','data':return_data,'error':''})


@mod.route('/rightofrole/<int:role_id>',methods = ['GET'])
def RightsofRole_data(role_id):
    RightsofRole = RoleRightRelation.query.filter_by(Roleid = role_id).all()
    #print(students)
    return_data=[]
    for data in RightsofRole:
        data_json=data.to_json()
        #print(data_json)
      	# dictionary_detail=data.get_dictionary_detail()
        data=json.loads(data_json)
       #  dictionary_detail=json.loads(dictionary_detail)
       #  data['childen']=dictionary_detail
        return_data.append(data)
        #print(return_data)
    return jsonify({'status':'success','data':return_data,'error':''})



@mod.route('/insertRole', methods=['POST'])
def insertRole():
	add_data = request.get_data()
	add_data = json.loads(add_data)
	print(add_data)
	count = Role.query.filter_by(Rolename = add_data['Rolename']).count()
	if count != 0:
		return jsonify({'status':'error','data':'','error':'角色名重复'})
	role = Role(add_data['Rolename'],add_data['Roledescribe'],add_data['Islock'])
	db.session.add(role)
	db.session.commit()
	Roleid = Role.query.filter_by(Rolename = add_data['Rolename']).first().Roleid
	Rights = add_data['Rights'].split('|')
	print(Rights)
	for right in Rights:
		if right != '':
			r = RoleRightRelation(Roleid,int(right))
			db.session.add(r)
			db.session.commit()
		else:
			continue	
	return jsonify({'status':'success','data':'','error':''})

@mod.route('/role/delete_singleOne/<int:roleNumber>', methods=['DELETE'])
def delete_singleOne(roleNumber):
	try:
		#print(roleNumber)
		role = Role.query.filter_by(Roleid = roleNumber).first()
		db.session.delete(role)
		db.session.commit()		
		rightsofRole = RoleRightRelation.query.filter_by(Roleid = roleNumber).all()
		#print(rightsofRole)
		for r in rightsofRole:
			db.session.delete(r)
			db.session.commit()
	except:
		db.session.rollback()
		return jsonify({'status':'error','data':'','error':'删除失败'})
	return jsonify({'status':'success','data':'','error':''})


@mod.route('/role/updataInfo', methods=['PUT'])
def update_student():
	up_data = request.get_data()
	up_data = json.loads(up_data)
	role = Role.query.filter_by(Rolename = up_data['Rolename']).first()
	try:
		role.Roledescribe = up_data['Roledescribe']
		role.Islock = up_data['Islock']
		db.session.commit()
	except:
		db.session.rollback()
		return jsonify({'status':'error','data':'','error':'更新角色信息错误'})
	Roleid = Role.query.filter_by(Rolename = up_data['Rolename']).first().Roleid	
	try:
		rightsofRoleid = RoleRightRelation.query.filter_by(Roleid = Roleid).all()
		for data in rightsofRoleid :
			db.session.delete(data)
			db.session.commit()
	except:
		db.session.rollback()
		return jsonify({'status':'error','data':'','error':'更新角色信息错误'})
	Rights = up_data['rights'].split('|')
	for r in Rights:
		if r != '':
			rr = RoleRightRelation(Roleid,int(r))
			db.session.add(rr)
			db.session.commit()
		else:
			continue
	return jsonify({'status':'success','data':'','error':''})
 
