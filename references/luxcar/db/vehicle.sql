-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Nov 24. 14:00
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
-- Tábla szerkezet ehhez a táblához `vehicle`
--

CREATE TABLE `vehicle` (
  `id` smallint(6) NOT NULL,
  `carId` varchar(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  `year` year(4) NOT NULL,
  `color` varchar(30) NOT NULL,
  `engine` varchar(30) NOT NULL,
  `fuel` char(1) NOT NULL,
  `hp` smallint(6) NOT NULL,
  `torque` smallint(6) NOT NULL,
  `acceleration` decimal(5,1) NOT NULL,
  `topspeed` smallint(6) NOT NULL,
  `price` mediumint(9) NOT NULL,
  `manufactured` int(11) NOT NULL,
  `valid` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `vehicle`
--

INSERT INTO `vehicle` (`id`, `carId`, `name`, `year`, `color`, `engine`, `fuel`, `hp`, `torque`, `acceleration`, `topspeed`, `price`, `manufactured`, `valid`) VALUES
(1, 'trabant-tuning', 'Trabant - tuning', 1982, 'bordó', '1.8L V-4 turbo', 'B', 180, 250, '7.4', 230, 8000000, 2000000, 1),
(2, 'porsche-911-turbo-cabrio', 'Porsche 911 Turbo Cabrio', 2022, 'kék', '3.0L twin-Turbo V-6 boxer', 'B', 379, 800, '3.2', 317, 8388607, 15000, 1),
(3, 'bmw-m5', 'BMW M5', 2022, 'zöld', '4.4L V8 Turbo', 'B', 627, 750, '3.2', 305, 8388607, 10000, 1),
(4, 'audi-rs-7-sportback', 'Audi RS 7 Sportback', 2022, 'fekete', '4.0L V8 biturbo', 'B', 591, 590, '3.5', 305, 8388607, 6000, 1),
(5, 'ferrari-812-superfast', 'Ferrari 812 SuperFast', 2022, 'ezüst', '6.5L V12', 'B', 788, 529, '2.8', 339, 8388607, 500, 1),
(6, 'ford-gt', 'Ford GT', 2022, 'fehér', '3.5L EcoBoost V6', 'B', 647, 550, '3.0', 348, 8388607, 141, 1),
(7, 'mercedes-amg-one', 'Mercedes-AMG One', 2022, 'fehér', '4.0L V8 biturbo', 'B', 1021, 0, '2.6', 349, 8388607, 275, 1),
(8, 'lamborghini-sian-roadster', 'Lamborghini Sian Roadster', 2022, 'arany', '6.5L V-12', 'B', 819, 531, '2.7', 350, 8388607, 63, 1),
(9, 'rimac-concept-one', 'Rimac Concept One', 2022, 'szürke', 'elektromos', 'E', 1224, 1180, '2.5', 356, 8388607, 8, 1),
(10, 'pagani-huayra-bc-roadster', 'Pagani Huayra BC Roadster', 2022, 'kék', '6.0L Twin-Turbo V-12', 'B', 791, 775, '2.8', 380, 8388607, 260, 1),
(11, 'koenigsegg-gemera', 'Koenigsegg Gemera', 2022, 'szürke', '2.0L Twin-Turbo V-3', 'H', 2581, 1700, '1.9', 401, 8388607, 300, 1),
(12, 'aston-martin-valkyrie', 'Aston Martin Valkyrie', 2022, 'szürke', '6.5L V-12', 'B', 664, 1160, '2.5', 402, 8388607, 100, 1),
(13, 'mclaren-speedtail', 'McLaren Speedtail', 2022, 'kék', '4.0L Twin-Turbo V-8', 'H', 1035, 848, '2.5', 402, 8388607, 106, 1),
(14, 'bugatti-veyron', 'Bugatti Veyron', 2022, 'fekete', '8.0L quad-turbo V-16', 'B', 987, 922, '2.8', 409, 8388607, 178, 1),
(15, 'ssc-ultimate-aero', 'SSC Ultimate Aero', 2022, 'ezüst', '6.3L twin-turbo V-8', 'B', 1183, 1094, '2.7', 412, 8388607, 24, 1),
(16, 'koenigsegg-agera-r', 'Koenigsegg Agera R', 2022, 'kék', '5.0L twin-turbo V-8', 'B', 1124, 885, '2.7', 418, 8388607, 18, 1),
(17, 'bugatti-chiron', 'Bugatti Chiron', 2022, 'ezüst', '8.0L twin-turbo V-16', 'B', 1479, 1180, '2.6', 420, 8388607, 560, 1),
(18, 'bugatti-veyron-super-sport', 'Bugatti Veyron Super Sport', 2022, 'fekete', '8.0L twin-turbo V-16', 'B', 1184, 1106, '2.6', 431, 8388607, 30, 1),
(19, 'hennessey-venom-gt', 'Hennessey Venom GT', 2022, 'fehér', '7.0L twin-turbo V-8', 'B', 1244, 1155, '2.7', 435, 8388607, 25, 1),
(20, 'koenigsegg-agera-rs', 'Koenigsegg Agera RS', 2022, 'fehér', '5.0L twin-turbo V-8', 'B', 1341, 1160, '2.6', 447, 8388607, 25, 1),
(21, 'ssc-tuatara', 'SSC Tuatara', 2022, 'fehér', '6.4L twin-turbo V-8', 'B', 1750, 1160, '2.6', 455, 8388607, 25, 1),
(22, 'bugatti-chiron-super-sport-300-plus', 'Bugatti Chiron Super Sport 300+', 2022, 'fekete', '8.0L quad-turbo V-16', 'B', 1578, 1180, '2.6', 489, 8388607, 30, 1),
(23, 'hennessey-venom-f5', 'Hennessey Venom F5', 2022, 'sárga', '6.6L twin-turbo V-8', 'B', 1817, 1193, '2.4', 500, 8388607, 24, 1),
(24, 'koenigsegg-jesko-absolut', 'Koenigsegg Jesko Absolut', 2022, 'fehér', '5.0L twin-turbo V-8', 'B', 1600, 1180, '2.3', 531, 8388607, 11, 1);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `vehicle`
--
ALTER TABLE `vehicle`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `vehicle`
--
ALTER TABLE `vehicle`
  MODIFY `id` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
