import { getConnection, sql } from '../dbConfig/connection';

// Obtener todos los documentos
export const getDocumentos = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Documentos");
    res.json(result.recordset);
};

// Crear un nuevo documento
export const createNewDocumento = async (req, res) => {
    const { Nombre_Documento, Tipo_Documento, Archivo, Solicitud_Inversion_Id } = req.body;

    if (!Nombre_Documento || !Tipo_Documento || !Archivo || !Solicitud_Inversion_Id) {
        return res.status(400).json({ msg: 'Bad Request. Please provide all required fields' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("nombreDocumento", sql.VarChar, Nombre_Documento)
            .input("tipoDocumento", sql.VarChar, Tipo_Documento)
            .input("archivo", sql.VarBinary, Archivo)
            .input("solicitudInversionId", sql.Int, Solicitud_Inversion_Id)
            .query('INSERT INTO Documentos (Nombre_Documento, Tipo_Documento, Archivo, Solicitud_Inversion_Id) VALUES (@nombreDocumento, @tipoDocumento, @archivo, @solicitudInversionId)');

        res.status(200).json({ msg: 'Documento creado exitosamente', documentoId: result.recordset[0].Id_Documento });
    } catch (error) {
        console.error('Error al crear documento:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al crear documento' });
    }
};

// Actualizar un documento existente
export const updateDocumento = async (req, res) => {
    const { id } = req.params;
    const { Nombre_Documento, Tipo_Documento, Archivo, Solicitud_Inversion_Id } = req.body;

    if (!Nombre_Documento || !Tipo_Documento || !Archivo || !Solicitud_Inversion_Id) {
        return res.status(400).json({ msg: 'Bad Request. Please provide all required fields' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("id", sql.Int, id)
            .input("nombreDocumento", sql.VarChar, Nombre_Documento)
            .input("tipoDocumento", sql.VarChar, Tipo_Documento)
            .input("archivo", sql.VarBinary, Archivo)
            .input("solicitudInversionId", sql.Int, Solicitud_Inversion_Id)
            .query('UPDATE Documentos SET Nombre_Documento = @nombreDocumento, Tipo_Documento = @tipoDocumento, Archivo = @archivo, Solicitud_Inversion_Id = @solicitudInversionId WHERE Id_Documento = @id');

        res.status(200).json({ msg: 'Documento actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar documento:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al actualizar documento' });
    }
};

// Eliminar un documento existente
export const deleteDocumento = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ msg: 'ID del documento no proporcionado' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input('idDocumento', sql.Int, id)
            .query('DELETE FROM Documentos WHERE Id_Documento = @idDocumento');

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ msg: 'Documento eliminado correctamente' });
        } else {
            res.status(404).json({ msg: 'Documento no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar documento:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al eliminar documento' });
    }
};
