import Post from "../models/PostsModel";

class SearchController {
    async getRecipes(req, res) {
        const { query } = req.query;
        try {
            const recipes = await Post.postSearch(query);
            if(!recipes) return res.render("404", { currentPage: "404" });

            return res.render("search", { currentPage: "search", query, recipes });
        } catch (error) {
            return res.render("404", { currentPage: "404" });
        }

    }
}

export default new SearchController();