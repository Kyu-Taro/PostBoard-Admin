export let axios;

export default ({ store, $axios }) => {
  $axios.onRequest(config => {
    console.log('実行');
    console.log(store.$auth.getToken('local'));
    config.headers.common['Authorization'] = 'Bearer' + store.$auth.getToken('local');
    config.headers.common['Accept'] = 'application/json';
  });

  $axios.onResponse(response => {
    return Promise.resolve(response);
  })

  $axios.onError(error => {
    return Promise.reject(error.response);
  });

  axios = $axios;
}
