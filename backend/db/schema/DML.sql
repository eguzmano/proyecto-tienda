CREATE TABLE "roles" (
  "id" SERIAL PRIMARY KEY,
  "nombre" varchar UNIQUE
);

CREATE TABLE "clientes" (
  "id" SERIAL PRIMARY KEY,
  "nombre" varchar,
  "email" varchar UNIQUE,
  "password" varchar,
  "direccion" text,
  "telefono" varchar,
  "rol_id" integer DEFAULT 1,
  "creado_en" timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT "fk_clientes_rol" FOREIGN KEY ("rol_id") REFERENCES "roles" ("id")
);

CREATE TABLE "categorias" (
  "id" SERIAL PRIMARY KEY,
  "nombre" varchar,
  "descripcion" text
);

CREATE TABLE "productos" (
  "id" SERIAL PRIMARY KEY,
  "nombre" varchar,
  "descripcion" text,
  "precio" decimal,
  "stock" integer,
  "imagen_url" varchar,
  "categoria_id" integer,
  "creado_en" timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT "fk_productos_categoria" FOREIGN KEY ("categoria_id") REFERENCES "categorias" ("id")
);

CREATE TABLE "ventas" (
  "id" SERIAL PRIMARY KEY,
  "cliente_id" integer,
  "total" decimal,
  "fecha" timestamp,
  "estado" varchar,
  CONSTRAINT "fk_ventas_cliente" FOREIGN KEY ("cliente_id") REFERENCES "clientes" ("id")
);

CREATE TABLE "detalle_venta" (
  "id" SERIAL PRIMARY KEY,
  "venta_id" integer,
  "producto_id" integer,
  "cantidad" integer,
  "precio_unitario" decimal,
  CONSTRAINT "fk_detalle_venta_venta"
    FOREIGN KEY ("venta_id") REFERENCES "ventas" ("id") ON DELETE CASCADE,
  CONSTRAINT "fk_detalle_venta_producto"
    FOREIGN KEY ("producto_id") REFERENCES "productos" ("id")
);

CREATE TABLE "comentarios" (
  "id" SERIAL PRIMARY KEY,
  "cliente_id" integer,
  "producto_id" integer,
  "comentario" text,
  "calificacion" integer,
  "fecha" timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT "fk_comentarios_cliente"
    FOREIGN KEY ("cliente_id") REFERENCES "clientes" ("id") ON DELETE CASCADE,
  CONSTRAINT "fk_comentarios_producto"
    FOREIGN KEY ("producto_id") REFERENCES "productos" ("id") ON DELETE CASCADE
);

CREATE TABLE "favoritos" (
  "id" SERIAL PRIMARY KEY,
  "cliente_id" integer,
  "producto_id" integer,
  CONSTRAINT "fk_favoritos_cliente"
    FOREIGN KEY ("cliente_id") REFERENCES "clientes" ("id") ON DELETE CASCADE,
  CONSTRAINT "fk_favoritos_producto"
    FOREIGN KEY ("producto_id") REFERENCES "productos" ("id") ON DELETE CASCADE
);

-- Crear tabla con unicidad y validaciones
CREATE TABLE carros (
  "id"           SERIAL PRIMARY KEY,
  "cliente_id"   INTEGER NOT NULL,
  "producto_id"  INTEGER NOT NULL,
  "cantidad"     INTEGER NOT NULL DEFAULT 1,
  CONSTRAINT "fk_carros_cliente"
    FOREIGN KEY ("cliente_id") REFERENCES "clientes" ("id") ON DELETE CASCADE,
  CONSTRAINT "fk_carros_producto"
    FOREIGN KEY ("producto_id") REFERENCES "productos" ("id") ON DELETE CASCADE,
  -- Unicidad: un producto por cliente en una sola fila
  CONSTRAINT "carros_cliente_producto_uk" UNIQUE ("cliente_id", "producto_id"),
  -- Cantidad mínima válida
  CONSTRAINT "carros_cantidad_chk" CHECK ("cantidad" >= 1)
);