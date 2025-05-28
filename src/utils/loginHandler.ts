import { decode } from 'js-base64';

export const handleLoginSuccess = (accessToken: string | null) => {
  if (accessToken) {
    const payload = accessToken.split('.')[1] || '';
    const decodedPayload = decode(payload);
    const payloadObject = JSON.parse(decodedPayload);
    const { name: tokenName } = payloadObject;

    const userInfo = { name: tokenName };

    localStorage.setItem('token', accessToken);
    localStorage.setItem('user', JSON.stringify(userInfo));
  }
};
