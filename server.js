const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt'); // Include bcrypt for password hashing

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Use bodyParser to parse JSON request bodies

const upload = multer({
  storage:storage
})

const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    cb(null, 'public/uploads')
  },
  filename: (req, file, cb) => {
    cb(null,file.fieldname + "_"+Date.now()+path.extname(file.originalname));
  }
})

const db = mysql.createConnection({
  host: "localhost",
  user: 'praneetha',
  password: '@Pranee15',
  database: 'certificates'
});

db.connect(err => {
    if (err) {
      console.error('Database connection failed:', err.stack);
      return;
    }
    console.log('Connected to database');
    
    db.query('SELECT * FROM student', (err, results) => {
        if (err) {
          console.error('Error querying student table:', err);
        } else {
          console.log('Student table contents:', results);
        }
      });
  });

app.post('/upload',upload.single('certificate'),(req,res)=> {
  const uploads = req.file.filename;
})

app.get('/', (req, res) => {
  return res.json("From Backend side");
});

app.post('/admin', (req, res) => {
  const { adminUsername, adminPassword } = req.body;

  const query = 'SELECT * FROM admin WHERE admin_id = ? AND password = ?';
  db.query(query, [adminUsername, adminPassword], (err, results) => {
    if (err) {
      res.status(500).send({ success: false, message: 'Error occurred while querying database' });
    } else if (results.length > 0) {
      res.status(200).send({ success: true, message: 'Login successful' });
    } else {
      res.status(401).send({ success: false, message: 'Incorrect username or password' });
    }
  });
});

app.post('/student', (req, res) => {
    const { reg_no, password } = req.body;
  
    const query = 'SELECT * FROM student WHERE reg_no = ? AND password = ?';
  db.query(query, [reg_no, password], (err, results) => {
    if (err) {
      res.status(500).send({ success: false, message: 'Error occurred while querying database' });
    } else if (results.length > 0) {
      res.status(200).send({ success: true, message: 'Login successful' });
    } else {
      res.status(401).send({ success: false, message: 'Incorrect username or password' });
    }
  });
  });

  
  app.post('/register', (req, res) => {
    const { regNo, name, email, phoneNumber, year, branch, section, password } = req.body;
    const sql = "INSERT INTO student (reg_no, name, password, email, ph_no, year, branch, section) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  
    console.log('Received data:', req.body);
  
    if (!regNo || !name || !email || !phoneNumber || !year || !branch || !section || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
  
    conn.query(sql, [regNo, name, password, email, phoneNumber, year, branch, section], (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Database query error', details: err.message });
        }
        res.status(200).json({ message: 'Data saved successfully', result });
    });
});

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // limit file size to 500MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('certificate');

// Check file type
function checkFileType(file, cb) {
  const filetypes = /pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  console.log(`File extension: ${path.extname(file.originalname).toLowerCase()}`);
  console.log(`MIME type: ${file.mimetype}`);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    console.error('Error: PDFs Only!');
    cb('Error: PDFs Only!');
  }
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Upload endpoint
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('Upload Error:', err);
      return res.status(400).send(err);
    } else {
      if (req.file == undefined) {
        console.error('No file selected');
        return res.status(400).send('No file selected');
      } else {
        const { regNo, name, course, department, year } = req.body;
        const certificatePath = req.file.path;

        console.log(`Certificate path: ${certificatePath}`);
        
        let sql = 'INSERT INTO studentdata (regNo, name, course, department, year, certificatePath) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(sql, [regNo, name, course, department, year, certificatePath], (err, result) => {
          if (err) {
            console.error('Database Error:', err);
            return res.status(500).send('Database Error');
          }
          res.send('File uploaded and data saved to database');
        });
      }
    }
  });
});

app.listen(8085, () => {
  console.log("listening on port 8082");
});
