
class ExplorerController {
    index(req, res){
        res.render('explorer', { currentPage: 'explorer' })
    }
}

export default new ExplorerController();