async function getUserLocation(req) {
    let userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    //if user doesnt let us use their IP change location to Sofia 
    if (userIp === '::1' || userIp === '127.0.0.1') {
        userIp = '45.83.216.15'; // Hardcoded IP for local testing 
    }

    console.log('User IP:', userIp);

    try {
        const response = await fetch(`http://ip-api.com/json/${userIp}`);
        const data = await response.json();

        if (data.status !== 'success') {
            throw new Error('Failed to get location');
        }
        
        return data;
    } catch (error) {
        console.error('Error fetching location:', error);
        throw error;
    }
}

module.exports = getUserLocation;
