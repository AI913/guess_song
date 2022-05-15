export default function SongForm() {
    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = new FormData(event.target);
        const formData = Object.fromEntries(form.entries());

        console.log(formData);

        const res = await fetch('/api/songs', {
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });

        const result = await res.json();
        console.log(result);
     };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" type="text" />
            <input name="lyrics" type="text" />
            <input name="singer" type="text" />
            <input name="composer" type="text" />
            <input name="lyricist" type="text" />

            <button type="submit">Create a song</button>
        </form>
    );
}