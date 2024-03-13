export async function getData(onSuccess) {
  await fetch('https://25.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })

    .then((data) => {
      //  eslint-disable-next-line no-console
      console.log('Результат', data);
      onSuccess(data);
    })
    .catch((err) => {
      //  eslint-disable-next-line no-console
      console.error(err);
    });
}


export const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://25.javascript.htmlacademy.pro/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};
