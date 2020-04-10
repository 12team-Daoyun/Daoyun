/*
Navicat MySQL Data Transfer

Source Server         : Daoyun-12
Source Server Version : 80019
Source Host           : localhost:3306
Source Database       : daoyun

Target Server Type    : MYSQL
Target Server Version : 80019
File Encoding         : 65001

Date: 2020-04-10 16:22:06
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `Admin_ID` int NOT NULL,
  `Admin_Name` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Admin_ID`),
  KEY `Admin_ID` (`Admin_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class` (
  `Class_ID` int NOT NULL,
  `Class_Name` varchar(255) DEFAULT NULL,
  `Creator_ID` int DEFAULT NULL,
  PRIMARY KEY (`Class_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of class
-- ----------------------------

-- ----------------------------
-- Table structure for dictionary
-- ----------------------------
DROP TABLE IF EXISTS `dictionary`;
CREATE TABLE `dictionary` (
  `ID` int NOT NULL,
  `Dictionary_Name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dictionary
-- ----------------------------

-- ----------------------------
-- Table structure for dictionary_data
-- ----------------------------
DROP TABLE IF EXISTS `dictionary_data`;
CREATE TABLE `dictionary_data` (
  `ID` varchar(255) NOT NULL,
  `Value` varchar(255) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `isfixed` int DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dictionary_data
-- ----------------------------

-- ----------------------------
-- Table structure for job
-- ----------------------------
DROP TABLE IF EXISTS `job`;
CREATE TABLE `job` (
  `Job_ID` int NOT NULL,
  `Task_Location` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Job_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of job
-- ----------------------------

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `Menu_ID` int DEFAULT NULL,
  `Menu_Adress` varchar(255) NOT NULL,
  `Key` varchar(255) DEFAULT NULL,
  `Menu_Name` varchar(255) DEFAULT NULL,
  `Menu_Type` int DEFAULT NULL,
  `Menu_State` int DEFAULT NULL,
  `Add_Time` datetime DEFAULT NULL,
  `Modify_Time` datetime DEFAULT NULL,
  `Creative` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `isdefault` int DEFAULT NULL,
  PRIMARY KEY (`Menu_Adress`),
  KEY `Menu_ID` (`Menu_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of menu
-- ----------------------------

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `Role_ID` int NOT NULL,
  `Role_Name` varchar(255) DEFAULT NULL,
  `Permission` varchar(255) DEFAULT NULL COMMENT '用户权限',
  PRIMARY KEY (`Role_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------

-- ----------------------------
-- Table structure for role_permission
-- ----------------------------
DROP TABLE IF EXISTS `role_permission`;
CREATE TABLE `role_permission` (
  `ID` int NOT NULL,
  `State` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role_permission
-- ----------------------------

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `Student_ID` int NOT NULL,
  `Student_Name` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `School` varchar(255) DEFAULT NULL,
  `College` varchar(255) DEFAULT NULL,
  `Grade` varchar(255) DEFAULT NULL,
  `Class` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Student_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('1', '黄旭', '123456', '福州大学', '数计学院', '研究生一年级', '一班');
INSERT INTO `student` VALUES ('2', '李鸣', '123456', '福州大学', '数计学院', '研究生一年级', '一班');
INSERT INTO `student` VALUES ('3', '杨立坚', '123456', '福州大学', '数计学院', '研究生一年级', '一班');

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `Teacher_ID` int NOT NULL,
  `Teacher_Name` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `School` varchar(255) DEFAULT NULL,
  `College` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Teacher_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of teacher
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `User_ID` int NOT NULL AUTO_INCREMENT,
  `User_Name` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Creat_Time` datetime DEFAULT NULL,
  `Creative` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------

-- ----------------------------
-- Table structure for user-role
-- ----------------------------
DROP TABLE IF EXISTS `user-role`;
CREATE TABLE `user-role` (
  `UserRole_ID` int NOT NULL,
  `Modify_Time` datetime DEFAULT NULL COMMENT '修改时间',
  `Create_Time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`UserRole_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user-role
-- ----------------------------

-- ----------------------------
-- Table structure for user_permission
-- ----------------------------
DROP TABLE IF EXISTS `user_permission`;
CREATE TABLE `user_permission` (
  `ID` int NOT NULL,
  `Menu_Adress` varchar(255) DEFAULT NULL,
  `State` int DEFAULT NULL,
  KEY `ID` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_permission
-- ----------------------------
