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
        const ingredientsValue = ingredients.value.split('\n').map(ingredient => ingredient.trim());
        const ingredientsArray = el.querySelector('.ingredientsArray');
        const image = el.querySelector('.imageFile').files[0];
        const csrf = document.querySelector('input[name=_csrf]').value;

        console.log(image);

        let error = false;

        ingredientsArray.value = JSON.stringify(ingredientsValue);
        if(!error) el.submit();

   

    }
}