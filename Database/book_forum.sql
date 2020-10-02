-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 30, 2020 at 06:31 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `book_forum`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `slika` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `naziv` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `autor` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `datumIzdavanja` date NOT NULL,
  `zanr` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `opis` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `prosecnaOcena` float NOT NULL,
  `brStrana` int(11) NOT NULL,
  `odobrena` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `slika`, `naziv`, `autor`, `datumIzdavanja`, `zanr`, `opis`, `prosecnaOcena`, `brStrana`, `odobrena`) VALUES
('ffaaaeed-9ac9-4b29-9c54-eade7efeed6d', 'bla', 'Six of Crows', '[ \"Leigh Bardugo\" ]', '2015-09-29', '[ \"Fantastika\", \"Avantura\" ]', 'Ketterdam: a bustling hub of international trade where anything can be had for the right price...', 0, 250, 1),
('902f6a05-fbb2-4caa-9770-c24eab25acaf', '', 'The Faithless Hawk', '[ \"Margaret Owen\", \"Anna\" ]', '2020-08-18', '[ \"Fantastika\" ]', 'As the new chieftain of the Crows, Fie knows better than to expect a royal to keep his word. Still s', 0, 360, 1),
('a34f54ee-5e17-4354-9f86-b14fd47e2c35', 'asd', 'asd', '[\"asd\"]', '2005-09-29', '[\"Fantastika\",\"Drama\"]', 'asdfg', 0, 45, 0);

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `korisnikId` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `knjigaId` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `komentar` varchar(1000) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `ocena` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `korisnikId`, `knjigaId`, `komentar`, `ocena`) VALUES
('4c64a212-9c5e-42bf-b293-a3b5398ba134', '8ca567a2-2d67-46ca-bfc2-c44fc2476daa', '902f6a05-fbb2-4caa-9770-c24eab25acaf', 'To je to za komentar', 4),
('3c284a4e-478d-4486-bf63-fed5627ba58d', '8ca567a2-2d67-46ca-bfc2-c44fc2476daa', 'ffaaaeed-9ac9-4b29-9c54-eade7efeed6d', 'Autor je ostao bez nekih ideja, mogao je da spakuje sve u prvi deo, nisam zadovoljan', 3),
('9e5426c3-1588-44e7-930c-99d3761f272f', 'c0bb23cd-d189-4560-af7c-c05ed5371434', '902f6a05-fbb2-4caa-9770-c24eab25acaf', 'Nisam bas sve procitao, za sada ocena 4', 4),
('b8646de1-36e4-463a-9e37-bab0fc2861bf', '63e83b8d-55bf-477d-909f-410273e77f04', '902f6a05-fbb2-4caa-9770-c24eab25acaf', 'Very nice storyline', 4),
('d0af5316-b5fa-4712-9c00-29611e15fb77', 'c0bb23cd-d189-4560-af7c-c05ed5371434', 'ffaaaeed-9ac9-4b29-9c54-eade7efeed6d', 'Ko je sedma vrana? Saznao sam.', 3);

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `id` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `privatno` tinyint(1) NOT NULL,
  `naziv` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `pocetak` date NOT NULL,
  `kraj` date NOT NULL,
  `opis` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `aktivno` tinyint(1) NOT NULL,
  `kreator` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`id`, `privatno`, `naziv`, `pocetak`, `kraj`, `opis`, `aktivno`, `kreator`) VALUES
('45304f71-f5c7-4338-85c3-10204eb3d536', 0, 'Potpisivanje knjiga', '2020-09-25', '2020-09-26', 'Slavni autor Milorad Mimi Loop potpisuje knjige u Vulkanu.', 0, 'loop'),
('096e4a8a-1828-45a4-b342-869fb9fce637', 0, 'Javno citanje', '2020-09-28', '2020-09-30', 'Vece citanja knjiga. Javno citanje knjige Six of Crows', 0, 'rorynius');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `AT` int(11) NOT NULL,
  `ime` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `prezime` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `slika` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `korisnickoIme` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `lozinka` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `datumRodjenja` date NOT NULL,
  `grad` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `drzava` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `procitaneKnjige` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `citamKnjige` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `zaCitanjeKnjige` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `AT`, `ime`, `prezime`, `slika`, `korisnickoIme`, `lozinka`, `datumRodjenja`, `grad`, `drzava`, `email`, `procitaneKnjige`, `citamKnjige`, `zaCitanjeKnjige`) VALUES
('8ca567a2-2d67-46ca-bfc2-c44fc2476daa', 2, 'Mimi', 'Petrovic', '2464761c-4465-4b65-a6fa-4a18bce09dc2/image/bebop.png', 'loop', '1234', '0000-00-00', 'Stara Pazova', 'Srbija', 'loop01@gmail.com', '[\"ffaaaeed-9ac9-4b29-9c54-eade7efeed6d\", \"902f6a05-fbb2-4caa-9770-c24eab25acaf\"]', '[]', '[]'),
('c0bb23cd-d189-4560-af7c-c05ed5371434', 3, 'Duca', 'Tomanic', 'blabla', 'tduca998', '1234', '0000-00-00', 'Stara Pazova', 'Srbija', 'tduca998@gmail.com', '[\"ffaaaeed-9ac9-4b29-9c54-eade7efeed6d\",\"902f6a05-fbb2-4caa-9770-c24eab25acaf\"]', '[[\"ffaaaeed-9ac9-4b29-9c54-eade7efeed6d\",250,0],[\"902f6a05-fbb2-4caa-9770-c24eab25acaf\",360,0]]', '[\"902f6a05-fbb2-4caa-9770-c24eab25acaf\"]'),
('63e83b8d-55bf-477d-909f-410273e77f04', 4, 'Rory', 'Wolk', '', 'rorynius', '1234', '1985-05-25', 'San Francisco', 'USA', 'rorynius@gmail.com', '[]', '[[\"902f6a05-fbb2-4caa-9770-c24eab25acaf\",152,1],[\"ffaaaeed-9ac9-4b29-9c54-eade7efeed6d\",126,1]]', '[\"902f6a05-fbb2-4caa-9770-c24eab25acaf\"]'),
('d02fecec-405b-4dfb-a224-4d7475dd9218', 2, 'Mladen', 'Gacevic', '7324db05-de63-4c71-a277-d3d2d89db286/image/vrdamage.png', 'vrdamage', '1234', '2020-08-31', 'Novi Sad', 'Srbija', 'vrdamage@gmail.com', '[]', '[]', '[]'),
('9f9d3bad-9b93-41d9-8c75-55351945a1c4', 1, 'asd', 'asd', '3b97c389-b6ba-484f-8436-54b8cf769a5c/image/asd.JPG', 'asd', 'asd', '2020-09-15', 'asd', 'asd', 'tilafam185@finxmail.net', '[]', '[]', '[]');

-- --------------------------------------------------------

--
-- Table structure for table `zanrovi`
--

CREATE TABLE `zanrovi` (
  `tip` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `zanrovi`
--

INSERT INTO `zanrovi` (`tip`) VALUES
('Fantastika'),
('Avantura'),
('Drama'),
('Romantika');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
