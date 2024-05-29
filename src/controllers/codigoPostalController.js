import { getConnection, sql } from '../dbConfig/connection';

// Obtener todos los códigos postales
export const getCodigoPostal = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Codigo_Postal");
    res.json(result.recordset);
};

// Crear un nuevo código postal
export const createNewCodigoPostal = async (req, res) => {
    let { Codigo, Colonia_Id } = req.body;

    if (!Codigo) {
        return res.status(400).json({ msg: 'Bad Request. Please provide the postal code' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("codigo", sql.VarChar, Codigo)
            .input("coloniaId", sql.Int, Colonia_Id || null) // Permitir que Colonia_Id sea nulo si no se proporciona
            .query('INSERT INTO Codigo_Postal (Codigo, Colonia_Id) VALUES (@codigo, @coloniaId)');

        res.status(200).json({ msg: 'Código postal creado exitosamente', codigoPostalId: result.insertId });
    } catch (error) {
        console.error('Error al crear código postal:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al crear código postal' });
    }
};

// Actualizar un código postal existente
export const updateCodigoPostal = async (req, res) => {
    const { id } = req.params;
    const { Codigo, Colonia_Id } = req.body;

    if (!Codigo) {
        return res.status(400).json({ msg: 'Bad Request. Please provide the postal code' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("id", sql.Int, id)
            .input("codigo", sql.VarChar, Codigo)
            .input("coloniaId", sql.Int, Colonia_Id || null) // Permitir que Colonia_Id sea nulo si no se proporciona
            .query('UPDATE CodigoPostal SET Codigo = @codigo, Colonia_Id = @coloniaId WHERE Id_Codigo_Postal = @id');

        res.status(200).json({ msg: 'Código postal actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar código postal:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al actualizar código postal' });
    }
};

// Eliminar un código postal existente
export const deleteCodigoPostal = async (req, res) => {
    const { id } = req.params; // Obtener el ID del código postal de los parámetros de la solicitud

    // Verificar que el ID esté presente
    if (!id) {
        return res.status(400).json({ msg: 'ID del código postal no proporcionado' });
    }

    const pool = await getConnection(); // Obtener la conexión a la base de datos

    try {
        // Crear la consulta SQL para eliminar el código postal por su ID
        const result = await pool.request()
            .input('idCodigoPostal', sql.Int, id)
            .query('DELETE FROM CodigoPostal WHERE Id_Codigo_Postal = @idCodigoPostal');

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ msg: 'Código postal eliminado correctamente' });
        } else {
            res.status(404).json({ msg: 'Código postal no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar código postal:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al eliminar código postal' });
    }
};
