import { Client, Entity, Schema, Repository } from 'redis-om';

const client = new Client();

async function connect() {
    if(!client.isOpen()) {
        await client.open(process.env.REDIS_URL);
    }
}

class Song extends Entity {}
let schema = new Schema (
    Song,
    {
        title: { type: 'string' },
        lyrics: { type: 'string' },
        singer: { type: 'string' },
        composer: { type: 'string' },
        lyricist: { type: 'string' },
    },
    {
        dataStructure: 'JSON',
    }
);

export async function createSong(data) {
    await connect();

    const repository = client.fetchRepository(schema);

    const song = repository.createEntity(data);

    const id = await repository.save(song);

    return id;
};

export async function fetchSong(q) {
    await connect();

    const repository = client.fetchRepository(schema);

    const song =  repository.fetch();

    return song;
}