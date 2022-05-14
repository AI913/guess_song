import { createSong } from '../../lib/redis';

export default async function handler(req, res) {
    const id = await createSong(req.body);

    res.status(200).json({id})
}