export default function(articleList=[], action) {
    if(action.type === 'addArticle') {
        const checkArticleBeforeAddingToList = articleList.filter(article => article.title === action.article.title );
        if (checkArticleBeforeAddingToList.length === 0) {
            const articleListCopy = [...articleList];
            articleListCopy.push(action.article);
            return articleListCopy; 
        } else { return articleList;}
    } else if (action.type === 'deleteArticle') {
        const articleListCopy = [...articleList];
        articleListCopy.splice(action.index,1);
        return articleListCopy;
    } else {     
         return articleList; 
    }
}