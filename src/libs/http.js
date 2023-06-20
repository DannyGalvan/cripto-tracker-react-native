
export default class Http {
    static instance = new Http()

    get = async (url) =>{
        try {
            let response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);

            throw Error(error);
        }
    }

    post = async (url, body) =>{
        try {
            let response = await fetch(url,{
                method: 'POST',
                body: body,
            });
            const data = response.json();

            return data;

        } catch (error) {
            console.log(error);

            throw Error(error);
        }
    }
}