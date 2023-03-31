-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Már 28. 15:00
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
  `CategorieId` int(12) NOT NULL,
  `categorieName` varchar(255) NOT NULL,
  `categorieDesc` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `categories`
--

INSERT INTO `categories` (`CategorieId`, `categorieName`, `categorieDesc`) VALUES
(1, 'Pizza', 'A pizzaimádók örömére! Válasszon finom pizzáink széles választékából, Kellemes és ízletes! Mind friss alapanyagokból!'),
(2, 'Burgerek', 'Válasszon egy tucat hamburger közül! Mind friss alapanyagokból!'),
(3, 'Streetfood', 'Válasszon a streetfoodjaink közül!'),
(4, 'Italok', 'Egészítse ki ételeit a FoodieVersumban kapható italok széles választékával'),
(5, 'Desszertek', 'Válasszon a kellemes, könnyed desszertjeink közül!'),
(6, 'Köretek | Szószok', 'Válasszon bármilyen szószt és köretet!'),
(7, 'appetisers', 'Ízelítők'),
(8, 'starters', 'Előételek'),
(9, 'sides', 'Kiegészítő ételek'),
(10, 'mains', 'Főételek'),
(11, 'desserts_res', 'Desszertek'),
(12, 'wines', 'Borok');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `employee_users`
--

CREATE TABLE `employee_users` (
  `id` int(3) NOT NULL,
  `username` text COLLATE utf8_hungarian_ci NOT NULL,
  `password` text COLLATE utf8_hungarian_ci NOT NULL,
  `type` text COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `employee_users`
--

INSERT INTO `employee_users` (`id`, `username`, `password`, `type`) VALUES
(1, 'adam', 'asd123', 'admin'),
(2, 'pityu', 'asd', 'cook');

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
(6, 'Margherita Pizza', 3000, 'Paradicsomszósz, egy nagy adag mozzarella\r\n\r\n', 1, 'Pizza-Margherita.jpg'),
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
(24, 'Saláta', 750, 'Saláta, Paradicsom, Uborka, Lilahagyma,', 6, 'SideDish-Salad.jpg'),
(25, 'Pepsi 0.33 liter', 450, '', 4, 'Bevs-Pepsi.jpg'),
(26, 'Lipton Green 0.33 liter', 430, '', 4, 'Bevs-Lipton.jpg'),
(27, 'Lipton Lemon 1.5 liter', 600, '', 4, 'Bevs-Lipton4.jpg'),
(28, 'Szentkirályi 1.5 liter', 400, 'Szénsavas', 4, 'Bevs-SzentK.jpg'),
(29, 'Szentkirályi 1.5 liter', 400, 'Szénsavmentes', 4, 'Bevs-SzentK2.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orderitems`
--

CREATE TABLE `orderitems` (
  `itemId` int(21) NOT NULL,
  `orderId` int(21) NOT NULL,
  `itemQuantity` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `orderitems`
--

INSERT INTO `orderitems` (`itemId`, `orderId`, `itemQuantity`) VALUES
(1, 1, 1),
(13, 1, 1),
(25, 1, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orders`
--

CREATE TABLE `orders` (
  `orderId` int(21) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Addresss` varchar(255) NOT NULL,
  `ZipCode` int(21) NOT NULL,
  `Phone` bigint(21) NOT NULL,
  `paymentMode` text NOT NULL DEFAULT '\'0\'',
  `orderDate` datetime NOT NULL DEFAULT current_timestamp(),
  `FirstName` text NOT NULL,
  `LastName` text NOT NULL,
  `totalPrice` int(10) NOT NULL,
  `state` varchar(30) NOT NULL COMMENT '1.ordered,2.finished,3.delivered'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `orders`
--

INSERT INTO `orders` (`orderId`, `Email`, `Addresss`, `ZipCode`, `Phone`, `paymentMode`, `orderDate`, `FirstName`, `LastName`, `totalPrice`, `state`) VALUES
(1, 'testferi@gmail.com', 'Szex utca 13', 6932, 66969696969, 'credit', '2023-03-27 11:06:54', 'feri', 'test', 5550, 'finished');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 NOT NULL,
  `email` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `phone` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `date_time` datetime NOT NULL,
  `guest` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `reservations`
--

INSERT INTO `reservations` (`id`, `name`, `email`, `phone`, `date_time`, `guest`) VALUES
(23, 'Balla IstvÃ¡n', 'pisti1231212@gmail.com', '2312412123', '2023-02-16 13:00:00', 3),
(24, 'Apenta+', 'asd@gmail.com', '+3059014041', '2023-02-23 14:00:00', 0),
(25, 'Apenta+', 'pisti1231212@gmail.com', '+3059014041', '2023-02-17 14:30:00', 0),
(26, 'Apenta+', 'pisti1231212@gmail.com', '36305901404', '2023-02-14 14:00:00', 0),
(27, 'asd', 'pisti1231212@gmail.com', '36305901404', '2023-02-14 14:30:00', 3),
(28, 'Apenta+', 'pisti1231212@gmail.com', '2222222222', '2023-02-23 14:30:00', 2),
(29, 'Apenta+', 'pisti1231212@gmail.com', '2222222222', '2023-02-23 15:00:00', 2),
(30, 'Apenta+', 'pisti1231212@gmail.com', '2222222222', '2023-02-23 15:30:00', 2),
(31, 'Balla IstvÃ¡n', 'pisti1231212@gmail.com', '2222222222', '2023-02-17 14:30:00', 2),
(32, 'Balla IstvÃ¡n', 'pisti1231212@gmail.com', '2222222222', '2023-02-17 15:00:00', 2),
(33, 'Apenta+', 'pisti1231212@gmail.com', '2222222222', '2023-02-23 12:00:00', 2),
(34, 'Apenta+', 'pisti1231212@gmail.com', '2222222222', '2023-02-24 14:30:00', 1),
(35, 'Apenta+', 'pisti1231212@gmail.com', '2222222222', '2023-03-09 06:00:00', 1),
(36, 'Apenta+', 'pisti1231212@gmail.com', '+305901404', '2023-03-08 14:00:00', 5),
(37, 'Balla IstvÃ¡n', 'pisti1231212@gmail.com', '36305901404', '2023-03-09 14:30:00', 3),
(38, 'Balla IstvÃ¡n', 'pisti1231212@gmail.com', '+36305901404', '2023-03-12 14:30:00', 2),
(39, 'Balla IstvÃ¡n', 'pisti1231212@gmail.com', '+36305901404', '2023-03-16 15:00:00', 2),
(40, 'Apenta+', 'asd@gmail.com345345', '2222222222', '2023-03-29 15:00:00', 2),
(41, 'Apenta+', 'asd@gmail', '2222222222', '2023-03-29 13:30:00', 2),
(42, 'Apenta+', 'asd@gmail.com1232345345', '2222222222', '2023-03-29 14:30:00', 2),
(43, 'asd', 'asd@gmail', '2222222222', '2023-03-24 14:30:00', 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `restaurantmenu`
--

CREATE TABLE `restaurantmenu` (
  `Id` int(12) NOT NULL,
  `Name` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `CategorieId` int(12) NOT NULL,
  `Price` int(6) NOT NULL,
  `Description` text COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `restaurantmenu`
--

INSERT INTO `restaurantmenu` (`Id`, `Name`, `CategorieId`, `Price`, `Description`) VALUES
(1, 'Házi olívaolajos keksz', 7, 1900, 'fűszeres kecskesajtmártással tálalva'),
(2, 'Vegyes kalamata olajbogyó', 7, 1750, 'Egy tál vegyes kalamata olajbogyó és napraforgós paradicsom'),
(3, 'Rozmaringos és tengeri sós focaccia', 7, 1650, 'Balzsamecettel és olívaolajjal tálalva'),
(5, 'Fokhagymás ciabatta', 7, 1750, 'mozzarellával'),
(6, 'Préselt csirke terrine konfitált csirkéből', 8, 2650, 'vadgombával, prosciutto sonkával és póréhagymával, valamint körtével, gyömbérrel és sáfránnyal ízesítve.'),
(7, 'Tengeri herkentyűhal ’scampi’ ', 8, 3100, 'citromos majonézzel és téli gyökérrel zöldségsaláta'),
(8, 'Sült kecskesajtos sajttorta ', 8, 2650, 'meleg sült kecskesajt és napraforgós paradicsom sajttorta, füge és áfonya chutney-vel'),
(9, 'Homemade soup of the day', 8, 2200, 'frissen sült kenyérrel tálalva'),
(10, 'Kéksajtos saláta', 8, 2450, 'bébi gyöngyszem, kék sajt, kandírozott dió, olajbogyó, fűszeres körtével és portói öntettel'),
(11, 'Pulled bbq sertéshús', 8, 2650, 'mustáros káposztasalátával és rozmaringos focaccia-val tálalva'),
(12, 'Sült mezei gomba', 8, 2650, 'brievel és lilahagymával tálalva, tetején fokhagymás és gyógynövényes morzsával'),
(13, 'Füstölt makréla pástétom', 8, 2650, 'mangóval, lilahagymával és lime salsa-val, ciabatta pirítóssal'),
(14, 'Kézzel vágott hasábburgonya', 9, 1300, ''),
(15, 'Szezonális vegyes zöldség', 9, 1300, ''),
(16, 'Szezonális kevert zöldönség fokhagymás vajjal', 9, 1300, ''),
(17, 'Mézes, narancsos és köményes chantenay sárgarépa', 9, 1300, ''),
(18, 'Bébi salátalevél, vörösboros öntettel', 9, 1400, ''),
(19, 'Paradicsom, lilahagyma és parmezán saláta', 9, 1450, ''),
(20, 'Wales-i bárányhús', 10, 7100, 'grillezett lilahagymával, paszternák és pancetta dauphinoise, kandírozott cékla, kapribogyó és menta mártással.'),
(21, 'Ragacsos citromos-borsos csirke', 10, 6250, 'pirított paradicsommal butternut tök és parmezános gratin, grillezett cseresznyeparadicsom és chorizo'),
(22, 'Házi halpite', 10, 5320, 'cheddar és petrezselyem morzsával, vajas kelkáposztával és kerti borsóval'),
(23, 'Sült tőkehal karaj', 10, 7100, 'tormás kéreg, baconos sült újkrumpli és kagyló, köményes almamártással.'),
(24, 'Serpenyőben sült tengeri sügér', 10, 7550, 'újhagymás pürével, pak choi-val és garnélarákkal'),
(25, '25 dkg char grillált szirlószelet', 10, 8000, 'sült fokhagymás pürével, sült paszternák, sárgarépa, krémes mogyoróhagyma és vörösboros jus.'),
(26, 'Zöldséges tagine', 10, 5300, 'édesburgonyából, sült paprikából, sárgabarackból és vajbabból készült tagine, grillezett lapos kenyérrel tálalva.'),
(27, 'Kecskesajtos és zöldséges sütemény', 10, 5300, 'padlizsán, cukkini, kecskesajt és paradicsomos sütemény vajas kelkáposztával és zsenge szárú brokkolival.'),
(28, 'Grillezett gammon steak', 10, 4000, 'szabadföldi tojással, kézzel vágott levegősütött hasábburgonyával , szőlőparadicsommal, ananásszal és mustáros pikalilivel tálalva'),
(29, 'Pulled pork burger', 10, 4800, 'mustáros káposztasalátával, házi bbq-szósszal körítve, briós zsemlében, savanyúsággal és levegősütött hasábburgonyával tálalva.'),
(30, 'Házi marhahúsburger ', 10, 4000, 'szalonnával és chipotle majonézzel, mustáros káposztasalátával, paradicsommal, bébi drágakővel, savanyúsággal és levegősütött hasábburgonyával tálalva.'),
(31, '25 dkg rib eye steak', 10, 8000, 'mezei gombával, szőlőparadicsommal és kézzel vágott levegősütött hasábburgonyával tálalva'),
(32, '25 dkg szirlós steak', 10, 7550, 'mezei gombával, szőlőparadicsommal és kézzel vágott levegősütött hasábburgonyával tálalva'),
(33, '25dkg migon filé', 10, 11000, 'mezei gombával, szőlőparadicsommal és kézzel vágott levegősütött hasábburgonyával tálalva'),
(34, 'Balla úr specialitása', 10, 4000, 'mustáros püré vörösboros, kakukkfüves és hagymás mártással'),
(35, 'Francia vágott szalonnaszelet', 10, 4750, 'sült alma, fekete puding, vadgomba, perl las kéksajtos püré, borsmártás'),
(36, 'Grillezett yorkshire-i csirkemell', 10, 6500, 'köménnyel fűszerezett sült új + édesburgonya, brokkoli és sárgarépa pakora, mentás joghurt, mangó szósz, savanyított lilahagyma'),
(37, 'Thai vörös kókusz + édesburgonya', 10, 5800, 'ragacsos jázmin rizs, lapos kenyér, keleti zöldségcsíkok + 1500 ft csirke vagy király garnélarák'),
(38, 'Dupla csokoládé torta', 11, 3500, 'szeder kompót, kókuszos sorbet'),
(39, 'Mario luxus sorbetje - 2 gombóc', 11, 2200, 'prosecco + eper, kókuszdió, citrom'),
(40, 'Jammie dodger + fehér csokoládé szöszi', 11, 2750, 'málnás tejszínhab'),
(41, 'Sült szelídgesztenye torta', 11, 3000, 'mézeskalácsfagylalt, szeder'),
(42, 'Meleg fűszeres ananász + diós piskóta', 11, 3950, 'karamellmártás, rumos jégkrém, rumos mazsolafagylalt'),
(43, 'Mézeskalács, áfonya + narancsos crème brulée', 11, 2650, 'mézeskalács keksz'),
(44, 'Kinger bueno, nutella + hobnob kekszes sajttorta', 11, 4000, 'pirított mogyoró'),
(45, 'Doman du peras / sauvignon french', 12, 32500, 'Nem száraz, friss és virágos.'),
(46, 'Maison belleroche / malbec french', 12, 13500, 'Sima kellemes utórengéssel.');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `Password` varchar(30) COLLATE utf8_hungarian_ci NOT NULL,
  `Email` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `Phone` int(11) NOT NULL,
  `ZipCode` int(2) NOT NULL,
  `Address` varchar(100) COLLATE utf8_hungarian_ci NOT NULL,
  `LastName` varchar(30) COLLATE utf8_hungarian_ci NOT NULL,
  `FirstName` varchar(30) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`Password`, `Email`, `Phone`, `ZipCode`, `Address`, `LastName`, `FirstName`) VALUES
('asd123', 'asd', 123, 6900, 'asd asd', 'asd123', 'asd'),
('PINA123', 'dani@gmail.com', 2147483647, 6921, 'Szex utca 13', 'PUSSYFUCKER', 'Pussyhunter69');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`CategorieId`);
ALTER TABLE `categories` ADD FULLTEXT KEY `categorieName` (`categorieName`,`categorieDesc`);

--
-- A tábla indexei `employee_users`
--
ALTER TABLE `employee_users`
  ADD PRIMARY KEY (`id`);

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
  ADD PRIMARY KEY (`itemId`,`orderId`);

--
-- A tábla indexei `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`);

--
-- A tábla indexei `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `restaurantmenu`
--
ALTER TABLE `restaurantmenu`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_restaurantmenu_categorie` (`CategorieId`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `categories`
--
ALTER TABLE `categories`
  MODIFY `CategorieId` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT a táblához `employee_users`
--
ALTER TABLE `employee_users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `menu`
--
ALTER TABLE `menu`
  MODIFY `Id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7828;

--
-- AUTO_INCREMENT a táblához `orders`
--
ALTER TABLE `orders`
  MODIFY `orderId` int(21) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT a táblához `restaurantmenu`
--
ALTER TABLE `restaurantmenu`
  MODIFY `Id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `restaurantmenu`
--
ALTER TABLE `restaurantmenu`
  ADD CONSTRAINT `fk_restaurantmenu_categorie` FOREIGN KEY (`CategorieId`) REFERENCES `categories` (`CategorieId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
