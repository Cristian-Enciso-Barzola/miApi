const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Movimiento = sequelize.define('Movimiento', {
    productoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tipoMovimiento: {
        type: DataTypes.ENUM('Entrada', 'Salida', 'Ajuste'),
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fechaHora: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    observaciones: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'Movimientos',
    timestamps: true
});

module.exports = Movimiento;