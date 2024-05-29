import { getConnection, sql } from '../dbConfig/connection';

export const getInformacionFinanciera = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Informacion_Financiera");
    res.json(result.recordset);
};

export const createNewInformacionFinanciera = async (req, res) => {
    let { Aceptacion_Acuerdo, Origen_Fondos_Id, Banco_Id, Informacion_Bancaria_Id } = req.body;

    if (typeof Aceptacion_Acuerdo === 'undefined' || !Origen_Fondos_Id || !Banco_Id || !Informacion_Bancaria_Id) {
        return res.status(400).json({ msg: 'Bad Request. Please provide all required fields' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("aceptacionAcuerdo", sql.Bit, Aceptacion_Acuerdo)
            .input("origenFondosId", sql.Int, Origen_Fondos_Id)
            .input("bancoId", sql.Int, Banco_Id)
            .input("informacionBancariaId", sql.Int, Informacion_Bancaria_Id)
            .query('INSERT INTO Informacion_Financiera (Aceptacion_Acuerdo, Origen_Fondos_Id, Banco_Id, Informacion_Bancaria_Id) VALUES (@aceptacionAcuerdo, @origenFondosId, @bancoId, @informacionBancariaId)');

        res.status(200).json({ msg: 'Información financiera creada exitosamente', informacionFinancieraId: result.insertId });
    } catch (error) {
        console.error('Error al crear información financiera:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al crear información financiera' });
    }
};

export const updateInformacionFinanciera = async (req, res) => {
    const { id } = req.params;
    const { Aceptacion_Acuerdo, Origen_Fondos_Id, Banco_Id, Informacion_Bancaria_Id } = req.body;

    if (typeof Aceptacion_Acuerdo === 'undefined' || !Origen_Fondos_Id || !Banco_Id || !Informacion_Bancaria_Id) {
        return res.status(400).json({ msg: 'Bad Request. Please provide all required fields' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("aceptacionAcuerdo", sql.Bit, Aceptacion_Acuerdo)
            .input("origenFondosId", sql.Int, Origen_Fondos_Id)
            .input("bancoId", sql.Int, Banco_Id)
            .input("informacionBancariaId", sql.Int, Informacion_Bancaria_Id)
            .input("id", sql.Int, id)
            .query('UPDATE Informacion_Financiera SET Aceptacion_Acuerdo = @aceptacionAcuerdo, Origen_Fondos_Id = @origenFondosId, Banco_Id = @bancoId, Informacion_Bancaria_Id = @informacionBancariaId WHERE Id_Informacion_Financiera = @id');

        res.status(200).json({ msg: 'Información financiera actualizada exitosamente' });
    } catch (error) {
        console.error('Error al actualizar información financiera:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al actualizar información financiera' });
    }
};

export const deleteInformacionFinanciera = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ msg: 'ID de la información financiera no proporcionado' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input('idInformacionFinanciera', sql.Int, id)
            .query('DELETE FROM Informacion_Financiera WHERE Id_Informacion_Financiera = @idInformacionFinanciera');

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ msg: 'Información financiera eliminada correctamente' });
        } else {
            res.status(404).json({ msg: 'Información financiera no encontrada' });
        }
    } catch (error) {
        console.error('Error al eliminar información financiera:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al eliminar información financiera' });
    }
};
