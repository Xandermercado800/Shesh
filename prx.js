const axios = require('axios');
const fs = require('fs');
const path = require('path');

const urls = [
    'https://raw.githubusercontent.com/rdavydov/proxy-list/main/proxies_anonymous/http.txt',
    'https://api.openproxylist.xyz/http.txt',
    'https://proxyspace.pro/http.txt',
    'https://proxyspace.pro/https.txt',
    'https://proxylist.to/download/all',
    'https://raw.githubusercontent.com/ALIILAPRO/Proxy/main/http.txt',
    'https://raw.githubusercontent.com/RealCalumPlays/Proxy-Lists/main/allproxies.txt',
    'https://proxyspace.pro/archive_http.txt',
    'http://proxy.test789590.com/proxy.txt',
    'https://www.proxy-list.download/api/v1/get?type=http.txt',
    'https://www.proxyscan.io/download?type=http,txt',
    'https://www.proxyscan.io/download?type=https.txt',
    'http://olaf4snow.com/public/proxy.txt',
    'http://216.176.179.106:9090/proxy.txt',
    'http://magical-goat.glitch.me/proxy.txt',
    'https://raw.githubusercontent.com/Alex877-xmr/PROXY-List/master/http.txt',
    'https://raw.githubusercontent.com/yemixzy/proxy-list/main/proxies/http.txt',
    'https://raw.githubusercontent.com/prxchk/proxy-list/main/http.txt',
    'https://raw.githubusercontent.com/caliphdev/Proxy-List/master/http.txt',
    'https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/http.txt',
    'https://raw.githubusercontent.com/fahimscirex/proxybd/master/proxylist/http.txt',
    'https://raw.githubusercontent.com/zevtyardt/proxy-list/main/http.txt',
    'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies.txt',
    'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/http/http.txt',
    'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/https/https.txt',
    'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/xResults/old-data/Proxies.txt',
    'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/xResults/old-data/RAW.txt',
    'https://api.proxyscrape.com/?request=displayproxies',
    'http://spys.me/proxy.txt',
    'https://raw.githubusercontent.com/shiftytr/proxy-list/master/proxy.txt',
    'http://alexa.lr2b.com/proxylist.txt',
    'http://rootjazz.com/proxies/proxies.txt',
    'https://www.freeproxychecker.com/result/http_proxies.txt',
    'http://proxysearcher.sourceforge.net/Proxy%20List.php?type=http.txt',
    'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-http.txt',
    'https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt',
    'https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/proxies.txt',
    'https://raw.githubusercontent.com/opsxcq/proxy-list/master/list.txt',
    'https://proxy-spider.com/api/proxies.example.txt',
    'https://multiproxy.org/txt_all/proxy.txt',
    'https://api.proxies.services/proxies',
    'https://raw.githubusercontent.com/ToShukKr/rProxyList/main/proxy-list.txt',
    'https://raw.githubusercontent.com/roosterkid/openproxylist/main/httpS_RAW.txt',
    'https://raw.githubusercontent.com/RX4096/proxy-list/main/online/all.txt',
    'https://raw.githubusercontent.com/UserR3X/proxy-list/main/online/http.txt',
    'https://raw.githubusercontent.com/UserR3X/proxy-list/main/online/https.txt',
    'https://raw.githubusercontent.com/UptimerBot/proxy-list/main/proxies/http.txt',
    'https://openproxy.space/list/http',
    'https://raw.githubusercontent.com/andigwandi/free-proxy/main/proxy_list.txt',
    'https://raw.githubusercontent.com/proxy4parsing/proxy-list/main/http.txt',
    'https://raw.githubusercontent.com/mertguvencli/http-proxy-list/main/proxy-list/data.txt',
    'https://raw.githubusercontent.com/hendrikbgr/Free-Proxy-Repo/master/proxy_list.txt',
    'https://raw.githubusercontent.com/almroot/proxylist/master/list.txt',
    'https://raw.githubusercontent.com/rdavydov/proxy-list/main/proxies/http.txt',
    'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt',
    'https://raw.githubusercontent.com/saschazesiger/Free-Proxies/master/proxies/all.txt',
    'https://raw.githubusercontent.com/aslisk/proxyhttps/main/https.txt',
    'https://raw.githubusercontent.com/saschazesiger/Free-Proxies/master/proxies/http.txt',
    'https://raw.githubusercontent.com/saisuiu/uiu/main/free.txt',
    'https://proxylist.live/nodes/free_1.php?page=1&showall=1',
    'https://raw.githubusercontent.com/HyperBeats/proxy-list/main/http.txt',
    'https://raw.githubusercontent.com/mmpx12/proxy-list/master/proxies.txt',
    'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/https.txt',
    'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt',
    'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt',
    'https://github.com/mishakorzik/Free-Proxy/blob/main/proxy.txt?raw=true',
    'https://raw.githubusercontent.com/rx443/proxy-list/main/online/http.txt',
    'https://raw.githubusercontent.com/rx443/proxy-list/main/online/https.txt',
    'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/http.txt',
    'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/https.txt',
    'https://raw.githubusercontent.com/proxylist-to/proxy-list/main/http.txt',
    'https://raw.githubusercontent.com/HyperBeats/proxy-list/main/https.txt',
    'https://raw.githubusercontent.com/tahaluindo/Free-Proxies/main/proxies/all.txt',
    'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/http.txt',
    'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/https.txt',
    'https://raw.githubusercontent.com/NotUnko/autoproxies/main/http',
    'https://api.proxyscrape.com/?request=getproxies&proxytype=http&timeout=5000&country=all&anonymity=all&ssl=all',
    'https://sunny9577.github.io/proxy-scraper/proxies.txt',
    'https://api.proxyscrape.com/?request=getproxies&proxytype=https&timeout=5000&country=all&anonymity=all&ssl=all',
    'https://www.proxy-list.download/api/v1/get?type=http',
    'https://www.proxy-list.download/api/v1/get?type=https',
    'http://rootjazz.com/proxies/proxies.txt'
];


const savePath = path.join(__dirname, 'prx.txt');

async function fetchDataAndAppendToFile(url) {
    try {
        const response = await axios.get(url);
        const data = response.data;
        fs.appendFileSync(savePath, data);
        console.log(`Successfully Scraped: ${url} | Saved To: ${savePath}`);
    } catch (error) {
        console.error(`Error Scraping: ${url} | Error Log: ${error.message}`);
    }
}

async function fetchAndAppendAllData() {
    fs.writeFileSync(savePath, '');
    for (const url of urls) {
        await fetchDataAndAppendToFile(url);
    }
}

fetchAndAppendAllData();
