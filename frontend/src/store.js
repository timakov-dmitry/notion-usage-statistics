const moment = require('moment');
const axios = require('axios').default;
// import config from '../../config';
const config = {
    BACKEND_URL: ''
}

const state = {
    loaded: false,
    count: 0,
    volume: 0,
    elements: 0,
    pageCountGraph: [{x: [], y: []}],
    volumeGraph: [{x: [], y: []}],
    elementsCountGraph: [{x: [], y: []}],
};

const loadState = async () => {
    const { data } = await axios.get(`${config.BACKEND_URL}/statistics`);

    const pageCount = [];
    const elementsCount = [];
    const volumes = [];
    const labels = [];

    data.forEach( record => {
        const date = moment(record.date).format("DD.MM");
        pageCount.push(record.count);
        elementsCount.push(record.elements);
        volumes.push(Math.round(record.volume / 1024 / 1024));
        labels.push(`${date}\n(${record.count})`);
    });
    state.count = pageCount[pageCount.length-1]
    state.volume = volumes[volumes.length-1]
    state.elements = elementsCount[elementsCount.length-1]

    state.pageCountGraph[0] = { x: labels, y: pageCount };
    state.elementsCountGraph[0] = { x: labels, y: elementsCount };
    state.volumeGraph[0] = { x: labels, y: volumes };
}

const getState = async () => {
    if (state.loaded) {
        return state
    }

    await loadState();
    state.loaded = true;
    return state;
}

export const getStatisticsData = async () => {
    const {count, volume, elements} = await getState();
    return {count, volume, elements};
};

export const getGraphsData = async () => {
    return await getState();
};

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post(`${config.BACKEND_URL}/statistics`, formData);
        loadState();

        return response.data.message;
    } catch (e) {
        if (!e.response) {
            console.error(e.message);
            return 'An error occurred while uploading the file'
        }
        return e.response.data.message;
    }
}

