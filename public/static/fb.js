(function (d, s, id) {
  const fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  const js = d.createElement(s);
  js.id = id;
  js.src =
    'https://connect.facebook.net/en_US/sdk.js#version=v9.0&appId=441714206821575&status=true&cookie=true&xfbml=true';
  fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');
