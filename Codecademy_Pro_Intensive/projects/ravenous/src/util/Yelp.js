// Yelp API Key
const apiKey = 'nO-SVFtMrEfyN2RBGdLll9vhBBurgx4REGYXk5sLMHOpb0eb_HrarVVdXoyoM8VrhLTHEQmcZmRkFtUL6Xz-Ob-akff--UoH_a4bYII0wVsRIqBERQ2XrALskvXsWnYx';

const Yelp = {
  search(term, location, sortBy){
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
      {
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
      }).then(response => {
          return response.json();
      }).then(jsonResponse => {
        if(jsonResponse.businesses) {
          return jsonResponse.businesses.map(business => (
          {
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories[0].title,
            rating: business.rating,
            reviewCount: business.review_count
          }
        )
        );
      }
    });
  }
};

export default Yelp;
