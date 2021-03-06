-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 06, 2021 at 09:17 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rtodo_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `todo`
--

CREATE TABLE `todo` (
  `id` int(11) NOT NULL COMMENT 'primary key',
  `name` text NOT NULL COMMENT 'name of task',
  `description` text NOT NULL COMMENT 'description of task',
  `date` date NOT NULL COMMENT 'date task is due'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `todo`
--

INSERT INTO `todo` (`id`, `name`, `description`, `date`) VALUES
(2, 'Item 2', 'Bonus Points\r\nJWTN', '2018-10-19'),
(3, 'Item 3', 'Mysql', '2018-10-19'),
(4, '888', '555', '2021-03-03'),
(5, 'Assignment', 'Todo API\r\n\r\nUsing Node\r\nSequalize\r\nMysql\r\nExpress\r\nRest Api\r\nPostman\r\nCRUD\r\n\r\nBonus Points\r\nJWTN', '2018-10-19'),
(6, 'Assignment 6', 'Todo API', '2018-10-19'),
(7, 'Assignment', 'Todo API\r\n\r\nUsing Node\r\nSequalize\r\nMysql\r\nExpress\r\nRest Api\r\nPostman\r\nCRUD\r\n\r\nBonus Points\r\nJWTN', '2018-10-19'),
(8, 'Assignment', 'Todo API\r\n\r\nUsing Node\r\nSequalize\r\nMysql\r\nExpress\r\nRest Api\r\nPostman\r\nCRUD\r\n\r\nBonus Points\r\nJWTN', '2018-10-19'),
(9, 'Assignment', 'Todo API\r\n\r\nUsing Node\r\nSequalize\r\nMysql\r\nExpress\r\nRest Api\r\nPostman\r\nCRUD\r\n\r\nBonus Points\r\nJWTN', '2018-10-19'),
(10, 'Assignment', 'Todo API\r\n\r\nUsing Node\r\nSequalize\r\nMysql\r\nExpress\r\nRest Api\r\nPostman\r\nCRUD\r\n\r\nBonus Points\r\nJWTN', '2018-10-19'),
(11, 'Assignment', 'Todo API\r\n\r\nUsing Node\r\nSequalize\r\nMysql\r\nExpress\r\nRest Api\r\nPostman\r\nCRUD\r\n\r\nBonus Points\r\nJWTN', '2018-10-19'),
(12, 'Assignment', 'Todo API\r\n\r\nUsing Node\r\nSequalize\r\nMysql\r\nExpress\r\nRest Api\r\nPostman\r\nCRUD\r\n\r\nBonus Points\r\nJWTN', '2018-10-19'),
(13, 'Assignment', 'Todo API\r\n\r\nUsing Node\r\nSequalize\r\nMysql\r\nExpress\r\nRest Api\r\nPostman\r\nCRUD\r\n\r\nBonus Points\r\nJWTN', '2018-10-19'),
(14, 'Assignment', 'Todo API\r\n\r\nUsing Node\r\nSequalize\r\nMysql\r\nExpress\r\nRest Api\r\nPostman\r\nCRUD\r\n\r\nBonus Points\r\nJWTN', '2018-10-19'),
(15, 'Assignment', 'Todo API\r\n\r\nUsing Node\r\nSequalize\r\nMysql\r\nExpress\r\nRest Api\r\nPostman\r\nCRUD\r\n\r\nBonus Points\r\nJWTN', '2018-10-19'),
(16, 'Assignment', 'Todo API\r\n\r\nUsing Node\r\nSequalize\r\nMysql\r\nExpress\r\nRest Api\r\nPostman\r\nCRUD\r\n\r\nBonus Points\r\nJWTN', '2018-10-19'),
(17, 'Assignment', 'Todo API\r\n\r\nUsing Node\r\nSequalize\r\nMysql\r\nExpress\r\nRest Api\r\nPostman\r\nCRUD\r\n\r\nBonus Points\r\nJWTN', '2018-10-19');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL COMMENT 'id',
  `email` text NOT NULL COMMENT 'email',
  `password` text NOT NULL COMMENT 'md5 hashed password',
  `secret` text NOT NULL COMMENT 'jwt'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `secret`) VALUES
(1, 'mobile@andreboyce.com', 'ea3a9e02f58fa4bf813744b07cbf5168', '0'),
(3, 'rtodo@localhost', '55d819b82608f32078b069c6ffe89d00', '0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `todo`
--
ALTER TABLE `todo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `todo`
--
ALTER TABLE `todo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'primary key', AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id', AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
