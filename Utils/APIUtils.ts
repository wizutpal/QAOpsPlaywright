export class APIUtils
{
    apiContext: any
    loginPayLoad: string

    constructor(apiContext: any, loginPayLoad: string)
    {
        this.apiContext=apiContext;
        this.loginPayLoad=loginPayLoad;
    }

    async getToken()
    {
        const loginResponse= await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: this.loginPayLoad
        })
            //ok tracks all 2XX series status codes
        const jsonResponse= await loginResponse.json();
        const token= jsonResponse.token;
        console.log(token);
        return token;
    }


    async createOrder(orderPayLoad: String)
    {    
         let response={token: String, orderId: String};
         response.token= await this.getToken();
         const orderResponse= await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
                {
                    data: orderPayLoad,
                    headers: {
                                'Authorization': response.token,
                                'content-type': 'application/json'
                            }
                }
            )
               const orderResponseJson= await orderResponse.json(); 
               console.log(orderResponseJson);
               
                let orderId: any
                orderId= await orderResponseJson.orders[0];

               response.orderId= orderId;   
               return response;
    }
}
