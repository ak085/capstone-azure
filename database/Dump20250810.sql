CREATE DATABASE  IF NOT EXISTS `capstone` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `capstone`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: capstone
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `catid` int NOT NULL AUTO_INCREMENT,
  `catname` varchar(60) NOT NULL,
  `catdescription` varchar(100) NOT NULL,
  PRIMARY KEY (`catid`),
  UNIQUE KEY `CategoryName_UNIQUE` (`catname`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'formal shirt','office wear long sleeve shirts'),(2,'formal pants','office wear long pants without belt'),(3,'casual shirt','general shirts for everyday wear'),(4,'casual pants','daily wear trousers for outings'),(5,'sleepwear pants','pants to wear before going to bed to feel comfortable'),(6,'sports pants','active and frequent use light weight outdoor pants'),(7,'sleepwear shirt','comfy top to wear to have relaxing sleep'),(8,'tennis shirt','tennis top to wear for peak performance'),(9,'tennis pants','tennis shorts for agile movement');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fashion_product`
--

DROP TABLE IF EXISTS `fashion_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fashion_product` (
  `productid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(150) NOT NULL,
  `brand` varchar(60) NOT NULL,
  `imageurl` varchar(100) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `catid` int NOT NULL,
  PRIMARY KEY (`productid`),
  KEY `fk_catid_idx` (`catid`),
  CONSTRAINT `fk_catid` FOREIGN KEY (`catid`) REFERENCES `category` (`catid`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fashion_product`
--

LOCK TABLES `fashion_product` WRITE;
/*!40000 ALTER TABLE `fashion_product` DISABLE KEYS */;
INSERT INTO `fashion_product` VALUES (1,'blue office shirt 1','long sleeve collared plain','G2000','https://myhostingsite.com/image2.png','2025-06-15 08:31:00',1),(2,'black office pants 1','long dark silk material','G2000','https://myhostingsite.com/image3.png','2025-06-15 08:34:35',2),(3,'floral t shirt','short sleeve round neck floral pattern','billabong','https://myhostingsite.com/image1.png','2025-06-15 08:36:17',3),(4,'black office shirt 1','short sleeve collared striped','Crocodile','https://myhostingsite.com/image4.png','2025-06-15 13:52:15',1),(5,'floral three quarter pants','floral pattern cooling bottoms','billabong','https://myhostingsite.com/image5.png','2025-06-16 13:34:14',4),(6,'striped long bedroom pants','animal prints baggy wool material','My sleepy time','https://myhostingsite.com/image6.png','2025-06-17 13:53:24',5),(7,'floral short bedroom pants','colorful flowers soft silk material','My napping time','https://myhostingsite.com/image7.png','2025-06-21 15:54:33',5),(8,'colorful long sleeve bedroom shirt','baggy penguin prints thin material','My napping time','https://myhostingsite.com/image8.png','2025-06-23 13:14:21',7),(23,'unique design bedroom shirt','mount fuji patterns on traditional cloth','Best of Japan','https://myhostingsite.com/image9.png','2025-07-14 12:36:11',7),(30,'Test product 2 update 1','Description for test product 2 update 1','Test brand 2 update 1','image2.png','2025-08-10 05:40:31',7);
/*!40000 ALTER TABLE `fashion_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL,
  `password` varchar(256) NOT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (7,'angelina@ymail.com','angelina','Admin','$2b$10$2ag0CemIJG1MvcVpIBApZObZj73.loUlAI53R3OOSzvor2J.RmoiG'),(8,'austin@ymail.com','austin','Admin','$2b$10$UQ.eS/NmP1/aEuCfWJnqt.xRe2UvDksZ3jYRoK5rzKjjSmMcMTz0y'),(9,'brandon@ymail.com','brandon','Member','$2b$10$yRymLWPPArM5b7bVYDslv.6FNGCkfr6Jbx0/nxwbF4dQ0S1ul.3WC'),(10,'belinda@ymail.com','belinda','Member','$2b$10$5r5vBhKFTiJ7EG9RAVnrkOL2KIuDzhaWVoCDJn2nfUpNIg6EDG.GW'),(11,'charmaine@ymail.com','charmaine','Admin','$2b$10$w6cnYPKe8huUudB4AKG5d.xxYud5s6t2fawQZF14C0H9KlzpKl5aa'),(12,'collin@ymail.com','collin','Admin','$2b$10$C4i.vrW7ETmxjbfaevaebu/UMgfVlg2aBVowPhOqSF4bzCfpPT5Mm');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'capstone'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-10 17:21:59
