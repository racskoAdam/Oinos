-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Nov 28. 21:14
-- Kiszolgáló verziója: 10.4.6-MariaDB
-- PHP verzió: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `luxcar`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `car`
--

CREATE TABLE `car` (
  `id` smallint(6) NOT NULL,
  `name` varchar(200) NOT NULL,
  `nameID` varchar(200) NOT NULL,
  `year` year(4) NOT NULL,
  `colorID` tinyint(4) NOT NULL,
  `engine` varchar(30) NOT NULL,
  `fuelID` char(1) NOT NULL,
  `horsepower` smallint(6) NOT NULL,
  `torque` smallint(6) NOT NULL,
  `acceleration` decimal(5,1) NOT NULL,
  `topspeed` smallint(6) NOT NULL,
  `price` mediumint(9) NOT NULL,
  `manufactured` int(11) NOT NULL,
  `km` mediumint(9) NOT NULL,
  `valid` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `car`
--

INSERT INTO `car` (`id`, `name`, `nameID`, `year`, `colorID`, `engine`, `fuelID`, `horsepower`, `torque`, `acceleration`, `topspeed`, `price`, `manufactured`, `km`, `valid`) VALUES
(1, 'Trabant - tuning', 'trabant-tuning', 1982, 14, '1.8L V-4 turbo', 'P', 180, 250, '7.4', 230, 8000000, 2000000, 27000, 1),
(2, 'Porsche 911 Turbo Cabrio', 'porsche-911-turbo-cabrio', 2022, 5, '3.0L twin-Turbo V-6 boxer', 'P', 379, 800, '3.2', 317, 8388607, 15000, 11900, 1),
(3, 'BMW M5', 'bmw-m5', 2022, 8, '4.4L V8 Turbo', 'P', 627, 750, '3.2', 305, 8388607, 10000, 1200, 1),
(4, 'Audi RS 7 Sportback', 'audi-rs-7-sportback', 2022, 2, '4.0L V8 biturbo', 'P', 591, 590, '3.5', 305, 8388607, 6000, 3300, 1),
(5, 'Ferrari 812 SuperFast', 'ferrari-812-superfast', 2022, 4, '6.5L V12', 'P', 788, 529, '2.8', 339, 8388607, 500, 13588, 1),
(6, 'Ford GT', 'ford-gt', 2022, 1, '3.5L EcoBoost V6', 'P', 647, 550, '3.0', 348, 8388607, 141, 17890, 1),
(7, 'Mercedes-AMG One', 'mercedes-amg-one', 2022, 1, '4.0L V8 biturbo', 'P', 1021, 0, '2.6', 349, 8388607, 275, 21550, 1),
(8, 'Lamborghini Sian Roadster', 'lamborghini-sian-roadster', 2022, 12, '6.5L V-12', 'P', 819, 531, '2.7', 350, 8388607, 63, 5600, 1),
(9, 'Rimac Concept One', 'rimac-concept-one', 2022, 3, 'elektromos', 'E', 1224, 1180, '2.5', 356, 8388607, 8, 28200, 1),
(10, 'Pagani Huayra BC Roadster', 'pagani-huayra-bc-roadster', 2022, 5, '6.0L Twin-Turbo V-12', 'P', 791, 775, '2.8', 380, 8388607, 260, 7800, 1),
(11, 'Koenigsegg Gemera', 'koenigsegg-gemera', 2022, 3, '2.0L Twin-Turbo V-3', 'H', 2581, 1700, '1.9', 401, 8388607, 300, 14900, 1),
(12, 'Aston Martin Valkyrie', 'aston-martin-valkyrie', 2022, 3, '6.5L V-12', 'P', 664, 1160, '2.5', 402, 8388607, 100, 22300, 1),
(13, 'McLaren Speedtail', 'mclaren-speedtail', 2022, 5, '4.0L Twin-Turbo V-8', 'H', 1035, 848, '2.5', 402, 8388607, 106, 6500, 1),
(14, 'Bugatti Veyron', 'bugatti-veyron', 2022, 2, '8.0L quad-turbo V-16', 'P', 987, 922, '2.8', 409, 8388607, 178, 31500, 1),
(15, 'SSC Ultimate Aero', 'ssc-ultimate-aero', 2022, 4, '6.3L twin-turbo V-8', 'P', 1183, 1094, '2.7', 412, 8388607, 24, 15600, 1),
(16, 'Koenigsegg Agera R', 'koenigsegg-agera-r', 2022, 5, '5.0L twin-turbo V-8', 'P', 1124, 885, '2.7', 418, 8388607, 18, 9922, 1),
(17, 'Bugatti Chiron', 'bugatti-chiron', 2022, 4, '8.0L twin-turbo V-16', 'P', 1479, 1180, '2.6', 420, 8388607, 560, 66421, 1),
(18, 'Bugatti Veyron Super Sport', 'bugatti-veyron-super-sport', 2022, 2, '8.0L twin-turbo V-16', 'P', 1184, 1106, '2.6', 431, 8388607, 30, 6587, 1),
(19, 'Hennessey Venom GT', 'hennessey-venom-gt', 2022, 1, '7.0L twin-turbo V-8', 'P', 1244, 1155, '2.7', 435, 8388607, 25, 1125, 1),
(20, 'Koenigsegg Agera RS', 'koenigsegg-agera-rs', 2022, 1, '5.0L twin-turbo V-8', 'P', 1341, 1160, '2.6', 447, 8388607, 25, 3644, 1),
(21, 'SSC Tuatara', 'ssc-tuatara', 2022, 1, '6.4L twin-turbo V-8', 'P', 1750, 1160, '2.6', 455, 8388607, 25, 6001, 1),
(22, 'Bugatti Chiron Super Sport 300+', 'bugatti-chiron-super-sport-300-plus', 2022, 2, '8.0L quad-turbo V-16', 'P', 1578, 1180, '2.6', 489, 8388607, 30, 2256, 1),
(23, 'Hennessey Venom F5', 'hennessey-venom-f5', 2022, 13, '6.6L twin-turbo V-8', 'P', 1817, 1193, '2.4', 500, 8388607, 24, 1968, 1),
(24, 'Koenigsegg Jesko Absolut', 'koenigsegg-jesko-absolut', 2022, 1, '5.0L twin-turbo V-8', 'P', 1600, 1180, '2.3', 531, 8388607, 11, 1964, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `car_tariff`
--

CREATE TABLE `car_tariff` (
  `id` int(11) NOT NULL,
  `carID` smallint(6) NOT NULL,
  `tariff` int(11) NOT NULL,
  `valid` date NOT NULL COMMENT 'Valid from'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `car_tariff`
--

INSERT INTO `car_tariff` (`id`, `carID`, `tariff`, `valid`) VALUES
(1, 1, 25000, '2022-11-24'),
(2, 2, 30000, '2022-11-24'),
(3, 3, 33000, '2022-11-24'),
(4, 4, 35000, '2022-11-24'),
(5, 5, 43000, '2022-11-24'),
(6, 6, 48000, '2022-11-24'),
(7, 7, 51000, '2022-11-24'),
(8, 8, 55000, '2022-11-24'),
(9, 9, 60000, '2022-11-24'),
(10, 10, 63000, '2022-11-24'),
(11, 11, 68000, '2022-11-24'),
(12, 12, 70000, '2022-11-24'),
(13, 13, 75000, '2022-11-24'),
(14, 14, 80000, '2022-11-24'),
(15, 15, 85000, '2022-11-24'),
(16, 16, 90000, '2022-11-24'),
(17, 17, 100000, '2022-11-24'),
(18, 18, 120000, '2022-11-24'),
(19, 19, 135000, '2022-11-24'),
(20, 20, 145000, '2022-11-24'),
(21, 21, 190000, '2022-11-24'),
(22, 22, 200000, '2022-11-24'),
(23, 23, 220000, '2022-11-24'),
(24, 24, 250000, '2022-11-24');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `color`
--

CREATE TABLE `color` (
  `id` tinyint(4) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `color`
--

INSERT INTO `color` (`id`, `name`) VALUES
(1, 'White'),
(2, 'Black'),
(3, 'Gray'),
(4, 'Silver'),
(5, 'Blue'),
(6, 'Red'),
(7, 'Brown'),
(8, 'Green'),
(9, 'Orange'),
(10, 'Beige'),
(11, 'Purple'),
(12, 'Gold'),
(13, 'Yellow'),
(14, 'Burgundy');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `fuel`
--

CREATE TABLE `fuel` (
  `id` char(1) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `fuel`
--

INSERT INTO `fuel` (`id`, `name`) VALUES
('D', 'diesel'),
('E', 'electronic'),
('H', 'hybrid'),
('P', 'petrol');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `id` mediumint(9) NOT NULL,
  `type` char(1) NOT NULL,
  `prefix_name` varchar(20) DEFAULT 'NULL',
  `first_name` varchar(50) NOT NULL,
  `middle_name` varchar(50) DEFAULT 'NULL',
  `last_name` varchar(50) NOT NULL,
  `suffix_name` varchar(20) DEFAULT NULL,
  `born` date DEFAULT NULL,
  `gender` char(1) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(20) DEFAULT NULL,
  `valid` tinyint(1) NOT NULL DEFAULT 1,
  `last_logon` timestamp NULL DEFAULT NULL,
  `attempts` tinyint(4) NOT NULL DEFAULT 0,
  `last_attempt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`id`, `type`, `prefix_name`, `first_name`, `middle_name`, `last_name`, `suffix_name`, `born`, `gender`, `email`, `password`, `valid`, `last_logon`, `attempts`, `last_attempt`) VALUES
(1, 'A', NULL, 'Attila', NULL, 'Ódry', NULL, '1964-03-08', 'M', 'odry.attila@keri.mako.hu', '1234Aa', 1, NULL, 0, NULL),
(2, 'A', NULL, 'Félix', 'Márk', 'Bálint', NULL, '2003-08-02', 'M', 'balint.mark.felix@keri.mako.hu', '1234Aa', 1, NULL, 0, NULL),
(3, 'A', NULL, 'István', NULL, 'Balla', NULL, '2003-06-07', 'M', 'balla.istvan@keri.mako.hu', '1234Aa', 1, NULL, 0, NULL),
(4, 'A', NULL, 'András', NULL, 'Baranyi', NULL, '2003-06-20', 'M', 'baranyi.andras@keri.mako.hu', '1234Aa', 1, NULL, 0, NULL),
(5, 'A', NULL, 'Antal', 'Benjámin', 'Bárdos', NULL, '2003-04-11', 'M', 'bardos.benjamin.antal@keri.mako.hu', '1234Aa', 0, NULL, 0, NULL),
(6, 'A', NULL, 'Kristóf', 'Ferenc', 'Csáki', NULL, '2002-10-24', 'M', 'csaki.ferenc.kristof@keri.mako.hu', '1234Aa', 1, NULL, 0, NULL),
(7, 'A', NULL, 'Richárd', NULL, 'Csomor', NULL, '2003-04-17', 'M', 'csomor.richard@keri.mako.hu', '1234Aa', 1, NULL, 0, NULL),
(8, 'A', NULL, 'Ivonn', 'Dóra', 'Dávidr', NULL, '2003-09-21', 'F', 'davidr.dora.ivonn@keri.mako.hu', '1234Aa', 1, NULL, 0, NULL),
(9, 'A', NULL, 'Bence', 'Krisztián', 'Gyulai', NULL, '2003-07-08', 'M', 'gyulai.krisztian.bence@keri.mako.hu', '1234Aa', 1, NULL, 0, NULL),
(10, 'A', NULL, 'Fanni', NULL, 'Juhász', NULL, '2003-12-23', 'F', 'juhasz.fanni@keri.mako.hu', '1234Aa', 1, NULL, 0, NULL),
(11, 'A', NULL, 'Nikolett', NULL, 'Lantos', NULL, '2003-06-23', 'F', 'lantos.nikolett@keri.mako.hu', '1234Aa', 0, NULL, 0, NULL),
(12, 'A', NULL, 'Dániel', NULL, 'Lázár', NULL, '2003-05-12', 'M', 'lazar.daniel@keri.mako.hu', '1234Aa', 1, NULL, 0, NULL),
(13, 'A', NULL, 'Levente', NULL, 'Luncz', NULL, '2004-03-12', 'M', 'luncz.levente@keri.mako.hu', '1234Aa', 1, NULL, 0, NULL),
(14, 'A', NULL, 'Letícia', NULL, 'Morvai', NULL, '2003-09-11', 'F', 'morvai.leticia@keri.mako.hu', '1234Aa', 1, NULL, 0, NULL),
(15, 'A', NULL, 'Ádám', 'Ákos', 'Racskó', NULL, '2003-03-10', 'M', 'racsko.akos.adam@keri.mako.hu', '1234Aa', 1, NULL, 0, NULL),
(16, 'A', NULL, 'Bence', NULL, 'Sípos', NULL, '2001-10-11', 'M', 'sipos.bence@keri.mako.hu', '1234Aa', 1, NULL, 0, NULL),
(17, 'A', NULL, 'Regina', 'Viktória', 'Túri', NULL, '2003-02-24', 'F', 'turi.viktoria.regina@keri.mako.hu', '1234Aa', 1, NULL, 0, NULL),
(18, 'A', NULL, 'Márk', 'Tamás', 'Varga', NULL, '2003-10-26', 'M', 'varga.tamas.mark@keri.mako.hu', '1234Aa', 1, NULL, 0, NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user-rent`
--

CREATE TABLE `user-rent` (
  `id` int(11) NOT NULL,
  `carID` smallint(6) NOT NULL,
  `rent` date NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL,
  `discount` tinyint(4) DEFAULT NULL,
  `valid` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `car_tariff`
--
ALTER TABLE `car_tariff`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `VALID` (`carID`,`valid`);

--
-- A tábla indexei `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `fuel`
--
ALTER TABLE `fuel`
  ADD UNIQUE KEY `ID` (`id`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`) USING BTREE,
  ADD UNIQUE KEY `login` (`email`,`password`);

--
-- A tábla indexei `user-rent`
--
ALTER TABLE `user-rent`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `car`
--
ALTER TABLE `car`
  MODIFY `id` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT a táblához `car_tariff`
--
ALTER TABLE `car_tariff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT a táblához `color`
--
ALTER TABLE `color`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT a táblához `user-rent`
--
ALTER TABLE `user-rent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
