const pool = require("./db/index");

// Functions that query backend for users table

// Grab users table from PSQL
async function getUsers() {
  try {
    const users = await pool.query(`
      SELECT * 
      FROM users;
    `);
    return users.rows;
  } catch (error) {
    console.log(error);
  }
}

// Adds new user to users table when registration is successful
async function updateNewUser(first_name, last_name, email, password) {
  try {
    await pool.query(`
      INSERT INTO users (first_name, last_name, email, password)
      VALUES ($1, $2, $3, $4)`, [first_name, last_name, email, password]);
    return ("User created successfully");
  } catch (err) {
    console.log(err);
  }
}

// Update existing user based on cookie 
async function updateUser(email, password, cookie) {
  console.log("Email: ", email);
  console.log("Password: ", password);
  console.log("Cookie: ", cookie);
  try {
    await pool.query(`
      UPDATE users
      SET 
        email = $1,
        password = $2
      WHERE email = $3
    `, [email, password, cookie]);
    return true;
  } catch(err) {
    return false;
  }
}

// Update existing address based on cookie 
async function updateAddress(street, city, province, pCode, cookie) {
  console.log("Street: ", street);
  console.log("City: ", city);
  console.log("Province: ", province);
  console.log("Postal Code: ", pCode);
  console.log("Cookie: ", cookie);
  try {
    await pool.query(`
      UPDATE users
      SET 
        street = $1,
        city = $2, 
        province = $3, 
        postal_code = $4
      WHERE email = $5
    `, [street, city, province, pCode, cookie]);
    return true;
  } catch(err) {
    return false;
  }
}

module.exports = { getUsers, updateNewUser, updateUser, updateAddress };
