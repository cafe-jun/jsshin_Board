-- MySQL dump 10.13  Distrib 8.0.28, for macos12.2 (arm64)
--
-- Host: localhost    Database: jsshin_Board
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Board`
--

DROP TABLE IF EXISTS `Board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Board` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `body` text,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `idx_ft_title_and_body` (`title`,`body`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Board`
--

LOCK TABLES `Board` WRITE;
/*!40000 ALTER TABLE `Board` DISABLE KEYS */;
INSERT INTO `Board` VALUES (1,'MySQL Tutorial','DBMS stands for DataBase ... DBMS stands for DataBase ... DBMS stands for DataBase ...','2023-05-13 07:44:57'),(2,'How To Use MySQL Well','After you went through a ...','2023-05-13 07:44:57'),(3,'Optimizing MySQL','In this tutorial we will show ...','2023-05-13 07:44:57'),(4,'1001 MySQL Tricks','1. Never run mysqld as root. 2. ...','2023-05-13 07:44:57'),(5,'MySQL vs. YourSQL','In the following database comparison ...','2023-05-13 07:44:57'),(6,'MySQL Security','When configured properly, MySQL ...','2023-05-13 07:44:57'),(7,'광해, 왕이 된 남자','왕위를 둘러싼 권력 다툼과 당쟁으로 혼란이 극에 달한 광해군 8년 MySQL','2023-05-13 07:44:57'),(8,'간첩','남한 내에 고장간첩 5만 명이 암약하고 있으며 특히 권력 핵심부에도 침투해있다. MySQL','2023-05-13 07:44:57'),(9,'피에타',' 더 나쁜 남자가 온다! 잔혹한 방법으로 돈을 뜯어내는 악마같은 남자 스토리. MySQL','2023-05-13 07:44:57'),(10,'레지던트 이블 5','인류 구원의 마지막 퍼즐, 이 여자가 모든 것을 끝낸다.','2023-05-13 07:44:57'),(11,'파괴자들','사랑은 모든 것을 파괴한다! 한 여자를 구하기 위한, 두 남자의 잔인한 액션 본능!','2023-05-13 07:44:57'),(12,'킹콩을 들다',' 역도에 목숨을 건 시골소녀들이 만드는 기적 같은 신화.','2023-05-13 07:44:57'),(13,'테드','지상최대 황금찾기 프로젝트! 500년 전 사라진 황금도시를 찾아라!','2023-05-13 07:44:57'),(14,'타이타닉','비극 속에 침몰한 세기의 사랑, 스크린에 되살아날 영원한 감동','2023-05-13 07:44:57'),(15,'8월의 크리스마스','시한부 인생 사진사와 여자 주차 단속원과의 미묘한 사랑','2023-05-13 07:44:57'),(16,'늑대와 춤을','늑대와 친해져 모닥불 아래서 함께 춤을 추는 전쟁 영웅 이야기','2023-05-13 07:44:57'),(17,'국가대표','동계올림픽 유치를 위해 정식 종목인 스키점프 국가대표팀이 급조된다.','2023-05-13 07:44:57'),(18,'쇼생크 탈출','그는 누명을 쓰고 쇼생크 감옥에 감금된다. 그리고 역사적인 탈출','2023-05-13 07:44:57'),(19,'인생은 아름다워','귀도는 삼촌의 호텔에서 웨이터로 일하면서 또 다시 도라를 만난다.','2023-05-13 07:44:57'),(20,'사운드 오브 뮤직','수녀 지망생 마리아는 명문 트랩가의 가정교사로 들어간다','2023-05-13 07:44:57'),(21,'매트릭스',' 2199년.인공 두뇌를 가진 컴퓨터가 지배하는 세계.','2023-05-13 07:44:57'),(60,'MYSQL 너무 좋아요','MYSQL 광해,연산군,이 너무 보고 싶어요너무너무 좋다 123123','2023-05-13 07:53:51'),(61,'MYSQL 너무 좋아요','MYSQL 광해,연산군,이 너무 보고 싶어요너무너무 좋다 123123','2023-05-13 23:24:05'),(62,'광해군','광해군 멋져요','2023-05-14 05:50:49'),(63,'광해군','광해군 멋져요','2023-05-14 05:52:18'),(64,'MYSQL로 등록하기','MYSQL로 등록하기','2023-05-14 06:01:35'),(65,'킹공을 들었다','킹콩 영화 보고싶다','2023-05-14 06:34:47'),(66,'킹콩 들었다 ','킹콩 영화를 보고 싶다','2023-05-14 06:35:16'),(67,'광해 영화 정말 재밌다','광해 광해군','2023-05-14 06:52:56');
/*!40000 ALTER TABLE `Board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Board_MYISAM_Statistics`
--

DROP TABLE IF EXISTS `Board_MYISAM_Statistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Board_MYISAM_Statistics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `body` text,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `originBoardId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `idx_mylsam_ft_title_and_body` (`title`,`body`)
) ENGINE=MyISAM AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Board_MYISAM_Statistics`
--

LOCK TABLES `Board_MYISAM_Statistics` WRITE;
/*!40000 ALTER TABLE `Board_MYISAM_Statistics` DISABLE KEYS */;
INSERT INTO `Board_MYISAM_Statistics` VALUES (1,'MySQL Tutorial','DBMS stands for DataBase ... DBMS stands for DataBase ... DBMS stands for DataBase ...','2023-05-13 00:40:23',1),(2,'How To Use MySQL Well','After you went through a ...','2023-05-13 00:40:23',2),(3,'Optimizing MySQL','In this tutorial we will show ...','2023-05-13 00:40:23',3),(4,'1001 MySQL Tricks','1. Never run mysqld as root. 2. ...','2023-05-13 00:40:23',4),(5,'MySQL vs. YourSQL','In the following database comparison ...','2023-05-13 00:40:23',5),(6,'MySQL Security','When configured properly, MySQL ...','2023-05-13 00:40:23',6),(7,'광해, 왕이 된 남자','왕위를 둘러싼 권력 다툼과 당쟁으로 혼란이 극에 달한 광해군 8년 MySQL','2023-05-13 00:40:23',7),(8,'간첩','남한 내에 고장간첩 5만 명이 암약하고 있으며 특히 권력 핵심부에도 침투해있다. MySQL','2023-05-13 00:40:23',8),(9,'피에타',' 더 나쁜 남자가 온다! 잔혹한 방법으로 돈을 뜯어내는 악마같은 남자 스토리. MySQL','2023-05-13 00:40:23',9),(10,'레지던트 이블 5','인류 구원의 마지막 퍼즐, 이 여자가 모든 것을 끝낸다.','2023-05-13 00:40:23',10),(11,'파괴자들','사랑은 모든 것을 파괴한다! 한 여자를 구하기 위한, 두 남자의 잔인한 액션 본능!','2023-05-13 00:40:23',11),(12,'킹콩을 들다',' 역도에 목숨을 건 시골소녀들이 만드는 기적 같은 신화.','2023-05-13 00:40:23',12),(13,'테드','지상최대 황금찾기 프로젝트! 500년 전 사라진 황금도시를 찾아라!','2023-05-13 00:40:23',13),(14,'타이타닉','비극 속에 침몰한 세기의 사랑, 스크린에 되살아날 영원한 감동','2023-05-13 00:40:23',14),(15,'8월의 크리스마스','시한부 인생 사진사와 여자 주차 단속원과의 미묘한 사랑','2023-05-13 00:40:23',15),(16,'늑대와 춤을','늑대와 친해져 모닥불 아래서 함께 춤을 추는 전쟁 영웅 이야기','2023-05-13 00:40:23',16),(17,'국가대표','동계올림픽 유치를 위해 정식 종목인 스키점프 국가대표팀이 급조된다.','2023-05-13 00:40:23',17),(18,'쇼생크 탈출','그는 누명을 쓰고 쇼생크 감옥에 감금된다. 그리고 역사적인 탈출','2023-05-13 00:40:23',18),(19,'인생은 아름다워','귀도는 삼촌의 호텔에서 웨이터로 일하면서 또 다시 도라를 만난다.','2023-05-13 00:40:23',19),(20,'사운드 오브 뮤직','수녀 지망생 마리아는 명문 트랩가의 가정교사로 들어간다','2023-05-13 00:40:23',20),(21,'매트릭스',' 2199년.인공 두뇌를 가진 컴퓨터가 지배하는 세계.','2023-05-13 00:40:23',21),(60,'MYSQL 너무 좋아요','MYSQL 광해,연산군,이 너무 보고 싶어요너무너무 좋다 123123','2023-05-13 07:53:51',60),(61,'MYSQL 너무 좋아요','MYSQL 광해,연산군,이 너무 보고 싶어요너무너무 좋다 123123','2023-05-13 23:24:05',61),(62,'광해군','광해군 멋져요','2023-05-14 05:50:49',62),(63,'광해군','광해군 멋져요','2023-05-14 05:52:18',63),(64,'MYSQL로 등록하기','MYSQL로 등록하기','2023-05-14 06:01:35',64),(65,'킹공을 들었다','킹콩 영화 보고싶다','2023-05-14 06:34:47',65),(66,'킹콩 들었다 ','킹콩 영화를 보고 싶다','2023-05-14 06:35:16',66),(67,'광해 영화 정말 재밌다','광해 광해군','2023-05-14 06:52:56',67);
/*!40000 ALTER TABLE `Board_MYISAM_Statistics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RelatedBoard`
--

DROP TABLE IF EXISTS `RelatedBoard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RelatedBoard` (
  `id` int NOT NULL AUTO_INCREMENT,
  `boardId` int DEFAULT NULL,
  `relatedBoardId` int DEFAULT NULL,
  `score` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `RelatedBoard_Board_Id_FK` (`relatedBoardId`),
  KEY `RelatedBoard_board_boardId_FK` (`boardId`),
  CONSTRAINT `RelatedBoard_board_boardId_FK` FOREIGN KEY (`boardId`) REFERENCES `Board` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `RelatedBoard_board_relatedBoardId_FK` FOREIGN KEY (`relatedBoardId`) REFERENCES `Board` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=243 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RelatedBoard`
--

LOCK TABLES `RelatedBoard` WRITE;
/*!40000 ALTER TABLE `RelatedBoard` DISABLE KEYS */;
INSERT INTO `RelatedBoard` VALUES (237,60,7,2),(238,61,60,9),(239,61,7,2),(240,63,62,2),(241,66,65,2),(242,67,7,2);
/*!40000 ALTER TABLE `RelatedBoard` ENABLE KEYS */;
UNLOCK TABLES;

SET GLOBAL innodb_ft_aux_table = 'jsshin_Board/Board';

SET GLOBAL innodb_optimize_fulltext_only=ON;

--
-- Dumping routines for database 'jsshin_Board'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-14 19:54:27
