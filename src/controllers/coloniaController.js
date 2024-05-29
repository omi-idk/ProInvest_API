import { getConnection, sql } from '../dbConfig/connection';

// Obtener todas las colonias
export const getColonia = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Colonia");
    res.json(result.recordset);
};

// Crear una nueva colonia
export const createNewColonia = async (req, res) => {
    let { Nombre_Colonia, Municipio_Id } = req.body;

    if (!Nombre_Colonia) {
        return res.status(400).json({ msg: 'Bad Request. Please provide the colony name' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("nombreColonia", sql.VarChar, Nombre_Colonia)
            .input("municipioId", sql.Int, Municipio_Id || null) // Permitir que Municipio_Id sea nulo si no se proporciona
            .query('INSERT INTO Colonia (Nombre_Colonia, Municipio_Id) VALUES (@nombreColonia, @municipioId)');

        res.status(200).json({ msg: 'Colonia creada exitosamente', coloniaId: result.insertId });
    } catch (error) {
        console.error('Error al crear colonia:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al crear colonia' });
    }
};

// Actualizar una colonia existente
export const updateColonia = async (req, res) => {
    const { id } = req.params;
    const { Nombre_Colonia, Municipio_Id } = req.body;

    if (!Nombre_Colonia) {
        return res.status(400).json({ msg: 'Bad Request. Please provide the colony name' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("id", sql.Int, id)
            .input("nombreColonia", sql.VarChar, Nombre_Colonia)
            .input("municipioId", sql.Int, Municipio_Id || null) // Permitir que Municipio_Id sea nulo si no se proporciona
            .query('UPDATE Colonia SET Nombre_Colonia = @nombreColonia, Municipio_Id = @municipioId WHERE Id_Colonia = @id');

        res.status(200).json({ msg: 'Colonia actualizada exitosamente' });
    } catch (error) {
        console.error('Error al actualizar colonia:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al actualizar colonia' });
    }
};

// Eliminar una colonia existente
export const deleteColonia = async (req, res) => {
    const { id } = req.params; // Obtener el ID de la colonia de los parámetros de la solicitud

    // Verificar que el ID esté presente
    if (!id) {
        return res.status(400).json({ msg: 'ID de la colonia no proporcionado' });
    }

    const pool = await getConnection(); // Obtener la conexión a la base de datos

    try {
        // Crear la consulta SQL para eliminar la colonia por su ID
        const result = await pool.request()
            .input('idColonia', sql.Int, id)
            .query('DELETE FROM Colonia WHERE Id_Colonia = @idColonia');

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ msg: 'Colonia eliminada correctamente' });
        } else {
            res.status(404).json({ msg: 'Colonia no encontrada' });
        }
    } catch (error) {
        console.error('Error al eliminar colonia:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al eliminar colonia' });
    }
};
