import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
    console.log(`Server is running on port ${PORT}`);
});

