import { getConnection, sql } from '../dbConfig/connection';

// Obtener todos los municipios
export const getMunicipios = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Municipio");
    res.json(result.recordset);
};

// Crear un nuevo municipio
export const createNewMunicipio = async (req, res) => {
    let { Nombre_Municipio, Estado_Id } = req.body;

    if (!Nombre_Municipio) {
        return res.status(400).json({ msg: 'Bad Request. Please provide the municipality name' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("nombreMunicipio", sql.VarChar, Nombre_Municipio)
            .input("estadoId", sql.Int, Estado_Id || null) // Permitir que Estado_Id sea nulo si no se proporciona
            .query('INSERT INTO Municipio (Nombre_Municipio, Estado_Id) VALUES (@nombreMunicipio, @estadoId)');

        res.status(200).json({ msg: 'Municipio creado exitosamente', municipioId: result.insertId });
    } catch (error) {
        console.error('Error al crear municipio:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al crear municipio' });
    }
};

// Actualizar un municipio existente
export const updateMunicipio = async (req, res) => {
    const { id } = req.params;
    const { Nombre_Municipio, Estado_Id } = req.body;

    if (!Nombre_Municipio) {
        return res.status(400).json({ msg: 'Bad Request. Please provide the municipality name' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("id", sql.Int, id)
            .input("nombreMunicipio", sql.VarChar, Nombre_Municipio)
            .input("estadoId", sql.Int, Estado_Id || null) // Permitir que Estado_Id sea nulo si no se proporciona
            .query('UPDATE Municipio SET Nombre_Municipio = @nombreMunicipio, Estado_Id = @estadoId WHERE Id_Municipio = @id');

        res.status(200).json({ msg: 'Municipio actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar municipio:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al actualizar municipio' });
    }
};

// Eliminar un municipio
export const deleteMunicipio = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ msg: 'ID del municipio no proporcionado' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input('idMunicipio', sql.Int, id)
            .query('DELETE FROM Municipio WHERE Id_Municipio = @idMunicipio');

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ msg: 'Municipio eliminado correctamente' });
        } else {
            res.status(404).json({ msg: 'Municipio no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar municipio:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al eliminar municipio' });
    }
};
