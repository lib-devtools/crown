(function() {
    const blockedCategoryId = "66f5d9266653802c82c96cd5";
    let cachedOffers = null;

    const fetchOffers = () => {
        if (typeof offerApiUrl === 'undefined') return;
        fetch(offerApiUrl)
            .then(res => res.json())
            .then(data => {
                cachedOffers = data.filter(offer => String(offer.category_id) !== blockedCategoryId);
                renderOffers();
            })
            .catch(() => {});
    };

    const renderOffers = () => {
        const container = document.getElementById("offerContainer");
        if (!container || !cachedOffers) return;

        let html = '';
        const selected = cachedOffers.slice(0, 3);

        selected.forEach(offer => {
            let finalUrl = offer.url + "&sub1=zero";
            html += `
                <div class="offer-card" onclick="window.openO('${finalUrl}', this)">
                    <div class="offer-link">
                        <div class="icon-section">
                            <img src="${offer.network_icon}" class="offer-icon">
                        </div>
                        <div class="offer-info">
                            <div class="offer-anchor">${offer.anchor || "Click to Start"}</div>
                        </div>
                    </div>
                </div>`;
        });
        container.innerHTML = html;
    };

    window.openO = function(url, element) {
        window.open(url, '_blank');
        const info = element.querySelector('.offer-info');
        if (info) {
            info.innerHTML = `
                <div style="display:flex;align-items:center;gap:10px;color:#ffcc00;">
                    <span style="font-size:12px;">Waiting...</span>
                    <div class="spinner-mini"></div>
                </div>`;
        }
    };

    setInterval(() => {
        fetch("https://d1y3y09sav47f5.cloudfront.net/public/external/check2.php?testing=0")
            .then(res => res.json())
            .then(leads => {
                if (leads && leads.length > 0) {
                    window.location.href = "YOUR_SUCCESS_URL";
                }
            })
            .catch(() => {});
    }, 5000);

    fetchOffers();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderOffers);
    } else {
        renderOffers();
    }
})();
