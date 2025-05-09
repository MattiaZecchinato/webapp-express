//index
function index(req, res) {

    res.send('index path');
}

//show
function show(req, res) {

    const { id } = req.params;

    const message = `show path with id: ${id}`;

    res.send(message);
}

module.exports = { index, show };