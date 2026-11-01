
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

const Producto = require('./models/Producto');
const Categoria = require('./models/Categoria');

// RELACIONES ENTRE MODELOS
Categoria.hasMany(Producto, {
    foreignKey: 'categoriaId',
    as: 'productos'
});

Producto.belongsTo(Categoria, {
    foreignKey: 'categoriaId',
    as: 'categoria'
});

const app = express();

app.use(cors());
app.use(express.json());

// RUTA DE PRUEBA
app.get('/', (req, res) => {
    res.send('¡API Backend funcionando exitosamente!');
});


// ==========================================
// CRUD DE CATEGORIAS
// ==========================================

// LISTAR CATEGORIAS
app.get('/categorias', async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CREAR CATEGORIA
app.post('/categorias', async (req, res) => {
    try {
        const nuevaCategoria = await Categoria.create(req.body);

        res.status(201).json({
            message: 'Categoria creada correctamente',
            categoria: nuevaCategoria
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ACTUALIZAR CATEGORIA
app.put('/categorias/:id', async (req, res) => {
    try {
        const [actualizados] = await Categoria.update(req.body, {
            where: { id: req.params.id }
        });

        if (actualizados === 0) {
            return res.status(404).json({
                message: 'Categoria no encontrada'
            });
        }

        res.json({
            message: 'Categoria actualizada correctamente'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ELIMINAR CATEGORIA
app.delete('/categorias/:id', async (req, res) => {
    try {
        const eliminados = await Categoria.destroy({
            where: { id: req.params.id }
        });

        if (eliminados === 0) {
            return res.status(404).json({
                message: 'Categoria no encontrada'
            });
        }

        res.json({
            message: 'Categoria eliminada correctamente'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// CREAR PRODUCTO
app.post('/productos', async (req, res) => {
    try {
        const nuevoProducto = await Producto.create(req.body);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// LISTAR PRODUCTOS CON SU CATEGORIA
app.get('/productos', async (req, res) => {
    try {
        const productos = await Producto.findAll({
            include: [{
                model: Categoria,
                as: 'categoria'
            }]
        });

        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ACTUALIZAR PRODUCTO
app.put('/productos/:id', async (req, res) => {
    try {
        const [actualizados] = await Producto.update(req.body, {
            where: { id: req.params.id }
        });

        if (actualizados === 0) {
            return res.status(404).json({
                message: 'Producto no encontrado'
            });
        }

        res.json({ message: 'Producto actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ELIMINAR PRODUCTO
app.delete('/productos/:id', async (req, res) => {
    try {
        const eliminados = await Producto.destroy({
            where: { id: req.params.id }
        });

        if (eliminados === 0) {
            return res.status(404).json({
                message: 'Producto no encontrado'
            });
        }

        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// SINCRONIZAR BASE DE DATOS
const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Base de datos conectada y sincronizada.');

        app.listen(PORT, () => {
            console.log(
                `Servidor corriendo en http://localhost:${PORT}`
            );
        });
    })
    .catch(error => {
        console.error(
            'Error al conectar con la base de datos:',
            error
        );
    });
