

const getConfig = require('eri-config')
const request = require('request')

export async function urisToERI(uris, type) {

	const config = getConfig()

	return new Promise((resolve, reject) => {

		request({
			method: 'POST',
			url: config.xrefdb + '/uris2eri',
			json: true,
			body: {
				type: type,
				uris: uris
			}
		}, (err, res, body) => {

            console.log('uris2eri said', JSON.stringify(body))

			if(err) {
				reject(err)
				return
			}

			resolve(body.eri)
		})

	})

}


export async function eriToURIs(eri) {

	const config = getConfig()

	console.dir('query ' + eri)

	return new Promise((resolve, reject) => {

		request({
			method: 'POST',
			url: config.xrefdb + '/eri2uris',
			json: true,
			body: {
				eri: eri
			}
		}, (err, res, body) => {

			if(err) {
				reject(err)
				return
			}

			if(res.statusCode >= 300) {
				console.dir(body)
				reject(new Error('HTTP ' + res.statusCode))
				return
			}

			resolve(body.uris)
		})

	})

}



