-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-12-2025 a las 05:45:30
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sitrobheli`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `idAdministrador` int(11) NOT NULL,
  `Nombre` varchar(120) DEFAULT NULL,
  `primerApellido` varchar(50) DEFAULT NULL,
  `segundoApellido` varchar(50) DEFAULT NULL,
  `Telefono` varchar(20) DEFAULT NULL,
  `CorreoElectronico` varchar(120) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `idCliente` int(11) NOT NULL,
  `Nombre` varchar(120) DEFAULT NULL,
  `primerApellido` varchar(50) DEFAULT NULL,
  `segundoApellido` varchar(50) DEFAULT NULL,
  `CorreoElectronico` varchar(120) DEFAULT NULL,
  `Telefono` varchar(20) DEFAULT NULL,
  `Direccion` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `idPedido` int(11) NOT NULL,
  `idCliente` int(11) DEFAULT NULL,
  `DatoEmpresa` varchar(150) DEFAULT NULL,
  `FechaPedido` date DEFAULT NULL,
  `EstadoPedido` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido_producto`
--

CREATE TABLE `pedido_producto` (
  `idPedido` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `Cantidad` decimal(10,3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `idProducto` int(11) NOT NULL,
  `Nombre` varchar(120) DEFAULT NULL,
  `Unidad` varchar(20) DEFAULT NULL,
  `Precio` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idProducto`, `Nombre`, `Unidad`, `Precio`) VALUES
(1, 'AGUACATE HASS', 'KILO', 60.00),
(2, 'ALBAHACA BOLSA', 'BOLSA', 90.00),
(3, 'ALBAHACA', 'MANOJO', 37.00),
(4, 'APIO', 'PIEZA', 38.00),
(5, 'BERENJENA', 'KILO', 55.00),
(6, 'BETABEL', 'KILO', 35.00),
(7, 'BROCOLI', 'KILO', 39.00),
(8, 'CALABAZA', 'KILO', 26.00),
(9, 'CAMOTE AMARILLO (LAVADO)', 'KILO', 39.00),
(10, 'CEBOLLA CAMBRAY LIMPIA MANOJO', 'PIEZA', 39.00),
(11, 'CEBOLLA BLANCA PELADA', 'KILO', 19.00),
(12, 'CEBOLLA MORADA PELADA', 'KILO', 19.00),
(13, 'CEBOLLIN', 'MJO', 135.00),
(14, 'CHAMPINON', 'KILO', 95.00),
(15, 'CHAMPINON CAJA 5KG', 'CAJA', 550.00),
(16, 'PORTOBELLO (CHAROLA .500g)', 'PIEZA', 85.00),
(17, 'CHAYOTE', 'KILO', 22.00),
(18, 'CHILE CALORO', 'KILO', 44.00),
(19, 'CHILE HABANERO', 'KILO', 85.00),
(20, 'CHILE JALAPENO', 'KILO', 29.00),
(21, 'CHILE POBLANO', 'KILO', 39.00),
(22, 'CHILE SERRANO', 'KILO', 33.00),
(23, 'CILANTRO (MANOJO)', 'MJO', 60.00),
(24, 'COL BLANCA', 'PIEZA', 33.00),
(25, 'COL MORADA', 'PIEZA', 37.00),
(26, 'COLES DE BRUSELAS', 'KILO', 95.00),
(27, 'EJOTE', 'KILO', 49.00),
(28, 'ELOTE AMARILLO CHAROLA 3-4 PZ', 'PIEZA', 50.00),
(29, 'ELOTE ENTERO', 'PIEZA', 10.50),
(30, 'ENELDO', 'KILO', 150.00),
(31, 'EPAZOTE (MANOJO)', 'MANOJO', 33.00),
(32, 'ESPARRAGO (MANOJO)', 'MANOJO', 110.00),
(33, 'ESPINACA', 'MANOJO', 22.00),
(34, 'ESPINACA POPEYE', 'PZA', 62.00),
(35, 'FLOR DE CALABAZA', 'MANOJO', 16.00),
(36, 'GERMEN DE ALFALFA', 'PIEZA', 45.00),
(37, 'GERMEN DE SOYA', 'KILO', 50.00),
(38, 'GRANO DE ELOTE', 'KILO', 80.00),
(39, 'GRANO DE ELOTE AMARILLO', 'KILO', 140.00),
(40, 'HIERBABUENA MANOJO', 'PIEZA', 25.00),
(41, 'JENGIBRE', 'KILO', 165.00),
(42, 'JITOMATE BOLA', 'KILO', 47.00),
(43, 'JITOMATE CHERRY', 'KILO', 49.00),
(44, 'JITOMATE SALADET', 'KILO', 21.00),
(45, 'KALE GRANEL', 'KILO', 120.00),
(46, 'LECHUGA ITALIANA', 'PIEZA', 20.00),
(47, 'LECHUGA ROMANA', 'PIEZA', 25.00),
(48, 'LECHUGA SANGRIA', 'PIEZA', 23.00),
(49, 'LECHUGA OREJONA', 'PIEZA', 29.00),
(50, 'MENTA MANOJO', 'PIEZA', 30.00),
(51, 'NOPAL', 'KILO', 33.00),
(52, 'PAPA CAMBRAY BLANCA', 'KILO', 25.00),
(53, 'PAPA BLANCA GRANDE', 'KILO', 34.00),
(54, 'PEPINO AMERICANO', 'KILO', 45.00),
(55, 'PEPINO CRIOLLO', 'KILO', 24.00),
(56, 'PEPINO PERSA', 'KILO', 49.00),
(57, 'PEREJIL LACIO MANOJO', 'PIEZA', 23.00),
(58, 'PIMIENTO MORRON AMARILLO', 'KILO', 60.00),
(59, 'PIMIENTO MORRON ROJO', 'KILO', 60.00),
(60, 'PIMIENTO MORRON VERDE', 'KILO', 60.00),
(61, 'PORO PIEZA', 'PIEZA', 33.00),
(62, 'RABANO MANOJO', 'PIEZA', 45.00),
(63, 'ROMERO MANOJO', 'PIEZA', 39.00),
(64, 'SETAS', 'PIEZA', 33.00),
(65, 'TOMATE VERDE PELADO', 'KILO', 27.00),
(66, 'TOMATILLO MILPERO PELADO', 'KILO', 105.00),
(67, 'VERDOLAGA', 'MANOJO', 33.00),
(68, 'ZANAHORIA', 'KILO', 22.00),
(69, 'AJO PELADO', 'BOLSA', 185.00),
(70, 'BLUEBERRY BURBUJA', 'DOMO', 38.00),
(71, 'DURAZNO', 'KILO', 95.00),
(72, 'FRAMBUESA BURBUJA', 'DOMO', 35.00),
(73, 'FRESA BURBUJA 500GR', 'DOMO', 75.00),
(74, 'FRESA GRANEL', 'KILO', 75.00),
(75, 'GUAYABA', 'KILO', 55.00),
(76, 'HIGO BURBUJA', 'DOMO', 79.00),
(77, 'JICAMA', 'KILO', 36.00),
(78, 'KIWI', 'KILO', 130.00),
(79, 'LIMA GDE', 'KILO', 55.00),
(80, 'LIMON GRANDE SIN SEMILLA', 'KILO', 16.00),
(81, 'LIMON REAL GDE', 'KILO', 75.00),
(82, 'MANGO PETACON', 'KILO', 45.00),
(83, 'MANZANA GALA', 'KILO', 59.00),
(84, 'MANZANA GOLDEN', 'KILO', 55.00),
(85, 'MANZANA ROJA', 'KILO', 60.00),
(86, 'MANZANA VERDE', 'KILO', 55.00),
(87, 'MELON', 'KILO', 34.00),
(88, 'NARANJA', 'KILO', 23.00),
(89, 'NARANJA SIN SEMILLA', 'KILO', 35.00),
(90, 'PAPAYA', 'KILO', 34.00),
(91, 'PERA', 'KILO', 79.00),
(92, 'PINA', 'KILO', 33.00),
(93, 'PLATANO CHIAPAS', 'KILO', 42.00),
(94, 'PLATANO MACHO', 'KILO', 41.00),
(95, 'PLATANO TABASCO', 'KILO', 27.00),
(96, 'SANDIA', 'KILO', 28.00),
(97, 'TORONJA PRIMERA', 'KILO', 33.00),
(98, 'UVA MORADA', 'KILO', 145.00),
(99, 'UVA VERDE', 'KILO', 140.00),
(100, 'ZARZAMORA BURBUJA', 'DOMO', 39.00),
(101, 'BROTE DE ALBAHACA', 'DOMO', 135.00),
(102, 'BROTE DE ARUGULA', 'DOMO', 135.00),
(103, 'BROTE DE BETABEL', 'DOMO', 135.00),
(104, 'BROTE DE CHICHARO', 'DOMO', 135.00),
(105, 'BROTE DE CILANTRO', 'DOMO', 135.00),
(106, 'BROTE MELON', 'DOMO', 135.00),
(107, 'BROTE DE RABANO', 'DOMO', 135.00),
(108, 'BROTE DE COL MORADO', 'DOMO', 135.00),
(109, 'CALABAZA ESTRELLA BABY', 'KILO', 245.00),
(110, 'CALABAZA ZUCHINNI', 'KILO', 260.00),
(111, 'MIX DE CALABAZAS', 'DOMO', 250.00),
(112, 'HEIRLOOM JITOMATE', 'KILO', 235.00),
(113, 'MIX DE FLORES COMESTIBLES', 'DOMO', 125.00),
(114, 'MIX DE HOJAS', 'DOMO', 135.00),
(115, 'MIX DE RABANO', 'DOMO', 225.00),
(116, 'RABANO MORADO', 'KILO', 230.00),
(117, 'RABANO NEGRO', 'KILO', 230.00),
(118, 'RABANO SANDIA', 'KILO', 205.00),
(119, 'ZANAHORIA BABY', 'KILO', 255.00),
(120, 'BETABEL AMARILLO', 'KILO', 205.00),
(121, 'BETABEL CANDY', 'KILO', 210.00),
(122, 'ACHIOTE YUCATECO', 'KILO', 82.00),
(123, 'ACHIOTE LA EXTRA', 'KILO', 70.00),
(124, 'ACHIOTE LA EXTRA .100G', 'KILO', 15.00),
(125, 'AJO GRANDE', 'KILO', 88.00),
(126, 'AJO MEDIANO', 'KILO', 79.00),
(127, 'AJO CHICO', 'KILO', 67.00),
(128, 'AJO MOLIDO', 'KILO', 115.00),
(129, 'AJONJOLI BLANCO', 'KILO', 67.00),
(130, 'AJONJOLI NEGRO', 'KILO', 99.00),
(131, 'AZUCAR GLASS MITLA', 'KILO', 140.00),
(132, 'AZUCAR GLASS', 'KILO', 33.00),
(133, 'AZUCAR MASCABADO', 'KILO', 65.00),
(134, 'CACAHUATE HORNEADO SIN SAL', 'KILO', 60.00),
(135, 'CACAHUATE HORNEADO CON SAL', 'KILO', 62.00),
(136, 'CACAHUATE PELADO SIN SAL', 'KILO', 60.00),
(137, 'CACAHUATE PELADO CON SAL', 'KILO', 72.00),
(138, 'CANELA EMPACADA', 'KILO', 468.00),
(139, 'CANELA MOLIDA PURA', 'KILO', 178.00),
(140, 'CANELA ESPECIAL', 'KILO', 450.00),
(141, 'CARDAMOMO', 'KILO', 958.00),
(142, 'CARDAMOMO MOLIDO', 'KILO', 1015.00),
(143, 'CEBOLLA MOLIDA', 'KILO', 67.00),
(144, 'CHILE ANCHO', 'KILO', 185.00),
(145, 'CHILE CHILACA', 'KILO', 127.00),
(146, 'CHILE INDIO SIN CABO', 'KILO', 159.00),
(147, 'CHILE YAHUALICA', 'KILO', 227.00),
(148, 'CHILE GUAJILLO', 'KILO', 135.00),
(149, 'COMINO ENTERO', 'KILO', 94.00),
(150, 'CURCUMA MOLIDA', 'KILO', 98.00),
(151, 'CURCUMA ENTERA', 'KILO', 96.00),
(152, 'CURRY', 'KILO', 183.00),
(153, 'JENGIBRE SECO', 'KILO', 170.00),
(154, 'LAUREL', 'KILO', 85.00),
(155, 'NUEZ GRANILLO', 'KILO', 300.00),
(156, 'OREGANO MOLIDO', 'KILO', 115.00),
(157, 'OREGANO FRESCO', 'KILO', 25.00),
(158, 'PAPRIKA', 'KILO', 105.00),
(159, 'PIMIENTA CAYENA', 'KILO', 149.00),
(160, 'PIMIENTA NEGRA ENTERA', 'KILO', 149.00),
(161, 'SAL DE GRANO', 'KILO', 10.00),
(162, 'SAL FINA', 'KILO', 15.00),
(163, 'SEMILLA DE CILANTRO', 'KILO', 69.00),
(164, 'SEMILLA DE HINOJO', 'KILO', 185.00),
(165, 'ACHIOTE', 'PZA', 19.00),
(166, 'ACIDO CITRICO', 'PZA', 125.00),
(167, 'AJO EN POLVO', 'KILO', 140.00),
(168, 'AJO ENTERO', 'KILO', 93.00),
(169, 'AJO NEGRO', 'KILO', 80.00),
(170, 'AJONJOLI BLANCO', 'KILO', 120.00),
(171, 'ALMENDRA ENTERA CON PIEL', 'KILO', 250.00),
(172, 'AMARANTO', 'KILO', 75.00),
(173, 'ANIS ESTRELLA', 'KILO', 530.00),
(174, 'ARANDANOS', 'KILO', 155.00),
(175, 'ASTILLAS PARA AHUMAR', 'PAQUETE', 79.00),
(176, 'AVELLANA', 'KILO', 300.00),
(177, 'AVENA QUAKER HOJUELA ENTERA 1KG', 'KILO', 125.00),
(178, 'AZUCAR GLASS', 'KILO', 145.00),
(179, 'AZUCAR MORENA', 'KILO', 25.00),
(180, 'BICARBONATO DE SODIO', 'KILO', 35.00),
(181, 'CACAHUATE TOSTADO SIN SAL', 'KILO', 62.00),
(182, 'CANELA EN VARA', 'KILO', 490.00),
(183, 'CARBON', 'KILO', 27.00),
(184, 'CARDAMOMO', 'KILO', 1100.00),
(185, 'CHIA', 'KILO', 135.00),
(186, 'CHILE ANCHO', 'KILO', 150.00),
(187, 'CHILE CASCABEL', 'KILO', 380.00),
(188, 'CHILE DE ARBOL SECO', 'KILO', 149.00),
(189, 'CHILE GUAJILLO', 'KILO', 150.00),
(190, 'CHILE MORITA', 'KILO', 120.00),
(191, 'CHILE MULATO', 'KILO', 190.00),
(192, 'CHILE PASILLA', 'KILO', 160.00),
(193, 'CHOCOLATE ABUELITA', 'PAQUETE', 95.00),
(194, 'CLAVOS DE OLOR', 'KILO', 435.00),
(195, 'COCO RALLADO SECO', 'KILO', 90.00),
(196, 'COCOA EN POLVO', 'KILO', 160.00),
(197, 'COMINO ENTERO', 'KILO', 115.00),
(198, 'CURCUMA EN POLVO', 'KILO', 120.00),
(199, 'ENELDO SECO', 'KILO', 220.00),
(200, 'ESENCIA DE VAINILLA MOLINA', 'PZA', 110.00),
(201, 'ESTRAGON', 'KILO', 1250.00),
(202, 'FECULA DE PAPA', 'KILO', 35.00),
(203, 'FERUL NEGRO', 'KILO', 35.00),
(204, 'FRIJOL PERUANO', 'KILO', 40.00),
(205, 'GLUCOSA', 'KILO', 90.00),
(206, 'GOMA XANTHANA', 'KILO', 290.00),
(207, 'GRENETINA EN POLVO', 'KILO', 220.00),
(208, 'JENGIBRE EN POLVO', 'KILO', 200.00),
(209, 'JUGO MAGGI 100 ML', 'PZA', 49.00),
(210, 'LAUREL SECO', 'KILO', 89.00),
(211, 'LEVADURA SECA', 'KILO', 170.00),
(212, 'MIEL DE AGAVE', 'PZA', 89.00),
(213, 'MOSTAZA ANTIGUA', 'KILO', 225.00),
(214, 'NUEZ MITAD', 'KILO', 350.00),
(215, 'OREGANO SECO', 'KILO', 125.00),
(216, 'PANKO', 'KILO', 89.00),
(217, 'PAPEL DE ESTRAZA', 'PZA', 79.00),
(218, 'PAPEL ESTRELLA', 'PZA', 35.00),
(219, 'PAPRIKA', 'KILO', 130.00),
(220, 'PASAS', 'KILO', 85.00),
(221, 'PECTINA', 'KILO', 150.00),
(222, 'PIMIENTA GORDA', 'KILO', 200.00),
(223, 'PIMIENTA NEGRA ENTERA', 'KILO', 170.00),
(224, 'PIMIENTA ROSA', 'KILO', 950.00),
(225, 'POLVO PARA HORNEAR', 'KILO', 39.00),
(226, 'SAL DE GRANO DE COLIMA', 'KILO', 49.00),
(227, 'SALSA INGLESA LEA Y PERRINS', 'PZA', 220.00),
(228, 'SEMILLA DE CALABAZA', 'KILO', 155.00),
(229, 'SEMILLA DE CILANTRO', 'KILO', 76.00),
(230, 'SEMILLA DE HINOJO', 'KILO', 200.00),
(231, 'TOSTADA RASPADA 100PZA', 'PAQUETE', 130.00),
(232, 'VAINA DE VAINILLA', 'PZA', 80.00),
(233, 'GAS PROPANO', 'PZA', 95.00),
(234, 'ACEITE DE AJONJOLI', 'PZA', 179.00),
(235, 'ACEITE DE OLIVA EXTRA VIRGEN FILIPPO BERRIO', 'PZA', 225.00),
(236, 'ACEITE DE CANOLA', 'PZA', 59.00),
(237, 'ACEITE DE OLIVA HACIENDAS DE ANDA', 'PZA', 499.00),
(238, 'ACEITE DE OLIVA VALLE DE GALAVIZ', 'PZA', 129.00),
(239, 'VINAGRE BLANCO', 'PZA', 55.00),
(240, 'VINO BLANCO', 'PZA', 105.00),
(241, 'SALSA SOYA', 'PZA', 120.00),
(242, 'VINO TINTO', 'PZA', 97.00),
(243, 'MOSTAZA DIJON', 'PZA', 189.00),
(244, 'ALCAPARRAS', 'PZA', 65.00),
(245, 'MIEL DE ABEJA', 'KILO', 110.00),
(246, 'ACEITUNA VERDE SIN HUESO FRASCO', 'PZA', 89.00),
(247, 'ATUN EN AGUA DOLORES', 'PZA', 25.00),
(248, 'VINAGRE BALSAMICO', 'LT', 125.00),
(249, 'CREMA DE CACAHUATE', 'PZA', 179.00),
(250, 'CREMA IMPERIAL ORO', 'KG', 69.00),
(251, 'CREMA PARA BATIR LYNCOTT', 'LITRO', 112.00),
(252, 'JAMON PECHUGA DE PAVO', 'KG', 320.00),
(253, 'JAMON SERRANO', 'PAQUETE', 585.00),
(254, 'JOCJOCQUE', 'PZA', 95.00),
(255, 'JAMON DE PAVO VIRGINIA FUD', 'KG', 155.00),
(256, 'LECHE CARNATION', 'LITRO', 30.00),
(257, 'LECHE CONDENSADA DESLACTOSADA', 'CUBETA', 82.00),
(258, 'LECHE DE COCO', 'LITRO', 69.00),
(259, 'LECHE DESLACTOSADA LIGHT SANTA CLARA', 'CAJA', 356.00),
(260, 'MANTECA', 'KG', 110.00),
(261, 'MANTEQUILLA', 'BARRA', 215.00),
(262, 'NATA O CREMA DE LECHE', 'LITRO', 55.00),
(263, 'QUESO COTIJA', 'KG', 120.00),
(264, 'QUESO COTTAGE', 'KG', 69.00),
(265, 'QUESO CREMA', 'PZA', 355.00),
(266, 'QUESO MASCARPONE', 'PZA', 200.00),
(267, 'QUESO CAMEMBERT', 'PZA', 147.00),
(268, 'QUESO MANCHEGO', 'KG', 189.00),
(269, 'QUESO DE CABRA', 'PZA', 125.00),
(270, 'QUESO GOUDA', 'KG', 299.00),
(271, 'QUESO MOZZARELLA CUBICADO', 'KG', 135.00),
(272, 'QUESO OAXACA', 'KG', 190.00),
(273, 'QUESO PANELA', 'KG', 120.00),
(274, 'QUESO PARMESANO', 'KG', 380.00),
(275, 'REQUESON', 'BOTE', 113.00),
(276, 'YOGURTH GRIEGO', 'LITRO', 98.00),
(277, 'YOGURTH OIKOS', 'BOTE', 99.00),
(278, 'PAPAS A LA FRANCESA 2.600GR', 'BOLSA', 125.00),
(279, 'TORTILLA HARINA', 'PAQUETE', 69.00),
(280, 'CREMA LALA', 'PZA', 89.00),
(281, 'PAN BIMBO GDE', 'PZA', 52.00),
(282, 'PECHUGA DE POLLO', 'KILO', 197.00),
(283, 'POLLO CONGELADO SUKARNE', 'KILO', 95.00),
(284, 'PIERNA Y MUSLO DE POLLO', 'KILO', 189.00),
(285, 'CHORIZO DE PRIMERA', 'KILO', 160.00),
(286, 'BISTEC DE RES', 'KILO', 250.00),
(287, 'TOCINO AHUMADO', 'KILO', 160.00),
(288, 'GRANILLO TURIN', 'KG', 310.00),
(289, 'CHOCOLATE AMARG TURIN', 'KG', 370.00),
(290, 'CHOCOLATE SEMI AMARGO TURIN', 'KG', 370.00),
(291, 'MASA HOJALDRE', 'PAQUETE', 50.00),
(292, 'CREMA RICH', 'PZA', 105.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajador`
--

CREATE TABLE `trabajador` (
  `idTrabajador` int(11) NOT NULL,
  `Nombre` varchar(120) DEFAULT NULL,
  `primerApellido` varchar(50) DEFAULT NULL,
  `segundoApellido` varchar(50) DEFAULT NULL,
  `Telefono` varchar(20) DEFAULT NULL,
  `CorreoElectronico` varchar(120) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `Nombre` varchar(120) DEFAULT NULL,
  `primerApellido` varchar(120) DEFAULT NULL,
  `segundoApellido` varchar(120) DEFAULT NULL,
  `CorreoElectronico` varchar(120) DEFAULT NULL,
  `Contrasena` varchar(120) DEFAULT NULL,
  `Rol` varchar(120) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`idAdministrador`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`idCliente`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`idPedido`),
  ADD KEY `idCliente` (`idCliente`);

--
-- Indices de la tabla `pedido_producto`
--
ALTER TABLE `pedido_producto`
  ADD PRIMARY KEY (`idPedido`,`idProducto`),
  ADD KEY `idProducto` (`idProducto`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idProducto`);

--
-- Indices de la tabla `trabajador`
--
ALTER TABLE `trabajador`
  ADD PRIMARY KEY (`idTrabajador`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=293;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD CONSTRAINT `administrador_ibfk_1` FOREIGN KEY (`idAdministrador`) REFERENCES `usuario` (`idUsuario`);

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `usuario` (`idUsuario`);

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`);

--
-- Filtros para la tabla `pedido_producto`
--
ALTER TABLE `pedido_producto`
  ADD CONSTRAINT `pedido_producto_ibfk_1` FOREIGN KEY (`idPedido`) REFERENCES `pedido` (`idPedido`),
  ADD CONSTRAINT `pedido_producto_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`);

--
-- Filtros para la tabla `trabajador`
--
ALTER TABLE `trabajador`
  ADD CONSTRAINT `trabajador_ibfk_1` FOREIGN KEY (`idTrabajador`) REFERENCES `usuario` (`idUsuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
