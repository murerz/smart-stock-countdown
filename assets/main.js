(($) => {

    $(window).ready(async () => {
        const params = new URLSearchParams(location.search);
        const shop = params.get('shop')
        const themeUrl = (shop ? `https://${shop}/admin/themes/current/editor` : "shopify://admin/themes" )
        $('.theme-link').attr('href', themeUrl)
    })

})(jQuery)