import { getConnection, sql } from '../dbConfig/connection';

// Obtener todos los clientes
export const getClientes = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Cliente");
    res.json(result.recordset);
};

// Crear un nuevo cliente
export const createNewCliente = async (req, res) => {
    let {
        Nombres,
        Apellido_Paterno,
        Apellido_Materno,
        Correo,
        Telefono,
        Rfc,
        Fecha_Nacimiento,
        Contraseña,
        Codigo_Postal,
        Empresa_Trabajo_Id,
        Informacion_Financiera_Id,
        Colonia_Id,
        Grado_Academico_Id,
        Profesion_Id
    } = req.body;

    if (!Nombres || !Apellido_Paterno || !Apellido_Materno || !Correo || !Telefono || !Rfc || !Fecha_Nacimiento || !Contraseña || !Codigo_Postal) {
        return res.status(400).json({ msg: 'Bad Request. Please fill all fields' });
    }

    const pool = await getConnection();

    try {
        // Comprobar si ya existe un cliente con el mismo RFC y correo electrónico
        const checkDuplicate = await pool.request()
            .input("correo", sql.VarChar, Correo)
            .input("rfc", sql.VarChar, Rfc)
            .query('SELECT * FROM Cliente WHERE correo = @correo OR rfc = @rfc');

        if (checkDuplicate.recordset.length > 0) {
            return res.status(400).json({ msg: 'Ya existe un cliente con el mismo RFC o correo electrónico' });
        }

        // Insertar nuevo cliente
        await pool.request()
            .input("nombres", sql.VarChar, Nombres)
            .input("apellidoPaterno", sql.VarChar, Apellido_Paterno)
            .input("apellidoMaterno", sql.VarChar, Apellido_Materno)
            .input("correo", sql.VarChar, Correo)
            .input("telefono", sql.VarChar, Telefono)
            .input("rfc", sql.VarChar, Rfc)
            .input("fechaNacimiento", sql.Date, Fecha_Nacimiento)
            .input("contraseña", sql.VarChar, Contraseña)
            .input("codigoPostal", sql.VarChar, Codigo_Postal)
            .input("empresaTrabajoId", sql.Int, Empresa_Trabajo_Id)
            .input("informacionFinancieraId", sql.Int, Informacion_Financiera_Id)
            .input("coloniaId", sql.Int, Colonia_Id)
            .input("gradoAcademicoId", sql.Int, Grado_Academico_Id)
            .input("profesionId", sql.Int, Profesion_Id)
            .query('INSERT INTO Cliente (nombres, apellido_paterno, apellido_materno, correo, telefono, rfc, fecha_nacimiento, contraseña, codigo_postal, empresa_trabajo_id, informacion_financiera_id, colonia_id, grado_academico_id, profesion_id) VALUES (@nombres, @apellidoPaterno, @apellidoMaterno, @correo, @telefono, @rfc, @fechaNacimiento, @contraseña, @codigoPostal, @empresaTrabajoId, @informacionFinancieraId, @coloniaId, @gradoAcademicoId, @profesionId)');

        res.status(200).json({ msg: 'Cliente creado exitosamente' });
    } catch (error) {
        console.error('Error al crear cliente:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al crear cliente' });
    }
};

// Actualizar un cliente existente
export const updateCliente = async (req, res) => {
    const { id } = req.params;
    const {
        Nombres,
        Apellido_Paterno,
        Apellido_Materno,
        Correo,
        Telefono,
        Rfc,
        Fecha_Nacimiento,
        Contraseña,
        Codigo_Postal,
        Empresa_Trabajo_Id,
        Informacion_Financiera_Id,
        Colonia_Id,
        Grado_Academico_Id,
        Profesion_Id
    } = req.body;

    if (!Nombres || !Apellido_Paterno || !Apellido_Materno || !Correo || !Telefono || !Rfc || !Fecha_Nacimiento || !Contraseña || !Codigo_Postal) {
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
            .input("contraseña", sql.VarChar, Contraseña)
            .input("codigoPostal", sql.VarChar, Codigo_Postal)
            .input("empresaTrabajoId", sql.Int, Empresa_Trabajo_Id)
            .input("informacionFinancieraId", sql.Int, Informacion_Financiera_Id)
            .input("coloniaId", sql.Int, Colonia_Id)
            .input("gradoAcademicoId", sql.Int, Grado_Academico_Id)
            .input("profesionId", sql.Int, Profesion_Id)
            .query('UPDATE Cliente SET nombres = @nombres, apellido_paterno = @apellidoPaterno, apellido_materno = @apellidoMaterno, correo = @correo, telefono = @telefono, rfc = @rfc, fecha_nacimiento = @fechaNacimiento, contraseña = @contraseña, codigo_postal = @codigoPostal, empresa_trabajo_id = @empresaTrabajoId, informacion_financiera_id = @informacionFinancieraId, colonia_id = @coloniaId, grado_academico_id = @gradoAcademicoId, profesion_id = @profesionId WHERE Id_Cliente = @id');

        res.status(200).json({ msg: 'Cliente actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar cliente:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al actualizar cliente' });
    }
};

// Eliminar un cliente existente
export const deleteCliente = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ msg: 'ID del cliente no proporcionado' });
    }

    const pool = await getConnection();

    try {
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
