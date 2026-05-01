export const obtenerClases = async (req, res) => {
    try {
        const response = await fetch('https://69cbcb910b417a19e07b4341.mockapi.io/api/v1/academia');
        const data = await response.json();

        res.json(data);

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener clases'
        });
    }
};