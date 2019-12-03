const appRoutes = (app) => {
    app.use('/', (req, res) => {
       res.send('hello i am here');
    });
}

export { appRoutes }