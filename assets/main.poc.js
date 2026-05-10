(($, w, $ff) => {

    // https://localhost:8000/app.html?embedded=1&hmac=9263d61550996e460aa3488076c6e0ad031340e8a54c2595579dcb8fce241753&host=YWRtaW4uc2hvcGlmeS5jb20vc3RvcmUvZGV2c3RvcmUxLWkwNXdsZHhp&id_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczpcL1wvZGV2c3RvcmUxLWkwNXdsZHhpLm15c2hvcGlmeS5jb21cL2FkbWluIiwiZGVzdCI6Imh0dHBzOlwvXC9kZXZzdG9yZTEtaTA1d2xkeGkubXlzaG9waWZ5LmNvbSIsImF1ZCI6ImVmY2RjM2IxMGJjNWZkN2QxZDk0YWJmOTgyYjAzYTkxIiwic3ViIjoiODM1MjE4MzEwMDkiLCJleHAiOjE3NzgyNTI5ODcsIm5iZiI6MTc3ODI1MjkyNywiaWF0IjoxNzc4MjUyOTI3LCJqdGkiOiI0ZjcwZmUyZi1iMmI5LTQ4YjAtYmQzZS1jOWNlZjY5ODM5YzAiLCJzaWQiOiI3NzZjZDMxZi0zNTNkLTQyMTItODYyYy0yNmVmMjIwOTJkNzgiLCJzaWciOiJhYTgyZmFiYjY4MjhiYTgxZjNjYzZiZGZjZTA1NWJjMjcyNjA3ZDE5ZDNkYzIwNzMwZmM2OTQzNmNkYTEwYmE4In0.OfvoB9k5a46lGM0p64e2Z86Yvw0CTB7a4QCR4hYm9NY&locale=en&session=964b13fa2b394c29e620ffe3d9dda4e43fb6f6ed5ad5622fe1b776a4ddd7b3b2&shop=devstore1-i05wldxi.myshopify.com&timestamp=1778252927

    const CLIENT_ID = 'efcdc3b10bc5fd7d1d94abf982b03a91';
    const scopes = '';

    const me = location.href.split('?', 2)[0];

    const redirectUrl = (url) => {
        $('#wrapper').html('<a/>').find('a:last').attr('href', url).text(url)
        // location = url
    }


    const redirectGetCode = (shop) => {
        redirectUrl(`https://${shop}/admin/oauth/authorize?client_id=${CLIENT_ID}&scope=${scopes}&redirect_uri=${me}`)
    }

    const checkCode = (code) => {
        console.log('check code', code)
        redirectUrl(`app.html?face=guide`)
    }

    $(w).ready(async () => {
        const params = new URLSearchParams(location.search);
        console.log('ready', params.keys().toArray())

        const shop = params.get('shop')
        const code = params.get('code')
        if (shop && !code) {
            redirectGetCode(shop)
            return
        }
        
        if (code) {
            checkCode(code)
            return
        }

        const face = params.get('face') || 'home'

        console.log('finish it')
        const f = await $ff(`face/ff-${face}.html`)
        f('#wrapper')
    })

})(jQuery, window, $ff)