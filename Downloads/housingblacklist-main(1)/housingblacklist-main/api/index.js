export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const pathParts = url.pathname.split('/').filter(part => part);

      // Validate the request path to ensure it follows the correct API structure
      if (pathParts.length < 3 || pathParts[0].toLowerCase() !== "api") {
        return new Response(JSON.stringify({ message: 'Invalid endpoint. Use /api/username/%username% or /api/uuid/%uuid%' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const searchType = pathParts[1];
      let searchValue = pathParts[2];

      // Convert username to lowercase
      if (searchType === "username") {
        searchValue = searchValue.toLowerCase();
      }

      let cacheKey = new Request(url.toString(), request);
      let cachedResponse = await caches.default.match(cacheKey);

      // If the result is cached, return it
      if (cachedResponse) {
        return cachedResponse;
      }

      let userData = null;

      // Fetch the user data based on the search type
      if (searchType === "uuid") {
        userData = await env.blacklist_uuid.get(searchValue, { type: "json" });
      } else if (searchType === "username") {
        userData = await env.blacklist_users.get(searchValue, { type: "json" });
      } else {
        return new Response(JSON.stringify({ message: 'Invalid search type. Use /api/username/%username% or /api/uuid/%uuid%' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Return a 404 if the user is not found
      if (!userData) {
        return new Response(JSON.stringify({ message: 'User not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Create the response with the user data and set caching headers
      const response = new Response(JSON.stringify(userData), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'max-age=600',
        },
      });

      // Store the response in the cache
      ctx.waitUntil(caches.default.put(cacheKey, response.clone()));

      return response;

    } catch (error) {
      // Return a 500 error if there is an internal server error
      return new Response(JSON.stringify({ message: `Internal error: ${error.message}` }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
}
