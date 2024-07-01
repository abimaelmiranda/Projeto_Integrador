import { Post } from "../models/PostsModel";

class SearchController {
    async searchRecipes(req, res) {
        const { query } = req.query;
        try {
            const recipes = await Post.postSearch(query);
            if(!recipes || recipes.length === 0) return res.render("search", { currentPage: "search", query, recipes: "no-results" });

            return res.render("search", { currentPage: "search", query, recipes });
        } catch (error) {
            console.log(error);
            return res.render("404", { currentPage: "404" });
        }

    }
}

export default new SearchController();