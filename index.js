const express = require('express');
const path = require('path');
const { default: axios } = require('axios');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/random-person', async (req, res) => {
    try {
        const response = await axios.get('https://randomuser.me/api/');
        const person = response.data.results[0]; 

        res.json({
            name: `${person.name.first} ${person.name.last}`,
            gender: person.gender,
            age: person.dob.age,
            email: person.email,
            picture: person.picture.medium,
            country: person.location.country
        });
    } catch (err) {
        console.error('Error fetching user:', err.message);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

app.listen(PORT, () => {
    console.log(`App is listening at port ${PORT}`);
});
