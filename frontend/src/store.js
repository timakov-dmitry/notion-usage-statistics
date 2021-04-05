const moment = require('moment');
const axios = require('axios').default;

const state = {
    loaded: false,
    count: 0,
    volume: 0,
    blocksCountGraph: [{x: [], y: []}],
    volumeGraph: [{x: [], y: []}],
};

const loadState = async () => {
    const { data } = await axios.get('http://127.0.0.1:3000/statistics');

    const blocksCounts = [];
    const volumes = [];
    const labels = [];

    data.map((record) => {
        const volume = Number((record.volume / 1024 / 1024).toFixed(2));

        state.count += record.count;
        state.volume += volume;

        blocksCounts.push(record.count);
        volumes.push(volume);

        const date = moment(record.date).format("DD.MM");
        labels.push(`${date}\n(${record.count})`);
    });

    state.blocksCountGraph[0] = { x: labels, y: blocksCounts };
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
    const {count, volume} = await getState();

    return {count, volume};
};

export const getGraphsData = async () => {
    const {blocksCountGraph, volumeGraph} = await getState();

    return {blocksCountGraph, volumeGraph};
};

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post('http://127.0.0.1:3000/statistics', formData);
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

