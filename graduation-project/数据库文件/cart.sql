/*
Navicat MySQL Data Transfer

Source Server         : myproject
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : myproject

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2022-11-15 18:22:44
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `cart`
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `id` int(10) NOT NULL,
  `goodsid` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `createtime` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `productImage` char(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT '',
  `content` text NOT NULL,
  `sellername` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL DEFAULT '',
  `customer` varchar(255) NOT NULL,
  `tocheck` int(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `authorName` (`title`)
) ENGINE=MyISAM AUTO_INCREMENT=1003 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cart
-- ----------------------------
INSERT INTO `cart` VALUES ('0', '2', '卫衣', '2022-11-13 22:51:26.317806', '2.jpeg', '卫衣啊', 'admin', '161', 'SJ', '1');
INSERT INTO `cart` VALUES ('1', '101', '鞋', '2022-10-21 13:02:23.119159', '1.jpeg', '鞋子', 'SJ', '255', 'admin', '1');
