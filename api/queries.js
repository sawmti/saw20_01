const Pool = require('pg').Pool

//LOCAL
/*const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'admin1234',
  port: 5432,
})*/

// HEROKU
const pool = new Pool({
    user: 'duxhwqhasvfrex',
    host: 'ec2-52-45-179-101.compute-1.amazonaws.com',
    database: 'dsgpnfbia78bm',
    password: 'e974f198d4ad33a700faee6806d7b54394424b3d1a6a705b4435efee1d14276c',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
      }
    })

const getAnnotationsByEntityCode = (request, response) => {
    const entityCode = request.params.entityCode;
  
    pool.query('SELECT * FROM entityAnnotation WHERE entityCode = $1', [entityCode], (error, results) => {
      if (error) {
        throw error
      }
      console.log(results.rows);
      console.log(entityCode);
      response.status(200).json(results.rows)
    })
  }

const getAnnotations = (request, response) => {
    const entityCode = parseInt(request.params.entityCode)
  
    pool.query('SELECT * FROM entityAnnotation', (error, results) => {
      if (error) {
        throw error
      }
      console.log(results.rows);
      //console.log(entityCode);
      response.status(200).json(results.rows)
    })
  }

  
module.exports = {
    getAnnotationsByEntityCode,
    getAnnotations,
}



