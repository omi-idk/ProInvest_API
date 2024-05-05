import { getConnection, sql } from '../dbConfig/connection'

export const getClientes = async (req, res) => {
    const pool = await getConnection();
    const result =  await pool.request().query("SELECT * FROM Cliente")
   res.json(result.recordset)
};

export const createNewCliente = async (req, res) => {
    let { Nombres, Apellido_Paterno, Apellido_Materno, Correo, Telefono, Rfc, Fecha_Nacimiento, Grado_Academico, Profesion, Contraseña, Empresa_Trabajo_Id, Codigo_Postal_Id, Informacion_Financiera_Id } = req.body;

    if (!Nombres || !Apellido_Paterno || !Apellido_Materno || !Correo || !Telefono || !Rfc || !Fecha_Nacimiento || !Grado_Academico || !Profesion || !Contraseña) {
        return res.status(400).json({ msg: 'Bad Request. Please fill all fields' });
    }

    if (!Empresa_Trabajo_Id || !Codigo_Postal_Id || !Informacion_Financiera_Id) {
        Empresa_Trabajo_Id = null;
        Codigo_Postal_Id = null;
        Informacion_Financiera_Id = null;
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("nombres", sql.VarChar, Nombres)
            .input("apellidoPaterno", sql.VarChar, Apellido_Paterno)
            .input("apellidoMaterno", sql.VarChar, Apellido_Materno)
            .input("correo", sql.VarChar, Correo)
            .input("telefono", sql.VarChar, Telefono)
            .input("rfc", sql.VarChar, Rfc)
            .input("fechaNacimiento", sql.Date, Fecha_Nacimiento)
            .input("gradoAcademico", sql.VarChar, Grado_Academico)
            .input("profesion", sql.VarChar, Profesion)
            .input("contraseña", sql.VarChar, Contraseña)
            .input("empresaTrabajoId", sql.Int, Empresa_Trabajo_Id)
            .input("codigoPostalId", sql.Int, Codigo_Postal_Id)
            .input("informacionFinancieraId", sql.Int, Informacion_Financiera_Id)
            .query('INSERT INTO Cliente (nombres, apellido_paterno, apellido_materno, correo, telefono, rfc, fecha_nacimiento, grado_academico, profesion, contraseña, empresa_trabajo_id, codigo_postal_id, informacion_financiera_id) VALUES (@nombres, @apellidoPaterno, @apellidoMaterno, @correo, @telefono, @rfc, @fechaNacimiento, @gradoAcademico, @profesion, @contraseña, @empresaTrabajoId, @codigoPostalId, @informacionFinancieraId)');

        res.status(200).json({ msg: 'Cliente creado exitosamente', clienteId: result.insertId });
    } catch (error) {
        console.error('Error al crear cliente:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al crear cliente' });
    }
};

export const updateCliente = async (req, res) => {
    const { id } = req.params;
    const { Nombres, Apellido_Paterno, Apellido_Materno, Correo, Telefono, Rfc, Fecha_Nacimiento, Grado_Academico, Profesion, Contraseña } = req.body;

    if (!Nombres || !Apellido_Paterno || !Apellido_Materno || !Correo || !Telefono || !Rfc || !Fecha_Nacimiento || !Grado_Academico || !Profesion || !Contraseña) {
        return res.status(400).json({ msg: 'Bad Request. Please fill all required fields' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("id", sql.Int, id)
            .input("nombres", sql.VarChar, Nombres)
            .input("apellidoPaterno", sql.VarChar, Apellido_Paterno)
            .input("apellidoMaterno", sql.VarChar, Apellido_Materno)
            .input("correo", sql.VarChar, Correo)
            .input("telefono", sql.VarChar, Telefono)
            .input("rfc", sql.VarChar, Rfc)
            .input("fechaNacimiento", sql.Date, Fecha_Nacimiento)
            .input("gradoAcademico", sql.VarChar, Grado_Academico)
            .input("profesion", sql.VarChar, Profesion)
            .input("contraseña", sql.VarChar, Contraseña)
            .input("empresaTrabajoId", sql.Int, null) // Dejar en null
            .input("codigoPostalId", sql.Int, null) // Dejar en null
            .input("informacionFinancieraId", sql.Int, null) // Dejar en null
            .query('UPDATE Cliente SET nombres = @nombres, apellido_paterno = @apellidoPaterno, apellido_materno = @apellidoMaterno, correo = @correo, telefono = @telefono, rfc = @rfc, fecha_nacimiento = @fechaNacimiento, grado_academico = @gradoAcademico, profesion = @profesion, contraseña = @contraseña, empresa_trabajo_id = @empresaTrabajoId, codigo_postal_id = @codigoPostalId, informacion_financiera_id = @informacionFinancieraId WHERE Id_Cliente = @id');

        res.status(200).json({ msg: 'Cliente actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar cliente:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al actualizar cliente' });
    }
};


export const deleteCliente = async (req, res) => {
    const { id } = req.params; // Obtener el ID del cliente de los parámetros de la solicitud

    // Verificar que el ID esté presente
    if (!id) {
        return res.status(400).json({ msg: 'ID del cliente no proporcionado' });
    }

    const pool = await getConnection(); // Obtener la conexión a la base de datos

    try {
        // Crear la consulta SQL para eliminar el cliente por su ID
        const result = await pool.request()
            .input('idCliente', sql.Int, id)
            .query('DELETE FROM Cliente WHERE Id_Cliente = @idCliente');

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ msg: 'Cliente eliminado correctamente' });
        } else {
            res.status(404).json({ msg: 'Cliente no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar cliente:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al eliminar cliente' });
    }
};