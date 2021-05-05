const axios = require('axios');

(async () => {
  const response = await axios.post('http://localhost:8081/v1/auth', {
    username: 'cassandra',
    password: 'cassandra',
  });
  const token = response.data.authToken;

  await axios.post(
    'http://localhost:8082/v2/schemas/namespaces',
    {
      name: 'eddiehub',
    },
    {
      headers: {
        'X-Cassandra-Token': token,
      },
    },
  );
})();
