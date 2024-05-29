import { getConnection, sql } from '../dbConfig/connection';

// Obtener todas las empresas de trabajo
export const getEmpresaTrabajo = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Empresa_Trabajo");
    res.json(result.recordset);
};

// Crear una nueva empresa de trabajo
export const createNewEmpresaTrabajo = async (req, res) => {
    const { Nombre_Empresa, Correo_Electrónico, Telefono } = req.body;

    if (!Nombre_Empresa || !Correo_Electrónico || !Telefono) {
        return res.status(400).json({ msg: 'Bad Request. Please provide all required fields' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("nombreEmpresa", sql.VarChar, Nombre_Empresa)
            .input("correoElectronico", sql.VarChar, Correo_Electrónico)
            .input("telefono", sql.VarChar, Telefono)
            .query('INSERT INTO Empresa_Trabajo (Nombre_Empresa, Correo_Electrónico, Telefono) VALUES (@nombreEmpresa, @correoElectronico, @telefono)');

        res.status(200).json({ msg: 'Empresa de trabajo creada exitosamente', empresaId: result.recordset[0].Id_Empresa_Trabajo });
    } catch (error) {
        console.error('Error al crear empresa de trabajo:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al crear empresa de trabajo' });
    }
};

// Actualizar una empresa de trabajo existente
export const updateEmpresaTrabajo = async (req, res) => {
    const { id } = req.params;
    const { Nombre_Empresa, Correo_Electrónico, Telefono } = req.body;

    if (!Nombre_Empresa || !Correo_Electrónico || !Telefono) {
        return res.status(400).json({ msg: 'Bad Request. Please provide all required fields' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("id", sql.Int, id)
            .input("nombreEmpresa", sql.VarChar, Nombre_Empresa)
            .input("correoElectronico", sql.VarChar, Correo_Electrónico)
            .input("telefono", sql.VarChar, Telefono)
            .query('UPDATE Empresa_Trabajo SET Nombre_Empresa = @nombreEmpresa, Correo_Electrónico = @correoElectronico, Telefono = @telefono WHERE Id_Empresa_Trabajo = @id');

        res.status(200).json({ msg: 'Empresa de trabajo actualizada exitosamente' });
    } catch (error) {
        console.error('Error al actualizar empresa de trabajo:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al actualizar empresa de trabajo' });
    }
};

// Eliminar una empresa de trabajo
export const deleteEmpresaTrabajo = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ msg: 'ID de la empresa de trabajo no proporcionado' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input('idEmpresa', sql.Int, id)
            .query('DELETE FROM Empresa_Trabajo WHERE Id_Empresa_Trabajo = @idEmpresa');

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ msg: 'Empresa de trabajo eliminada correctamente' });
        } else {
            res.status(404).json({ msg: 'Empresa de trabajo no encontrada' });
        }
    } catch (error) {
        console.error('Error al eliminar empresa de trabajo:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al eliminar empresa de trabajo' });
    }
};
