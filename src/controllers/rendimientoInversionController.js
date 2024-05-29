import { getConnection, sql } from '../dbConfig/connection';

export const getRendimientosInversion = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Rendimiento_Inversion");
    res.json(result.recordset);
};

export const createNewRendimientoInversion = async (req, res) => {
    const { Fecha_Inversion, Fecha_Vencimiento, Rendimiento } = req.body;

    if (!Fecha_Inversion || !Fecha_Vencimiento || Rendimiento == null) {
        return res.status(400).json({ msg: 'Bad Request. Please provide all required fields.' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("fechaInversion", sql.Date, Fecha_Inversion)
            .input("fechaVencimiento", sql.Date, Fecha_Vencimiento)
            .input("rendimiento", sql.Decimal(18, 5), Rendimiento)
            .query('INSERT INTO Rendimiento_Inversion (Fecha_Inversion, Fecha_Vencimiento, Rendimiento) VALUES (@fechaInversion, @fechaVencimiento, @rendimiento)');

        res.status(200).json({ msg: 'Rendimiento de Inversión creado exitosamente' });
    } catch (error) {
        console.error('Error al crear rendimiento de inversión:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al crear rendimiento de inversión' });
    }
};

export const updateRendimientoInversion = async (req, res) => {
    const { id } = req.params;
    const { Fecha_Inversion, Fecha_Vencimiento, Rendimiento } = req.body;

    if (!Fecha_Inversion || !Fecha_Vencimiento || Rendimiento == null) {
        return res.status(400).json({ msg: 'Bad Request. Please provide all required fields.' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("id", sql.Int, id)
            .input("fechaInversion", sql.Date, Fecha_Inversion)
            .input("fechaVencimiento", sql.Date, Fecha_Vencimiento)
            .input("rendimiento", sql.Decimal(18, 5), Rendimiento)
            .query('UPDATE Rendimiento_Inversion SET Fecha_Inversion = @fechaInversion, Fecha_Vencimiento = @fechaVencimiento, Rendimiento = @rendimiento WHERE Id_Rendimiento_Inversion = @id');

        res.status(200).json({ msg: 'Rendimiento de Inversión actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar rendimiento de inversión:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al actualizar rendimiento de inversión' });
    }
};

export const deleteRendimientoInversion = async (req, res) => {
    const { id } = req.params;

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Rendimiento_Inversion WHERE Id_Rendimiento_Inversion = @id');

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ msg: 'Rendimiento de Inversión eliminado correctamente' });
        } else {
            res.status(404).json({ msg: 'Rendimiento de Inversión no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar rendimiento de inversión:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al eliminar rendimiento de inversión' });
    }
};
