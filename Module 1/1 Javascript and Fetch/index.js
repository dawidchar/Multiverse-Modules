const baseurl = "https://http-challenge.whitehatcoaches.org.uk/apprentices"


const payload = {
    name: "Frank Zappa",
    guests: 'Max, Bob, Sam',
    starter: 'Goat cheese crostini with fig-olive tapenade',
    main: 'Spicy root & lentil casserole',
    dessert: 'Ice Cream'
}


const JSONHeaders = {
    headers: {
        'Content-Type': 'application/json'
    }
}
const formHeaders = {
		mode: 'cors',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Access-Control-Allow-Headers': "*",
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
    }
}

function qparam(key, data) {
    return `${key}=${encodeURIComponent(data[key])}`
}

async function fetchme(request, urlappend, headers) {
    const res = await fetch(`${baseurl}${urlappend ? urlappend : ''}`, {
        ...request,
        ...headers,
    })
    const text = await res.text()
    console.log(text)
    return text
}

async function run() {
    const [myID] = await fetchme({ method: 'POST', body: JSON.stringify({ name: payload.name }) }, null, JSONHeaders)
    															.then(msg => msg.match(/(?<=\/)[a-zA-Z0-9]+(?=')/))
    await fetchme({ method: 'GET' }, `/${myID}`)
    await fetchme({ method: 'PATCH', body: JSON.stringify({ guests: payload.guests }) }, `/${myID}`, formHeaders)
    await fetchme({ method: 'GET' }, `/${myID}/menus?${qparam('starter', payload)}&${qparam('main', payload)}&${qparam('dessert', payload)}`)
    await fetchme({ method: 'DELETE' }, `/${myID}`)
}

run()