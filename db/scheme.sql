CREATE DATABASE `burgers_db`;
USE `burgers_db`;

CREATE TABLE `burgers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `burger_name` varchar(45) NOT NULL,
  `devoured` tinyint(1) NOT NULL DEFAULT '0',
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

