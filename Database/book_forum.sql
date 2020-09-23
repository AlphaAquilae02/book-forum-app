SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE book_forum;
USE book_forum;

CREATE TABLE `users` (
  `id` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
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
  `id` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `slika` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `naziv` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `autor` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `datumIzdavanja` date NOT NULL,
  `zanr` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `opis` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `prosecnaOcena` FLOAT NOT NULL,
  `brStrana` int(11) NOT NULL,
  `odobrena` boolean NOT NULL
) ;

CREATE TABLE `comment` (
  `id` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `korisnikId` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `knjigaId` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `komentar` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `ocena` int(11) NOT NULL
) ;

CREATE TABLE `event` (
  `id` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `privatno` BOOLEAN NOT NULL,
  `naziv` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `pocetak` date NOT NULL,
  `kraj` date NOT NULL,
  `opis` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `aktivno`  BOOLEAN NOT NULL,
  `kreator` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ;

CREATE TABLE `cita` (
  `korisnikId` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `knjigaId` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `strana` int(11) NOT NULL,
  `cita` boolean NOT NULL
) ;

INSERT INTO `users` (`id`, `AT`, `ime`, `prezime`, `slika`, `korisnickoIme`, `lozinka`, `datumRodjenja`, `grad`, `drzava`, `email`, `procitaneKnjige`, `citamKnjige`, `zaCitanjeKnjige`) VALUES
('8ca567a2-2d67-46ca-bfc2-c44fc2476daa', 1, 'Mimi', 'Zelja', '', 'loop', '1234', '1993-03-18', 'Stara Pazova', 'Srbija', 'loop1@gmail.com', '["ffaaaeed-9ac9-4b29-9c54-eade7efeed6d", "902f6a05-fbb2-4caa-9770-c24eab25acaf"]', '[]', '[]'),
('c0bb23cd-d189-4560-af7c-c05ed5371434', 2, 'Dusan', 'Tomanic', '', 'tduca998', '1234', '1998-02-11', 'Stara Pazova', 'Srbija', 'tduca998@gmail.com', '[]', '[["ffaaaeed-9ac9-4b29-9c54-eade7efeed6d", 170, 1]]', '[]'),
('63e83b8d-55bf-477d-909f-410273e77f04', 3, 'Rory', 'Wolk', '', 'rorynius', '1234', '1985-05-25', 'San Francisco', 'USA', 'rorynius@gmail.com', '[]', '[]', '["902f6a05-fbb2-4caa-9770-c24eab25acaf"]');

INSERT INTO `books` (`id`, `slika`, `naziv`, `autor`, `datumIzdavanja`, `zanr`, `opis`, `prosecnaOcena`, `brStrana`, `odobrena`) VALUES
('ffaaaeed-9ac9-4b29-9c54-eade7efeed6d', '', 'Six of Crows', '[ "Leigh Bardugo" ]', '2015-09-29', '[ "Fantasy", "Adventure" ]', 'Ketterdam: a bustling hub of international trade where anything can be had for the right price...', 0.0, 250, 1),
('902f6a05-fbb2-4caa-9770-c24eab25acaf', '', 'The Faithless Hawk', '[ "Margaret Owen", "Anna" ]', '2020-08-18', '[ "Fantasy" ]', 'As the new chieftain of the Crows, Fie knows better than to expect a royal to keep his word. Still she...', 0.0, 360, 1);

INSERT INTO `comment` ( `id`, `korisnikId`, `knjigaId`, `komentar`, `ocena`) VALUES
('4c64a212-9c5e-42bf-b293-a3b5398ba134', '8ca567a2-2d67-46ca-bfc2-c44fc2476daa', '902f6a05-fbb2-4caa-9770-c24eab25acaf', "To je to za komentar", 4),
('3c284a4e-478d-4486-bf63-fed5627ba58d', '8ca567a2-2d67-46ca-bfc2-c44fc2476daa', 'ffaaaeed-9ac9-4b29-9c54-eade7efeed6d', "Autor je ostao bez nekih ideja, mogao je da spakuje sve u prvi deo, nisam zadovoljan", 3),
('9e5426c3-1588-44e7-930c-99d3761f272f', 'c0bb23cd-d189-4560-af7c-c05ed5371434', '902f6a05-fbb2-4caa-9770-c24eab25acaf', "Nisam bas sve procitao, za sada ocena 2, mozda bude ibolje", 2),
('b8646de1-36e4-463a-9e37-bab0fc2861bf', '63e83b8d-55bf-477d-909f-410273e77f04', '902f6a05-fbb2-4caa-9770-c24eab25acaf', "Very nice storyline", 4);

INSERT INTO `event` (`id`, `privatno`, `naziv`, `pocetak`, `kraj`, `opis`, `aktivno`, `kreator`) VALUES
('45304f71-f5c7-4338-85c3-10204eb3d536', false, 'Potpisivanje knjiga', '2020-09-25', '2020-09-26', 'Slavni autor Milorad Mimi Loop potpisuje knjige u Vulkanu.', 'true', 'loop' ),
('096e4a8a-1828-45a4-b342-869fb9fce637', false, 'Javno citanje', '2020-09-28', '2020-09-30', 'Vece citanja knjiga. Javno citanje knjige Six of Crows', 'true', 'rorynius' );

INSERT INTO `cita` (`korisnikId`, `knjigaId`, `strana`, `cita`) VALUES
('c0bb23cd-d189-4560-af7c-c05ed5371434', 'ffaaaeed-9ac9-4b29-9c54-eade7efeed6d', 180, 1),
('63e83b8d-55bf-477d-909f-410273e77f04', 'ffaaaeed-9ac9-4b29-9c54-eade7efeed6d', 200, 1),
('c0bb23cd-d189-4560-af7c-c05ed5371434', '902f6a05-fbb2-4caa-9770-c24eab25acaf', 50, 1);

COMMIT;
