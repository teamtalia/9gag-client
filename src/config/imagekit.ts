import ImageKit from 'imagekit-javascript';

export const publicKey = 'public_kjak5ZukKDm8ckZYNNfY9cHD0E4=';
export const urlEndpoint = 'https://ik.imagekit.io/vlhkkdi22xn';

const imagekit = new ImageKit({
  publicKey,
  urlEndpoint,
  authenticationEndpoint: 'http://localhost:5000/imagekit',
});

export default imagekit;
