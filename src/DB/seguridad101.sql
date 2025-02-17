--- CREATE TABLES

---- main table personas (mt_personas) ----

	CREATE TABLE `mt_personas` (
    `mt_per_id` int(11) NOT NULL AUTO_INCREMENT,
    `mt_per_nombre` varchar(45) NOT NULL,
    `mt_per_apellido` varchar(45) NOT NULL,
    `mt_per_email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`mt_per_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3468 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci

---- tertiary table parametros (tt_parametros) ----

  CREATE TABLE `tt_parametros` (
    `tt_param_id` int(11) NOT NULL AUTO_INCREMENT,
    `tt_param_nombre` varchar(45) NOT NULL,
    `tt_param_codigo` varchar(45) NOT NULL,
  PRIMARY KEY (`tt_param_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci

---- main table clientes (mt_clientes) ----

	CREATE TABLE `mt_clientes` (
    `mt_cli_id` int(11) NOT NULL AUTO_INCREMENT,
    `mt_cli_per_id` int(11) NOT NULL,
    `mt_cli_direccion` varchar(300) DEFAULT NULL,
    `mt_cli_fecha_nacimiento` date NOT NULL,
    `mt_cli_telefono` varchar(13) DEFAULT NULL,
    `mt_cli_tipo_consumidor` int(11) NOT NULL,
    `mt_cli_banco` varchar(45) DEFAULT NULL,
    `mt_cli_tipo_cuenta` int(11) DEFAULT NULL,
    `mt_cli_cbu` varchar(22) DEFAULT NULL,
    `mt_cli_provincia` varchar(300) DEFAULT NULL,
    `mt_cli_localidad` varchar(300) DEFAULT NULL,
    `mt_cli_cuil` varchar(22) DEFAULT NULL,
    `mt_cli_telefono2` varchar(13) DEFAULT NULL,
    `mt_cli_observaciones` varchar(3000) DEFAULT NULL,
    `mt_cli_tipo_cliente` int(11) DEFAULT NULL,
    `mt_cli_alertaBateria` tinyint(1) NOT NULL DEFAULT 0,
    `mt_cli_cambioBateria` date DEFAULT NULL,
    `mt_cli_productosInstalados` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`mt_cli_productosInstalados`)),
  PRIMARY KEY (`mt_cli_id`),
  KEY `fk_mt_cli_per_id_idx` (`mt_cli_per_id`),
  KEY `fk_mt_cli_tipo_consumidor_idx` (`mt_cli_tipo_consumidor`),
  KEY `fk_mt_cli_tipo_cuenta_idx` (`mt_cli_tipo_cuenta`),
  KEY `fk_mt_cli_tipo_cliente_idx` (`mt_cli_tipo_cliente`),
  CONSTRAINT `fk_mt_cli_per_id` FOREIGN KEY (`mt_cli_per_id`) REFERENCES `mt_personas` (`mt_per_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_mt_cli_tipo_cliente` FOREIGN KEY (`mt_cli_tipo_cliente`) REFERENCES `tt_parametros` (`tt_param_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_mt_cli_tipo_cuenta` FOREIGN KEY (`mt_cli_tipo_cuenta`) REFERENCES `tt_parametros` (`tt_param_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3418 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci


---- main table tecnicos (mt_tecnicos) ----
/* 	CREATE TABLE `mt_tecnicos` (
    `mt_tec_id` int(11) NOT NULL AUTO_INCREMENT,
    `mt_tec_per_id` int(11) NOT NULL,
  PRIMARY KEY (`mt_tec_id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci
 */

---- main table usuarios (mt_usuarios) ----

  CREATE TABLE `mt_usuarios` (
    `mt_usr_id` int(11) NOT NULL AUTO_INCREMENT,
    `mt_usr_per_id` int(11) NOT NULL,
    `mt_usr_username` varchar(45) NOT NULL,
    `mt_usr_password` varchar(128) NOT NULL,
    `mt_usr_rol` int(11) NOT NULL,
  PRIMARY KEY (`mt_usr_id`),
  KEY `fk_mt_usr_per_id_idx` (`mt_usr_per_id`),
  CONSTRAINT `fk_mt_usr_per_id` FOREIGN KEY (`mt_usr_per_id`) REFERENCES `mt_personas` (`mt_per_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci

---- tertiary table servicios (tt_servicios) ----

	CREATE TABLE `tt_servicios` (
    `tt_srvc_id` int(11) NOT NULL AUTO_INCREMENT,
    `tt_srvc_cli_id` int(11) NOT NULL,
    `tt_srvc_tipo` int(11) NOT NULL,
    `tt_srvc_precio` decimal(8,2) NOT NULL,
    `tt_srvc_observaciones` varchar(500) DEFAULT NULL,
    `tt_srvc_estado` int(11) NOT NULL,
    `tt_srvc_fecha` date NOT NULL,
    `tt_srvc_tecnico` varchar(45) NOT NULL,
    `tt_srvc_estadoPago` int(1) DEFAULT NULL,
    `tt_srvc_formaPago` varchar(45) DEFAULT NULL,
    `tt_srvc_cambioBateria` date DEFAULT NULL,
    `tt_srvc_pagadoPorCliente` decimal(8,2) DEFAULT NULL,
    `tt_srvc_comunicacionTelefonica` int(1) NOT NULL DEFAULT 0,
    `tt_srvc_alertaBateria` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`tt_srvc_id`),
  KEY `fk_tt_srvc_cli_id_idx` (`tt_srvc_cli_id`),
  KEY `fk_tt_srvc_tipo_idx` (`tt_srvc_tipo`),
  CONSTRAINT `fk_tt_srvc_cli_id` FOREIGN KEY (`tt_srvc_cli_id`) REFERENCES `mt_clientes` (`mt_cli_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tt_srvc_tipo` FOREIGN KEY (`tt_srvc_tipo`) REFERENCES `tt_parametros` (`tt_param_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16788 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci