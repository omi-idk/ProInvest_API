import { getConnection, sql } from '../dbConfig/connection';

export const getGradosAcademicos = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Grado_Academico");
    res.json(result.recordset);
};

export const createNewGradoAcademico = async (req, res) => {
    const { Nombre } = req.body;

    if (!Nombre) {
        return res.status(400).json({ msg: 'Bad Request. Please provide the name of the academic degree.' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("nombre", sql.VarChar, Nombre)
            .query('INSERT INTO Grado_Academico (Nombre) VALUES (@nombre)');

        res.status(200).json({ msg: 'Grado Académico creado exitosamente' });
    } catch (error) {
        console.error('Error al crear grado académico:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al crear grado académico' });
    }
};

export const updateGradoAcademico = async (req, res) => {
    const { id } = req.params;
    const { Nombre } = req.body;

    if (!Nombre) {
        return res.status(400).json({ msg: 'Bad Request. Please provide the name of the academic degree.' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("id", sql.Int, id)
            .input("nombre", sql.VarChar, Nombre)
            .query('UPDATE Grado_Academico SET Nombre = @nombre WHERE Id_Grado_Academico = @id');

        res.status(200).json({ msg: 'Grado Académico actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar grado académico:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al actualizar grado académico' });
    }
};

export const deleteGradoAcademico = async (req, res) => {
    const { id } = req.params;

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Grado_Academico WHERE Id_Grado_Academico = @id');

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ msg: 'Grado Académico eliminado correctamente' });
        } else {
            res.status(404).json({ msg: 'Grado Académico no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar grado académico:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al eliminar grado académico' });
    }
};
