// User Story: I can create recipes that have names and ingredients.
// User Story: I can see an index view where the names of all the recipes are visible.
// User Story: I can click into any of those recipes to view it.
// User Story: I can edit these recipes.
// User Story: I can delete these recipes.
// User Story: All new recipes I add are saved in my browser's local storage. If I refresh the page, these recipes will still be there.





class Dish extends React.Component{
    render(){
        return(
            <div className="row">
                <div className="col-sm-8 offset-sm-2 dish"> wef
                </div>
            </div>
        );
    }
}

class Application extends React.Component {
    render(){
        return(
            <div className="row">
                <div className="col-sm-6 offset-sm-3" id="body"> wf
                    <Dish />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <div className="container">
        <Application />
    </div>,
    document.getElementById('root')
);