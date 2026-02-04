import axios from 'axios';

async function addBookingLink(accessToken, locationId, bookingUrl) {
    const url = `https://businessprofile.googleapis.com/v1/${locationId}?updateMask=profile.bookingUrl`;
    const response = await axios.patch(
        url,
        { profile: { bookingUrl } },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        }
    );
    return response.data;
}

// Usage
const locationId = 'locations/1234567890'; // Get from your Google Business account
const bookingUrl = 'https://yourbookinglink.com';
const accessToken = 'ACCESS_TOKEN_OBTAINED_FROM_OAUTH';

addBookingLink(accessToken, locationId, bookingUrl)
    .then(console.log)
    .catch(console.error);