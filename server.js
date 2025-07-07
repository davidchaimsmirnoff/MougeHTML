const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const SAVE_DIR = path.join(__dirname, 'saves');
if (!fs.existsSync(SAVE_DIR)) {
  fs.mkdirSync(SAVE_DIR);
}

app.use(express.json());
app.use(express.static('public'));

// 🔸 Save to a named file
app.post('/api/save/:name', (req, res) => {
  const name = req.params.name;
  const filePath = path.join(SAVE_DIR, `${name}.json`);
  fs.writeFile(filePath, JSON.stringify(req.body), err => {
    if (err) return res.status(500).send('Failed to save');
    res.send(`Saved "${name}"`);
  });
});

// 🔹 Load a specific file
app.get('/api/load/:name', (req, res) => {
  const name = req.params.name;
  const filePath = path.join(SAVE_DIR, `${name}.json`);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(404).send('Save not found');
    res.json(JSON.parse(data));
  });
});

// 📜 List all save names
app.get('/api/list', (req, res) => {
  fs.readdir(SAVE_DIR, (err, files) => {
    if (err) return res.status(500).send('Failed to list saves');
    const saves = files
      .filter(f => f.endsWith('.json'))
      .map(f => path.basename(f, '.json'));
    res.json(saves);
  });
});



app.delete('/api/delete/:name', (req, res) => {
    const filepath = path.join(SAVE_DIR, `${req.params.name}.json`);
    fs.unlink(filepath, err => {
      if (err) return res.status(404).send('Save not found.');
      res.send(`Deleted "${req.params.name}"`);
    });
  });
  


app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
