
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Producto = sequelize.define('Producto', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    categoriaId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    proveedorId: {
    type: DataTypes.INTEGER,
    allowNull: true
}
}, {
    timestamps: true
});

module.exports = Producto;
