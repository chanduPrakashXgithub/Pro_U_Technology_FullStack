import updatesEmitter from '../utils/updatesEmitter.js';

export const sseUpdatesHandler = (req, res) => {
    // Headers for SSE
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive'
    });

    const sendEvent = (payload) => {
        try {
            res.write(`data: ${JSON.stringify(payload)}\n\n`);
        } catch (err) { /* ignore write errors */ }
    };

    // send a welcome ping
    sendEvent({ type: 'connected', time: Date.now() });

    const onUpdate = (data) => sendEvent(data);
    updatesEmitter.on('dataUpdated', onUpdate);

    // remove listener on client disconnect
    req.on('close', () => {
        updatesEmitter.removeListener('dataUpdated', onUpdate);
    });
};
