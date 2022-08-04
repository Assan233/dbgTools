export const loadImage = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();

        if (isCrossOriginUrl(url)) {
            img.crossOrigin = 'Anonymous';
        }

        img.onload = () => {
            resolve(img);
        };

        img.onerror = function () {
            const msg = 'Image load error: ' + url;

            reject(new Error(msg));
        };

        img.src = url;
    });
};