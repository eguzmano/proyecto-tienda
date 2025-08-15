INSERT INTO "roles" ("id","nombre") VALUES
  (1,'cliente'),
  (2,'administrador');

-- Clientes (para comentarios: ids 1,2,3)
INSERT INTO clientes (nombre, email, password, direccion, telefono, rol_id, creado_en) VALUES
('Ana Pérez','ana.perez@example.com','hash1','Av. Siempre Viva 123','+56911111111',1,NOW()),
('Admin','admin@example.com','123123','Av. Siempre Viva 123','+56911111111',2,NOW()),
('Luis Soto','luis.soto@example.com','hash2','Calle Falsa 456','+56922222222',1,NOW()),
('María Rojas','maria.rojas@example.com','hash3','Pasaje Los Pinos 789','+56933333333',1,NOW());


-- Categorías usadas por los productos
INSERT INTO "categorias" ("id","nombre","descripcion") VALUES
  (1,'Cajonera','Cajoneras y cómodas'),
  (2,'Juguetero','Muebles organizadores para juguetes'),
  (3,'Muebles','Conjuntos y mobiliario general'),
  (4,'Librero','Libreros para niños');

-- ====== Productos ======
INSERT INTO "productos"
("id","nombre","descripcion","precio","stock","imagen_url","categoria_id","creado_en")
VALUES
  (1,'Cajonera alta',
$$✨ ¡Presentamos nuestra nueva cómoda para la habitación de tus pequeños! ✨

Diseñada pensando en la seguridad y el estilo, esta cómoda no solo ofrece amplio espacio de almacenamiento, sino que también es perfecta para crear un ambiente acogedor y organizado. 🏠

Características destacadas:

• Bordes redondeados para mayor seguridad.
• Cajones amplios y de fácil deslizamiento.
• Diseñada con materiales no tóxicos.
• Estilo versátil que combina con cualquier decoración.

Perfecta para guardar ropita, juguetes y todos esos pequeños tesoros que tú adoras. 👶🧸$$,
  210000,4,
  'https://elefanta.cl/wp-content/uploads/2024/07/IMG_1102-scaled.jpeg',
  1,'2025-08-05 23:00:00'),

  (2,'Juguetero 6 espacios',
$$¡Se acabaron los juguetes tirados por el suelo! Ahora no hay excusa, con este precioso mueble juguetero inspirado en la metodología Montessori. Organiza y enseña a tus peques a guardar mientras decoras.$$,
  220900,5,
  'https://elefanta.cl/wp-content/uploads/2019/10/Juguetero-6-espacios-1.jpg',
  2,'2025-08-05 23:00:00'),

  (3,'Mesa natural y 2 Sillas Preescolares',
$$Conjunto fabricado en madera natural. ¡Ideal para pequeños pintores, para jugar o para comer! Perfecta para momentos creativos y de aprendizaje en casa.$$,
  85900,3,
  'https://elefanta.cl/wp-content/uploads/2019/10/elefanta1-32-scaled-600x400.jpg',
  3,'2025-08-05 23:00:00'),

  (4,'Librero suelo',
$$Este mueble es genial: el niño puede escoger, sacar y guardar libros por sí solo, de forma cómoda y segura, fomentando autonomía y amor por la lectura.$$,
  38900,6,
  'https://elefanta.cl/wp-content/uploads/2019/10/Librero-Suelo-1.jpg',
  4,'2025-08-05 23:00:00');

-- ====== Comentarios ======
-- Nota: se normaliza la fecha al formato YYYY-MM-DD
INSERT INTO "comentarios" ("id","cliente_id","producto_id","comentario","calificacion","fecha") VALUES
  (1,1,1,'Buen producto, ideal para mi hija',4,'2025-08-06'),
  (2,1,1,'Bonito diseño pero el armado fue algo difícil.',3,'2025-08-06'),
  (3,1,2,'Llegó en el tiempo esperado. Todo perfecto.',5,'2025-08-06'),
  (4,2,2,'Un poco más pequeño de lo que imaginaba.',3,'2025-08-06'),
  (5,2,3,'Muy útil y resistente. Lo usamos todos los días.',4,'2025-08-06'),
  (6,3,3,'Buena relación precio-calidad.',4,'2025-08-06'),
  (7,1,3,'Los materiales se sienten de buena calidad.',5,'2025-08-06'),
  (8,2,4,'El color no coincidía con la imagen del sitio.',2,'2025-08-06'),
  (9,2,4,'Perfecto para espacios pequeños.',4,'2025-08-06');


