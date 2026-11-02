
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

const Producto = require('./models/Producto');
const Categoria = require('./models/Categoria');
const Proveedor = require('./models/Proveedor');
const Usuario = require('./models/Usuario');
const Movimiento = require('./models/Movimiento');

// RELACIONES ENTRE MODELOS
Categoria.hasMany(Producto, {
    foreignKey: 'categoriaId',
    as: 'productos'
});

Producto.belongsTo(Categoria, {
    foreignKey: 'categoriaId',
    as: 'categoria'
});

// RELACION PROVEEDOR - PRODUCTOS
Proveedor.hasMany(Producto, {
    foreignKey: 'proveedorId',
    as: 'productos'
});

Producto.belongsTo(Proveedor, {
    foreignKey: 'proveedorId',
    as: 'proveedor'
});


const app = express();

app.use(cors());
app.use(express.json());

// RUTA DE PRUEBA
app.get('/', (req, res) => {
    res.send('¡API Backend funcionando exitosamente!');
});

// Relaciones de Movimientos

Producto.hasMany(Movimiento, {
    foreignKey: 'productoId',
    as: 'movimientos'
});

Movimiento.belongsTo(Producto, {
    foreignKey: 'productoId',
    as: 'producto'
});

Usuario.hasMany(Movimiento, {
    foreignKey: 'usuarioId',
    as: 'movimientos'
});

Movimiento.belongsTo(Usuario, {
    foreignKey: 'usuarioId',
    as: 'usuario'
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


// ==========================================
// CRUD DE PROVEEDORES
// ==========================================

// LISTAR PROVEEDORES
app.get('/proveedores', async (req, res) => {
    try {
        const proveedores = await Proveedor.findAll();

        res.json(proveedores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CREAR PROVEEDOR
app.post('/proveedores', async (req, res) => {
    try {
        const nuevoProveedor = await Proveedor.create(req.body);

        res.status(201).json({
            message: 'Proveedor creado correctamente',
            proveedor: nuevoProveedor
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ACTUALIZAR PROVEEDOR
app.put('/proveedores/:id', async (req, res) => {
    try {
        const [actualizados] = await Proveedor.update(req.body, {
            where: { id: req.params.id }
        });

        if (actualizados === 0) {
            return res.status(404).json({
                message: 'Proveedor no encontrado'
            });
        }

        res.json({
            message: 'Proveedor actualizado correctamente'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ELIMINAR PROVEEDOR
app.delete('/proveedores/:id', async (req, res) => {
    try {
        const eliminados = await Proveedor.destroy({
            where: { id: req.params.id }
        });

        if (eliminados === 0) {
            return res.status(404).json({
                message: 'Proveedor no encontrado'
            });
        }

        res.json({
            message: 'Proveedor eliminado correctamente'
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
    include: [
        {
            model: Categoria,
            as: 'categoria'
        },
        {
            model: Proveedor,
            as: 'proveedor'
        }
    ]
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

// ========================================
// CRUD DE USUARIOS
// ========================================

// Obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            attributes: { exclude: ['password'] }
        });

        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Registrar un usuario
app.post('/usuarios', async (req, res) => {
    try {
        const usuario = await Usuario.create(req.body);

        res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol,
                estado: usuario.estado
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Actualizar un usuario
app.put('/usuarios/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        await usuario.update(req.body);

        res.json({
            mensaje: 'Usuario actualizado correctamente'
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar un usuario
app.delete('/usuarios/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        await usuario.destroy();

        res.json({
            mensaje: 'Usuario eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ========================================
// REGISTRAR MOVIMIENTOS - KARDEX
// ========================================

app.post('/movimientos', async (req, res) => {
    const {
        productoId,
        usuarioId,
        tipoMovimiento,
        cantidad,
        observaciones
    } = req.body;

    try {
        // Validar los datos recibidos
        if (!productoId || !usuarioId || !tipoMovimiento ||
            cantidad === undefined || !Number.isInteger(Number(cantidad)) ||
            Number(cantidad) <= 0) {

            return res.status(400).json({
                mensaje: 'Verifica los datos del movimiento. La cantidad debe ser un entero positivo.'
            });
        }

        if (!['Entrada', 'Salida', 'Ajuste'].includes(tipoMovimiento)) {
            return res.status(400).json({
                mensaje: 'Tipo de movimiento no válido'
            });
        }

        // Iniciar transacción
        const resultado = await sequelize.transaction(async (t) => {

            // Buscar producto y usuario
            const producto = await Producto.findByPk(productoId, {
                transaction: t,
                lock: t.LOCK.UPDATE
            });

            if (!producto) {
                throw new Error('Producto no encontrado');
            }

            const usuario = await Usuario.findByPk(usuarioId, {
                transaction: t
            });

            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }

            if (!usuario.estado) {
                throw new Error('El usuario se encuentra inactivo');
            }

            let nuevoStock = producto.stock;
            const cantidadMovimiento = Number(cantidad);

            // Calcular nuevo stock
            if (tipoMovimiento === 'Entrada') {
                nuevoStock += cantidadMovimiento;
            }

            if (tipoMovimiento === 'Salida') {
                nuevoStock -= cantidadMovimiento;

                if (nuevoStock < 0) {
                    throw new Error('No hay stock suficiente para realizar la salida');
                }
            }

            if (tipoMovimiento === 'Ajuste') {
                nuevoStock = cantidadMovimiento;
            }

            // Actualizar stock del producto
            await producto.update({
                stock: nuevoStock
            }, {
                transaction: t
            });

            // Registrar movimiento
            const movimiento = await Movimiento.create({
                productoId,
                usuarioId,
                tipoMovimiento,
                cantidad: cantidadMovimiento,
                observaciones
            }, {
                transaction: t
            });

            return {
                movimiento,
                stockAnterior: tipoMovimiento === 'Entrada'
                    ? nuevoStock - cantidadMovimiento
                    : tipoMovimiento === 'Salida'
                    ? nuevoStock + cantidadMovimiento
                    : producto.previous('stock'),
                stockActual: nuevoStock
            };
        });

        res.status(201).json({
            mensaje: 'Movimiento registrado correctamente',
            datos: resultado
        });

    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        });
    }
});

// Obtener historial de movimientos
app.get('/movimientos', async (req, res) => {
    try {
        const movimientos = await Movimiento.findAll({
            include: [
                {
                    model: Producto,
                    as: 'producto',
                    attributes: ['id', 'nombre']
                },
                {
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['id', 'nombre', 'correo']
                }
            ],
            order: [['fechaHora', 'DESC']]
        });

        res.json(movimientos);

    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });
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
