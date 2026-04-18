-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 18, 2026 at 06:24 AM
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
(225, 'Pan Fried Fillet of Seabream'),
(226, 'Straccetti'),
(227, 'Vesuvio'),
(228, 'Linguine Frutti di Mare'),
(229, 'Calamari'),
(230, 'Parmigiana'),
(231, 'Chicken Yakitori'),
(232, 'Vegetable Gyoza'),
(233, 'Hoisin Duck Futomaki'),
(234, 'Pork Belly Donburi'),
(235, 'Princess Cake'),
(236, 'Wild Mushroom, Baby Spinach and Ricotta Tart'),
(237, 'Pan fried Irish Sea Trout'),
(238, 'Roast Loin of Irish Venison'),
(239, 'Cauliflower and Chickpea Korma'),
(240, 'Irish Crab Salad'),
(241, 'CHOWK ALOO KI TIKKI'),
(242, 'BOMBAY CHAAT'),
(243, 'HIMACHALI SAAG GOSHT'),
(244, 'LAMB BIRYAN'),
(245, 'Porche Pea'),
(246, 'Tonka bean panna cotta'),
(247, 'Chorizo & espelette arancini'),
(248, 'Cáis na Tíre agnolotti'),
(249, 'Goat’s cheese tartle'),
(250, 'Dry aged bone in striploin'),
(251, 'Lamb Kibbeh'),
(252, 'Baba Ghanoush'),
(253, 'Lamb Qidreh'),
(254, 'Maqluba'),
(255, 'Knafeh'),
(256, 'Seasonal Seafood Chowder'),
(257, 'Sweetcorn Arancini'),
(258, 'Spicy Shellfish Cioppino'),
(259, 'Spiced 1/2 Chicken Agrodolce'),
(260, 'Wicklow Lamb Ragu'),
(261, 'Ham Hock and Brie'),
(262, 'The Patty Melt'),
(263, 'Raspberry & Almond Sponge Cake'),
(264, 'The Lark Breakfast'),
(265, 'French Toast'),
(266, 'Crispy Golden Fried King Prawn Wontons'),
(267, 'Barbecue Roasted Duck'),
(268, 'Honey-Glazed Pork Char Siu'),
(269, 'Golden Crispy Silken Tofu'),
(270, 'Mapo Tofu'),
(271, 'seafood pancake'),
(272, 'Ssambap'),
(273, 'KIMCHI stew'),
(274, 'Stone cauldron beef'),
(275, 'Padak'),
(276, 'Crocchette di bollito'),
(277, 'Napoletan grilled friggitielli peppers'),
(278, 'Balanzoni'),
(279, 'Pici al ragu di cervo'),
(280, 'Bignè'),
(281, 'Burrata & Parma Ham'),
(282, 'Amatriciana'),
(283, 'Fennel Sausage Ragu'),
(284, 'House Chocolate Mousse'),
(285, 'Tiramisu'),
(286, 'Korean Fries'),
(287, 'Buffalo Wings'),
(288, 'Original Wrap'),
(289, 'Baked Cookie Dough w/ Ice Cream'),
(290, 'Smoked Stack burger'),
(291, 'Meat In a Box | Beef'),
(292, 'Meat in a Box | Pork'),
(293, 'Meat in Bread | Chicken'),
(294, 'Burger'),
(295, 'Mix Board for One'),
(296, 'Garlic Ciabatta Loaf'),
(297, 'Ale Battered Fish & Chips'),
(298, 'Poached Pear & Cashel Blue Cheese Salad'),
(299, 'Confit Duck Leg'),
(300, 'Vanilla Creme Brûlée'),
(301, 'Onion Bhaji'),
(302, 'Gunpowder Aloo Chat'),
(303, 'Andhra Chicken'),
(304, 'Vegetarian Biryani'),
(305, 'Mango Lassi'),
(306, 'Baba Ganouj'),
(307, 'Hummus'),
(308, 'Lamb Moussaka'),
(309, 'Molokhia with Chicken'),
(310, 'Banoffee Pie'),
(311, 'Mushroom Toast'),
(312, 'S’more Croissant French Toast'),
(313, 'Etherson’s pork chop'),
(314, 'Scallops'),
(315, 'Pistachio dacquoise'),
(316, 'Avo Toast'),
(317, 'Eggs Benedict'),
(318, 'Cheddar Corn Fritters'),
(319, 'Pastrami Sandwich'),
(320, 'Berry and cream pancakes'),
(321, 'Flan'),
(322, 'Chicharron Quesadilla'),
(323, 'Requeson Gordita'),
(324, 'Suadero Taco'),
(325, 'Sopes'),
(326, 'ARANCINI'),
(327, 'CAPRESE'),
(328, 'POLLO CREMA FUNGHI'),
(329, 'LASAGNA'),
(330, 'AFFOGATO'),
(331, 'Roast Bone Marrow'),
(332, 'Shitake Mushroom Parfait'),
(333, 'Iberico Pork Schnitzel'),
(334, 'Barbecued Seabream'),
(335, 'Lavender Panna Cotta'),
(336, 'Irish Breakfast'),
(337, 'Omlette'),
(338, 'Chicken Goujon Roll'),
(339, 'Breakfast Roll'),
(340, 'Toasted Sandwiches'),
(341, 'Goats Cheese & Spinach Samosa'),
(342, 'Padron Peppers'),
(343, 'Like a Cubano'),
(344, 'Mediterranean Stuffed Aubergine'),
(345, 'Apple Cuca'),
(346, 'Gobi 65'),
(347, 'Chicken Fennel Tikka'),
(348, 'Lamb Kesari'),
(349, 'Shalgam Goat'),
(350, 'Saag Paneer'),
(351, 'Ravioli Aurora'),
(352, 'Honey and Peach Duck'),
(353, 'Garlic Bread with Cheese'),
(354, 'Prosciutto di Parma'),
(355, 'Tiramisu'),
(356, 'Onion Rings'),
(357, 'Frank\'s Hot Wings'),
(358, 'Beef & Guinness Stew'),
(359, 'Pork & Leek Sausage'),
(360, 'White Chocolate Ferrero Rocher Cheesecake'),
(361, 'Pulled Pork Sandwich'),
(362, 'Bean Burrito'),
(363, 'Chorizo Toastie'),
(364, 'Creamy Tomato Pasta'),
(365, 'Salad'),
(366, 'Roasted beet dip'),
(367, 'prawn cocktail'),
(368, 'Crispy fried chicken burger'),
(369, 'Pea & burnt lemon risotto'),
(370, 'Blood orange tart'),
(371, 'Yakitori'),
(372, 'Tako Yaki'),
(373, 'Fillet Beef Katsu Curry'),
(374, 'House Special Green Pepper Black Bean Sauce'),
(375, 'Mint Trufito'),
(376, 'Crispy Duck Spring Rolls'),
(377, 'Wild Mushroom Bruschetta'),
(378, 'Messy BBQ Brisket Burger'),
(379, 'Chicken Supreme'),
(380, 'Sticky Toffee Cheesecake'),
(381, 'Chicken Kara-age'),
(382, 'Vegetable Dumpling'),
(383, 'Singapore Noodle'),
(384, 'Bangbang Crispy Chicken'),
(385, 'Mini Nordica'),
(386, 'Ice Cream Sambos'),
(387, 'Boa Buns'),
(388, 'Thai Salt & Chilli Squid'),
(389, 'Choo Chee Curry'),
(390, 'Pad Thai'),
(391, 'Parma Ham & Rocket Pizza'),
(392, 'The Italian'),
(393, 'Raspberry Meringue Roulade'),
(394, 'House Salad'),
(395, 'Roasted Half Chicken & French Fries'),
(396, 'Spice Bag'),
(397, 'Vegan Burger'),
(398, 'Milkshakes'),
(399, 'Chicken Wings'),
(400, 'Cheese Burger'),
(401, 'Malabi'),
(402, 'Shawarma Pita'),
(403, 'Kebabella Hummus'),
(404, 'Moroccan Fish'),
(405, 'Arayes'),
(406, 'Jollof Rice'),
(407, 'Special Fried Rice in Puffed Spaghetti'),
(408, 'Tilapia Fish Platter'),
(409, 'White Rice with Stew'),
(410, 'Chicken, Plantain & Beans w/ White Rice'),
(411, 'Philly Steak'),
(412, 'Choice of Omelettes'),
(413, 'Club Bagel'),
(414, 'Nutella & Banana Pancakes'),
(415, 'GF Chicken Salad Sandwich'),
(416, 'Yuk Sung Lettuce Wrap'),
(417, 'Chicken Cheese Rolls'),
(418, 'Beef Black Bean Sauce Chow Mein'),
(419, 'Singapore Fried Rice'),
(420, 'Duck Wu Dong'),
(421, 'Hawaiian Pizza'),
(422, 'Calzone Combo'),
(423, 'Fusilli Alla Carbonara'),
(424, 'Honeycomb Ice Cream'),
(425, 'Romana Pizza'),
(426, 'Spicy Prawn Rolls'),
(427, 'Satay Chicken Skewers'),
(428, 'Thai Chilli Chicken'),
(429, 'Thai Shredded Chilli Beef'),
(430, 'Warm Apple Pie+Honey'),
(431, 'Hot Honey Pepperoni'),
(432, 'BBQ Apache Chicken & Bacon'),
(433, 'Korean BBQ Buffalo Wings'),
(434, 'Waffle'),
(435, 'Pistachio Donut'),
(436, 'Baklava'),
(437, 'Special German Tray'),
(438, 'Adana Kebab Dish'),
(439, 'Kofte Dish'),
(440, 'Mediterranean Salad'),
(441, 'Chicken Liver Pate'),
(442, 'Tomato Bruschetta'),
(443, 'Mango & Passionfruit Cheesecake'),
(444, 'Double-Bacon Cheese Smash Burger'),
(445, 'Grilled Sicillian Chicken'),
(446, 'Sesame Prawn Toast'),
(447, 'Chicken Balls'),
(448, 'Beef Szechuan Hot Noodle Box'),
(449, 'Ginger & Spring Onion Duck'),
(450, 'Munch Box');

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
(45, 'Ceantar Wood Fired Pizza', 'Dublin 5', '€', '2026-04-17 23:01:28', 'Italian', '73rd Raheny Scout Group, Howth Rd, Raheny, Dublin, D05 HA26'),
(46, 'Bellagio', 'Dublin 6', '€€', '2026-04-18 06:18:28', 'Italian', '92 Terenure Rd N, Terenure, Dublin, D6W NY29'),
(47, 'Tani Japanese Restaurant', 'Dublin 6', '€€', '2026-04-18 06:18:28', 'Japanese', '93 Terenure Rd N, Terenure, Dublin 6W, Co. Dublin, D6W PY26'),
(48, 'Bijou Bistro', 'Dublin 6', '€€', '2026-04-18 06:18:28', 'European', '46/47 Highfield Rd, Dublin 6, D06 CD56'),
(49, 'Spice Village Indian Restaurant', 'Dublin 6', '€', '2026-04-18 06:18:28', 'Indian', '95 Terenure Rd N, Terenure, Dublin 6W, Co. Dublin, D6W FH24'),
(50, 'Craft Restaurant', 'Dublin 6', '€€€', '2026-04-18 06:18:28', 'Irish', '208 Harold\'s Cross Rd, Terenure, Dublin, D6W E201'),
(51, 'Shaku Maku', 'Dublin 6', '€€', '2026-04-18 06:18:28', 'Middle Eastern', '192 Rathmines Rd Lower, Rathmines, Dublin, D06 Y3E8'),
(52, 'TriBeCa', 'Dublin 6', '€€', '2026-04-18 06:18:28', 'Irish', '65 Ranelagh, Dublin 6, D06 VX38'),
(53, 'Lark Cafe Restaurant', 'Dublin 6', '€', '2026-04-18 06:18:28', 'Irish', '14 Terenure Rd W, Terenure, Dublin 6W, Co. Dublin, D6W KF43'),
(54, 'China Hunan Restaurant', 'Dublin 6', '€€', '2026-04-18 06:18:28', 'Chinese', '121-123, Ranelagh, Dublin 6, D06 H7K6'),
(55, 'Korean Table', 'Dublin 7', '€€', '2026-04-18 06:18:28', 'Korean', '50a Manor St, Stoneybatter, Dublin 7, D07 FV09'),
(56, 'Grano', 'Dublin 7', '€€', '2026-04-18 06:18:28', 'Italian', 'Unit 5, Norseman Court, Manor St, Stoneybatter, Dublin, D07 XD89'),
(57, 'Hidden By One Society', 'Dublin 7', '€€', '2026-04-18 06:18:28', 'Italian', 'Unit 7, block A, Thundercut Alley, Smithfield, Dublin, D07 PW6K'),
(58, 'All Bar Chicken', 'Dublin 7', '€', '2026-04-18 06:18:28', 'Chicken', 'Niemba, 16 Stoneybatter, Dublin 7'),
(59, 'My Meat Wagon', 'Dublin 7', '€€', '2026-04-18 06:18:28', 'American', 'Market Square, Smithfield, Dublin'),
(60, 'PHX Bistro', 'Dublin 7', '€€', '2026-04-18 06:18:28', 'Irish', '12 Ellis Quay, Smithfield, Dublin, D07 DD88'),
(61, 'Kerala Kitchen', 'Dublin 7', '€€', '2026-04-18 06:18:28', 'Indian', '73 Manor St, Stoneybatter, Dublin, D07 R2N4'),
(62, 'Cafe Oasis', 'Dublin 7', '€', '2026-04-18 06:18:28', 'Mediterranean', '54 King St N, Smithfield, Dublin, D07 EE76'),
(63, 'Vada', 'Dublin 7', '€€', '2026-04-18 06:18:28', 'Brunch', '30 Brunswick St N, Stoneybatter, Dublin 7, D07 TP64'),
(64, 'Riggers D8', 'Dublin 8', '€', '2026-04-18 06:18:28', 'Brunch', '145 Emmet Rd, Inchicore, Dublin, D08 VK72'),
(65, 'Chilangos IE', 'Dublin 8', '€€', '2026-04-18 06:18:28', 'Mexican', '568 S Circular Rd, Rialto, Dublin 08, D08 RF72'),
(66, 'La Cosa Nostra', 'Dublin 8', '€€', '2026-04-18 06:18:28', 'Italian', '37 Thomas St, The Liberties, Dublin, D08 A319'),
(67, 'Spitalfields', 'Dublin 8', '€€€', '2026-04-18 06:18:28', 'Irish', '25 The Coombe, Merchants Quay, Dublin 8, D08 YV07'),
(68, 'Oh\'Rourke\'s', 'Dublin 8', '€', '2026-04-18 06:18:28', 'Irish', '32.33 Bridgefoot St, Usher\'s Quay, Dublin 8'),
(69, 'Broyage Bar, Bistro & Terrace', 'Dublin 8', '€€', '2026-04-18 06:18:28', 'Fusion', 'S Circular Rd, Kilmainham, Dublin, D08 XAK3'),
(70, 'Kari', 'Dublin 8', '€€', '2026-04-18 06:18:28', 'Indian', '205A Emmet Rd, Inchicore, Dublin 8, D08 XW61'),
(71, 'La Dolce Vita', 'Dublin 8', '€€', '2026-04-18 06:18:28', 'Italian', '760 S Circular Rd, Ushers, Dublin 8, D08 HV0A'),
(72, 'The Patriots Inn', 'Dublin 8', '€€', '2026-04-18 06:18:28', 'Irish', '760 S Circular Rd, Kilmainham, Dublin, D08 HV0A'),
(73, 'Nelly\'s Cafe & Wine Bar', 'Dublin 9', '€', '2026-04-18 06:18:28', 'Brunch', 'ABCD, 40 Drumcondra Rd Lower, Dublin 9'),
(74, 'The Washerwoman', 'Dublin 9', '€€', '2026-04-18 06:18:28', 'Irish', '60 Glasnevin Hill, Botanic, Dublin 9, D09 DF30'),
(75, 'Izumi Japanese Sushi & Chinese', 'Dublin 9', '€€', '2026-04-18 06:18:28', 'Japanese', '110 Drumcondra Rd Upper, Drumcondra, Dublin 9, D09 YF84'),
(76, 'Brass Onion Bistro', 'Dublin 9', '€', '2026-04-18 06:18:28', 'Fusion', '22 Sion Hill Rd, Grace Park, Dublin 9, D09 KX22'),
(77, 'Momoya', 'Dublin 9', '€', '2026-04-18 06:18:28', 'Chinese', '112 Collins Ave, West, Dublin 9, D09 Y2X7'),
(78, 'San Sab Drumcondra', 'Dublin 9', '€', '2026-04-18 06:18:28', 'Thai', '84 Drumcondra Rd Upper, Drumcondra, Dublin 9, D09 C2W0'),
(79, 'Independent Pizza Company', 'Dublin 9', '€', '2026-04-18 06:18:28', 'Italian', '28 Drumcondra Rd Lower, Botanic, Dublin 9, D09 X034'),
(80, 'Nice Burger Drumcondra', 'Dublin 9', '€', '2026-04-18 06:18:28', 'American', 'The Bernard Shaw Cross Guns Bridge, Drumcondra, Dublin 9, D09 XW44'),
(81, 'Shouk', 'Dublin 9', '€€', '2026-04-18 06:18:28', 'Middle Eastern', '40 Drumcondra Rd Lower, Drumcondra, Dublin'),
(82, 'The Warehouse Cafe', 'Dublin 10', '€€', '2026-04-18 06:18:28', 'African', 'Kylemore Park N, Ballyfermot, Dublin 10'),
(83, 'Ballyfermot cafe', 'Dublin 10', '€', '2026-04-18 06:18:28', 'European', '92 Le Fanu Rd, Drumfinn, Dublin 10, D10 FW14'),
(84, 'New Lam\'s Ballyfermot', 'Dublin 10', '€', '2026-04-18 06:18:28', 'Chinese', '284 Ballyfermot Rd, Drumfinn, Dublin 10, D10 HC83'),
(85, 'Mizzoni\'s Pizza - Cherry Orchard', 'Dublin 10', '€', '2026-04-18 06:18:28', 'Italian', 'Unit 5, Ballyfermot Rd, Ballyfermot Upper, Dublin, 10'),
(86, 'Far East Restaurant', 'Dublin 10', '€€', '2026-04-18 06:18:28', 'Vietnamese', '339 Ballyfermot Rd, Cherry Orchard, Dublin 10, D10 ND30'),
(87, 'Apache Pizza Ballyfermot', 'Dublin 10', '€', '2026-04-18 06:18:28', 'Italian', '353 Ballyfermot Rd, Cherry Orchard, Ballyfermot, Co. Dublin, D10 WN70'),
(88, 'XL Kebab - King of Doner Burger Pizza', 'Dublin 10', '€', '2026-04-18 06:18:28', 'Turkish', 'Cherry Orchard Industrial Estate, Ballyfermot Upper, Dublin, D10 EE63'),
(89, 'Lockandbrew', 'Dublin 10', '€', '2026-04-18 06:18:28', 'Brunch', '292 Ballyfermot Rd, Drumfinn, Dublin, D10 P651'),
(90, 'Yangtze Restaurant', 'Dublin 10', '€', '2026-04-18 06:18:28', 'Chinese', 'Ground Floor of Manhattan Pub, Grange Cross, Dublin 10, D10 E068');

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
(235, 39, 225, 'Dessert', NULL),
(236, 46, 226, 'Starter', NULL),
(237, 46, 227, 'Main', NULL),
(238, 46, 228, 'Main', NULL),
(239, 46, 229, 'Starter', NULL),
(240, 46, 230, 'Main', NULL),
(241, 47, 231, 'Starter', NULL),
(242, 47, 232, 'Starter', NULL),
(243, 47, 233, 'Main', NULL),
(244, 47, 234, 'Main', NULL),
(245, 47, 235, 'Dessert', NULL),
(246, 48, 236, 'Starter', NULL),
(247, 48, 237, 'Main', NULL),
(248, 48, 238, 'Main', NULL),
(249, 48, 239, 'Main', NULL),
(250, 48, 240, 'Starter', NULL),
(251, 49, 241, 'Starter', NULL),
(252, 49, 242, 'Starter', NULL),
(253, 49, 243, 'Main', NULL),
(254, 49, 244, 'Main', NULL),
(255, 49, 245, 'Dessert', NULL),
(256, 50, 246, 'Dessert', NULL),
(257, 50, 247, 'Starter', NULL),
(258, 50, 248, 'Main', NULL),
(259, 50, 249, 'Starter', NULL),
(260, 50, 250, 'Main', NULL),
(261, 51, 251, 'Starter', NULL),
(262, 51, 252, 'Starter', NULL),
(263, 51, 253, 'Main', NULL),
(264, 51, 254, 'Main', NULL),
(265, 51, 255, 'Dessert', NULL),
(266, 52, 256, 'Starter', NULL),
(267, 52, 257, 'Starter', NULL),
(268, 52, 258, 'Main', NULL),
(269, 52, 259, 'Main', NULL),
(270, 52, 260, 'Main', NULL),
(271, 53, 261, 'Main', NULL),
(272, 53, 262, 'Main', NULL),
(273, 53, 263, 'Dessert', NULL),
(274, 53, 264, 'Main', NULL),
(275, 53, 265, 'Main', NULL),
(276, 54, 266, 'Starter', NULL),
(277, 54, 267, 'Main', NULL),
(278, 54, 268, 'Main', NULL),
(279, 54, 269, 'Starter', NULL),
(280, 54, 270, 'Main', NULL),
(281, 55, 271, 'Starter', NULL),
(282, 55, 272, 'Main', NULL),
(283, 55, 273, 'Main', NULL),
(284, 55, 274, 'Main', NULL),
(285, 55, 275, 'Main', NULL),
(286, 56, 276, 'Starter', NULL),
(287, 56, 277, 'Starter', NULL),
(288, 56, 278, 'Main', NULL),
(289, 56, 279, 'Main', NULL),
(290, 56, 280, 'Dessert', NULL),
(291, 57, 281, 'Starter', NULL),
(292, 57, 282, 'Main', NULL),
(293, 57, 283, 'Main', NULL),
(294, 57, 284, 'Dessert', NULL),
(295, 57, 285, 'Dessert', NULL),
(296, 58, 286, 'Main', NULL),
(297, 58, 287, 'Main', NULL),
(298, 58, 288, 'Main', NULL),
(299, 58, 289, 'Dessert', NULL),
(300, 58, 290, 'Main', NULL),
(301, 59, 291, 'Main', NULL),
(302, 59, 292, 'Main', NULL),
(303, 59, 293, 'Main', NULL),
(304, 59, 294, 'Main', NULL),
(305, 59, 295, 'Main', NULL),
(306, 60, 296, 'Starter', NULL),
(307, 60, 297, 'Main', NULL),
(308, 60, 298, 'Starter', NULL),
(309, 60, 299, 'Main', NULL),
(310, 60, 300, 'Dessert', NULL),
(311, 61, 301, 'Starter', NULL),
(312, 61, 302, 'Starter', NULL),
(313, 61, 303, 'Main', NULL),
(314, 61, 304, 'Main', NULL),
(315, 61, 305, 'Dessert', NULL),
(316, 62, 306, 'Starter', NULL),
(317, 62, 307, 'Starter', NULL),
(318, 62, 308, 'Main', NULL),
(319, 62, 309, 'Main', NULL),
(320, 62, 310, 'Dessert', NULL),
(321, 63, 311, 'Main', NULL),
(322, 63, 312, 'Main', NULL),
(323, 63, 313, 'Main', NULL),
(324, 63, 314, 'Starter', NULL),
(325, 63, 315, 'Dessert', NULL),
(326, 64, 316, 'Main', NULL),
(327, 64, 317, 'Main', NULL),
(328, 64, 318, 'Main', NULL),
(329, 64, 319, 'Main', NULL),
(330, 64, 320, 'Dessert', NULL),
(331, 65, 321, 'Dessert', NULL),
(332, 65, 322, 'Main', NULL),
(333, 65, 323, 'Main', NULL),
(334, 65, 324, 'Main', NULL),
(335, 65, 325, 'Main', NULL),
(336, 66, 326, 'Starter', NULL),
(337, 66, 327, 'Starter', NULL),
(338, 66, 328, 'Main', NULL),
(339, 66, 329, 'Main', NULL),
(340, 66, 330, 'Dessert', NULL),
(341, 67, 331, 'Starter', NULL),
(342, 67, 332, 'Starter', NULL),
(343, 67, 333, 'Main', NULL),
(344, 67, 334, 'Main', NULL),
(345, 67, 335, 'Dessert', NULL),
(346, 68, 336, 'Main', NULL),
(347, 68, 337, 'Main', NULL),
(348, 68, 338, 'Main', NULL),
(349, 68, 339, 'Main', NULL),
(350, 68, 340, 'Main', NULL),
(351, 69, 341, 'Starter', NULL),
(352, 69, 342, 'Starter', NULL),
(353, 69, 343, 'Main', NULL),
(354, 69, 344, 'Main', NULL),
(355, 69, 345, 'Dessert', NULL),
(356, 70, 346, 'Starter', NULL),
(357, 70, 347, 'Starter', NULL),
(358, 70, 348, 'Main', NULL),
(359, 70, 349, 'Main', NULL),
(360, 70, 350, 'Main', NULL),
(361, 71, 351, 'Main', NULL),
(362, 71, 352, 'Main', NULL),
(363, 71, 353, 'Starter', NULL),
(364, 71, 354, 'Main', NULL),
(365, 71, 355, 'Dessert', NULL),
(366, 72, 356, 'Starter', NULL),
(367, 72, 357, 'Starter', NULL),
(368, 72, 358, 'Main', NULL),
(369, 72, 359, 'Main', NULL),
(370, 72, 360, 'Dessert', NULL),
(371, 73, 361, 'Main', NULL),
(372, 73, 362, 'Main', NULL),
(373, 73, 363, 'Main', NULL),
(374, 73, 364, 'Main', NULL),
(375, 73, 365, 'Main', NULL),
(376, 74, 366, 'Starter', NULL),
(377, 74, 367, 'Starter', NULL),
(378, 74, 368, 'Main', NULL),
(379, 74, 369, 'Main', NULL),
(380, 74, 370, 'Dessert', NULL),
(381, 75, 371, 'Starter', NULL),
(382, 75, 372, 'Starter', NULL),
(383, 75, 373, 'Main', NULL),
(384, 75, 374, 'Main', NULL),
(385, 75, 375, 'Dessert', NULL),
(386, 76, 376, 'Starter', NULL),
(387, 76, 377, 'Starter', NULL),
(388, 76, 378, 'Main', NULL),
(389, 76, 379, 'Main', NULL),
(390, 76, 380, 'Dessert', NULL),
(391, 77, 381, 'Starter', NULL),
(392, 77, 382, 'Starter', NULL),
(393, 77, 383, 'Main', NULL),
(394, 77, 384, 'Main', NULL),
(395, 77, 385, 'Dessert', NULL),
(396, 78, 386, 'Dessert', NULL),
(397, 78, 387, 'Starter', NULL),
(398, 78, 388, 'Starter', NULL),
(399, 78, 389, 'Main', NULL),
(400, 78, 390, 'Main', NULL),
(401, 79, 391, 'Main', NULL),
(402, 79, 392, 'Main', NULL),
(403, 79, 393, 'Dessert', NULL),
(404, 79, 394, 'Starter', NULL),
(405, 79, 395, 'Main', NULL),
(406, 80, 396, 'Main', NULL),
(407, 80, 397, 'Main', NULL),
(408, 80, 398, 'Dessert', NULL),
(409, 80, 399, 'Main', NULL),
(410, 80, 400, 'Main', NULL),
(411, 81, 401, 'Dessert', NULL),
(412, 81, 402, 'Main', NULL),
(413, 81, 403, 'Starter', NULL),
(414, 81, 404, 'Main', NULL),
(415, 81, 405, 'Main', NULL),
(416, 82, 406, 'Main', NULL),
(417, 82, 407, 'Main', NULL),
(418, 82, 408, 'Main', NULL),
(419, 82, 409, 'Main', NULL),
(420, 82, 410, 'Main', NULL),
(421, 83, 411, 'Main', NULL),
(422, 83, 412, 'Main', NULL),
(423, 83, 413, 'Main', NULL),
(424, 83, 414, 'Main', NULL),
(425, 83, 415, 'Main', NULL),
(426, 84, 416, 'Starter', NULL),
(427, 84, 417, 'Starter', NULL),
(428, 84, 418, 'Main', NULL),
(429, 84, 419, 'Main', NULL),
(430, 84, 420, 'Main', NULL),
(431, 85, 421, 'Main', NULL),
(432, 85, 422, 'Main', NULL),
(433, 85, 423, 'Main', NULL),
(434, 85, 424, 'Dessert', NULL),
(435, 85, 425, 'Main', NULL),
(436, 86, 426, 'Starter', NULL),
(437, 86, 427, 'Starter', NULL),
(438, 86, 428, 'Main', NULL),
(439, 86, 429, 'Main', NULL),
(440, 86, 430, 'Dessert', NULL),
(441, 87, 431, 'Main', NULL),
(442, 87, 432, 'Main', NULL),
(443, 87, 433, 'Main', NULL),
(444, 87, 434, 'Dessert', NULL),
(445, 87, 435, 'Dessert', NULL),
(446, 88, 436, 'Dessert', NULL),
(447, 88, 437, 'Main', NULL),
(448, 88, 438, 'Main', NULL),
(449, 88, 439, 'Main', NULL),
(450, 88, 440, 'Starter', NULL),
(451, 89, 441, 'Starter', NULL),
(452, 89, 442, 'Starter', NULL),
(453, 89, 443, 'Dessert', NULL),
(454, 89, 444, 'Main', NULL),
(455, 89, 445, 'Main', NULL),
(456, 90, 446, 'Starter', NULL),
(457, 90, 447, 'Starter', NULL),
(458, 90, 448, 'Main', NULL),
(459, 90, 449, 'Main', NULL),
(460, 90, 450, 'Main', NULL);

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
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `token_hash` varchar(64) NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token_hash` (`token_hash`),
  ADD KEY `user_id` (`user_id`);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=451;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT for table `restaurants_dishes`
--
ALTER TABLE `restaurants_dishes`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=461;

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
-- AUTO_INCREMENT for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

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
-- Constraints for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD CONSTRAINT `password_reset_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

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
