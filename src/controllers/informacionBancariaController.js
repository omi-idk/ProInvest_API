import { getConnection, sql } from '../dbConfig/connection';

export const getInformacionesBancarias = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Informacion_Bancaria");
    res.json(result.recordset);
};

export const createNewInformacionBancaria = async (req, res) => {
    const { Numero_Cuenta, Clabe_Interbancaria } = req.body;

    if (!Numero_Cuenta || !Clabe_Interbancaria) {
        return res.status(400).json({ msg: 'Bad Request. Please provide all required fields' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("numeroCuenta", sql.VarChar, Numero_Cuenta)
            .input("clabeInterbancaria", sql.VarChar, Clabe_Interbancaria)
            .query('INSERT INTO Informacion_Bancaria (Numero_Cuenta, Clabe_Interbancaria) VALUES (@numeroCuenta, @clabeInterbancaria)');

        res.status(200).json({ msg: 'Información bancaria creada exitosamente', informacionBancariaId: result.insertId });
    } catch (error) {
        console.error('Error al crear información bancaria:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al crear información bancaria' });
    }
};

export const updateInformacionBancaria = async (req, res) => {
    const { id } = req.params;
    const { Numero_Cuenta, Clabe_Interbancaria } = req.body;

    if (!Numero_Cuenta || !Clabe_Interbancaria) {
        return res.status(400).json({ msg: 'Bad Request. Please provide all required fields' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("id", sql.Int, id)
            .input("numeroCuenta", sql.VarChar, Numero_Cuenta)
            .input("clabeInterbancaria", sql.VarChar, Clabe_Interbancaria)
            .query('UPDATE Informacion_Bancaria SET Numero_Cuenta = @numeroCuenta, Clabe_Interbancaria = @clabeInterbancaria WHERE Id_Informacion_Bancaria = @id');

        res.status(200).json({ msg: 'Información bancaria actualizada exitosamente' });
    } catch (error) {
        console.error('Error al actualizar información bancaria:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al actualizar información bancaria' });
    }
};

export const deleteInformacionBancaria = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ msg: 'ID de la información bancaria no proporcionado' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input('idInformacionBancaria', sql.Int, id)
            .query('DELETE FROM Informacion_Bancaria WHERE Id_Informacion_Bancaria = @idInformacionBancaria');

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ msg: 'Información bancaria eliminada correctamente' });
        } else {
            res.status(404).json({ msg: 'Información bancaria no encontrada' });
        }
    } catch (error) {
        console.error('Error al eliminar información bancaria:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al eliminar información bancaria' });
    }
};
