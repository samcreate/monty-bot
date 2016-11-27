module.exports = ({id, title, hero, producer, vintage, url, price}) => {
  let card_item = {
    title: title,
    image_url: hero,
    subtitle: `${vintage} by ${producer}`,
    default_action: {
      type: "web_url",
      url: 'https://www.amazon.com/gp/product/B01N061V2P/ref=s9_acsd_al_bw_c_x_1_w?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=merchandised-search-4&pf_rd_r=DJ773SAS9K9BVDAQT8DF&pf_rd_r=DJ773SAS9K9BVDAQT8DF&pf_rd_t=101&pf_rd_p=69a033c6-514c-40f0-8556-488ade982b23&pf_rd_p=69a033c6-514c-40f0-8556-488ade982b23&pf_rd_i=2983386011',
      messenger_extensions: true,
      webview_height_ratio: "tall",
      fallback_url: url
    },
    buttons: [
      {
        title: `Shop at $${price}`,
        type: "web_url",
        url: 'https://www.amazon.com/gp/product/B01N061V2P/ref=s9_acsd_al_bw_c_x_1_w?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=merchandised-search-4&pf_rd_r=DJ773SAS9K9BVDAQT8DF&pf_rd_r=DJ773SAS9K9BVDAQT8DF&pf_rd_t=101&pf_rd_p=69a033c6-514c-40f0-8556-488ade982b23&pf_rd_p=69a033c6-514c-40f0-8556-488ade982b23&pf_rd_i=2983386011',
        messenger_extensions: true,
        webview_height_ratio: "tall",
        fallback_url: url
      }
    ]
  };
  return card_item;
};
