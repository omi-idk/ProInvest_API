import { DataTypes } from 'sequelize';
import {sequelize} from '../database/dbConfig.js';

export const SolicitudInversion = sequelize.define('SolicitudInversion',{
    idUsuario:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    fechaSolicitud :{
        type : DataTypes.DATE,
        allowNull: false
    },
    firma: {
        type : DataTypes.STRING,
        allowNull : false

    }
},{
    freezeTableName: true,
    timestamps: false
})