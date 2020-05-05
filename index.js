addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond with hello worker text
 */
async function handleRequest(request) {
  try {
    const host = request.headers.get('host')
    const location = await REDIRECTS.get(host)
    const url = new URL(request.url);
    if (location) {
      return Response.redirect(`https://${location}${url.pathname}${url.search}`, 302)
    } else {
      return new Response('', { status: 404, statusText: 'Not found' });
    }
  } catch(e) {
    return new Response(request.URL, {status: 500, statusText: 'Error handling redirect' });
  }
}
