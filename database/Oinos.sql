-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Jan 25. 13:01
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
-- Adatbázis: `opd`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `categories`
--

CREATE TABLE `categories` (
  `categorieId` int(12) NOT NULL,
  `categorieName` varchar(255) NOT NULL,
  `categorieDesc` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `categories`
--

INSERT INTO `categories` (`categorieId`, `categorieName`, `categorieDesc`) VALUES
(1, 'Pizza', 'A pizzaimádók örömére! Válasszon finom pizzáink széles választékából, Kellemes és ízletes! Mind friss alapanyagokból!'),
(2, 'Burgerek', 'Válasszon egy tucat hamburger közül! Mind friss alapanyagokból!'),
(3, 'Streetfood', 'Válasszon a streetfoodjaink közül!'),
(4, 'Italok', 'Egészítse ki ételeit a FoodieVersumban kapható italok széles választékával'),
(5, 'Desszertek', 'Válasszon a kellemes, könnyed desszertjeink közül!'),
(6, 'Köretek | Szószok', 'Válasszon bármilyen szószt és köretet!');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `contact`
--

CREATE TABLE `contact` (
  `contactId` int(21) NOT NULL,
  `email` varchar(35) NOT NULL,
  `phoneNo` bigint(21) NOT NULL,
  `orderId` int(21) NOT NULL DEFAULT 0 COMMENT 'If problem is not related to the order then order id = 0',
  `message` text NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `deliverydetails`
--

CREATE TABLE `deliverydetails` (
  `id` int(21) NOT NULL,
  `orderId` int(21) NOT NULL,
  `deliveryBoyName` varchar(35) NOT NULL,
  `deliveryBoyPhoneNo` bigint(25) NOT NULL,
  `deliveryTime` int(200) NOT NULL COMMENT 'Time in minutes',
  `dateTime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `menu`
--

CREATE TABLE `menu` (
  `Id` int(12) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Price` int(12) NOT NULL,
  `Description` text NOT NULL,
  `CategorieId` int(12) NOT NULL,
  `image` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `menu`
--

INSERT INTO `menu` (`Id`, `Name`, `Price`, `Description`, `CategorieId`, `image`) VALUES
(1, 'Bacon Hamburger', 2750, 'Marhahús, szalonna, saláta, paradicsom, lilahagyma, savanyúság és klasszikus szósz\r\n', 2, 'Burger-Bacon.jpg'),
(2, 'BBQ Hamburger', 2850, 'Marhahús, grillezett szalonna, karamellizált hagyma, saláta, paradicsom, savanyúság és BBQ szósz\r\n', 2, 'Burger-BBQ.jpg'),
(3, 'Klasszikus Hamburger', 2500, 'Marhahús, saláta, paradicsom, lilahagyma, savanyúság és klasszikus szósz\r\n', 2, 'Burger-Classic.jpg'),
(4, 'Sajtburger', 2900, 'Marhahús, cheddar, saláta, paradicsom, lilahagyma, savanyúság és klasszikus szósz', 2, 'Burger-Cheese.jpg'),
(5, 'Mexikó burger', 2750, 'Marhahús, jalapeño paprika, saláta, paradicsom, lilahagyma, savanyúság és csípős szósz', 2, 'Burger-Mexico.jpg'),
(6, 'Margherita Pizza', 3000, 'Paradicsomszósz, egy nagy adag mozzarella', 1, 'Pizza-Margherita.jpg'),
(7, 'Vega Pizza', 3150, 'Paradicsomszósz, mozzarella, hagyma, zöldpaprika és kukorica', 1, 'Pizza-Vegetable-Mix.jpg'),
(8, 'SoGoKu Pizza', 3150, 'Paradicsomszósz, egy nagy adag mozzarella, sonka és csiperkegomba\r\n', 1, 'Pizza-SoGoKu.jpg'),
(9, 'Hawaii Pizza', 3150, 'Paradicsomszósz, egy nagy adag mozzarella, sonka és ananász', 1, 'Pizza-Hawaii.jpg'),
(10, 'Pepperonis Klasszikus pizza', 3250, 'Paradicsomszósz, egy nagy adag mozzarella és fűszeres pepperoni szalámi', 1, 'Pizza-Salami.jpg'),
(11, 'Csípős Pepperonis Pizza', 3350, 'Paradicsomszósz, fűszeres sriracha szósz, mozzarella, lilahagyma, fűszeres pepperoni, jalapeño paprika', 1, 'Pizza-Salami-Hot.jpg'),
(12, 'Négysajtos pizza', 3350, 'Különféle sajtok keveréke fehér krémmártással: mozzarella, cheddar, parmezán, kéksajt', 1, 'Pizza-FourCheese.jpg'),
(13, 'Falafel Box', 2350, 'Falafel, pita, sült krumpli, paradicsom, hagyma és szósz', 3, 'Falafel-Box.jpg'),
(14, 'Falafel Pitában', 2450, 'Falafel, pita, görög szósz, paradicsom, hagyma és krumpli', 3, 'Falafel-pita.jpg'),
(15, 'Gyros Box', 2650, 'Eredeti görög sertésgyros, pita, paradicsom, hagyma, krumpli, tzaziki szósz', 3, 'Gyros-Box.jpg'),
(16, 'Gyros Pitában', 2450, 'Eredeti görög sertésgyros, pita, paradicsom, hagyma, krumpli, tzaziki szósz', 3, 'Gyros-Pita.jpg'),
(17, 'Gyros Tál (xxl)', 3350, 'Eredeti görög sertésgyros, saláta, lencse, vegyes zöldség, halloumi sajt, olíva bogyó, lilahagyma, ', 3, 'Gyros-xxl.jpg'),
(18, 'Halloumi Pita', 2450, 'Grillezett halloumi, pita, fokhagymás szósz paradicsom, hagyma, sült krumpli\r\n\r\n', 3, 'Halloumi-Pita.jpg'),
(19, 'Halloumi Box', 2350, 'Grillezett halloumi, pita, sült krumpli, paradicsom, hagyma és szósz\r\n', 3, 'Halloumi-Box.jpg'),
(20, 'Csokoládékrémmel töltött fánk', 300, 'Csokoládékrémmel töltött fánk az igazi csokoládérajongóknak.\r\n\r\n', 5, 'Dessert-Donut_Chocolate.jpg'),
(21, 'Eperrel töltött fánk', 300, 'Eperrel töltött fánk - maga az édesség\r\n\r\n', 5, 'Dessert-Donut_Strawberry.jpg'),
(22, 'Sült krumpli', 500, 'Olasz fűszernövényekkel sült aromás burgonya. Nagy adag.\r\n', 6, 'SideDish-Chips.jpg'),
(23, 'Hash Browns', 500, 'Finomra szeletelt krumpli, olajban sütve', 6, 'SideDish-HashBrown.jpg'),
(24, 'Saláta', 750, 'Saláta, Paradicsom, Uborka, Lilahagyma,', 6, 'SideDish-Salad.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orderitems`
--

CREATE TABLE `orderitems` (
  `id` int(21) NOT NULL,
  `orderId` int(21) NOT NULL,
  `itemQuantity` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orders`
--

CREATE TABLE `orders` (
  `orderId` int(21) NOT NULL,
  `userId` int(21) NOT NULL,
  `address` varchar(255) NOT NULL,
  `zipCode` int(21) NOT NULL,
  `phoneNo` bigint(21) NOT NULL,
  `amount` int(200) NOT NULL,
  `paymentMode` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0=cash on delivery, \r\n1=online ',
  `orderStatus` enum('0','1','2','3','4','5','6') NOT NULL DEFAULT '0' COMMENT '0=Order Placed.\r\n1=Order Confirmed.\r\n2=Preparing your Order.\r\n3=Your order is on the way!\r\n4=Order Delivered.\r\n5=Order Denied.\r\n6=Order Cancelled.',
  `orderDate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `reservation`
--

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `date` date NOT NULL,
  `attendees` int(2) NOT NULL,
  `time` varchar(10) COLLATE utf8_hungarian_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `phoneNumber` varchar(30) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

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
(6, 'A', NULL, 'Kristóf', 'Ferenc', 'Csáki', NULL, '2002-10-24', 'M', 'csaki.ferenc.kristof@keri.mako.hu', '1234Aa', 1, NULL, 0, NULL),
(8, 'A', NULL, 'Ivonn', 'Dóra', 'Dávidr', NULL, '2003-09-21', 'F', 'davidr.dora.ivonn@keri.mako.hu', '1234Aa', 1, NULL, 0, NULL),
(9, 'A', NULL, 'Bence', 'Krisztián', 'Gyulai', NULL, '2003-07-08', 'M', 'gyulai.krisztian.bence@keri.mako.hu', '1234Aa', 1, NULL, 0, NULL),
(10, 'A', NULL, 'Fanni', NULL, 'Juhász', NULL, '2003-12-23', 'F', 'juhasz.fanni@keri.mako.hu', '1234Aa', 1, NULL, 0, NULL),
(12, 'A', NULL, 'Dániel', NULL, 'Lázár', NULL, '2003-05-12', 'M', 'lazar.daniel@keri.mako.hu', '1234Aa', 1, NULL, 0, NULL),
(13, 'A', NULL, 'Levente', NULL, 'Luncz', NULL, '2004-03-12', 'M', 'luncz.levente@keri.mako.hu', '1234Aa', 1, NULL, 0, NULL),
(15, 'A', NULL, 'Ádám', 'Ákos', 'Racskó', NULL, '2003-03-10', 'M', 'racsko.akos.adam@keri.mako.hu', '1234Aa', 1, NULL, 0, NULL),
(16, 'A', NULL, 'Bence', NULL, 'Sípos', NULL, '2001-10-11', 'M', 'sipos.bence@keri.mako.hu', '1234Aa', 1, NULL, 0, NULL),
(17, 'A', NULL, 'Regina', 'Viktória', 'Túri', NULL, '2003-02-24', 'F', 'turi.viktoria.regina@keri.mako.hu', '1234Aa', 1, NULL, 0, NULL),
(18, 'A', NULL, 'Márk', 'Tamás', 'Varga', NULL, '2003-10-26', 'M', 'varga.tamas.mark@keri.mako.hu', '1234Aa', 1, NULL, 0, NULL);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categorieId`);
ALTER TABLE `categories` ADD FULLTEXT KEY `categorieName` (`categorieName`,`categorieDesc`);

--
-- A tábla indexei `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`contactId`);

--
-- A tábla indexei `deliverydetails`
--
ALTER TABLE `deliverydetails`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `orderId` (`orderId`);

--
-- A tábla indexei `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`Id`);
ALTER TABLE `menu` ADD FULLTEXT KEY `pizzaName` (`Name`,`Description`);

--
-- A tábla indexei `orderitems`
--
ALTER TABLE `orderitems`
  ADD PRIMARY KEY (`id`,`orderId`);

--
-- A tábla indexei `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`) USING BTREE,
  ADD UNIQUE KEY `login` (`email`,`password`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `categories`
--
ALTER TABLE `categories`
  MODIFY `categorieId` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT a táblához `contact`
--
ALTER TABLE `contact`
  MODIFY `contactId` int(21) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `deliverydetails`
--
ALTER TABLE `deliverydetails`
  MODIFY `id` int(21) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `menu`
--
ALTER TABLE `menu`
  MODIFY `Id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7823;

--
-- AUTO_INCREMENT a táblához `orders`
--
ALTER TABLE `orders`
  MODIFY `orderId` int(21) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
