import './styles/main.scss';

import indexTemplate from './pages/index/index.hbs';
import articleTemplate from './components/article/article.hbs';
import spinnerTemplate from './components/spinner/spinner.hbs';

const urls = [
    'data1.json',
    'data2.json',
    'data3.json',
    'data4.json'
];

document.addEventListener("DOMContentLoaded", function () {
    const root = $('#root');
    root.append(indexTemplate());
    const content = $('.content');
    content.append(spinnerTemplate());

    let promises = [];

    urls.forEach((item, i) => {
        promises[i] = fetch(`api/${item}`)
            .then((response) => {
                return response.json();
            })
            .catch((ex) => {
                console.log("Error appeared: " + ex);
            })
    });

    $('.spinner').remove();

    Promise.all(promises)
        .then(values => {
            values.forEach((currentUrl) => {
                if (currentUrl !== undefined) {
                    currentUrl.data.forEach((article) => {
                        content.append(articleTemplate(article));
                    })
                }

            })
        })
});
