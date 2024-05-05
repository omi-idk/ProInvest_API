import {sequelize, DataTypes} from '../dbConfig/connection.js';



export const Cliente = sequelize.define('Cliente', {
    Id_Cliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    Nombres: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Apellido_Paterno:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Apellido_Materno:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Correo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },

    Rfc: {
        type : DataTypes.STRING,
        allowNull: false 
    },
    Fecha_Nacimiento :{
        type : DataTypes.Date,
        allowNull :false
    },
    Grado_Academico: {
        type : DataTypes.STRING,
        allowNull: false
    },
    Profesion: {
        type: DataTypes.STRING,
        allowNull : false

    },
    contraseña: {
        type :DataTypes.STRING,
        allowNull : false
    },
    Empresa_Trabajo_Id: {
        type: DataTypes.INTEGER,
        allowNull : true

    },
    Codigo_Postal_Id: {
        type: DataTypes.INTEGER,
        allowNull : true
    },
    Informacion_Financiera_Id: {
        type: DataTypes.INTEGER,
        allowNull : true

    }
},{
    freezeTableName: true,
    timestamps: false
})

export default Cliente;