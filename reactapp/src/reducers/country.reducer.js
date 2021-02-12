export default function(country='fr', action) {
    if(action.type === 'selectCountry') {
        console.log("action country",action.country);
        return action.country;
    } else { 
        console.log("country",country);
        return country;
    }
}