-- Deploy the-good-choice-market:02-insert_data to pg

BEGIN;

SET "client_encoding" TO "UTF8"; -- Fix les accent et les caractères speciaux

INSERT INTO "public"."company"
("name", "city", "address", "phone_number", "email", "siret_number")
VALUES
('La compagnie créole', 'Fort de France', '12 avenue de la banane plantain', '0405957582', 'compagniecreole@plantain.com', 02598423675412),
('La compagnie meubles', 'Bern', '94 boulevard des helvetiques', '0022533835', 'contact@compagniedemeubles.ch', 02945832514789),
('Compa-NY', 'Paris', '15 Rue Rivoli', '0123154589', 'contact-us@compa-ny.com', 02589636658412);

INSERT INTO "public"."brand"
("brand_name", "slogan", "logo", "activity_field", "delivery_cost", "company_id")
VALUES
('Les gourmands verts','tout est bon dans le végétal', 'https://res.cloudinary.com/drjw8g2yn/image/upload/v1659600411/Logo/autres/Les%20gourmands%20verts.png', 'cours de cuisine', 0, 1),
('Yoggy Studio','venez apprendre le yoga', 'logoyoggystudio.jpg', 'cours de yoga', 0, 1),
('Stone Ceramics','la ceramique cest fantastique!', 'https://res.cloudinary.com/drjw8g2yn/image/upload/v1659600808/Logo/autres/Stone%20Ceramics.png', 'cours de ceramique', 0, 1),
('WoodFurnitures','des meubles resistants en bois', 'logowoodfurnitures.jpg', 'meubles', 29, 2),
('Les Bomeubles','des meubles beaux et confortables', 'https://res.cloudinary.com/drjw8g2yn/image/upload/v1659603325/Logo/autres/Capture_d_e%CC%81cran_2022-08-04_a%CC%80_09.50.05_rw8pqk.png', 'meubles', 29, 2),
('Maison Marcé','your hair will be fantastic', 'https://res.cloudinary.com/drjw8g2yn/image/upload/v1659600037/Logo/autres/Maison%20Marc%C3%A9.png', 'soin des cheveux', 2.99, 3),
('Fluxe Beauté','your make-up will be fantastic', 'logofluxebeauté.jpg', 'maquillage', 2.99, 3),
('Lavish & Squalor','your skin will be fantastic', 'https://res.cloudinary.com/drjw8g2yn/image/upload/v1659600034/Logo/autres/Lavish%20et%20Squalor.png', 'soin de la peau', 2.99, 3);

INSERT INTO "public"."user"
("firstname", "lastname", "birthday", "email", "password", "phone_number", "address", "postal_code", "city", "country")
VALUES
('Steven', 'pasparla', '10/01/1974', 'pasparla@wanadoo.fr', '$2a$12$H2ulzRV8dJQBJGxwuJWQve9ED1VLWi32GVcBPSeQbd5z3YY1s52nW', '0697016300', '46 rue de la porte dà coté', '75007', 'Paris', 'France'),
('Georgette', 'labicyclette', '27/05/1966', 'glabicyclette@free.fr', '$2a$12$H2ulzRV8dJQBJGxwuJWQve9ED1VLWi32GVcBPSeQbd5z3YY1s52nW', '0178995412', '3 rue lhonnoré', '13005', 'Marseille', 'France');

INSERT INTO "public"."tva"
("rate")
VALUES
(2.5),
(5.5),
(8.5),
(10),
(20);

INSERT INTO "public"."category"
("name")
VALUES
('alimentation'),
('mode'),
('beaute'),
('loisirs'),
('maison'),
('services');

INSERT INTO "public"."sub_category"
("name","category_id")
VALUES
('Epicerie salée', 1),
('Epicerie sucrée', 1),
('Frais', 1),
('Homme', 2),
('Femme', 2),
('Enfants', 2),
('Soin', 3),
('Maquillage', 3),
('Parfum', 3),
('Compléments alimentaires', 3),
('Poterie', 4),
('Céramique', 4),
('Cuisine', 4),
('Bien-être', 4),
('Meubles', 5),
('Literie', 5),
('Linge de maison', 5),
('Décoration', 5),
('Coiffure', 6),
('Esthétique', 6),
('Sport', 6);

-- Ne pas oublier de changer les prix ht avec de vrai values apres l'apo

INSERT INTO "public"."product"
("name", "description", "image", "location", "barcode", "expiration_date", "height", "width", "depth", "weight", "size", "price_ht", "price_promo", "price_kg", "tva_id", "brand_id", "sub_category_id")
VALUES
('Cours de cuisine végétales', 'Durée 3H. Lors de cet atelier de 3 heures, le/la Chef vous apprend à réaliser 3 salades originales et végétales, à partir de produits non transformés et à indice bas carbone.', 'https://res.cloudinary.com/drjw8g2yn/image/upload/v1658906849/visuels%20produits/Loisirs/Les%20gourmands%20Verts/coursCuisine_miniature_wsv61x.jpg', 'Toulouse', null, null, null, null, null, null, null, 99.00, null, null, 5, 1, 13),
('Cours de cuisine végétales - kids', 'Durée 1H30', 'https://res.cloudinary.com/drjw8g2yn/image/upload/v1658906849/visuels%20produits/Loisirs/Les%20gourmands%20Verts/CoursCuisineKids_miniature_mjiagn.jpg','Toulouse', null, null, null, null, null, null, null, 89.00, 89, null, 2, 1, 13),
('Cours de yoga - débutant', 'Durée 1H', 'https://res.cloudinary.com/drjw8g2yn/image/upload/v1658906835/visuels%20produits/Loisirs/Yoggy%20Studio/CoursYoga_miniature_qhnig7.jpg','Bordeaux', null, null, null, null, null, null, null, 25.00, null, null, 2, 2, 13),
('Cours de céramique', 'Durée 2H30', 'https://res.cloudinary.com/drjw8g2yn/image/upload/v1658906844/visuels%20produits/Loisirs/Stone%20Ceramics/CoursCeramique_miniature_hkennc.jpg','Fort de France', null, null, null, null, null, null, null, 29.00, null, null, 2, 3, 13),
('Masque cheveux secs', 'À vous les cheveux hydratés, souples et brillants ! Le HYDRATATION MASK est un véritable 2 en 1, un soin avant votre shampoing et au quotidien en après shampoing. Un vrai concentré d''hydratation et nutrition pour vos cheveux. Finis les cheveux secs et ternes, à vous les cheveux de déesse! Les huiles végétales nourrissent les cheveux et leur apportent douceur et brillance. Son parfum amande 100% naturel inspiré de la colle Cléopâtre vous accompagnera pendant votre routine capillaire et vous transportera en enfance.', 'https://res.cloudinary.com/drjw8g2yn/image/upload/v1658906716/visuels%20produits/Beaut%C3%A9/Maison%20Marc%C3%A9/MasqueCheveux_miniature_rqybee.jpg', null, 9581354265423, null, null, null,null, '250 g', null, 25.00, null, null, 5, 6, 7),
('Rouge à lèvres - Mat', 'Cest un rouge à lèvres mat', 'https://res.cloudinary.com/drjw8g2yn/image/upload/v1658906660/visuels%20produits/Beaut%C3%A9/Fluxe%20beaut%C3%A9/RougeALevres_miniature_xpyicf.jpg', null, 1258665842365, null, null, null, null,'3,5 g', null, 9.9, 9.9, null, 5, 7, 7),
('Fond de teint - couvrant', 'cest un fond de teint couvrant', 'https://res.cloudinary.com/drjw8g2yn/image/upload/v1658906660/visuels%20produits/Beaut%C3%A9/Fluxe%20beaut%C3%A9/FondDeTeint_miniature_zocjxc.jpg', null, 12548635, null, null, null, null ,'30 ml', null, 19.00, null, null, 5, 7, 7),
('Huile hydratation visage', 'cest une huile hydratante pour le visage', 'https://res.cloudinary.com/drjw8g2yn/image/upload/v1658906692/visuels%20produits/Beaut%C3%A9/Lavish%20et%20Squalor/huileVisage_miniature_po2zyx.jpg', null, 12548635, null, null, null, null, '30 ml', null, 29.00, null, null, 5, 8, 7),
('Fauteuil velours - Bleu', 'Enveloppant, confortable et compact, le fauteuil en velours bleu fera chavirer les amateurs d''intérieur art déco et de joli meuble tout simplement. Description Revêtement : Velours 100% polyester Structure en mélèze massif et multiplis', 'https://res.cloudinary.com/drjw8g2yn/image/upload/v1658906793/visuels%20produits/Meubles/Bomeubles/Fauteuil_miniature_ls6aom.jpg', null, null, null, 80, 75, 80, null, null, 149.00, null, null, 5, 5, 15),
('Table et ses deux tabourets', 'En bois', 'https://res.cloudinary.com/drjw8g2yn/image/upload/v1658906769/visuels%20produits/Meubles/Wood%20furnitures/tableBancs_miniature_blr0ua.jpg', null, null, null, 120, 60, 100, null, null, 399.00, 399, null, 5, 4, 15),
('Commode en bois', 'En bois', 'https://res.cloudinary.com/drjw8g2yn/image/upload/v1658906769/visuels%20produits/Meubles/Wood%20furnitures/commodeBois_miniature_ffupid.jpg', null, null, null, 150, 35, 70, null, null, 249.00, null, null, 5, 4, 15),
('Buffet vert', 'De couleur verte', 'https://res.cloudinary.com/drjw8g2yn/image/upload/v1658906793/visuels%20produits/Meubles/Bomeubles/buffetVert_miniature_oxbiy5.jpg', null, null, null, 180, 40, 100, null, null, 299.00, null, null, 5, 5, 15);

INSERT INTO "public"."buy"
("user_id", "product_id")
VALUES
(1, 1),
(1, 2),
(1, 4),
(2, 3),
(2, 4),
(2, 2);

COMMIT;
