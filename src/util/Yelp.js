const clientId = '7AhbPXEVH_vHkeLH97KdvA';
const secret = 'vo31QWi2e3u8G1Qb3DCkQAZnEt4Sbtkqq31MoSu2JmGxfUxIYTMSw1Q9d24WjDSG';

var accessToken;

var Yelp = {
    getAccessToken(){
    if(accessToken) {
    return new Promise(resolve => resolve(accessToken));
}
    return fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=' +clientId+'&client_secret='+secret, {
        method: 'POST'
    }).then(response => response.json()).then(jsonResponse => accessToken = jsonResponse.access_token)
},

    search(term, location, sortBy) {
       return Yelp.getAccessToken().then(response => {
        return fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term='+term+'&location='+location+'&sort_by='+sortBy,{
            headers: {
             Authorization: 'Bearer '+ accessToken
                                         }
        }).then(response => response.json()).then(jsonResponse =>{
           if (jsonResponse.businesses) {
               return jsonResponse.businesses.map(business => {
                   return {
                       id: business.id,
                       imageSrc: business.image_url,
                       name: business.name,
                       address: business.address,
                       city: business.city,
                       state: business.state,
                       zipCode: business.zipCode,
                       category: business.category,
                       rating: business.rating,
                       reviewCount: business.reviewCount
                   };
               });
           }
       });
                                         }) 
    }
};

export default Yelp;