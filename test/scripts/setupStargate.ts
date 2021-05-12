import axios from 'axios';

export async function prepareStargate() {
  try {
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
    console.log('stargate initialized successfully');
  } catch {
    console.log("couldn't create stargate namespace");
  }
}
