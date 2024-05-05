import { getConnection, sql } from '../dbConfig/connection'


export const getEstados = async (req, res) => {
    const pool = await getConnection();
    const result =  await pool.request().query("SELECT * FROM Estado")
   res.json(result.recordset)
};


export const createNewEstado = async (req, res) => {
    let { Nombre_Estado } = req.body;

    if (!Nombre_Estado) {
        return res.status(400).json({ msg: 'Bad Request. Please provide the state name' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("nombreEstado", sql.VarChar, Nombre_Estado)
            .query('INSERT INTO Estado (Nombre_Estado) VALUES (@nombreEstado)');

        res.status(200).json({ msg: 'Estado creado exitosamente', estadoId: result.insertId });
    } catch (error) {
        console.error('Error al crear estado:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al crear estado' });
    }
};

export const updateEstado = async (req, res) => {
    const { id } = req.params;
    const { Nombre_Estado } = req.body;

    if (!Nombre_Estado) {
        return res.status(400).json({ msg: 'Bad Request. Please provide the state name' });
    }

    const pool = await getConnection();

    try {
        const result = await pool.request()
            .input("id", sql.Int, id)
            .input("nombreEstado", sql.VarChar, Nombre_Estado)
            .query('UPDATE Estado SET Nombre_Estado = @nombreEstado WHERE Id_Estado = @id');

        res.status(200).json({ msg: 'Estado actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar estado:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al actualizar estado' });
    }
};

export const deleteEstado = async (req, res) => {
    const { id } = req.params; // Obtener el ID del estado de los parámetros de la solicitud

    // Verificar que el ID esté presente
    if (!id) {
        return res.status(400).json({ msg: 'ID del estado no proporcionado' });
    }

    const pool = await getConnection(); // Obtener la conexión a la base de datos

    try {
        // Crear la consulta SQL para eliminar el estado por su ID
        const result = await pool.request()
            .input('idEstado', sql.Int, id)
            .query('DELETE FROM Estado WHERE Id_Estado = @idEstado');

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ msg: 'Estado eliminado correctamente' });
        } else {
            res.status(404).json({ msg: 'Estado no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar estado:', error.message);
        res.status(500).json({ msg: 'Error interno del servidor al eliminar estado' });
    }
};



