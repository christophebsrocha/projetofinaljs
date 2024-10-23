const db = require('../models/db');

exports.getEmployees = (req, res) => {
     const user = req.session.user;

if (!user) {
 return res.status(401).json({ message: 'Not authenticated' });
 }
 
const query = 'SELECT * FROM funcionarios WHERE department_id = ?';
db.query(query, [user.department_id], (err, results) => {
 if (err) throw err;
 
 res.status(200).json(results);
 });
};