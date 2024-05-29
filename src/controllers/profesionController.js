import { getConnection, sql } from '../dbConfig/connection';

export const getProfesiones = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Profesion");
    res.json(result.recordset);
};

export const createNewProfesion = async (req, res) => {
    const { Nombre } = req.body;

    if (!Nombre) {
        return res.status(400).json({ msg: 'Bad Request. Please provide the name of the profession.' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("nombre", sql.VarChar, Nombre)
            .query('INSERT INTO Profesion (Nombre) VALUES (@nombre)');

        res.status(200).json({ msg: 'Profesión creada exitosamente' });
    } catch (error) {
        console.error('Error al crear profesión:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al crear profesión' });
    }
};

export const updateProfesion = async (req, res) => {
    const { id } = req.params;
    const { Nombre } = req.body;

    if (!Nombre) {
        return res.status(400).json({ msg: 'Bad Request. Please provide the name of the profession.' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("id", sql.Int, id)
            .input("nombre", sql.VarChar, Nombre)
            .query('UPDATE Profesion SET Nombre = @nombre WHERE Id_Profesion = @id');

        res.status(200).json({ msg: 'Profesión actualizada exitosamente' });
    } catch (error) {
        console.error('Error al actualizar profesión:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al actualizar profesión' });
    }
};

export const deleteProfesion = async (req, res) => {
    const { id } = req.params;

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Profesion WHERE Id_Profesion = @id');

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ msg: 'Profesión eliminada correctamente' });
        } else {
            res.status(404).json({ msg: 'Profesión no encontrada' });
        }
    } catch (error) {
        console.error('Error al eliminar profesión:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al eliminar profesión' });
    }
};
