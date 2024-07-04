import PostModel from "../models/PostsModel";

class ExplorerController {
    async index(req, res){
        const page = parseInt(req.query.page) || 1;
        const sort = req.query.sort || 'recent';

        try {
            let sortOption;
            if (sort === 'az') {
              sortOption = { recipeTitle: 1 };
            } else {
              sortOption = { createdIn: -1 }; 
            }
      
            const totalPosts = await PostModel.countDocuments();
            const totalPages = Math.ceil(totalPosts / 10);
      
            const posts = await PostModel.find()
              .populate('author', 'username')
              .sort(sortOption)
              .skip((page - 1) * 1)
              .limit(10);
      
            if (posts.length === 0) {
              return res.status(404).json({ errors: ["Nenhuma receita encontrada"] });
            }
      
            res.render('explorer', {
              posts,
              totalPages,
              pageNum: page,
              currentPage: 'explorer',
              sort
            });
          }catch (err) {
            console.log(err);
          }
    }

}

export default new ExplorerController();