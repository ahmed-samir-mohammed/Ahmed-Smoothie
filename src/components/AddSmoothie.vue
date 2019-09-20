<template>
    <div class="container add-smoothie">
        <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
        <form @submit.enter.prevent='AddSmoothie'>
            <div class="field title">
                <label for="title">Smoothie Title:</label>
                <input type="text" name="title" v-model="title">
            </div>
            <div v-for="(ing, index) in ingredients" :key="index" class="field">
                <label for="ingredients">Ingredient:</label>
                <input type="text" name="ingredient" v-model="ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient: </label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text"> {{ feedback }} </p>
                <button class="btn pink">Add Smoothie</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
    name: 'AddSmoothie',
    data() {
        return {
            title: null,
            another: null,
            ingredients: [],
            feedback: null,
            slug: null
        }
    },
    methods: {
        AddSmoothie () {
            if (this.title) {
                this.feedback = null
                // create a slug
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~/.()'"!\-:@]/g,
                    lower: true
                })
                db.collection('smoothies').add({
                    title: this.title,
                    slug: this.slug,
                    ingredients: this.ingredients
                }).then(() => {
                    this.$router.push({ name: 'Index' })
                }).catch(err => {
                    console.log(err)
                })
            } else {
                this.feedback = 'You must enter a smootie title'
            }   
        },
        addIng () {
            if (this.another) {
                // debugger
                this.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            } else {
                this.feedback = 'You must enter a value to add an ingredient'
            }
        },
        deleteIng(ing) {
            this.ingredients = this.ingredients.filter(ingredient => {
                console.log(ing)
                return ingredient != ing
            })
        }
    },
}
</script>

<style >
    .add-smoothie {
        padding: 20px;
        max-width: 40rem;
        width: 40rem;
        margin: 60px auto
    }
    h2 {
        font-size: 2rem;
        margin-bottom: 3rem
    }

    label {
        font-size: 1rem
    }

    .field {
        position: relative;
    }

    .field button {
        margin-top: 3rem
    }

    .delete {
        cursor: pointer;
        color: #aaa;
        right: 0;
        position: absolute;
        bottom: 1rem
    }
    @media (max-width: 767px) {
        .add-smoothie {
            max-width: 90%;
            width: 90%;
        }
    }
</style>