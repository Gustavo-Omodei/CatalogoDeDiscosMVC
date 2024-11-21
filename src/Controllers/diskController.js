const { Disk, Artist, Genre, Track } = require('../Models');

module.exports = {
    listDisks: async (req, res) => {
        try {
            const disks = await Disk.findAll({ include: [Artist, Genre, Track] });
            res.json(disks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createDisk: async (req, res) => {
        try {
            const { title, year, artistIds, genreIds, tracks } = req.body;
            const disk = await Disk.create({ title, year });

            // Associar artistas e gêneros
            if (artistIds) await disk.addArtists(artistIds);
            if (genreIds) await disk.addGenres(genreIds);

            // Criar faixas
            if (tracks) {
                const trackPromises = tracks.map((t) => Track.create({ ...t, DiskId: disk.id }));
                await Promise.all(trackPromises);
            }

            res.json(disk);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateDisk: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, year } = req.body;

            const disk = await Disk.findByPk(id);
            if (!disk) return res.status(404).json({ error: 'Disk not found' });

            await disk.update({ title, year });
            res.json(disk);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteDisk: async (req, res) => {
        try {
            const { id } = req.params;
            const disk = await Disk.findByPk(id);
            if (!disk) return res.status(404).json({ error: 'Disk not found' });

            await disk.destroy();
            res.json({ message: 'Disk deleted' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
