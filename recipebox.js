// User Story: I can create recipes that have names and ingredients.
// User Story: I can see an index view where the names of all the recipes are visible.
// User Story: I can click into any of those recipes to view it.
// User Story: I can edit these recipes.
// User Story: I can delete these recipes.
// User Story: All new recipes I add are saved in my browser's local storage. If I refresh the page, these recipes will still be there.

class Dish {
    constructor(name, ingredients) {
        this.name = name;
        this.ingredients = ingredients;
    }

    add(ingredient) {
        let ingArr = this.ingredients;
        ingArr.push(ingredient);
        this.ingredients = ingArr;
    }
    remove(ingredient) {
        let ingArr = this.ingredients;
        let ind = ingArr.indexOf(ingredient);
        if (ind !== -1) {
            ingArr.splice(ind, 1);
            this.ingredients = ingArr;
        }
    }
    edit(ingredient) {
        let ingArr = this.ingredients;
        let ind = ingArr.indexOf(ingredient);
        ingArr.splice(ind, 1, ingredient)
    }
}

var exampleDishes = [{
    name: "almond flat white",
    ingredients: ["coffee", "almond milk", "skill"]
}, {
    name: "flat white",
    ingredients: ["coffee", "milk", "skill"]
}];

class IngredientUI extends React.Component {
    render() {
        const ingredient = this.props.ingredient
        return (
            <div className="col-sm-8 offset-sm-2 ingredient">               
                {ingredient}
            </div>
        );
    }
}

class DishUI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        if(this.state.isClicked == false){
            this.setState({isClicked: true});
        } else{
            this.setState({isClicked: false});
        }
    }

    showIngredientsList(props) {
        var tempArr = props;
        return tempArr.map((x) => {
            return <IngredientUI ingredient={x} />
        });
    }

    expand(props) {
        if (this.state.isClicked == true) {
            // expand to reveal ingredients
            console.log('asdf');
            return this.showIngredientsList(props.ingredients);
        } 
    }

    render() {
        const dish = this.props.dish;

        return (
            <div className="row">
                <div className="col-sm-8 offset-sm-2 dish" onClick={this.handleClick}>
                    {dish.name}          
                </div>
                {this.expand(dish)}    
            </div>
        );
    }
}

class AddDishUI extends React.Component {
    render() {
        const contentEdit = this.props.contentEdit;
        return (
            <div className="row">
                <div className="col-sm-8 offset-sm-2 dish">
                    <span contenteditable="true" onChange={contentEdit}> add a new dish!</span>
                </div>
            </div>
        );
    }
}

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: exampleDishes
        }
    }

    ComponentDidMount() {
        if (storageAvailable('localStorage')) { // test if localStorageisAvailable
            if (localStorage.getItem('_dishes')) {
                this.setState({
                    dishes: JSON.parse(localStorage.getItem('_dishes'))
                });
            } else {
                localStorage.setItem('_dishes', JSON.stringify(this.state.dishes));
            }
        }
        else {
            // print out msg that localStorage is not available
        }
    }

    populateDishUI() {
        const testArr = this.state.dishes;
        return testArr.map((x) => {
            return <DishUI dish={x} />
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-6 offset-sm-3" id="body"> wf
                    {this.populateDishUI()}
                    <AddDishUI />
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

//https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}