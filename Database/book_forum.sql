SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE book_forum;
USE book_forum;

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `AT` int(11) NOT NULL,
  `ime` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `prezime` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `slika` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `korisnickoIme` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `lozinka` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `datumRodjenja` date NOT NULL,
  `grad` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `drzava` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `procitaneKnjige` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `citamKnjige` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `zaCitanjeKnjige` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ;

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `slika` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `naziv` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `autor` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `datumIzdavanja` date NOT NULL,
  `zanr` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `opis` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `prosecnaOcena` FLOAT NOT NULL
) ;

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `korisnikId` int(11) NOT NULL,
  `knjigaId` int(11) NOT NULL,
  `komentar` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `ocena` int(11) NOT NULL
) ;

CREATE TABLE `event` (
  `id` int(11) NOT NULL,
  `privatno` BOOLEAN NOT NULL,
  `naziv` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `pocetak` date NOT NULL,
  `kraj` date NOT NULL,
  `opis` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `aktivno`  BOOLEAN NOT NULL,
  `kreator` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ;

INSERT INTO `users` (`id`, `AT`, `ime`, `prezime`, `slika`, `korisnickoIme`, `lozinka`, `datumRodjenja`, `grad`, `drzava`, `email`, `procitaneKnjige`, `citamKnjige`, `zaCitanjeKnjige`) VALUES
(1, 1, 'Mimi', 'Zelja', '', 'loop', '1234', '1993-03-18', 'Stara Pazova', 'Srbija', 'loop1@gmail.com', '[]', '[]', '[]'),
(2, 2, 'Dusan', 'Tomanic', '', 'tduca998', '1234', '1998-02-11', 'Stara Pazova', 'Srbija', 'tduca998@gmail.com', '[]', '[]', '[]'),
(3, 3, 'Rory', 'Wolk', '', 'rorynius', '1234', '1985-05-25', 'San Francisco', 'USA', 'rorynius@gmail.com', '[]', '[]', '[]');

INSERT INTO `books` (`id`, `slika`, `naziv`, `autor`, `datumIzdavanja`, `zanr`, `opis`, `prosecnaOcena`) VALUES
(1, '', 'Six of Crows', '[ "Leigh Bardugo" ]', '2015-09-29', '[ "Fantasy", "Adventure" ]', 'Ketterdam: a bustling hub of international trade where anything can be had for the right price...', 0.0),
(2, '', 'The Faithless Hawk', '[ "Margaret Owen", "Anna" ]', '2020-08-18', '[ "Fantasy" ]', 'As the new chieftain of the Crows, Fie knows better than to expect a royal to keep his word. Still she...', 0.0);

INSERT INTO `comment` ( `id`, `korisnikId`, `knjigaId`, `komentar`, `ocena`) VALUES
(1, 1, 2, "To je to za komentar", 4),
(1, 1, 1, "Autor je ostao bez nekih ideja, mogao je da spakuje sve u prvi deo, nisam zadovoljan", 3),
(1, 2, 2, "Nisam bas sve procitao, za sada ocena 2, mozda bude ibolje", 2),
(1, 3, 2, "Very nice storyline", 4);

INSERT INTO `event` (`id`, `privatno`, `naziv`, `pocetak`, `kraj`, `opis`, `aktivno`, `kreator`) VALUES
(1, false, 'Potpisivanje knjiga', '2020-09-25', '2020-09-26', 'Slavni autor Milorad Mimi Loop potpisuje knjige u Vulkanu.', 'true', 'loop' ),
(2, false, 'Javno citanje', '2020-09-28', '2020-09-30', 'Vece citanja knjiga. Javno citanje knjige Six of Crows', 'true', 'rorynius' );

COMMIT;
