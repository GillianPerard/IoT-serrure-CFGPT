-- --------------------------------------------------------
-- Hôte :                        127.0.0.1
-- Version du serveur:           5.6.17 - MySQL Community Server (GPL)
-- SE du serveur:                Win64
-- HeidiSQL Version:             9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
-- Export de données de la table cfgpt_db.connectedobjects : ~8 rows (environ)
/*!40000 ALTER TABLE `connectedobjects` DISABLE KEYS */;
INSERT INTO `connectedobjects` (`name`, `token`, `state`, `id`, `createdAt`, `updatedAt`) VALUES
	('Porte Entrée', 'fefedeizzef84zfse8fz', 'fermé', 1, '2015-10-23 13:53:51', '2015-10-23 13:53:52'),
	('Garage', 'efrzed755dez8ez4se', 'fermé', 2, '2015-10-23 13:55:05', '2015-10-23 13:55:06'),
	('Cuisine', 'efzfsef5sfe554f8ef48', 'fermé', 3, '2015-10-23 13:55:58', '2015-10-23 13:55:59'),
	('MiniBar', 'ezf5ed5dzqd1de4ee', 'fermé', 4, '2015-10-23 13:56:33', '2015-10-23 13:56:33'),
	('Bureaux', 'uujgjjgjg5jggj4y7ky4d', 'fermé', 5, '2015-10-23 13:57:13', '2015-10-23 13:57:13'),
	('Batiment', 'hukyubnknk4jb84yuj4', 'fermé', 6, '2015-10-23 13:57:45', '2015-10-23 13:57:45'),
	('SalleServeur', 'gjbunkyk4kny8k4nyb8', 'fermé', 7, '2015-10-23 13:58:29', '2015-10-23 13:58:29'),
	('PlacardSecurisé', 'unyiunkjjnynjb8jb4y8b', 'fermé', 8, '2015-10-23 13:59:07', '2015-10-23 13:59:08'),
	('NouvelleSerrure', 'ezffsgkdzzekkdeob4y8b', 'fermé', 9, '2015-10-23 13:59:17', '2015-10-23 13:59:18');
/*!40000 ALTER TABLE `connectedobjects` ENABLE KEYS */;

-- Export de données de la table cfgpt_db.connectedobjects_groups__groups_connectedobjects : ~8 rows (environ)
/*!40000 ALTER TABLE `connectedobjects_groups__groups_connectedobjects` DISABLE KEYS */;
INSERT INTO `connectedobjects_groups__groups_connectedobjects` (`id`, `connectedobjects_groups`, `groups_connectedobjects`) VALUES
	(1, 1, 1),
	(2, 2, 1),
	(3, 3, 1),
	(4, 4, 1),
	(5, 5, 2),
	(6, 6, 2),
	(7, 7, 2),
	(8, 8, 2);
/*!40000 ALTER TABLE `connectedobjects_groups__groups_connectedobjects` ENABLE KEYS */;

-- Export de données de la table cfgpt_db.groups : ~2 rows (environ)
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` (`name`, `parentgroup`, `id`, `createdAt`, `updatedAt`) VALUES
	('FamilleBouvier', NULL, 1, '2015-10-23 14:22:37', '2015-10-23 14:22:38'),
	('EntrepriseSoftPerf', NULL, 2, '2015-10-23 14:22:47', '2015-10-23 14:22:48');
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;

-- Export de données de la table cfgpt_db.groupusers : ~14 rows (environ)
/*!40000 ALTER TABLE `groupusers` DISABLE KEYS */;
INSERT INTO `groupusers` (`user`, `group`, `is_admin`, `is_to_call`, `id`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 1, 1, 8, '2015-10-23 14:24:50', '2015-10-23 14:25:05'),
	(2, 1, 0, 1, 9, '2015-10-23 14:25:54', '2015-10-23 14:26:10'),
	(3, 1, 0, 0, 10, '2015-10-23 14:24:50', '2015-10-23 14:25:06'),
	(4, 1, 0, 0, 11, '2015-10-23 14:25:51', '2015-10-23 14:26:06'),
	(5, 2, 1, 1, 12, '2015-10-23 14:24:51', '2015-10-23 14:25:07'),
	(6, 2, 0, 0, 13, '2015-10-23 14:25:51', '2015-10-23 14:24:07'),
	(7, 2, 0, 1, 14, '2015-10-23 14:25:52', '2015-10-23 14:26:07');
/*!40000 ALTER TABLE `groupusers` ENABLE KEYS */;

-- Export de données de la table cfgpt_db.logs : ~0 rows (environ)
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;
INSERT INTO `logs` (`connectedobject`, `user`, `date`, `state`, `content`, `id`, `createdAt`, `updatedAt`) VALUES
	(1, 2, '2015-10-23 14:31:07', 'Ouvert', 'RAS', 1, NULL, NULL),
	(2, 2, '2015-10-23 14:31:16', 'Ouvert', 'Communication anormalement longue', 2, NULL, NULL),
	(2, 2, '2015-10-23 14:31:20', 'Fermé', 'Communication anormalement longue', 3, NULL, NULL),
	(1, 4, '2015-10-23 14:31:23', 'Ferm', 'RAS', 4, NULL, NULL),
	(1, 1, '2015-10-23 14:31:25', 'Ouvert', 'RAS', 5, NULL, NULL),
	(1, 3, '2015-10-23 14:31:29', 'Fermé', 'RAS', 6, NULL, NULL),
	(3, 4, '2015-10-23 14:31:31', 'Ouvert', 'RAS', 7, NULL, NULL),
	(3, 4, '2015-10-23 14:31:34', 'Fermé', 'RAS', 8, NULL, NULL),
	(5, 5, '2015-10-23 14:31:36', 'Ouvert', 'RAS', 9, NULL, NULL),
	(8, 5, '2015-10-23 14:31:38', 'Ouvert', 'RAS', 10, NULL, NULL),
	(8, 5, '2015-10-23 14:31:41', 'Fermé', 'RAS', 11, NULL, NULL),
	(5, 6, '2015-10-23 14:31:43', 'Fermé', 'RAS', 12, NULL, NULL);
/*!40000 ALTER TABLE `logs` ENABLE KEYS */;

-- Export de données de la table cfgpt_db.users : ~7 rows (environ)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`firstname`, `lastname`, `email`, `password`, `id`, `createdAt`, `updatedAt`) VALUES
	('fred', 'Bouvier', 'fred.bouvier@familys.com', '$2a$10$QMmgZKw57qNIBEtGXtMPMuV5y98HGzJiOck/EdGxUzHoqcOeEtA0C', 1, '2015-10-23 14:21:11', '2015-10-23 14:20:31'),
	('berthe', 'Bouvier', 'berthe.bouvier@familys.com', '$2a$10$QMmgZKw57qNIBEtGXtMPMuV5y98HGzJiOck/EdGxUzHoqcOeEtA0C', 2, '2015-10-23 14:21:13', '2015-10-23 14:20:32'),
	('tommy', 'Bouvier', 'tommy.bouvier@hotmail.com', '$2a$10$QMmgZKw57qNIBEtGXtMPMuV5y98HGzJiOck/EdGxUzHoqcOeEtA0C', 3, '2015-10-23 14:20:14', '2015-10-23 14:21:35'),
	('lise', 'Bouvier', 'lise.bouvier@hotmail.com', '$2a$10$QMmgZKw57qNIBEtGXtMPMuV5y98HGzJiOck/EdGxUzHoqcOeEtA0C', 4, '2015-10-23 14:21:15', '2015-10-23 14:21:36'),
	('thomas', 'Uquel', 'thomas.uquel@softperf.fr', '$2a$10$QMmgZKw57qNIBEtGXtMPMuV5y98HGzJiOck/EdGxUzHoqcOeEtA0C', 5, '2015-10-23 14:21:16', '2015-10-23 14:21:37'),
	('franck', 'Kes', 'franck.kes@softperf.fr', '$2a$10$QMmgZKw57qNIBEtGXtMPMuV5y98HGzJiOck/EdGxUzHoqcOeEtA0C', 6, '2015-10-23 14:20:16', '2015-10-23 14:21:38'),
	('vanessa', 'Sanka', 'vanessa.sanka@softperf.fr', '$2a$10$QMmgZKw57qNIBEtGXtMPMuV5y98HGzJiOck/EdGxUzHoqcOeEtA0C', 7, '2015-10-23 14:21:17', '2015-10-23 14:21:39');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
