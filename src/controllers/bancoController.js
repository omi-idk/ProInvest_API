import { getConnection, sql } from '../dbConfig/connection';

// Obtener todos los bancos
export const getBancos = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Banco");
    res.json(result.recordset);
};

// Crear un nuevo banco
export const createNewBanco = async (req, res) => {
    const { Nombre_Banco } = req.body;

    if (!Nombre_Banco) {
        return res.status(400).json({ msg: 'Bad Request. Please provide the bank name' });
    }

    const pool = await getConnection();

    try {
        await pool.request()
            .input("nombreBanco", sql.VarChar, Nombre_Banco)
            .query('INSERT INTO Banco (Nombre_Banco) VALUES (@nombreBanco)');

        res.status(200).json({ msg: 'Banco creado exitosamente' });
    } catch (error) {
        console.error('Error al crear banco:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al crear banco' });
    }
};

// Actualizar un banco existente
export const updateBanco = async (req, res) => {
    const { id } = req.params;
    const { Nombre_Banco } = req.body;

    if (!Nombre_Banco) {
        return res.status(400).json({ msg: 'Bad Request. Please provide the bank name' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("id", sql.Int, id)
            .input("nombreBanco", sql.VarChar, Nombre_Banco)
            .query('UPDATE Banco SET Nombre_Banco = @nombreBanco WHERE Id_Banco = @id');

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ msg: 'Banco actualizado exitosamente' });
        } else {
            res.status(404).json({ msg: 'Banco no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar banco:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al actualizar banco' });
    }
};

// Eliminar un banco existente
export const deleteBanco = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ msg: 'ID del banco no proporcionado' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input('idBanco', sql.Int, id)
            .query('DELETE FROM Banco WHERE Id_Banco = @idBanco');

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ msg: 'Banco eliminado correctamente' });
        } else {
            res.status(404).json({ msg: 'Banco no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar banco:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al eliminar banco' });
    }
};
