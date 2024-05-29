import { getConnection, sql } from '../dbConfig/connection';

// Obtener todos los contratos de inversión
export const getContratosInversion = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Contrato_Inversion");
    res.json(result.recordset);
};

// Crear un nuevo contrato de inversión
export const createNewContratoInversion = async (req, res) => {
    const { Folio, Firma, Solicitud_Inversion_Id, Rendimiento_Inversion_Id } = req.body;

    if (!Folio || !Firma || !Solicitud_Inversion_Id || !Rendimiento_Inversion_Id) {
        return res.status(400).json({ msg: 'Bad Request. Please provide all required fields' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("folio", sql.VarChar, Folio)
            .input("firma", sql.VarBinary, Firma)
            .input("solicitudInversionId", sql.Int, Solicitud_Inversion_Id)
            .input("rendimientoInversionId", sql.Int, Rendimiento_Inversion_Id)
            .query('INSERT INTO Contrato_Inversion (Folio, Firma, Solicitud_Inversion_Id, Rendimiento_Inversion_Id) VALUES (@folio, @firma, @solicitudInversionId, @rendimientoInversionId)');

        res.status(200).json({ msg: 'Contrato de inversión creado exitosamente', contratoId: result.insertId });
    } catch (error) {
        console.error('Error al crear contrato de inversión:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al crear contrato de inversión' });
    }
};

// Actualizar un contrato de inversión existente
export const updateContratoInversion = async (req, res) => {
    const { id } = req.params;
    const { Folio, Firma, Solicitud_Inversion_Id, Rendimiento_Inversion_Id } = req.body;

    if (!Folio || !Firma || !Solicitud_Inversion_Id || !Rendimiento_Inversion_Id) {
        return res.status(400).json({ msg: 'Bad Request. Please provide all required fields' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("id", sql.Int, id)
            .input("folio", sql.VarChar, Folio)
            .input("firma", sql.VarBinary, Firma)
            .input("solicitudInversionId", sql.Int, Solicitud_Inversion_Id)
            .input("rendimientoInversionId", sql.Int, Rendimiento_Inversion_Id)
            .query('UPDATE Contrato_Inversion SET Folio = @folio, Firma = @firma, Solicitud_Inversion_Id = @solicitudInversionId, Rendimiento_Inversion_Id = @rendimientoInversionId WHERE Id_Contrato_Inversion = @id');

        res.status(200).json({ msg: 'Contrato de inversión actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar contrato de inversión:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al actualizar contrato de inversión' });
    }
};

// Eliminar un contrato de inversión existente
export const deleteContratoInversion = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ msg: 'ID del contrato de inversión no proporcionado' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input('idContrato', sql.Int, id)
            .query('DELETE FROM Contrato_Inversion WHERE Id_Contrato_Inversion = @idContrato');

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ msg: 'Contrato de inversión eliminado correctamente' });
        } else {
            res.status(404).json({ msg: 'Contrato de inversión no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar contrato de inversión:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al eliminar contrato de inversión' });
    }
};
