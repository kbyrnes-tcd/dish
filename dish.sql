-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 28, 2026 at 09:19 PM
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
(1, 'Crispy Golden Chicken Tenders'),
(2, 'Boneless Wings'),
(3, 'Buffalo Wings'),
(4, 'The Classic'),
(5, 'Cheeeze Pleeze'),
(6, 'Jalapeno Popper'),
(7, 'Smokestack'),
(8, 'Bacon Cheeeze'),
(9, 'Supernova'),
(10, 'The M50'),
(11, 'Beyond Meat Truffle'),
(12, 'Rocket Dog'),
(13, 'Bacon Big Boy'),
(14, 'Caesar Salad'),
(15, 'Cheeezy Nachos'),
(16, 'Kitchen Sink Nachos'),
(17, 'Regular Fries'),
(18, 'Rocket Rings'),
(19, 'Buffalo Fries'),
(20, 'Waffle Chili Cheeze Fries'),
(21, 'Waffle Fries'),
(22, 'Bacon and Chese Fries'),
(23, 'Chili Cheese Fries'),
(24, 'Garlic and Chese Fries'),
(25, 'Garlic Fries'),
(26, 'Cheese Fries'),
(27, 'Hamburger'),
(28, 'Cheeseburger'),
(29, 'Bacon Burger'),
(30, 'Bacon Cheeseburger'),
(31, 'Little Hamburger'),
(32, 'Little Cheseburger'),
(33, 'Little Bacon Cheseburger'),
(34, 'Hotdog'),
(35, 'Cheese Dog'),
(36, 'Bacon Dog'),
(37, 'Bacon Cheese Dog'),
(38, 'Veggie Sandwich'),
(39, 'Chese Veggie Sandwich'),
(40, 'Grilled Cheese'),
(41, 'BLT'),
(42, 'Lettuce Wrap'),
(43, 'Burger Bowl'),
(44, 'Little Five Guys Style Fries'),
(45, 'Five Guys Style Fries'),
(46, 'Large Five Guys Style Fries'),
(47, 'Little Cajun Fries'),
(48, 'Cajun Fries'),
(49, 'Large Cajun Fries');

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
  `restaurant_name` varchar(50) NOT NULL,
  `restaurant_location` varchar(100) NOT NULL,
  `restaurant_price` varchar(50) NOT NULL,
  `restaurant_description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `restaurant_cuisine` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `restaurants`
--

INSERT INTO `restaurants` (`id`, `restaurant_name`, `restaurant_location`, `restaurant_price`, `restaurant_description`, `created_at`, `restaurant_cuisine`) VALUES
(1, 'Al Vesuvio', 'Meeting House Square, Temple Bar, Dublin 2', '€20-€30', 'Romantic Italian bar and dining room in an 18th-century vaulted brick and stone wine cellar.', '2026-03-24 17:31:08', 'Italian'),
(2, 'Gigi', '53 Ranelagh, Dublin 6, D06 X3Y6', '€20-€30', 'Real Italian food in a laid back intimate surrounding.', '2026-03-24 17:50:19', 'Italian'),
(3, 'Host Restaurant', '13 Ranelagh, Dublin, D06 V0C1', '€20-€30', 'Everything on the menu is meant to be shared, from the small plates to the heartier grilled meats. The ingredients are excellent and seasonal, and the cooking is pared back, almost primal! There is a strong Italian influence which includes handmade pastas and the wine list is a constantly changing selection from small, natural winemakers. The dining room is informal and relaxed, with high stools and bar seats as well as regular tables.', '2026-03-24 17:54:37', 'Italian'),
(4, 'Thai Basil', '3 Millennium Walkway, North City, Dublin', '€10-€20', 'Thai Basil is a casual Thai eatery in Dublin known for authentic curries, noodles, and fresh ingredients, offering generous portions and friendly service at an affordable price.', '2026-03-24 18:07:28', 'Thai'),
(5, 'Nightmarket', '120 Ranelagh, Dublin 6, D06 VF76', '€20-€30', 'Owners Conor and Jutarat opened Nightmarket in 2017 to great acclaim, and continue to keep the restaurant at the forefront of Asian dining in Ireland, having recently won the Georgina Campbell Global Cuisine Award for 2024, and are listed in the Sunday Times Ireland\'s 100 Best Restaurants list for 2025. ', '2026-03-24 18:20:45', 'Thai'),
(6, 'The Church Café Bar', 'Jervis St, North City, Dublin 1, D01 YX64', '€20-€30', 'The Church is the \'local\' of choice for native Dubliners and welcomes over 800,000 visitors annually from all over the world who come to experience the culture, atmosphere and friendly service Dublin has to offer. The Church has five different settings over four floors.', '2026-03-24 18:23:35', 'Irish'),
(7, 'Gallaghers Boxty House', 'The Auld Dubliner', '€20-€30', 'Cafe with Victorian stained-glass lamps and antique furniture, seasonal food and potato pancakes.', '2026-03-24 18:25:12', 'Irish'),
(8, 'The Winding Stair', '40 Ormond Quay Lower, North City, Dublin 1, D01 R9Y5', '€20-€30', 'The Winding Stair Bookshop & Café became a famous Dublin landmark in the 1970s and 1980s. Named after the Yeats poem and in honour of its winding staircase, it is overlooking the river Liffey, with an iconic view of the Ha\'penny bridge. As a popular meeting place for writers, musicians and artists, it was a well known hub for debate and creativity with many poems written, novels penned and movies shot within its walls.', '2026-03-24 18:29:32', 'Irish'),
(9, 'Taco Taco at East Side Tavern', '104-105 Leeson Street Lower, Dublin, Co. Dublin D02 K710', '€20-€30', 'Taco Taco is a contemporary Mexican restaurant Dublin offering a unique twist on Mexican cuisine. Our tacos are now legendary and a must for lovers of Mexican Food. We also have an extensive cocktail list. Be sure to try our famous Margarita, it’s the best in Dublin.', '2026-03-24 18:42:40', 'Mexican'),
(10, 'Bunsen', '36 Wexford St, Portobello, Dublin 2, D02 PW56', '€10-€20', 'Compact eatery with an equally compact menu of burgers with extra toppings and a choice of fries.', '2026-03-25 10:12:42', 'American'),
(11, 'Eddie Rockets', 'Jervis St, Dublin 1, D01 F2V0', '€10-€20', 'Colourful chain diner dishing up U.S. comfort-food classics such as burgers, fries & shakes.', '2026-03-25 10:34:55', 'American'),
(12, 'Five Guys', '56 South Great George\'s Street, Dublin 2, D02 HF50', '€10-€20', 'Fast-food chain with made-to-order burgers, fries & hot dogs, plus free peanuts while you wait.', '2026-03-25 10:45:17', 'American'),
(13, 'Le Bon Crubeen', '81-82 Talbot St, North City, Dublin 1, D01 CD34', '€30-€40', 'Stylish and casual wood filled dining room for European influenced food and freshly made cocktails.', '2026-03-25 10:50:49', 'French'),
(14, 'L\'Ecrivain Restaurant', '109A Baggot Street Lower, Dublin 2, D02 V580', '€50+', 'Seasonal Irish ingredients given full French gastronomic treatment on a la carte and tasting menus.', '2026-03-25 10:56:39', 'French'),
(15, 'Musashi Noodle & Sushi Bar', '15 Capel St, North City, Dublin 1, D01 E1C0', '€20-€30', 'Laid-back setting for Japanese noodle, sushi and sashimi, plus lunch deals and takeaway.', '2026-03-25 11:38:24', 'Japanese'),
(16, 'ANANDA', 'Dundrum, Dublin 16, D16 VK54', '€30-€40', 'Confident and creative updates of classical Indian dishes served in stylishly laid back dining room.', '2026-03-25 11:41:18', 'Indian'),
(17, 'Curry Leaf', 'Bray, Co. Wicklow, A98 PD00', '€20-€30', 'Indian Authentic Restaurant.', '2026-03-25 12:00:32', 'Indian'),
(18, 'Golden Dragon', 'Woodfarm, Dublin, D20 T294', '€10-€20', 'At Golden Dragon, we take pride in serving delicious, authentic Chinese cuisine made with fresh ingredients and bold flavours. Our goal is to provide every customer with a satisfying dining experience, whether you\'re enjoying a quick takeaway or a relaxed meal with us.', '2026-03-25 12:07:40', 'Chinese'),
(19, 'China Sichuan Restaurant', 'Sandyford Business Park, Dublin 18, D18 XH28', '€20-€30', 'The China Sichuan Restaurant in Sandyford, Dublin has a long tradition of innovation and invention. We pride ourselves on delivering unique culinary experiences to our guests by bringing together the finest local ingredients and traditional Sichuan and Cantonese cookery. Our chefs take pride in serving dishes that are inspired by tradition and motivated by invention.', '2026-03-25 12:15:03', 'Chinese'),
(20, 'The Olive Tree', 'Belgard Rd, Tallaght, Dublin 24', '€20-€30', 'The Olive Tree restaurant, located on the first floor of the Plaza Hotel in Tallaght, Dublin 24, offers Italian and European cuisine with views of the Dublin Mountains.', '2026-03-25 12:18:54', 'Greek');

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
(1, 11, 1, 'Entree', 'Six pieces of chicken tenders and two dunking sauces'),
(2, 11, 2, 'Entree', 'Ten boneless wings, one dunking sauce with celery '),
(3, 12, 30, 'Entree', 'Fresh patties hot off the grill with American-style cheese and crispy Applewood smoked bacon. Placed on a soft, toasted sesame seed bun. Add as many toppings as you want.'),
(4, 12, 34, 'Entree', 'A simple all-beef dog, grilled to caramelized perfection. Fix it up with any of your favorite toppings.');

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `restaurants_dishes`
--
ALTER TABLE `restaurants_dishes`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
