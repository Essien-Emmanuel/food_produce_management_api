--Table structure for Produce_tbl--
--
CREATE TABLE Produce_tbl (
    id INT AUTO_INCREMENT NOT NULL,
    producename VARCHAR(50) NOT NULL,
    status INT NOT NULL,
    statusname VARCHAR(50) DEFAULT NULL,
    color VARCHAR(50) NOT NULL,
    hexcolor VARCHAR(50),
    unit1 VARCHAR(50) DEFAULT NULL,
    unit2 VARCHAR(50) DEFAULT NULL,
    conversionrate DECIMAL(18, 2) NOT NULL DEFAULT 0.00,
    produceimageurl VARCHAR(255),
    produceimageid VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);
--
--Table structure for Market_tbl--
--
CREATE TABLE Market_tbl (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    size INT,
    type VARCHAR(20),
    address VARCHAR(255),
    description TEXT,
    marketimageurl TEXT,
    marketimageid VARCHAR(50),
    LgaId INT,
    StateId INT,
    CountryId INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY(LgaId) REFERENCES LGA_tbl(id) ON DELETE CASCADE,
    FOREIGN KEY(StateId) REFERENCES States_tbl(id) ON DELETE CASCADE,
    FOREIGN KEY(CountryId) REFERENCES Country_tbl(id) ON DELETE CASCADE
);
--
--Table structure for MarketProduce_tbl--
--
CREATE TABLE MarketProduce_tbl (
    produce_id INT,
    market_id INT,
    price FLOAT,
    unit1 VARCHAR(20),
    unit2 VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(produce_id, market_id),
    FOREIGN KEY(produce_id) REFERENCES Produce_tbl(id) ON DELETE CASCADE,
    FOREIGN KEY(market_id) REFERENCES Market_tbl(id) ON DELETE CASCADE
);
--
--Table structure for table ProduceImage_tbl
--
CREATE TABLE ProduceImage_tbl (
    id INT NOT NULL AUTO_INCREMENT,
    imageurl TEXT,
    imageid VARCHAR(50),
    produce_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY(produce_id) REFERENCES Produce_tbl(id) ON DELETE CASCADE
);
--
--Table structure for table MarketImage_tbl
CREATE TABLE MarketImage_tbl (
    id INT NOT NULL AUTO_INCREMENT,
    imageurl TEXT,
    imageid VARCHAR(50),
    market_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY(market_id) REFERENCES Market_tbl(id) ON DELETE CASCADE
);
--
-- Table structure for table `LGA_tbl`
--
DROP TABLE IF EXISTS `LGA_tbl`;
CREATE TABLE IF NOT EXISTS `LGA_tbl` (
    `id` int NOT NULL AUTO_INCREMENT,
    `stateid` int NOT NULL,
    `lganame` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    `status` int NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 812 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
--
-- Dumping data for table `LGA_tbl`
--
INSERT INTO `LGA_tbl` (`id`, `stateid`, `lganame`, `status`)
VALUES (43, 1, 'Aba North', 1),
    (44, 1, 'Aba South', 1),
    (45, 1, 'Arochukwu', 1),
    (46, 1, 'Bende', 1),
    (47, 1, 'Ikwuano', 1),
    (48, 1, 'Isiala Ngwa North', 1),
    (49, 1, 'Isiala Ngwa South', 1),
    (50, 1, 'Isuikwuato', 1),
    (51, 1, 'Obi Ngwa', 1),
    (52, 1, 'Ohafia', 1),
    (53, 1, 'Osisioma Ngwa', 1),
    (54, 1, 'Ugwunagbo', 1),
    (55, 1, 'Ukwa East', 1),
    (56, 1, 'Ukwa West', 1),
    (57, 1, 'Umuahia North', 1),
    (58, 1, 'Umuahia South', 1),
    (59, 1, 'Umu Nneochi', 1),
    (60, 3, 'Demsa', 1),
    (61, 3, 'Fufore', 1),
    (62, 3, 'Ganye', 1),
    (63, 3, 'Girei', 1),
    (64, 3, 'Gombi', 1),
    (65, 3, 'Guyuk', 1),
    (66, 3, 'Hong', 1),
    (67, 3, 'Jada', 1),
    (68, 3, 'Lamurde', 1),
    (69, 3, 'Madagali', 1),
    (70, 3, 'Maiha', 1),
    (71, 3, 'Mayo-Belwa', 1),
    (72, 3, 'Michika', 1),
    (73, 3, 'Mubi North', 1),
    (74, 3, 'Mubi South', 1),
    (75, 3, 'Numan', 1),
    (76, 3, 'Shelleng', 1),
    (77, 3, 'Song', 1),
    (78, 3, 'Toungo', 1),
    (79, 3, 'Yola North', 1),
    (80, 3, 'Yola South', 1),
    (81, 4, 'Onna', 1),
    (82, 4, 'Oron', 1),
    (83, 4, 'Oruk Anam', 1),
    (84, 4, 'Ukanafun', 1),
    (85, 4, 'Udung-Uko', 1),
    (86, 4, 'Uruan', 1),
    (87, 4, 'Urue-Offong/Oruko', 1),
    (88, 4, 'Uyo', 1),
    (89, 4, 'Abak', 1),
    (90, 4, 'Eastern Obolo', 1),
    (91, 4, 'Eket', 1),
    (92, 4, 'Esit-Eket', 1),
    (93, 4, 'Essien Udim', 1),
    (94, 4, 'Etim-Ekpo', 1),
    (95, 4, 'Etinan', 1),
    (96, 4, 'Ibeno', 1),
    (97, 4, 'Ibesikpo-Asutan', 1),
    (98, 4, 'Ibiono-Ibom', 1),
    (99, 4, 'Ika', 1),
    (100, 4, 'Ikono', 1),
    (101, 4, 'Ikot Abasi', 1),
    (102, 4, 'Ikot Ekpene', 1),
    (103, 4, 'Ini', 1),
    (104, 4, 'Itu', 1),
    (105, 4, 'Mbo', 1),
    (106, 4, 'Mkpat-Enin', 1),
    (107, 4, 'Nsit-Atai', 1),
    (108, 4, 'Nsit-Ibom', 1),
    (109, 4, 'Nsit-Ubium', 1),
    (110, 4, 'Obot-Akara', 1),
    (111, 4, 'Okobo', 1),
    (112, 5, 'Oyi', 1),
    (113, 5, 'Orumba South', 1),
    (114, 5, 'Orumba North', 1),
    (115, 5, 'Onitsha South', 1),
    (116, 5, 'Onitsha North', 1),
    (117, 5, 'Ogbaru', 1),
    (118, 5, 'Nnewi South', 1),
    (119, 5, 'Nnewi North', 1),
    (120, 5, 'Njikoka', 1),
    (121, 5, 'Ihiala', 1),
    (122, 5, 'Idemili South', 1),
    (123, 5, 'Idemili North', 1),
    (124, 5, 'Ekwusigo', 1),
    (125, 5, 'Dunukofia', 1),
    (126, 5, 'Ayamelum', 1),
    (127, 5, 'Anaocha', 1),
    (128, 5, 'Anambra West', 1),
    (129, 5, 'Anambra East', 1),
    (130, 5, 'Awka South', 1),
    (131, 5, 'Awka North', 1),
    (132, 5, 'Aguata', 1),
    (133, 6, 'Bauchi', 1),
    (134, 6, 'Tafawa Balewa', 1),
    (135, 6, 'Dass', 1),
    (136, 6, 'Toro', 1),
    (137, 6, 'Bogoro', 1),
    (138, 6, 'Ningi', 1),
    (139, 6, 'Warji', 1),
    (140, 6, 'Ganjuwa', 1),
    (141, 6, 'Kirfi', 1),
    (142, 6, 'Alkaleri', 1),
    (143, 6, 'Darazo', 1),
    (144, 6, 'Misau', 1),
    (145, 6, 'Giade', 1),
    (146, 6, 'Shira', 1),
    (147, 6, 'Jama\'are', 1),
    (148, 6, 'Katagum', 1),
    (149, 6, 'Itas/Gadau', 1),
    (150, 6, 'Gamawa', 1),
    (151, 6, 'Damban', 1),
    (152, 7, 'Brass', 1),
    (153, 7, 'Ekeremor', 1),
    (154, 7, 'Kolokuma/Opokuma', 1),
    (155, 7, 'Nembe', 1),
    (156, 7, 'Ogbia', 1),
    (157, 7, 'Sagbama', 1),
    (158, 7, 'Southern Ijaw', 1),
    (159, 7, 'Yenagoa', 1),
    (160, 8, 'Ado', 1),
    (161, 8, 'Agatu', 1),
    (162, 8, 'Apa', 1),
    (163, 8, 'Buruku', 1),
    (164, 8, 'Gboko', 1),
    (165, 8, 'Guma', 1),
    (166, 8, 'Gwer East', 1),
    (167, 8, 'Gwer West', 1),
    (168, 8, 'Katsina-Ala', 1),
    (169, 8, 'Konshisha', 1),
    (170, 8, 'Kwande', 1),
    (171, 8, 'Logo', 1),
    (172, 8, 'Makurdi', 1),
    (173, 8, 'Obi', 1),
    (174, 8, 'Ogbadibo', 1),
    (175, 8, 'Ohimini', 1),
    (176, 8, 'Oju', 1),
    (177, 8, 'Okpokwu', 1),
    (178, 8, 'Otukpo', 1),
    (179, 8, 'Tarka', 1),
    (180, 8, 'Ukum', 1),
    (181, 8, 'Ushongo', 1),
    (182, 8, 'Vandeikya', 1),
    (183, 9, 'Nganzai', 1),
    (184, 9, 'Shani', 1),
    (185, 9, 'Abadan', 1),
    (186, 9, 'Askira/Uba', 1),
    (187, 9, 'Bama', 1),
    (188, 9, 'Bayo', 1),
    (189, 9, 'Biu', 1),
    (190, 9, 'Chibok', 1),
    (191, 9, 'Damboa', 1),
    (192, 9, 'Dikwagubio', 1),
    (193, 9, 'Guzamala', 1),
    (194, 9, 'Gwoza', 1),
    (195, 9, 'Hawul', 1),
    (196, 9, 'Jere', 1),
    (197, 9, 'Kaga', 1),
    (198, 9, 'Kalka/Balge', 1),
    (199, 9, 'Konduga', 1),
    (200, 9, 'Kukawa', 1),
    (201, 9, 'Kwaya-ku', 1),
    (202, 9, 'Mafa', 1),
    (203, 9, 'Magumeri', 1),
    (204, 9, 'Maiduguri', 1),
    (205, 9, 'Marte', 1),
    (206, 9, 'Mobbar', 1),
    (207, 9, 'Monguno', 1),
    (208, 9, 'Ngala', 1),
    (209, 10, 'Abi', 1),
    (210, 10, 'Akamkpa', 1),
    (211, 10, 'Akpabuyo', 1),
    (212, 10, 'Bakassi', 1),
    (213, 10, 'Bekwarra', 1),
    (214, 10, 'Biase', 1),
    (215, 10, 'Boki', 1),
    (216, 10, 'Calabar Municipal', 1),
    (217, 10, 'Calabar South', 1),
    (218, 10, 'Etung', 1),
    (219, 10, 'Ikom', 1),
    (220, 10, 'Obanliku', 1),
    (221, 10, 'Obubra', 1),
    (222, 10, 'Obudu', 1),
    (223, 10, 'Odukpani', 1),
    (224, 10, 'Ogoja', 1),
    (225, 10, 'Yakuur', 1),
    (226, 10, 'Yala', 1),
    (227, 11, 'Aniocha south', 1),
    (228, 11, 'Anioha', 1),
    (229, 11, 'Bomadi', 1),
    (230, 11, 'Burutu', 1),
    (231, 11, 'Ethiope West', 1),
    (232, 11, 'Ethiope East', 1),
    (233, 11, 'Ika South', 1),
    (234, 11, 'Ika North', 1),
    (235, 11, 'Isoko South', 1),
    (236, 11, 'Isoko North', 1),
    (237, 11, 'Ndokwa East', 1),
    (238, 11, 'Ndokwa West', 1),
    (239, 11, 'Okpe', 1),
    (240, 11, 'Oshimili North', 1),
    (241, 11, 'Oshimili South', 1),
    (242, 11, 'Patani', 1),
    (243, 11, 'Sapele', 1),
    (244, 11, 'Udu', 1),
    (245, 11, 'Ughelli South', 1),
    (246, 11, 'Ughelli North', 1),
    (247, 11, 'Ukwuani', 1),
    (248, 11, 'Uviwie', 1),
    (249, 11, 'Warri Central', 1),
    (250, 11, 'Warri North', 1),
    (251, 11, 'Warri South', 1),
    (252, 12, 'Abakaliki', 1),
    (253, 12, 'Afikpo North', 1),
    (254, 12, 'Afikpo South (Edda)', 1),
    (255, 12, 'Ebonyi', 1),
    (256, 12, 'Ezza North', 1),
    (257, 12, 'Ezza South', 1),
    (258, 12, 'Ikwo', 1),
    (259, 12, 'Ishielu', 1),
    (260, 12, 'Ivo', 1),
    (261, 12, 'Izzi', 1),
    (262, 12, 'Ohaozara', 1),
    (263, 12, 'Ohaukwu', 1),
    (264, 12, 'Onicha', 1),
    (265, 15, 'Aninri', 1),
    (266, 15, 'Awgu', 1),
    (267, 15, 'Enugu East', 1),
    (268, 15, 'Enugu North', 1),
    (269, 15, 'Enugu South', 1),
    (270, 15, 'Ezeagu', 1),
    (271, 15, 'Igbo Etiti', 1),
    (272, 15, 'Igbo Eze North', 1),
    (273, 15, 'Igbo Eze South', 1),
    (274, 15, 'Isi Uzo', 1),
    (275, 15, 'Nkanu East', 1),
    (276, 15, 'Nkanu West', 1),
    (277, 15, 'Nsukka', 1),
    (278, 15, 'Oji River', 1),
    (279, 15, 'Udenu', 1),
    (280, 15, 'Udi', 1),
    (281, 15, 'Uzo-Uwani', 1),
    (282, 13, 'Akoko-Edo', 1),
    (283, 13, 'Egor', 1),
    (284, 13, 'Esan Central', 1),
    (285, 13, 'Esan North-East', 1),
    (286, 13, 'Esan South-East', 1),
    (287, 13, 'Esan West', 1),
    (288, 13, 'Etsako Central', 1),
    (289, 13, 'Etsako East', 1),
    (290, 13, 'Etsako West', 1),
    (291, 13, 'Igueben', 1),
    (292, 13, 'Ikpoba-Okha', 1),
    (293, 13, 'Oredo', 1),
    (294, 13, 'Orhionmwon', 1),
    (295, 13, 'Ovia North-East', 1),
    (296, 13, 'Ovia South-East', 1),
    (297, 13, 'Owan East', 1),
    (298, 13, 'Owan West', 1),
    (299, 13, 'Uhunmwonde', 1),
    (300, 14, 'Ado-Ekiti', 1),
    (301, 14, 'Ikere', 1),
    (302, 14, 'Oye', 1),
    (303, 14, 'Aiyekire (Gbonyin)', 1),
    (304, 14, 'Efon', 1),
    (305, 14, 'Ekiti East', 1),
    (306, 14, 'Ekiti South-West', 1),
    (307, 14, 'Ekiti West', 1),
    (308, 14, 'Emure', 1),
    (309, 14, 'Ido-Osi', 1),
    (310, 14, 'Ijero', 1),
    (311, 14, 'Ikole', 1),
    (312, 14, 'Ilejemeje', 1),
    (313, 14, 'Irepodun/Ifelodun', 1),
    (314, 14, 'Moba', 1),
    (315, 16, 'Akko', 1),
    (316, 16, 'Balanga', 1),
    (317, 16, 'Billiri', 1),
    (318, 16, 'Dukku', 1),
    (319, 16, 'Dunakaye', 1),
    (320, 16, 'Gombe', 1),
    (321, 16, 'Kaltungo', 1),
    (322, 16, 'Kwami', 1),
    (323, 16, 'Nafada/Bajoga', 1),
    (324, 16, 'Shomgom', 1),
    (325, 16, 'Yamaltu/Deba', 1),
    (326, 17, 'Aboh Mbaise', 1),
    (327, 17, 'Ahiazu Mbaise', 1),
    (328, 17, 'Ehime Mbano', 1),
    (329, 17, 'Ezinihitte Mbaise', 1),
    (330, 17, 'Ideato North', 1),
    (331, 17, 'Ideato South', 1),
    (332, 17, 'Ihitte/Uboma', 1),
    (333, 17, 'Ikeduru', 1),
    (334, 17, 'Isiala Mbano', 1),
    (335, 17, 'Isu', 1),
    (336, 17, 'Mbaitoli', 1),
    (337, 17, 'Ngor Okpala', 1),
    (338, 17, 'Njaba', 1),
    (339, 17, 'Nkwerre', 1),
    (340, 17, 'Nwangele', 1),
    (341, 17, 'Obowo', 1),
    (342, 17, 'Oguta', 1),
    (343, 17, 'Ohaji/Egbema', 1),
    (344, 17, 'Okigwe', 1),
    (345, 17, 'Onuimo', 1),
    (346, 17, 'Orlu', 1),
    (347, 17, 'Orsu', 1),
    (348, 17, 'Oru East', 1),
    (349, 17, 'Oru West', 1),
    (350, 17, 'Owerri Municipal', 1),
    (351, 17, 'Owerri North', 1),
    (352, 17, 'Owerri West', 1),
    (353, 18, 'Miga', 1),
    (354, 18, 'Ringim', 1),
    (355, 18, 'Roni', 1),
    (356, 18, 'Sule Tankarkar', 1),
    (357, 18, 'Taura', 1),
    (358, 18, 'Yankwashi', 1),
    (359, 18, 'Auyo', 1),
    (360, 18, 'Babura', 1),
    (361, 18, 'Biriniwa', 1),
    (362, 18, 'Birnin Kudu', 1),
    (363, 18, 'Buji', 1),
    (364, 18, 'Dutse', 1),
    (365, 18, 'Gagarawa', 1),
    (366, 18, 'Garki', 1),
    (367, 18, 'Gumel', 1),
    (368, 18, 'Guri', 1),
    (369, 18, 'Gwaram', 1),
    (370, 18, 'Gwiwa', 1),
    (371, 18, 'Hadejia', 1),
    (372, 18, 'Jahun', 1),
    (373, 18, 'Kafin Hausa', 1),
    (374, 18, 'Kaugama', 1),
    (375, 18, 'Kazaure', 1),
    (376, 18, 'Kiri Kasama', 1),
    (377, 18, 'Kiyawa', 1),
    (378, 18, 'Maigatari', 1),
    (379, 18, 'Malam Madori', 1),
    (380, 19, 'Birnin Gwari', 1),
    (381, 19, 'Chikun', 1),
    (382, 19, 'Giwa', 1),
    (383, 19, 'Igabi', 1),
    (384, 19, 'Ikara', 1),
    (385, 19, 'Jema\'a', 1),
    (386, 19, 'Jaba', 1),
    (387, 19, 'Kachia', 1),
    (388, 19, 'Kaduna North', 1),
    (389, 19, 'Kaduna South', 1),
    (390, 19, 'Kagarko', 1),
    (391, 19, 'Kajuru', 1),
    (392, 19, 'Kaura', 1),
    (393, 19, 'Kauru', 1),
    (394, 19, 'Kubau', 1),
    (395, 19, 'Kudan', 1),
    (396, 19, 'Lere', 1),
    (397, 19, 'Makarfi', 1),
    (398, 19, 'Sabon Gari', 1),
    (399, 19, 'Soba', 1),
    (400, 19, 'Zangon Kataf', 1),
    (401, 19, 'Zaria', 1),
    (402, 20, 'Kibiya', 1),
    (403, 20, 'Kiru', 1),
    (404, 20, 'Kumbtso', 1),
    (405, 20, 'Kunchi', 1),
    (406, 20, 'Kura', 1),
    (407, 20, 'Madobi', 1),
    (408, 20, 'Makoda', 1),
    (409, 20, 'Minjibir', 1),
    (410, 20, 'Nassarawa', 1),
    (411, 20, 'Rano', 1),
    (412, 20, 'Rimin Gado', 1),
    (413, 20, 'Rogo', 1),
    (414, 20, 'Shanono', 1),
    (415, 20, 'Sumaila', 1),
    (416, 20, 'Takai', 1),
    (417, 20, 'Tarauni', 1),
    (418, 20, 'Tofa', 1),
    (419, 20, 'Tsanyawa', 1),
    (420, 20, 'Tudun Wada', 1),
    (421, 20, 'Ungogo', 1),
    (422, 20, 'Warawa', 1),
    (423, 20, 'Wudil', 1),
    (424, 20, 'Ajingi', 1),
    (425, 20, 'Albasu', 1),
    (426, 20, 'Bagwai', 1),
    (427, 20, 'Bebeji', 1),
    (428, 20, 'Bichi', 1),
    (429, 20, 'Bunkure', 1),
    (430, 20, 'Dala', 1),
    (431, 20, 'Dambatta', 1),
    (432, 20, 'Dawakin Kudu', 1),
    (433, 20, 'Dawakin Tofa', 1),
    (434, 20, 'Doguwa', 1),
    (435, 20, 'Fagge', 1),
    (436, 20, 'Gabasawa', 1),
    (437, 20, 'Garko', 1),
    (438, 20, 'Garun Mallam', 1),
    (439, 20, 'Gaya', 1),
    (440, 20, 'Gezawa', 1),
    (441, 20, 'Gwale', 1),
    (442, 20, 'Gwarzo', 1),
    (443, 20, 'Kabo', 1),
    (444, 20, 'Kano Municipal', 1),
    (445, 20, 'Karaye', 1),
    (446, 21, 'Mashi', 1),
    (447, 21, 'Mani', 1),
    (448, 21, 'Matazu', 1),
    (449, 21, 'Musawa', 1),
    (450, 21, 'RImi', 1),
    (451, 21, 'Sabuwa', 1),
    (452, 21, 'Safana', 1),
    (453, 21, 'Sandamu', 1),
    (454, 21, 'Zango', 1),
    (455, 21, 'Bakori', 1),
    (456, 21, 'Batagarawa', 1),
    (457, 21, 'Batsari', 1),
    (458, 21, 'Baure', 1),
    (459, 21, 'Bindawa', 1),
    (460, 21, 'Charanchi', 1),
    (461, 21, 'Dan Musa', 1),
    (462, 21, 'Dandume', 1),
    (463, 21, 'Danja', 1),
    (464, 21, 'Daura', 1),
    (465, 21, 'Dutsi', 1),
    (466, 21, 'Dutsin-Ma', 1),
    (467, 21, 'Faskari', 1),
    (468, 21, 'Funtua', 1),
    (469, 21, 'Ingawa', 1),
    (470, 21, 'Jibia', 1),
    (471, 21, 'Kafur', 1),
    (472, 21, 'Kaita', 1),
    (473, 21, 'Kankara', 1),
    (474, 21, 'Kankia', 1),
    (475, 21, 'Katsina', 1),
    (476, 21, 'Kurfi', 1),
    (477, 21, 'Kusada', 1),
    (478, 21, 'Mai\'Adua', 1),
    (479, 21, 'Malumfashi', 1),
    (480, 22, 'Aleiro', 1),
    (481, 22, 'Arewa Dandi', 1),
    (482, 22, 'Argungu', 1),
    (483, 22, 'Augie', 1),
    (484, 22, 'Bagudo', 1),
    (485, 22, 'Birnin Kebbi', 1),
    (486, 22, 'Bunza', 1),
    (487, 22, 'Dandi', 1),
    (488, 22, 'Fakai', 1),
    (489, 22, 'Gwandu', 1),
    (490, 22, 'Jega', 1),
    (491, 22, 'Kalgo', 1),
    (492, 22, 'Koko/Besse', 1),
    (493, 22, 'Maiyama', 1),
    (494, 22, 'Ngaski', 1),
    (495, 22, 'Sakaba', 1),
    (496, 22, 'Shanga', 1),
    (497, 22, 'Suru', 1),
    (498, 22, 'Danko/Wasagu', 1),
    (499, 22, 'Yauri', 1),
    (500, 22, 'Zuru', 1),
    (501, 23, 'Adavi', 1),
    (502, 23, 'Ajaokuta', 1),
    (503, 23, 'Ankpa', 1),
    (504, 23, 'Bassa', 1),
    (505, 23, 'Dekina', 1),
    (506, 23, 'Ibaji', 1),
    (507, 23, 'Idah', 1),
    (508, 23, 'Igalamela-Odolu', 1),
    (509, 23, 'Ijumu', 1),
    (510, 23, 'Kabba/Bunu', 1),
    (511, 23, 'Koton Karfe', 1),
    (512, 23, 'Lokoja', 1),
    (513, 23, 'Mopa-Muro', 1),
    (514, 23, 'Ofu', 1),
    (515, 23, 'Ogori/Magongo', 1),
    (516, 23, 'Okehi', 1),
    (517, 23, 'Okene', 1),
    (518, 23, 'Olamaboro', 1),
    (519, 23, 'Omala', 1),
    (520, 23, 'Yagba East', 1),
    (521, 23, 'Yagba West', 1),
    (522, 24, 'Asa', 1),
    (523, 24, 'Baruten', 1),
    (524, 24, 'Edu', 1),
    (525, 24, 'Ekiti', 1),
    (526, 24, 'Ifelodun', 1),
    (527, 24, 'Ilorin East', 1),
    (528, 24, 'Ilorin South', 1),
    (529, 24, 'Ilorin West', 1),
    (530, 24, 'Irepodun', 1),
    (531, 24, 'Isin', 1),
    (532, 24, 'Kaiama', 1),
    (533, 24, 'Moro', 1),
    (534, 24, 'Offa', 1),
    (535, 24, 'Oke Ero', 1),
    (536, 24, 'Oyun', 1),
    (537, 24, 'Pategi', 1),
    (538, 25, 'Agege', 1),
    (539, 25, 'Alimosho Ifelodun', 1),
    (540, 25, 'Alimosho', 1),
    (541, 25, 'Amuwo-Odofin', 1),
    (542, 25, 'Apapa', 1),
    (543, 25, 'Badagry', 1),
    (544, 25, 'Epe', 1),
    (545, 25, 'Eti-Osa', 1),
    (546, 25, 'Ibeju-Lekki', 1),
    (547, 25, 'Ifako/Ijaye', 1),
    (548, 25, 'Ikeja', 1),
    (549, 25, 'Ikorodu', 1),
    (550, 25, 'Kosofe', 1),
    (551, 25, 'Lagos Island', 1),
    (552, 25, 'Lagos Mainland', 1),
    (553, 25, 'Mushin', 1),
    (554, 25, 'Ojo', 1),
    (555, 25, 'Oshodi–Isolo', 1),
    (556, 25, 'Shomolu', 1),
    (557, 25, 'Surulere', 1),
    (558, 26, 'Akwanga', 1),
    (559, 26, 'Awe', 1),
    (560, 26, 'Doma', 1),
    (561, 26, 'Karu', 1),
    (562, 26, 'Keana', 1),
    (563, 26, 'Keffi', 1),
    (564, 26, 'Kokona', 1),
    (565, 26, 'Lafia', 1),
    (566, 26, 'Nassarawa/Eggon', 1),
    (567, 26, 'Nassarawa', 1),
    (568, 26, 'Obi', 1),
    (569, 26, 'Toto', 1),
    (570, 26, 'Wamba', 1),
    (571, 27, 'Agaie', 1),
    (572, 27, 'Agwara', 1),
    (573, 27, 'Bida', 1),
    (574, 27, 'Borgu', 1),
    (575, 27, 'Bosso', 1),
    (576, 27, 'Chanchaga', 1),
    (577, 27, 'Edati', 1),
    (578, 27, 'Gbako', 1),
    (579, 27, 'Gurara', 1),
    (580, 27, 'Katcha', 1),
    (581, 27, 'Kontagora', 1),
    (582, 27, 'Lapai', 1),
    (583, 27, 'Lavun', 1),
    (584, 27, 'Magama', 1),
    (585, 27, 'Mariga', 1),
    (586, 27, 'Mashegu', 1),
    (587, 27, 'Mokwa', 1),
    (588, 27, 'Munya', 1),
    (589, 27, 'Paikoro', 1),
    (590, 27, 'Rafi', 1),
    (591, 27, 'Rijau', 1),
    (592, 27, 'Shiroro', 1),
    (593, 27, 'Suleja', 1),
    (594, 27, 'Tafa', 1),
    (595, 27, 'Wushishi', 1),
    (596, 28, 'Abeokuta North', 1),
    (597, 28, 'Abeokuta South', 1),
    (598, 28, 'Ado-Odo/Ota', 1),
    (599, 28, 'Ewekoro', 1),
    (600, 28, 'Ifo', 1),
    (601, 28, 'Ijebu East', 1),
    (602, 28, 'Ijebu West', 1),
    (603, 28, 'Ijebu North-East', 1),
    (604, 28, 'Ijebu Ode', 1),
    (605, 28, 'Ikenne', 1),
    (606, 28, 'Imeko Afon', 1),
    (607, 28, 'Ipokia', 1),
    (608, 28, 'Obafemi Owode', 1),
    (609, 28, 'Odogbolu', 1),
    (610, 28, 'Odeda', 1),
    (611, 28, 'Ogun Waterside', 1),
    (612, 28, 'Remo North', 1),
    (613, 28, 'Sagamu', 1),
    (614, 28, 'Yewa North', 1),
    (615, 28, 'Yewa South', 1),
    (616, 29, 'Akoko North', 1),
    (617, 29, 'Akoko North-East', 1),
    (618, 29, 'Akoko South-East', 1),
    (619, 29, 'Akoko South', 1),
    (620, 29, 'Akure North', 1),
    (621, 29, 'Akure', 1),
    (622, 29, 'Idanre', 1),
    (623, 29, 'Ifedore', 1),
    (624, 29, 'Ese Odo', 1),
    (625, 29, 'Ilaje', 1),
    (626, 29, 'Ile Oluji/Okeigbo', 1),
    (627, 29, 'Irele', 1),
    (628, 29, 'Odigbo', 1),
    (629, 29, 'Okitipupa', 1),
    (630, 29, 'Ondo', 1),
    (631, 29, 'Ondo East', 1),
    (632, 29, 'Ose', 1),
    (633, 29, 'Owo', 1),
    (634, 30, 'Atakumosa West', 1),
    (635, 30, 'Atakumosa East', 1),
    (636, 30, 'Ayedaade', 1),
    (637, 30, 'Ayedire', 1),
    (638, 30, 'Bolawaduro', 1),
    (639, 30, 'Boripe,', 1),
    (640, 30, 'Ede', 1),
    (641, 30, 'Ede North', 1),
    (642, 30, 'Egbedore', 1),
    (643, 30, 'Ejigbo', 1),
    (644, 30, 'Ife North', 1),
    (645, 30, 'Ife Central', 1),
    (646, 30, 'Ife South', 1),
    (647, 30, 'Ife East', 1),
    (648, 30, 'Ifedayo, Ifelodun', 1),
    (649, 30, 'Ilesha West', 1),
    (650, 30, 'Ila-Orangun', 1),
    (651, 30, 'Ilesah East', 1),
    (652, 30, 'Irepodun', 1),
    (653, 30, 'Irewole', 1),
    (654, 30, 'Isokan', 1),
    (655, 30, 'Iwo', 1),
    (656, 30, 'Obokun', 1),
    (657, 30, 'Odo-Otin', 1),
    (658, 30, 'Ola Oluwa', 1),
    (659, 30, 'Olorunda', 1),
    (660, 30, 'Oriade', 1),
    (661, 30, 'Orolu', 1),
    (662, 30, 'Osogbo', 1),
    (663, 31, 'Ona Ara', 1),
    (664, 31, 'Oyo East', 1),
    (665, 31, 'Ori Ire', 1),
    (666, 31, 'Orelope', 1),
    (667, 31, 'Surulere', 1),
    (668, 31, 'Ogo Oluwa', 1),
    (669, 31, 'Oluyole', 1),
    (670, 31, 'Olorunsogo', 1),
    (671, 31, 'Ibarapa North', 1),
    (672, 31, 'Iwajowa', 1),
    (673, 31, 'Akinyele Moniya', 1),
    (674, 31, 'Afijio Jobele', 1),
    (675, 31, 'Egbeda Egbeda', 1),
    (676, 31, 'Ibadan North Agodi Gate', 1),
    (677, 31, 'Ibadan North-East Iwo Road', 1),
    (678, 31, 'Ibadan North-West', 1),
    (679, 31, 'Ibadan South-West Ring Road', 1),
    (680, 31, 'Ibadan South-East Mapo', 1),
    (681, 31, 'Ibarapa Central', 1),
    (682, 31, 'Ibarapa East Eruwa', 1),
    (683, 31, 'Ido', 1),
    (684, 31, 'Irepo', 1),
    (685, 31, 'Iseyin', 1),
    (686, 31, 'Kajola', 1),
    (687, 31, 'Lagelu', 1),
    (688, 31, 'Ogbomosho North', 1),
    (689, 31, 'Ogbomosho South', 1),
    (690, 31, 'Oyo West Ojongbodu', 1),
    (691, 31, 'Atiba Ofa Meta', 1),
    (692, 31, 'Atisbo Tede', 1),
    (693, 31, 'Saki West', 1),
    (694, 31, 'Saki East', 1),
    (695, 31, 'Itesiwaju Otu', 1),
    (696, 32, 'Barkin Ladi', 1),
    (697, 32, 'Bassa', 1),
    (698, 32, 'Bokkos', 1),
    (699, 32, 'Jos East', 1),
    (700, 32, 'Jos North', 1),
    (701, 32, 'Jos South', 1),
    (702, 32, 'Kanam', 1),
    (703, 32, 'Kanke', 1),
    (704, 32, 'Langtang North', 1),
    (705, 32, 'Langtang South', 1),
    (706, 32, 'Mangu', 1),
    (707, 32, 'Mikang', 1),
    (708, 32, 'Pankshin', 1),
    (709, 32, 'Qua\'an Pan', 1),
    (710, 32, 'Riyom', 1),
    (711, 32, 'Shendam', 1),
    (712, 32, 'Wase', 1),
    (713, 33, 'Abua-Odual', 1),
    (714, 33, 'Ahoada East', 1),
    (715, 33, 'Ahoada West', 1),
    (716, 33, 'Akuku-Toru', 1),
    (717, 33, 'Andoni', 1),
    (718, 33, 'Asari-Toru', 1),
    (719, 33, 'Bonny', 1),
    (720, 33, 'Degema', 1),
    (721, 33, 'Eleme', 1),
    (722, 33, 'Emohua', 1),
    (723, 33, 'Etche', 1),
    (724, 33, 'Gokana', 1),
    (725, 33, 'Ikwerre', 1),
    (726, 33, 'Oyigbo', 1),
    (727, 33, 'Khana', 1),
    (728, 33, 'Obio-Akpor', 1),
    (729, 33, 'Ogba-Egbema-Ndoni', 1),
    (730, 33, 'Ogu-Bolo', 1),
    (731, 33, 'Okrika', 1),
    (732, 33, 'Omumma', 1),
    (733, 33, 'Opobo-Nkoro', 1),
    (734, 33, 'Portharcourt', 1),
    (735, 33, 'Tai', 1),
    (736, 34, 'Binji', 1),
    (737, 34, 'Bodinga', 1),
    (738, 34, 'Dange Shuni', 1),
    (739, 34, 'Gada', 1),
    (740, 34, 'Goronyo', 1),
    (741, 34, 'Gudu', 1),
    (742, 34, 'Gwadabawa', 1),
    (743, 34, 'Illela', 1),
    (744, 34, 'Isa', 1),
    (745, 34, 'Kebbe', 1),
    (746, 34, 'Kware', 1),
    (747, 34, 'Rabah', 1),
    (748, 34, 'Sabon Birni', 1),
    (749, 34, 'Shagari', 1),
    (750, 34, 'Silame', 1),
    (751, 34, 'Sokoto North', 1),
    (752, 34, 'Sokoto South', 1),
    (753, 34, 'Tambuwal', 1),
    (754, 34, 'Tangaza', 1),
    (755, 34, 'Tureta', 1),
    (756, 34, 'Wamako', 1),
    (757, 34, 'Wurno', 1),
    (758, 34, 'Yabo', 1),
    (759, 35, 'Ardo Kola', 1),
    (760, 35, 'Bali', 1),
    (761, 35, 'Donga', 1),
    (762, 35, 'Gashaka', 1),
    (763, 35, 'Gassol', 1),
    (764, 35, 'Ibi', 1),
    (765, 35, 'Jalingo', 1),
    (766, 35, 'Karim Lamido', 1),
    (767, 35, 'Kurmi', 1),
    (768, 35, 'Lau', 1),
    (769, 35, 'Sardauna', 1),
    (770, 35, 'Takum', 1),
    (771, 35, 'Ussa', 1),
    (772, 35, 'Wukari', 1),
    (773, 35, 'Yorro', 1),
    (774, 35, 'Zing', 1),
    (775, 36, 'Bade', 1),
    (776, 36, 'Bursari', 1),
    (777, 36, 'Damaturu', 1),
    (778, 36, 'Geidam', 1),
    (779, 36, 'Gujba', 1),
    (780, 36, 'Gulani', 1),
    (781, 36, 'Fika', 1),
    (782, 36, 'Fune', 1),
    (783, 36, 'Jakusko', 1),
    (784, 36, 'Karasuwa', 1),
    (785, 36, 'Machina', 1),
    (786, 36, 'Nangere', 1),
    (787, 36, 'Nguru', 1),
    (788, 36, 'Potiskum', 1),
    (789, 36, 'Tarmuwa', 1),
    (790, 36, 'Yunusari', 1),
    (791, 36, 'Yusufari', 1),
    (792, 37, 'Anka', 1),
    (793, 37, 'Bakura', 1),
    (794, 37, 'Birnin Magaji/Kiyaw', 1),
    (795, 37, 'Bukkuyum', 1),
    (796, 37, 'Bungudu', 1),
    (797, 37, 'Tsafe', 1),
    (798, 37, 'Gummi', 1),
    (799, 37, 'Gusau', 1),
    (800, 37, 'Kaura Namoda', 1),
    (801, 37, 'Maradum', 1),
    (802, 37, 'Maru', 1),
    (803, 37, 'Shinkafi', 1),
    (804, 37, 'Talata Mafara', 1),
    (805, 37, 'Zurmi', 1),
    (806, 2, 'Abaji', 1),
    (807, 2, 'Abuja Municipal', 1),
    (808, 2, 'Gwagwalada', 1),
    (809, 2, 'Kuje', 1),
    (810, 2, 'Bwari', 1),
    (811, 2, 'Kwali', 1);
--
-- Table structure for table `States_tbl`
--
DROP TABLE IF EXISTS `States_tbl`;
CREATE TABLE IF NOT EXISTS `States_tbl` (
    `id` int NOT NULL AUTO_INCREMENT,
    `statename` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
    `capital` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
    `countryid` int DEFAULT NULL,
    `status` int DEFAULT '1',
    `statecode` varchar(50) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
--
-- Dumping data for table `States_tbl`
--
INSERT INTO `States_tbl` (
        `id`,
        `statename`,
        `capital`,
        `countryid`,
        `status`,
        `statecode`
    )
VALUES (1, 'Abia', 'Umuahia', 1, 1, 'NG-AB'),
    (2, 'Abuja', 'FCT', 1, 1, 'NG-FC'),
    (3, 'Adamawa', 'Yola', 1, 1, 'NG-AD'),
    (4, 'Akwa Ibom', 'Uyo', 1, 1, 'NG-AK'),
    (5, 'Anambra', 'Awka', 1, 1, 'NG-AN'),
    (6, 'Bauchi', 'Bauchi', 1, 1, 'NG-BA'),
    (7, 'Bayelsa', 'Yenegoa', 1, 1, 'NG-BY'),
    (8, 'Benue', 'Makurdi', 1, 1, 'NG-BE'),
    (9, 'Borno', NULL, 1, 1, 'NG-BO'),
    (10, 'Cross River', 'Calabar', 1, 1, 'NG-CR'),
    (11, 'Delta', 'Asaba', 1, 1, 'NG-DE'),
    (12, 'Ebonyi', NULL, 1, 1, 'NG-EB'),
    (13, 'Edo', NULL, 1, 1, 'NG-ED'),
    (14, 'Ekiti', NULL, 1, 1, 'NG-EK'),
    (15, 'Enugu', 'Enugu', 1, 1, 'NG-EN'),
    (16, 'Gombe', '', 1, 1, 'NG-GO'),
    (17, 'Imo', 'Owerri', 1, 1, 'NG-IM'),
    (18, 'Jigawa', NULL, 1, 1, 'NG-JI'),
    (19, 'Kaduna', 'Kaduna', 1, 1, 'NG-KD'),
    (20, 'Kano', 'Kano', 1, 1, 'NG-KN'),
    (21, 'Katsina', NULL, 1, 1, 'NG-KT'),
    (22, 'Kebbi', 'Benin-Kebbi', 1, 1, 'NG-KE'),
    (23, 'Kogi', NULL, 1, 1, 'NG-KO'),
    (24, 'Kwara', NULL, 1, 1, 'NG-KW'),
    (25, 'Lagos', 'Ikeja', 1, 1, 'NG-LA'),
    (26, 'Nassarawa', NULL, 1, 1, 'NG-NA'),
    (27, 'Niger', 'Minna', 1, 1, 'NG-NI'),
    (28, 'Ogun', NULL, 1, 1, 'NG-OG'),
    (29, 'Ondo', 'Akure', 1, 1, 'NG-ON'),
    (30, 'Osun', NULL, 1, 1, 'NG-OS'),
    (31, 'Oyo', 'Ibadan', 1, 1, 'NG-OY'),
    (32, 'Plateau', 'Jos', 1, 1, 'NG-PL'),
    (33, 'Rivers', 'Port Harcourt', 1, 1, 'NG-RI'),
    (34, 'Sokoto', 'Sokoto', 1, 1, 'NG-SO'),
    (35, 'Taraba', NULL, 1, 1, 'NG-TA'),
    (36, 'Yobe', NULL, 1, 1, 'NG-YO'),
    (37, 'Zamfara', NULL, 1, 1, 'NG-ZA');
COMMIT;
CREATE TABLE IF NOT EXISTS pricing_barometerdb.Country_tbl (
    id INT NOT NULL,
    countryname VARCHAR(30),
    capital VARCHAR(30),
    status INT DEFAULT 1,
    countrycode VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);
INSERT INTO pricing_barometerdb.Country_tbl
VALUES(1, 'nigeria', 'abuja', 1, '+234')
INSERT INTO `ProduceList_tbl` (
        `id`,
        `producename`,
        `status`,
        `statusname`,
        `color`,
        `hexcolor`,
        `unit1`,
        `unit2`,
        `conversionrate`,
        `produceimageurl`
    )
VALUES (
        1,
        'Sorghum',
        1,
        'Active',
        'green',
        '#008000',
        'Tonne',
        'Kg',
        1000.00,
        'https://res.cloudinary.com/bridgemerchant/image/upload/v1657550078/default/sorghum_moa6xn.jpg'
    ),
    (
        2,
        'Paddy Rice',
        1,
        'Active',
        'blue',
        '#0000ff',
        'Tonne',
        'Bag',
        250.00,
        'https://res.cloudinary.com/bridgemerchant/image/upload/v1657550078/default/paddy-rice_idlgju.jpg'
    ),
    (
        3,
        'Palm Kernel',
        1,
        'Active',
        'yellow',
        '#e6e600',
        'Tonne',
        'Bag',
        540.00,
        'https://res.cloudinary.com/bridgemerchant/image/upload/v1657550077/default/pk_jqpowb.jpg'
    ),
    (
        4,
        'Palm Kernel Oil',
        1,
        'Active',
        'skyblue',
        '#87ceeb',
        'Tonne',
        'Kg',
        1000.00,
        'https://res.cloudinary.com/bridgemerchant/image/upload/v1657550077/default/pkoil_lk01vt.jpg'
    ),
    (
        5,
        'Kernel Shell',
        1,
        'Active',
        'orange',
        '#ffa500',
        'Tonne',
        'Kg',
        1000.00,
        'https://res.cloudinary.com/bridgemerchant/image/upload/v1657550078/default/pkshell_xoxeg8.jpg'
    ),
    (
        6,
        'Coconut',
        1,
        'Active',
        'purple',
        '#800080',
        'Tonne',
        'Kg',
        1000.00,
        'https://res.cloudinary.com/bridgemerchant/image/upload/v1657550077/default/coconut_c9suq5.jpg'
    ),
    (
        7,
        'Cashew',
        1,
        'Active',
        'pink',
        '#ffb3bf',
        'Tonne',
        'Kg',
        1000.00,
        'https://res.cloudinary.com/bridgemerchant/image/upload/v1657550078/default/cash_tsin35.jpg'
    ),
    (
        8,
        'Millet',
        1,
        'Active',
        'brown',
        '#a52a2a',
        'Tonne',
        'Kg',
        1000.00,
        'https://res.cloudinary.com/bridgemerchant/image/upload/v1657550077/default/millet_eptzfk.jpg'
    );