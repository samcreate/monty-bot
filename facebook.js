'use strict';
const fetch = require('node-fetch');
const config = require('config');
const FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN || config.get("FB_PAGE_TOKEN");


console.log(FB_PAGE_TOKEN)

function callSendAPI(messageData) {

    const qs = 'access_token=' + encodeURIComponent(FB_PAGE_TOKEN);
    const query = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: messageData
    };

    return fetch('https://graph.facebook.com/me/messages?' + qs, query)
        .then(rsp => rsp.json())
        .then(json => {
            if (json.error && json.error.message) {
                throw new Error(json.error.message);
            }
            return json;
        });
}

module.exports = {
    send: {
        text(id, text, quickreplies) {
            let body = {
                recipient: {
                    id
                },
                message: {
                    text
                },
            };
            //add quick replies if present.
            if (quickreplies) {

                body.message.quick_replies = quickreplies.map(x => ({
                    "title": x,
                    "content_type": "text",
                    "payload": "empty"
                }));
            }

            body = JSON.stringify(body);
            return callSendAPI(body);
        },
        card(id) {
            let body = {
                recipient: {
                    id
                },
                message: {
                    attachment: {
                        type: 'template',
                        payload: {
                            template_type: 'generic',
                            elements: [{
                                title: 'Maquis Cabernet Sauvignon 2012',
                                subtitle: 'Cabernet Sauvignon from Colchagua Valley, Rapel Valley, Chile',
                                item_url: 'http://www.wine.com/v6/Maquis-Cabernet-Sauvignon-2012/wine/139748/Detail.aspx',
                                image_url: 'http://cdn.fluidretail.net/customers/c1477/13/97/48/_s/pi/n/139748_spin_spin2/main_variation_na_view_01_204x400.jpg',
                                buttons: [{
                                    type: 'web_url',
                                    url: 'http://www.wine.com/v6/Maquis-Cabernet-Sauvignon-2012/wine/139748/Detail.aspx',
                                    title: 'Buy for $12.50'
                                }]
                            }, {
                                title: 'Maquis Cabernet Sauvignon 2012',
                                subtitle: 'Cabernet Sauvignon from Colchagua Valley, Rapel Valley, Chile',
                                item_url: 'http://www.wine.com/v6/Maquis-Cabernet-Sauvignon-2012/wine/139748/Detail.aspx',
                                image_url: 'http://cdn.fluidretail.net/customers/c1477/13/97/48/_s/pi/n/139748_spin_spin2/main_variation_na_view_01_204x400.jpg',
                                buttons: [{
                                    type: 'web_url',
                                    url: 'http://www.wine.com/v6/Maquis-Cabernet-Sauvignon-2012/wine/139748/Detail.aspx',
                                    title: 'Buy for $12.50'
                                }]
                            }]
                        }
                    },
                }
            };

            body = JSON.stringify(body);

            return callSendAPI(body);
        }
    },
    get: {
        getUserProfile(userId) {
            console.log('--> getUserProfile: ',userId);
            const url = `https://graph.facebook.com/v2.6/${userId}?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=${FB_PAGE_TOKEN}`;
            return fetch(url)
                .then(res => res.json())
                .catch(err => console.log(`Error getting user profile: ${err}`));
        }
    }
};