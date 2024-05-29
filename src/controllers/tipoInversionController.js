import { getConnection, sql } from '../dbConfig/connection';

export const getTiposInversion = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Tipo_Inversion");
    res.json(result.recordset);
};

export const createNewTipoInversion = async (req, res) => {
    const { Nombre_Tipo_Inversion, Descripción, Tasa_Retorno, Plazo } = req.body;

    if (!Nombre_Tipo_Inversion || !Descripción || Tasa_Retorno == null || !Plazo) {
        return res.status(400).json({ msg: 'Bad Request. Please provide all required fields' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("nombreTipoInversion", sql.VarChar, Nombre_Tipo_Inversion)
            .input("descripcion", sql.Text, Descripción)
            .input("tasaRetorno", sql.Float, Tasa_Retorno)
            .input("plazo", sql.VarChar, Plazo)
            .query('INSERT INTO Tipo_Inversion (Nombre_Tipo_Inversion, Descripción, Tasa_Retorno, Plazo) VALUES (@nombreTipoInversion, @descripcion, @tasaRetorno, @plazo)');

        res.status(200).json({ msg: 'Tipo de inversión creado exitosamente', tipoInversionId: result.insertId });
    } catch (error) {
        console.error('Error al crear tipo de inversión:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al crear tipo de inversión' });
    }
};

export const updateTipoInversion = async (req, res) => {
    const { id } = req.params;
    const { Nombre_Tipo_Inversion, Descripción, Tasa_Retorno, Plazo } = req.body;

    if (!Nombre_Tipo_Inversion || !Descripción || Tasa_Retorno == null || !Plazo) {
        return res.status(400).json({ msg: 'Bad Request. Please provide all required fields' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("id", sql.Int, id)
            .input("nombreTipoInversion", sql.VarChar, Nombre_Tipo_Inversion)
            .input("descripcion", sql.Text, Descripción)
            .input("tasaRetorno", sql.Float, Tasa_Retorno)
            .input("plazo", sql.VarChar, Plazo)
            .query('UPDATE Tipo_Inversion SET Nombre_Tipo_Inversion = @nombreTipoInversion, Descripción = @descripcion, Tasa_Retorno = @tasaRetorno, Plazo = @plazo WHERE Id_Tipo_Inversion = @id');

        res.status(200).json({ msg: 'Tipo de inversión actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar tipo de inversión:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al actualizar tipo de inversión' });
    }
};

export const deleteTipoInversion = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ msg: 'ID del tipo de inversión no proporcionado' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input('idTipoInversion', sql.Int, id)
            .query('DELETE FROM Tipo_Inversion WHERE Id_Tipo_Inversion = @idTipoInversion');

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ msg: 'Tipo de inversión eliminado correctamente' });
        } else {
            res.status(404).json({ msg: 'Tipo de inversión no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar tipo de inversión:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al eliminar tipo de inversión' });
    }
};
