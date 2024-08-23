
// interface ResponseData {
//     message: string, 
//     data: {
//         "id": string,
//         "email": string,
//         "nome": string,
//         "tipoPermissao": string,
//         "token": string
//     }
// }

// var result = [
//     {
//       "date": "2024-08-22",
//       "temperatureC": 52,
//       "summary": "Scorching",
//       "temperatureF": 125
//     },
//     {
//       "date": "2024-08-23",
//       "temperatureC": 10,
//       "summary": "Bracing",
//       "temperatureF": 49
//     },
//     {
//       "date": "2024-08-24",
//       "temperatureC": -5,
//       "summary": "Scorching",
//       "temperatureF": 24
//     },
//     {
//       "date": "2024-08-25",
//       "temperatureC": 28,
//       "summary": "Chilly",
//       "temperatureF": 82
//     },
//     {
//       "date": "2024-08-26",
//       "temperatureC": 12,
//       "summary": "Balmy",
//       "temperatureF": 53
//     }
//   ];

  interface IForecast
  {
    date: string, 
    temperature: number, 
    summary: string, 
    temperatureF:number
  }


export const get_forecast   = async ()   => 
{
    //console.log('get_forecast');
    const url = 'http://localhost:5147/weatherforecast';
    const data = {   
    };


    var responseData = [];
    const response = await fetch(url, {
        //mode:'no-cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        // ,body: JSON.stringify(data)
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      // console.log('data');
      // console.log(data);
      data.forEach(function (value) {
        responseData.push(value);
      });

      responseData = data;
      return data;
    })
    .catch(rejected => {
        //console.log("falhou na chamada da api");
        console.log(rejected);
    });
    
    // console.log('responseData');
    // console.log(responseData);
    return responseData;
};


export const sent_comment   = async (forecast)   => 
{
    //console.log('get_forecast');
    const url = 'http://localhost:5147/commentforecast';
    console.log(forecast);
    console.log(JSON.stringify(forecast));

    var responseData = "";
    const response = await fetch(url, {
        //mode:'no-cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
         ,body: JSON.stringify(forecast)
    })
    .then(res => {
      return res.text();
    })
    .then(data => {
      console.log('data');
      console.log(data);
      responseData = data;
      return data;
    })
    .catch(rejected => {
        //console.log("falhou na chamada da api");
        console.log(rejected);
    });
    
    // console.log('responseData');
    // console.log(responseData);
    return responseData;
};