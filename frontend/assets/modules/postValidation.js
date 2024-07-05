export default class PostValidation {
    constructor(formClass){
        this.form = document.querySelector(formClass)
    }

    init(){
        this.events();
    }

    events(){
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        })
    }

    validate(e){
        const el = e.target
        const recipeTitle = el.querySelector('.recipeTitle');
        const shortDescription = el.querySelector('.shortDescription');
        const ingredients = el.querySelector('.ingredients');
        const preparationMethod = el.querySelector('.preparationMethod');
        const ingredientsValue = ingredients.value.split('\n').map(ingredient => ingredient.trim()).filter(ingredient => ingredient.length > 0);
        const ingredientsArray = el.querySelector('.ingredientsArray');
        const image = el.querySelector('.imageFile').files[0];
        const csrf = document.querySelector('input[name=_csrf]').value;


        let error = false;

        if (ingredientsValue.length === 0) {
            error = true;
        }
    
        if (!ingredients.value.trim()) {
            error = true;
        }
    
        ingredientsArray.value = JSON.stringify(ingredientsValue);
        
        if(!error) {
            // el.submit();
            console.log(ingredientsValue);
        }
    }
}