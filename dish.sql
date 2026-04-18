-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 18, 2026 at 05:59 AM
-- Server version: 8.0.44
-- PHP Version: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dish`
--

-- --------------------------------------------------------

--
-- Table structure for table `dishes`
--

CREATE TABLE `dishes` (
  `id` int NOT NULL,
  `dish_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `dishes`
--

INSERT INTO `dishes` (`id`, `dish_name`) VALUES
(1, 'Garlic Prawns Starter '),
(2, 'Nduja Infused Pasta'),
(3, 'White Wine Garlic Prawn'),
(4, 'Nutella pizza'),
(5, 'Homemade brownie'),
(6, 'Yuzu Lobster Roll'),
(7, 'Chicken Gyoza'),
(8, 'Spicy Kimchi Beef Rib Ramen'),
(9, 'Miso Chashu Ramen'),
(10, 'Vegetarian Tofu Ramen'),
(11, 'Samosa Chaat'),
(12, 'Paneer Curry'),
(13, 'Lamb Dum Biryani'),
(14, 'Schezwan Egg Noodles'),
(15, 'Mango lassi'),
(16, 'Chicken Legs with Rice'),
(17, 'Haniid Only'),
(18, 'Beef Suqaar with Flatbread'),
(19, 'Soor with Spinach'),
(20, 'Milky Cake'),
(21, 'Mandioca Frita'),
(22, 'Virado Paulista'),
(23, 'Strogonoff'),
(24, 'Picanha'),
(25, 'Banana Com Nutella'),
(26, 'Nem Rán'),
(27, 'Bang Bang Wings'),
(28, 'Salty Chicken'),
(29, 'Chunky Phở '),
(30, 'Grilled Duck'),
(31, 'Alla Amatriciana'),
(32, 'Primavera'),
(33, 'Pasta con Carne'),
(34, 'Beef Sizzling'),
(35, 'Quattro Formaggi'),
(36, 'Langoustine Toast'),
(37, 'Seared Halibut'),
(38, 'Roasted Duck'),
(39, 'Aged Beef Striploin'),
(40, 'Chocolate Marquise'),
(41, 'Duck Spring Rolls'),
(42, 'Pork Dumplings '),
(43, 'Beef Noodle Soup'),
(44, 'Won Ton Noodle Soup'),
(45, 'Crispy Pork Rice'),
(46, 'French Onion Soup'),
(47, 'Hand Rolled Gnocchi'),
(48, '8oz John Stone Striploin'),
(49, 'Magret Duck Breast'),
(50, 'Chocolate Mousse'),
(51, 'Salt & Pepper Prawn'),
(52, 'Pork Gyoza'),
(53, 'Salmon Bento'),
(54, 'Tempura Sushi Roll'),
(55, 'Spicy Chicken Ramen'),
(56, 'Roasted Plum Tomato Soup'),
(57, 'Buffalo Milk Burrata'),
(58, 'Seafood risotto'),
(59, 'Chargrilled Half Chicken'),
(60, 'Butter Chicken Masala'),
(61, 'Rice & Bean Burrito'),
(62, 'Pulled Pork Quesadilla'),
(63, 'Chorizo Tacos'),
(64, 'Chilli con Carne'),
(65, 'Pulled Beef Nachos'),
(66, 'Crispy Squid'),
(67, 'Scotch Egg'),
(68, 'Lemon & Ricotta Ravioli'),
(69, 'Chequer Fish & Chips'),
(70, 'Irish Fillet Steak'),
(71, 'Crispy Mozzarella Sticks'),
(72, 'Crispy Calamari'),
(73, 'Tuna Panini'),
(74, 'Mushroom Risotto'),
(75, 'Italian Job Pizza'),
(76, 'Scallion Roll'),
(77, 'Gun Gun Noodles'),
(78, 'Crispy Peking Chicken'),
(79, 'Xi’an Famous Spice Bag'),
(80, 'Classic Chinese Curry'),
(81, 'Costela Beef Ribs Croquette'),
(82, 'Halloumi Cheese Sandwich'),
(83, 'Vaca Atolada'),
(84, 'Frango Chicken'),
(85, 'Barrigade Porco'),
(86, 'Chicken Wings'),
(87, 'Fat Kitten Ribeye Burger'),
(88, 'Grilled Chicken Sandwich'),
(89, 'KFC Goujons'),
(90, 'Fish & Chips'),
(91, 'Thai Satay Chicken Skewers'),
(92, 'Duck Spring Roll'),
(93, 'Thai Green Curry'),
(94, 'Baked Pork Ribs'),
(95, 'Pad See Ew'),
(96, 'Squid Tempura'),
(97, 'Age Tofu'),
(98, 'Chicken Gyoza'),
(99, 'Sashimi Fresh Salmon'),
(100, 'Spider Sushi Bento'),
(101, 'Fritto Siciliano'),
(102, 'Calamari Fritti'),
(103, 'Penne Salsiccia E Ndujia'),
(104, 'Orecchiette Norma'),
(105, 'Affogato Al Caffe'),
(106, 'Chilli Scallops'),
(107, 'Kurkurri Machali'),
(108, 'Chargrilled Sea Bass'),
(109, 'Palak Gosht'),
(110, 'Chef ’s Special Cheese Cake'),
(111, 'Pressed Vegetable Terrine'),
(112, 'Potato & Parsley Veloute'),
(113, 'Spiced Butternut Squash'),
(114, 'Monkfish'),
(115, 'Banana & Sea Salt Chocolate Tart'),
(116, 'Arancini'),
(117, 'Bruschetta'),
(118, 'Arrabiatta Pappardelle'),
(119, 'Seabass & Shrimp'),
(120, 'Tiramisu'),
(121, 'Nachos'),
(122, 'Corn Ribs'),
(123, 'BBQ Pork Belly'),
(124, 'Beef Birria'),
(125, 'Sticky Toffee Spring Roll'),
(126, 'Homemade Granola'),
(127, 'Traditional Breakfast'),
(128, 'Eggs Royale'),
(129, 'American Style Pancakes'),
(130, 'Beer Battered Fish & Chips'),
(131, 'Morcilla Sausage'),
(132, 'Burrata Di Bufala'),
(133, 'Gnocchetti Sardi'),
(134, 'Classic Ragu'),
(135, 'Dark Choc Tart'),
(136, 'Spicy King Prawns'),
(137, 'Andarl Farm Pork Chop'),
(138, '10oz Irish Dry-Aged Angus Ribeye'),
(139, 'Chocolate & Praline Opera Cake'),
(140, 'Pistachio & Coconut Sponge'),
(141, 'Amritsari Paneer Tikka'),
(142, 'Old Delhi Tandoori Chicken'),
(143, 'Molly’s Duck Curry'),
(144, 'Chettinad Curry'),
(145, 'Ras Malai Cake'),
(146, 'Mushroom Orzo'),
(147, 'Fire-Grilled Gambas'),
(148, 'Iberico Pork Flank'),
(149, 'Fire-Grilled Gambas'),
(150, 'Seafood Paella'),
(151, 'Coolea, Onion & Thyme Tart'),
(152, 'Blue Fin Tuna'),
(153, 'Irish Wagyu Beef'),
(154, 'Duck Boudai'),
(155, 'Croissant Pudding'),
(156, 'Crispy Pork Belly'),
(157, 'Pan Fried King Scallops'),
(158, 'Chefs Daily Special'),
(159, 'Slaney Valley Rump of Lamb'),
(160, 'Slow-Cooked Short Rib of Beef'),
(161, 'Chicken Katsu Curry'),
(162, 'Wonton Ramen'),
(163, 'Teriyaki Soba'),
(164, 'Dragon Roll'),
(165, 'Tonkatsu Pork Donburi'),
(166, 'Diavola Pizza'),
(167, 'Maia Pizza'),
(168, 'Parmigiana Pizza'),
(169, 'Toto Ruby Pizza'),
(170, 'Warm Banana & Walnut Bread'),
(171, 'Bashi Sticky Wings'),
(172, 'Golgappa'),
(173, 'Taza Tandoori Chicken'),
(174, 'Dumba Champ'),
(175, 'Kulfi & Vermicelli'),
(176, 'Cozze Marinara'),
(177, 'Parmigiana Di Melanzane'),
(178, 'Brasato Di Manzo'),
(179, 'Fettuccine Pollo E Funghi'),
(180, 'Upside Down Cheesecake'),
(181, 'Garlic Pizza Bread'),
(182, 'Buffalo Wings'),
(183, 'Special Cajun Chicken Pizza'),
(184, 'Lasagna'),
(185, 'Homemade Panna Cotta'),
(186, 'Hoisin Duck Spring Rolls'),
(187, 'Salt and Chilli Chicken'),
(188, 'Yellow Curry'),
(189, 'Vegetable Pad Thai'),
(190, 'Sesame Chicken Fried Rice'),
(191, 'Little Andie Box'),
(192, 'Tofu with Mixed Veg'),
(193, 'Chicken & Veg Dumplings'),
(194, 'Shredded Chicken Spice Bag'),
(195, 'King Prawn with Garlic'),
(196, 'Mexican Chicken Quesadilla'),
(197, 'Roast of the Day'),
(198, 'Shepherds Pie'),
(199, 'Tower Burger'),
(200, 'Open Sirloin Steak Sandwich'),
(201, 'Batak Roll'),
(202, 'Lahori Fish'),
(203, 'Chilli Masala Gosht'),
(204, 'Began Aloo Gosht'),
(205, 'Chana Chaat Masala'),
(206, 'Peppé Pizza'),
(207, 'Luscious Bushes Pizza'),
(208, 'The Garlic Gobbler Pizza'),
(209, 'Wild Goatie Pizza'),
(210, 'Margherita Pizza'),
(211, 'Traditional Flatbread'),
(212, 'Halloumi Plate'),
(213, 'Spiced Lamb Koftas'),
(214, 'Salt-Baked Celeriac'),
(215, 'Chicken Skewer'),
(216, 'Crispy Smoked Bacon Croquette'),
(217, 'Caramelis Leek & Feta Tartlet '),
(218, 'John Stone Beef'),
(219, 'Brown Butter Basted Hake Fillet'),
(220, 'Apple Tart Tatin'),
(221, 'Warm Leek & Wild Mushroom Tart'),
(222, 'Warm Roast Butternut Squash Salad'),
(223, 'Ale Battered Haddock'),
(224, 'Char Grilled Irish 10oz Ribeye'),
(225, 'Pan Fried Fillet of Seabream');

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `dish_id` int UNSIGNED NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `uploaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `restaurants`
--

CREATE TABLE `restaurants` (
  `id` int UNSIGNED NOT NULL,
  `restaurant_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `restaurant_location` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `restaurant_price` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `restaurant_cuisine` varchar(50) DEFAULT NULL,
  `restaurant_address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `restaurants`
--

INSERT INTO `restaurants` (`id`, `restaurant_name`, `restaurant_location`, `restaurant_price`, `created_at`, `restaurant_cuisine`, `restaurant_address`) VALUES
(1, 'One Society', 'Dublin 1', '€', '2026-03-24 17:31:08', 'Brunch', '1 Gardiner Street Lower, Mountjoy, Dublin 1, D01 P9Y1'),
(2, 'Day n Night', 'Dublin 1', '€', '2026-03-24 17:50:19', 'Korean', '18 Denmark Street Great, Rotunda, Dublin, D01 YP86'),
(3, 'Hyderabadi Kitchen Parnell Street', 'Dublin 1', '€€', '2026-03-24 17:54:37', 'Indian', '143 Parnell St, Rotunda, Dublin, D01 R9P7'),
(4, 'Le Gazin Restaurant', 'Dublin 1', '€', '2026-03-24 18:07:28', 'African', '60 Dorset Street Upper, Rotunda, Dublin 1, D01 K6W6'),
(5, 'Tucano Restaurant', 'Dublin 1', '€', '2026-03-24 18:20:45', 'Brazilian', '4 Talbot St, North City, Dublin 1, D01 X8F8'),
(6, 'Hanoi Hanoi', 'Dublin 1', '€€', '2026-03-24 18:23:35', 'Vietnamese', '101 Capel St, Northside, Dublin 1, D01 H2X5'),
(7, 'Paesano', 'Dublin 1', '€', '2026-03-24 18:25:12', 'Italian', '9a Parnell St, North City, Dublin, D01 C4H0'),
(8, 'Mr Fox', 'Dublin 1', '€€€', '2026-03-24 18:29:32', 'Irish', '38 Parnell Sq. West, Dublin 1'),
(9, 'Taste of Hong Kong', 'Dublin 1', '€', '2026-03-24 18:42:40', 'Chinese', 'Unit 77, iLac Shopping Centre, Moore St, North City, Dublin 1'),
(10, 'Tand Dawson Street', 'Dublin 2', '€', '2026-03-25 10:12:42', 'Middle Eastern', '23C Dawson St, Dublin 2'),
(11, 'La Maison', 'Dublin 2', '€€', '2026-03-25 10:34:55', 'French', '15 Castle Market, Dublin 2, D02 C656'),
(12, 'Tomi House Asian Restaurant', 'Dublin 2', '€€', '2026-03-25 10:45:17', 'Japanese', '13A Merrion Row, Dublin 2, D02 V962'),
(13, 'WILDE Restaurant', 'Dublin 2', '€€€', '2026-03-25 10:50:49', 'Irish', 'Harry St, Dublin 2, D02 CH66'),
(14, 'Mama\'s Revenge', 'Dublin 2', '€', '2026-03-25 10:56:39', 'Mexican', '17 Leinster St S, Dublin, D02 KR58'),
(15, 'Chequer Lane by Jamie Oliver', 'Dublin 2', '€€', '2026-03-25 11:38:24', 'Irish', '27 Exchequer St, Dublin, D02 A527'),
(16, 'Little Pyg', 'Dublin 2', '€€', '2026-03-25 11:41:18', 'Italian', '59 William St S, Dublin 2, D02 E521'),
(17, 'Xian Street Food Dublin', 'Dublin 2', '€', '2026-03-25 12:00:32', 'Chinese', '28 Anne St S, Dublin, D02 DX39'),
(18, 'BAH33 Authentic Gaucho BBQ', 'Dublin 2', '€€', '2026-03-25 12:07:40', 'Brazilian', 'Unit 3-5, Royal Hibernian Way, Dawson St, Dublin 2, D02 X272'),
(19, 'Harry Byrnes Pub', 'Dublin 3', '€', '2026-03-25 12:15:03', 'Irish', '107 Howth Rd, Clontarf West, Dublin 3, D03 KN97'),
(20, 'Chob Thai Restaurant', 'Dublin 3', '€', '2026-03-25 12:18:54', 'Thai', '1 Vernon Ave, Clontarf, Dublin 3, D03 N773'),
(21, 'Senbazuru Izakaya', 'Dublin 3', '€€', '2026-04-17 22:35:41', 'Japanese', '12 Marino Mart, Fairview, Dublin 3, D03 DD85'),
(22, 'Da Mimmo', 'Dublin 3', '€€', '2026-04-17 22:37:54', 'Italian', '148 N Strand Rd, North Wall, Dublin, D03 FK52'),
(23, 'Kinara', 'Dublin 3', '€€€', '2026-04-17 22:38:52', 'Pakistani', '318 Clontarf Rd, Clontarf East, Dublin 3, D03 HD91'),
(24, 'Fahrenheit Restaurant', 'Dublin 3', '€€', '2026-04-17 22:39:24', 'Irish', 'Clontarf Castle, Castle Ave, Clontarf East, Dublin 3, D03 W5N0'),
(25, 'The Upper Deck, Clontarf', 'Dublin 3', '€€', '2026-04-17 22:40:01', 'Italian', 'Above The Yacht Pub, 73 Clontarf Rd, Clontarf, Dublin 3, D03 EP93'),
(26, 'Chubbys', 'Dublin 3', '€', '2026-04-17 22:41:44', 'Mexican', 'Rere of 46, Clontarf Rd, Clontarf, Dublin 3, D03 A5X2'),
(27, 'Casa Clontarf', 'Dublin 3', '€', '2026-04-17 22:42:10', 'Brunch', '55 Clontarf Rd, Clontarf West, Dublin, D03 C2X0'),
(28, 'Mae Restaurant Dublin', 'Dublin 4', '€€€', '2026-04-17 22:45:11', 'Irish', '53 Shelbourne Rd, Ballsbridge, Dublin 4, D04 XC66'),
(29, 'CRUDO restaurant', 'Dublin 4', '€€', '2026-04-17 22:46:29', 'Italian', '11 Seafort Ave, Sandymount Rd, Dublin, 4'),
(30, 'The Cow Pub & Kitchen', 'Dublin 4', '€€€', '2026-04-17 22:48:35', 'Irish', '2 Shelbourne Rd, Ballsbridge, Dublin 4, D04 T102'),
(31, 'Kiisaan Restaurant', 'Dublin 4', '€€', '2026-04-17 22:50:09', 'Indian', '174 Pembroke Rd, Ballsbridge, Dublin, D04 N4X5'),
(32, 'The Orange Goat - Ballsbridge', 'Dublin 4', '€€', '2026-04-17 22:50:59', 'Spanish', '50 Serpentine Ave, Dublin 4'),
(33, 'Forest Avenue', 'Dublin 4', '€€€', '2026-04-17 22:51:34', 'Irish', '8 Sussex Terrace, Sussex Rd, Dublin 4, D04 C7F4'),
(34, 'The Little Kitchen', 'Dublin 4', '€€', '2026-04-17 22:52:03', 'Irish', '129 Leeson Street Upper, Dublin 4, D04 YX03'),
(35, 'Zakura Izakaya', 'Dublin 4', '€€', '2026-04-17 22:52:28', 'Japanese', '7 Baggot Street Upper, Dublin 4, D04 K7H1'),
(36, 'SASHA’S Pizzeria', 'Dublin 4', '€', '2026-04-17 22:53:11', 'Italian', '47 Shelbourne Rd, Ballsbridge, Dublin 4, D04 X389'),
(37, 'Taza Artane', 'Dublin 5', '€€', '2026-04-17 22:57:37', 'Pakistani', '2 Ardcollum Ave, Artane, Dublin 5, D05 XW88'),
(38, 'Mulino Italian Restaurant', 'Dublin 5', '€€', '2026-04-17 22:58:01', 'Italian', '23 Watermill Rd, Raheny, Dublin, D05 W322'),
(39, 'McHughs of Raheny', 'Dublin 5', '€€', '2026-04-17 22:58:27', 'Irish', '59 St Assam\'s Park, Raheny, Dublin, 5'),
(40, 'Impasto 48', 'Dublin 5', '€', '2026-04-17 22:58:53', 'Italian', '55 Kilbarrack Rd, Raheny - Greendale, Dublin, D05 H6Y7'),
(41, 'Saaep Thai', 'Dublin 5', '€', '2026-04-17 22:59:17', 'Thai', 'Unit 4, Butterly Business Park, Beaumont, Dublin 5, D05 FE06'),
(42, 'Jazz Chinese Restaurant', 'Dublin 5', '€', '2026-04-17 22:59:41', 'Chinese', 'Beechpark Ave, Kilmore, Dublin 5, D05 X6N4'),
(43, 'The Manhattan-Beer & Food Co', 'Dublin 5', '€', '2026-04-17 23:00:08', 'Irish', '3-5 Station Rd, Raheny St. Assam, Dublin 5, D05 T9K8'),
(44, 'The Mint Cottage', 'Dublin 5', '€€', '2026-04-17 23:00:37', 'Pakistani', '2A Main St, Raheny - St. Assam, Dublin 5, D05 K3K6'),
(45, 'Ceantar Wood Fired Pizza', 'Dublin 5', '€', '2026-04-17 23:01:28', 'Italian', '73rd Raheny Scout Group, Howth Rd, Raheny, Dublin, D05 HA26');

-- --------------------------------------------------------

--
-- Table structure for table `restaurants_dishes`
--

CREATE TABLE `restaurants_dishes` (
  `id` int UNSIGNED NOT NULL,
  `restaurant_id` int UNSIGNED NOT NULL,
  `dishes_id` int DEFAULT NULL,
  `course_type` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `restaurants_dishes`
--

INSERT INTO `restaurants_dishes` (`id`, `restaurant_id`, `dishes_id`, `course_type`, `description`) VALUES
(1, 1, 1, 'Starter', NULL),
(2, 1, 2, 'Main', NULL),
(3, 1, 3, 'Main', NULL),
(4, 1, 4, 'Dessert', NULL),
(5, 1, 5, 'Dessert', NULL),
(6, 2, 6, 'Starter', NULL),
(7, 2, 7, 'Starter', NULL),
(8, 2, 8, 'Main', NULL),
(9, 2, 9, 'Main', NULL),
(10, 2, 10, 'Main', NULL),
(11, 3, 11, 'Starter', NULL),
(12, 3, 12, 'Main', NULL),
(13, 3, 13, 'Main', NULL),
(14, 3, 14, 'Main', NULL),
(15, 3, 15, 'Dessert', NULL),
(16, 4, 16, 'Main', NULL),
(17, 4, 17, 'Main', NULL),
(18, 4, 18, 'Main', NULL),
(19, 4, 19, 'Main', NULL),
(20, 4, 20, 'Dessert', NULL),
(21, 5, 21, 'Starter', NULL),
(22, 5, 22, 'Main', NULL),
(23, 5, 23, 'Main', NULL),
(24, 5, 24, 'Main', NULL),
(25, 5, 25, 'Dessert', NULL),
(26, 6, 26, 'Starter', NULL),
(27, 6, 27, 'Starter', NULL),
(28, 6, 28, 'Starter', NULL),
(29, 6, 29, 'Main', NULL),
(30, 6, 30, 'Main', NULL),
(31, 7, 31, 'Main', NULL),
(32, 7, 32, 'Main', NULL),
(33, 7, 33, 'Main', NULL),
(34, 7, 34, 'Main', NULL),
(35, 7, 35, 'Main', NULL),
(36, 8, 36, 'Starter', NULL),
(37, 8, 37, 'Main', NULL),
(38, 8, 38, 'Main', NULL),
(39, 8, 39, 'Main', NULL),
(40, 8, 40, 'Dessert', NULL),
(41, 9, 41, 'Starter', NULL),
(42, 9, 42, 'Starter', NULL),
(43, 9, 43, 'Main', NULL),
(44, 9, 44, 'Main', NULL),
(45, 9, 45, 'Main', NULL),
(46, 11, 46, 'Starter', NULL),
(47, 11, 47, 'Main', NULL),
(48, 11, 48, 'Main', NULL),
(49, 11, 49, 'Main', NULL),
(50, 11, 50, 'Dessert', NULL),
(51, 12, 51, 'Starter', NULL),
(52, 12, 52, 'Starter', NULL),
(53, 12, 53, 'Main', NULL),
(54, 12, 54, 'Main', NULL),
(55, 12, 55, 'Dessert', NULL),
(56, 13, 56, 'Starter', NULL),
(57, 13, 57, 'Starter', NULL),
(58, 13, 58, 'Main', NULL),
(59, 13, 59, 'Main', NULL),
(60, 13, 60, 'Main', NULL),
(61, 14, 61, 'Main', NULL),
(62, 14, 62, 'Main', NULL),
(63, 14, 63, 'Main', NULL),
(64, 14, 64, 'Main', NULL),
(65, 14, 65, 'Main', NULL),
(66, 15, 66, 'Starter', NULL),
(67, 15, 67, 'Starter', NULL),
(68, 15, 68, 'Main', NULL),
(69, 15, 69, 'Main', NULL),
(70, 15, 70, 'Main', NULL),
(71, 16, 71, 'Starter', NULL),
(72, 16, 72, 'Starter', NULL),
(73, 16, 73, 'Main', NULL),
(74, 16, 74, 'Main', NULL),
(75, 16, 75, 'Main', NULL),
(76, 17, 76, 'Starter', NULL),
(77, 17, 77, 'Main', NULL),
(78, 17, 78, 'Main', NULL),
(79, 17, 79, 'Main', NULL),
(80, 17, 80, 'Main', NULL),
(81, 18, 81, 'Starter', NULL),
(82, 18, 82, 'Main', NULL),
(83, 18, 83, 'Main', NULL),
(84, 18, 84, 'Main', NULL),
(85, 18, 85, 'Main', NULL),
(86, 19, 86, 'Main', NULL),
(87, 19, 87, 'Main', NULL),
(88, 19, 88, 'Main', NULL),
(89, 19, 89, 'Main', NULL),
(90, 19, 90, 'Main', NULL),
(91, 20, 91, 'Starter', NULL),
(92, 20, 92, 'Starter', NULL),
(93, 20, 93, 'Main', NULL),
(94, 20, 94, 'Main', NULL),
(95, 20, 95, 'Main', NULL),
(96, 21, 96, 'Starter', NULL),
(97, 21, 97, 'Starter', NULL),
(98, 21, 98, 'Starter', NULL),
(99, 21, 99, 'Main', NULL),
(100, 21, 100, 'Main', NULL),
(101, 22, 101, 'Starter', NULL),
(102, 22, 102, 'Starter', NULL),
(103, 22, 103, 'Main', NULL),
(104, 22, 104, 'Main', NULL),
(105, 22, 105, 'Dessert', NULL),
(106, 23, 106, 'Starter', NULL),
(107, 23, 107, 'Starter', NULL),
(108, 23, 108, 'Main', NULL),
(109, 23, 109, 'Main', NULL),
(110, 23, 110, 'Dessert', NULL),
(111, 24, 111, 'Starter', NULL),
(112, 24, 112, 'Starter', NULL),
(113, 24, 113, 'Main', NULL),
(114, 24, 114, 'Main', NULL),
(115, 24, 115, 'Dessert', NULL),
(116, 25, 116, 'Starter', NULL),
(117, 25, 117, 'Starter', NULL),
(118, 25, 118, 'Main', NULL),
(119, 25, 119, 'Main', NULL),
(120, 25, 120, 'Dessert', NULL),
(121, 26, 121, 'Starter', NULL),
(122, 26, 122, 'Starter', NULL),
(123, 26, 123, 'Main', NULL),
(124, 26, 124, 'Main', NULL),
(125, 26, 125, 'Dessert', NULL),
(126, 27, 126, 'Main', NULL),
(127, 27, 127, 'Main', NULL),
(128, 27, 128, 'Main', NULL),
(129, 27, 129, 'Main', NULL),
(130, 27, 130, 'Main', NULL),
(131, 29, 131, 'Starter', NULL),
(132, 29, 132, 'Starter', NULL),
(133, 29, 133, 'Main', NULL),
(134, 29, 134, 'Main', NULL),
(135, 29, 135, 'Dessert', NULL),
(136, 30, 136, 'Starter', NULL),
(137, 30, 137, 'Main', NULL),
(138, 30, 138, 'Main', NULL),
(139, 30, 139, 'Dessert', NULL),
(140, 30, 140, 'Dessert', NULL),
(141, 31, 141, 'Starter', NULL),
(142, 31, 142, 'Starter', NULL),
(143, 31, 143, 'Main', NULL),
(144, 31, 144, 'Main', NULL),
(145, 31, 145, 'Dessert', NULL),
(146, 32, 146, 'Starter', NULL),
(147, 32, 147, 'Starter', NULL),
(148, 32, 148, 'Main', NULL),
(149, 32, 149, 'Dessert', NULL),
(150, 32, 150, 'Main', NULL),
(151, 33, 151, 'Starter', NULL),
(152, 33, 152, 'Starter', NULL),
(153, 33, 153, 'Main', NULL),
(154, 33, 154, 'Main', NULL),
(155, 33, 155, 'Dessert', NULL),
(156, 34, 156, 'Starter', NULL),
(157, 34, 157, 'Starter', NULL),
(158, 34, 158, 'Main', NULL),
(159, 34, 159, 'Main', NULL),
(160, 34, 160, 'Main', NULL),
(161, 35, 161, 'Main', NULL),
(162, 35, 162, 'Main', NULL),
(163, 35, 163, 'Main', NULL),
(164, 35, 164, 'Main', NULL),
(165, 35, 165, 'Main', NULL),
(166, 36, 166, 'Main', NULL),
(167, 36, 167, 'Main', NULL),
(168, 36, 168, 'Main', NULL),
(169, 36, 169, 'Main', NULL),
(170, 36, 170, 'Dessert', NULL),
(171, 37, 171, 'Starter', NULL),
(172, 37, 172, 'Starter', NULL),
(173, 37, 173, 'Main', NULL),
(174, 37, 174, 'Main', NULL),
(175, 37, 175, 'Dessert', NULL),
(176, 38, 176, 'Starter', NULL),
(177, 38, 177, 'Starter', NULL),
(178, 38, 178, 'Main', NULL),
(179, 38, 179, 'Main', NULL),
(180, 38, 180, 'Dessert', NULL),
(181, 40, 181, 'Starter', NULL),
(182, 40, 182, 'Starter', NULL),
(183, 40, 183, 'Main', NULL),
(184, 40, 184, 'Main', NULL),
(185, 40, 185, 'Dessert', NULL),
(186, 41, 186, 'Starter', NULL),
(187, 41, 187, 'Starter', NULL),
(188, 41, 188, 'Main', NULL),
(189, 41, 189, 'Main', NULL),
(190, 41, 190, 'Main', NULL),
(191, 42, 191, 'Starter', NULL),
(192, 42, 192, 'Main', NULL),
(193, 42, 193, 'Main', NULL),
(194, 42, 194, 'Main', NULL),
(195, 42, 195, 'Main', NULL),
(196, 43, 196, 'Starter', NULL),
(197, 43, 197, 'Main', NULL),
(198, 43, 198, 'Main', NULL),
(199, 43, 199, 'Main', NULL),
(200, 43, 200, 'Main', NULL),
(201, 44, 201, 'Starter', NULL),
(202, 44, 202, 'Starter', NULL),
(203, 44, 203, 'Main', NULL),
(204, 44, 204, 'Main', NULL),
(205, 44, 205, 'Main', NULL),
(206, 45, 206, 'Main', NULL),
(207, 45, 207, 'Main', NULL),
(208, 45, 208, 'Main', NULL),
(209, 45, 209, 'Main', NULL),
(210, 45, 210, 'Main', NULL),
(221, 10, 211, 'Main', NULL),
(222, 10, 212, 'Main', NULL),
(223, 10, 213, 'Main', NULL),
(224, 10, 214, 'Main', NULL),
(225, 10, 215, 'Main', NULL),
(226, 28, 216, 'Starter', NULL),
(227, 28, 217, 'Starter', NULL),
(228, 28, 218, 'Main', NULL),
(229, 28, 219, 'Main', NULL),
(230, 28, 220, 'Dessert', NULL),
(231, 39, 221, 'Starter', NULL),
(232, 39, 222, 'Starter', NULL),
(233, 39, 223, 'Main', NULL),
(234, 39, 224, 'Main', NULL),
(235, 39, 225, 'Dessert', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `dish_id` int UNSIGNED NOT NULL,
  `review_rating` tinyint UNSIGNED NOT NULL,
  `dish_review` text
) ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int UNSIGNED NOT NULL,
  `username` varchar(50) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_xp` int UNSIGNED DEFAULT '0',
  `user_level` int UNSIGNED DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `user_email`, `user_password`, `user_xp`, `user_level`, `created_at`) VALUES
(1, 'TestUser', 'testuser@gmail.com', 'password', 0, 1, '2026-03-28 21:18:17');

-- --------------------------------------------------------

--
-- Table structure for table `user_dishes`
--

CREATE TABLE `user_dishes` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `dish_id` int UNSIGNED NOT NULL,
  `dish_status` enum('assigned','completed') DEFAULT 'assigned',
  `assigned_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `completed_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dishes`
--
ALTER TABLE `dishes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `dish_id` (`dish_id`);

--
-- Indexes for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `restaurants_dishes`
--
ALTER TABLE `restaurants_dishes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `restaurant_id` (`restaurant_id`),
  ADD KEY `fk_restaurant_dishes_dishes` (`dishes_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_dish_review` (`user_id`,`dish_id`),
  ADD KEY `dish_id` (`dish_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`user_email`),
  ADD UNIQUE KEY `user_email` (`user_email`);

--
-- Indexes for table `user_dishes`
--
ALTER TABLE `user_dishes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_dish_assignment` (`user_id`,`dish_id`) USING BTREE,
  ADD KEY `dish_id` (`dish_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dishes`
--
ALTER TABLE `dishes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=226;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `restaurants_dishes`
--
ALTER TABLE `restaurants_dishes`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=236;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_dishes`
--
ALTER TABLE `user_dishes`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `photos_ibfk_2` FOREIGN KEY (`dish_id`) REFERENCES `restaurants_dishes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `restaurants_dishes`
--
ALTER TABLE `restaurants_dishes`
  ADD CONSTRAINT `fk_restaurant_dishes_dishes` FOREIGN KEY (`dishes_id`) REFERENCES `dishes` (`id`),
  ADD CONSTRAINT `restaurants_dishes_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`dish_id`) REFERENCES `restaurants_dishes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_dishes`
--
ALTER TABLE `user_dishes`
  ADD CONSTRAINT `user_dishes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_dishes_ibfk_2` FOREIGN KEY (`dish_id`) REFERENCES `restaurants_dishes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
