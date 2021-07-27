const newEngine = require('@comunica/actor-init-sparql').newEngine;
const myEngine = newEngine();

const getWikidataEntity = async (req, res) => {
    try {
        var Request = require("request");
        Request.get(`http://www.wikidata.org/entity/${req.params.entityCode}`, (error, response, body) => {
            if (error) {
                return console.dir(error);
            }
            return res.status(200).json(JSON.parse(body));
        });
    } catch (err) {
        console.log('error desconocido', err);
        const error = {
            msg: 'Error al listar'
        }
        console.log('error desconocido', err);
        return res.status(500).json(error.msg);
    }
};


const getSparqlQuery = async (req, res) => {
    try {
      const results  = await data();
      return res.status(200).json(results);
  } catch (err) {
      console.log('error desconocido', err);
      const error = {
          msg: 'Error al listar'
      }
      console.log('error desconocido', err);
      return res.status(500).json(error.msg);
  }
};

class SPARQLQueryDispatcher {
	constructor( endpoint ) {
		this.endpoint = endpoint;
	}

	async query( sparqlQuery ) {
		const fullUrl = this.endpoint + '?query=' + encodeURIComponent( sparqlQuery );
		const headers = { 'Accept': 'application/sparql-results+json' };

		const body = await fetch(fullUrl, { headers });
    return await body.json();
	}
}

const endpointUrl = 'https://query.wikidata.org/sparql';
const sparqlQuery = `SELECT ?edicionCopaAmerica ?edicionCopaAmericaLabel ?año ?paisLabel ?ganadorLabel
WHERE
{
  ?edicionCopaAmerica wdt:P3450 wd:Q178750 .
  ?edicionCopaAmerica wdt:P585  ?año .
  ?edicionCopaAmerica wdt:P17   ?pais .
  ?edicionCopaAmerica wdt:P1346 ?ganador .
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
} order by ?año`;

const data = async () => {
  const queryDispatcher = new SPARQLQueryDispatcher(endpointUrl);
  const { results } = await queryDispatcher.query(sparqlQuery);
  return results;
}

module.exports = {
    getSparqlQuery,
    getWikidataEntity,
}