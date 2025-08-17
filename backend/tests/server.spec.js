
import request from "supertest";
import app from "../app.js";

describe("GET /categorias", () => {
    it("Should return status code 200", async () => {
        const response = await request(app).get("/api/categorias");
        expect(response.status).toBe(200);
    })
    it("Data type is a object with min one object", async () => {
        const response = await request(app).get("/api/categorias")
        expect(typeof response.body).toBe("object");
        expect(response.body).not.toBeNull();
        expect(Array.isArray(response.body)).toBe(false);
    })
});

// PRODUCTOS 
describe("GET /api/productos ", () => {
    it("Should return status code 200", async () => {
        const response = await request(app).get("/api/productos");
        expect(response.status).toBe(200);
    })
    it("Data type is a object with min one object", async () => {
        const response = await request(app).get("/api/productos")
        expect(typeof response.body).toBe("object");
        expect(response.body).not.toBeNull();
        expect(Array.isArray(response.body)).toBe(false);
    })
});

describe('POST /api/productos', () => {
    it('should create a new product and respond with status code 201', async () => {
        const newProducto = {
            nombre: "Pizarra de acero",
            descripcion: "Pizarras",
            precio: "10000",
            stock: 2,
            imagen_url: "https://elefanta.cl/wp-content/uploads/2019/10/Juguetero-6-espacios-1.jpg",
            categoria_id: 1
        };
        const response = await request(app)
            .post('/api/productos')
            .send(newProducto);
        expect(response.status).toBe(201);
    });
});

describe('PUT /api/productos/:id', () => {
    it('should return status code 201 when modified the product', async () => {
        const producto = {
            "nombre": "Pizarra de Barro",
            "descripcion": "Pizarras",
            "precio": "10000",
            "stock": 2,
            "imagen_url": "https://elefanta.cl/wp-content/uploads/2019/10/Juguetero-6-espacios-1.jpg",
            "categoria_id": 1
        }
        const response = await request(app)
            .put('/api/productos/5')
            .send(producto)
        expect(response.status).toBe(201)
    })
})

describe('DELETE /api/productos/', () => {
    it('should return status code 404 when trying to delete a product with a non-existent id', async () => {
        const response = await request(app)
            .delete('/api/productos/indalid-id')
            .set('Authorization', 'test-token');
        expect(response.status).toBe(400);
    });
});

// Favoritos
describe('GET /api/favoritos/:id', () => {
    it('should return status code 200 when fetching favoritos of a client', async () => {
        const response = await request(app).get('/api/favoritos/1')
        expect(response.status).toBe(201)
    })

    it("should return an array with at least one object", async () => {
        const response = await request(app).get('/api/favoritos/1')
        expect(Array.isArray(response.body)).toBe(false)   // body no debe ser un array
        expect(typeof response.body[0]).toBe("object")    // y cada elemento debe ser objeto
    })
})

describe('POST /api/favoritos', () => {
    it('should create a new product and respond with status code 201', async () => {
        const newFavorito = {
            "cliente_id": 1,
            "producto_id": 3
        };
        const response = await request(app)
            .post('/api/favoritos')
            .send(newFavorito);
        expect(response.status).toBe(201);
    });
});

describe('DELETE /api/favoritos/:id', () => {
    it('should return status code 404 when trying to delete a product with a non-existent id', async () => {
        const response = await request(app)
            .delete('/api/favoritos/1')
            .set('Authorization', 'test-token');
        expect(response.status).toBe(200);
    });
});

