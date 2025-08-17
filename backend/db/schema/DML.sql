
CREATE DATABASE "cuncunaDB"

-- ROLES (sin id manual)
INSERT INTO roles (nombre) VALUES
  ('cliente'),
  ('administrador');

-- CLIENTES (nota: asegúrate que la columna se llame igual que en tu schema; si tienes "contraseña", usa ese nombre)
INSERT INTO clientes (nombre, email, password, direccion, telefono, rol_id, creado_en)
VALUES
('Ana Pérez','ana.perez@example.com','hash1','Av. Siempre Viva 123','+56911111111',
  (SELECT id FROM roles WHERE nombre='cliente'), NOW()),
('Admin','admin@example.com','123123','Av. Siempre Viva 123','+56911111111',
  (SELECT id FROM roles WHERE nombre='administrador'), NOW()),
('Luis Soto','luis.soto@example.com','hash2','Calle Falsa 456','+56922222222',
  (SELECT id FROM roles WHERE nombre='cliente'), NOW()),
('María Rojas','maria.rojas@example.com','hash3','Pasaje Los Pinos 789','+56933333333',
  (SELECT id FROM roles WHERE nombre='cliente'), NOW());

-- CATEGORÍAS (sin id manual)
INSERT INTO categorias (nombre, descripcion) VALUES
('Cajonera','Cajoneras y cómodas'),
('Juguetero','Muebles organizadores para juguetes'),
('Muebles','Conjuntos y mobiliario general'),
('Librero','Libreros para niños');

-- PRODUCTOS (referenciando categoria por nombre)
INSERT INTO productos (nombre, descripcion, precio, stock, imagen_url, categoria_id, creado_en) VALUES
('Cajonera alta', $$...texto largo...$$, 210000,4,'https://elefanta.cl/wp-content/uploads/2024/07/IMG_1102-scaled.jpeg',
 (SELECT id FROM categorias WHERE nombre='Cajonera'), '2025-08-05 23:00:00'),
('Juguetero 6 espacios', $$...$$, 220900,5,'https://elefanta.cl/wp-content/uploads/2019/10/Juguetero-6-espacios-1.jpg',
 (SELECT id FROM categorias WHERE nombre='Juguetero'), '2025-08-05 23:00:00'),
('Mesa natural y 2 Sillas Preescolares', $$...$$, 85900,3,'https://elefanta.cl/wp-content/uploads/2019/10/elefanta1-32-scaled-600x400.jpg',
 (SELECT id FROM categorias WHERE nombre='Muebles'), '2025-08-05 23:00:00'),
('Librero suelo', $$...$$, 38900,6,'https://elefanta.cl/wp-content/uploads/2019/10/Librero-Suelo-1.jpg',
 (SELECT id FROM categorias WHERE nombre='Librero'), '2025-08-05 23:00:00');

-- COMENTARIOS (referenciando por email del cliente y nombre del producto)
INSERT INTO comentarios (cliente_id, producto_id, comentario, calificacion, fecha) VALUES
((SELECT id FROM clientes  WHERE email='ana.perez@example.com'),
 (SELECT id FROM productos WHERE nombre='Cajonera alta'), 'Buen producto, ideal para mi hija',4,'2025-08-06'),
((SELECT id FROM clientes  WHERE email='ana.perez@example.com'),
 (SELECT id FROM productos WHERE nombre='Cajonera alta'), 'Bonito diseño pero el armado fue algo difícil.',3,'2025-08-06'),
((SELECT id FROM clientes  WHERE email='ana.perez@example.com'),
 (SELECT id FROM productos WHERE nombre='Juguetero 6 espacios'), 'Llegó en el tiempo esperado. Todo perfecto.',5,'2025-08-06'),
((SELECT id FROM clientes  WHERE email='luis.soto@example.com'),
 (SELECT id FROM productos WHERE nombre='Juguetero 6 espacios'), 'Un poco más pequeño de lo que imaginaba.',3,'2025-08-06'),
((SELECT id FROM clientes  WHERE email='luis.soto@example.com'),
 (SELECT id FROM productos WHERE nombre='Mesa natural y 2 Sillas Preescolares'), 'Muy útil y resistente. Lo usamos todos los días.',4,'2025-08-06'),
((SELECT id FROM clientes  WHERE email='maria.rojas@example.com'),
 (SELECT id FROM productos WHERE nombre='Mesa natural y 2 Sillas Preescolares'), 'Buena relación precio-calidad.',4,'2025-08-06'),
((SELECT id FROM clientes  WHERE email='ana.perez@example.com'),
 (SELECT id FROM productos WHERE nombre='Mesa natural y 2 Sillas Preescolares'), 'Los materiales se sienten de buena calidad.',5,'2025-08-06'),
((SELECT id FROM clientes  WHERE email='luis.soto@example.com'),
 (SELECT id FROM productos WHERE nombre='Librero suelo'), 'El color no coincidía con la imagen del sitio.',2,'2025-08-06'),
((SELECT id FROM clientes  WHERE email='luis.soto@example.com'),
 (SELECT id FROM productos WHERE nombre='Librero suelo'), 'Perfecto para espacios pequeños.',4,'2025-08-06');

