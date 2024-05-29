import { getConnection, sql } from '../dbConfig/connection';

export const getOrigensFondos = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Origen_Fondos");
    res.json(result.recordset);
};

export const createNewOrigenFondos = async (req, res) => {
    const { Nombre_Origen } = req.body;

    if (!Nombre_Origen) {
        return res.status(400).json({ msg: 'Bad Request. Please provide the fund source name' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("nombreOrigen", sql.VarChar, Nombre_Origen)
            .query('INSERT INTO Origen_Fondos (Nombre_Origen) VALUES (@nombreOrigen)');

        res.status(200).json({ msg: 'Origen de fondos creado exitosamente', origenFondosId: result.insertId });
    } catch (error) {
        console.error('Error al crear origen de fondos:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al crear origen de fondos' });
    }
};

export const updateOrigenFondos = async (req, res) => {
    const { id } = req.params;
    const { Nombre_Origen } = req.body;

    if (!Nombre_Origen) {
        return res.status(400).json({ msg: 'Bad Request. Please provide the fund source name' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("id", sql.Int, id)
            .input("nombreOrigen", sql.VarChar, Nombre_Origen)
            .query('UPDATE Origen_Fondos SET Nombre_Origen = @nombreOrigen WHERE Id_Origen_Fondos = @id');

        res.status(200).json({ msg: 'Origen de fondos actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar origen de fondos:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al actualizar origen de fondos' });
    }
};

export const deleteOrigenFondos = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ msg: 'ID del origen de fondos no proporcionado' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input('idOrigenFondos', sql.Int, id)
            .query('DELETE FROM Origen_Fondos WHERE Id_Origen_Fondos = @idOrigenFondos');

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ msg: 'Origen de fondos eliminado correctamente' });
        } else {
            res.status(404).json({ msg: 'Origen de fondos no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar origen de fondos:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al eliminar origen de fondos' });
    }
};
