import { getConnection, sql } from '../dbConfig/connection';

export const getSolicitudesInversion = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Solicitudes_Inversion");
    res.json(result.recordset);
};

export const createNewSolicitudInversion = async (req, res) => {
    const { Importe_Inversion, Fecha_Solicitud, Estatus, Tipo_Inversion_Id, Id_Cliente } = req.body;

    if (!Importe_Inversion || !Fecha_Solicitud || Estatus == null || !Tipo_Inversion_Id || !Id_Cliente) {
        return res.status(400).json({ msg: 'Bad Request. Please provide all required fields' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("importeInversion", sql.Decimal(18, 5), Importe_Inversion)
            .input("fechaSolicitud", sql.Date, Fecha_Solicitud)
            .input("estatus", sql.Bit, Estatus)
            .input("tipoInversionId", sql.Int, Tipo_Inversion_Id)
            .input("idCliente", sql.Int, Id_Cliente)
            .query('INSERT INTO Solicitudes_Inversion (Importe_Inversion, Fecha_Solicitud, Estatus, Tipo_Inversion_Id, Id_Cliente) VALUES (@importeInversion, @fechaSolicitud, @estatus, @tipoInversionId, @idCliente)');

        res.status(200).json({ msg: 'Solicitud de inversión creada exitosamente', solicitudInversionId: result.insertId });
    } catch (error) {
        console.error('Error al crear solicitud de inversión:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al crear solicitud de inversión' });
    }
};

export const updateSolicitudInversion = async (req, res) => {
    const { id } = req.params;
    const { Importe_Inversion, Fecha_Solicitud, Estatus, Tipo_Inversion_Id, Id_Cliente } = req.body;

    if (!Importe_Inversion || !Fecha_Solicitud || Estatus == null || !Tipo_Inversion_Id || !Id_Cliente) {
        return res.status(400).json({ msg: 'Bad Request. Please provide all required fields' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("id", sql.Int, id)
            .input("importeInversion", sql.Decimal(18, 5), Importe_Inversion)
            .input("fechaSolicitud", sql.Date, Fecha_Solicitud)
            .input("estatus", sql.Bit, Estatus)
            .input("tipoInversionId", sql.Int, Tipo_Inversion_Id)
            .input("idCliente", sql.Int, Id_Cliente)
            .query('UPDATE Solicitudes_Inversion SET Importe_Inversion = @importeInversion, Fecha_Solicitud = @fechaSolicitud, Estatus = @estatus, Tipo_Inversion_Id = @tipoInversionId, Id_Cliente = @idCliente WHERE Id_Solicitud_Inversion = @id');

        res.status(200).json({ msg: 'Solicitud de inversión actualizada exitosamente' });
    } catch (error) {
        console.error('Error al actualizar solicitud de inversión:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al actualizar solicitud de inversión' });
    }
};

export const deleteSolicitudInversion = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ msg: 'ID de la solicitud de inversión no proporcionado' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input('idSolicitudInversion', sql.Int, id)
            .query('DELETE FROM Solicitudes_Inversion WHERE Id_Solicitud_Inversion = @idSolicitudInversion');

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ msg: 'Solicitud de inversión eliminada correctamente' });
        } else {
            res.status(404).json({ msg: 'Solicitud de inversión no encontrada' });
        }
    } catch (error) {
        console.error('Error al eliminar solicitud de inversión:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al eliminar solicitud de inversión' });
    }
};
