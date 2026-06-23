const { Client } = require('pg');
const client = new Client({
    connectionString: "postgresql://postgres:Demogorgen%40109@localhost:5432/news_demand_tech"
});
client.connect()
    .then(() => client.query("SELECT count(*) FROM posts"))
    .then(res => {
        console.log("Post count:", res.rows[0].count);
        client.end();
    })
    .catch(err => {
        console.error("DB Error:", err.message);
        process.exit(1);
    });
