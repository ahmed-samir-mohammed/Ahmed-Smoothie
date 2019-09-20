<template>
    <div v-if="smoothie" class="container edit-smoothie">
        <h2>Edit {{ smoothie.title }} Smoothie</h2>
        <form @submit.enter.prevent='EditSmoothie'>
            <div class="field title">
                <label for="title">Smoothie Title:</label>
                <input type="text" name="title" v-model="smoothie.title">
            </div>
            <div v-for="(ing, index) in smoothie.ingredients" :key="index" class="field">
                <label for="ingredients">Ingredient:</label>
                <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient: </label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text"> {{ feedback }} </p>  
                <button class="btn pink">Update Smoothie</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
    name: 'EditSmoothie',
    data() {
        return {
            smoothie: null,
            another: null,
            feedback: null
        }
    },
    methods: {
        addIng () {
            if (this.another) {
                this.smoothie.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            } else {
                this.feedback = 'You must enter a value to add an ingredient'
            }
        },
        deleteIng(ing) {
            this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
                return ingredient != ing
            })
        },
        EditSmoothie() {
            if (this.smoothie.title) {
                this.feedback = null
                // create a slug
                this.smoothie.slug = slugify(this.smoothie.title, {
                    replacement: '-',
                    remove: /[$*_+~/.()'"!\-:@]/g,
                    lower: true
                })
                db.collection('smoothies').doc(this.smoothie.id).update({
                    title: this.smoothie.title,
                    slug: this.smoothie.slug,
                    ingredients: this.smoothie.ingredients
                }).then(() => {
                    this.$router.push({ name: 'Index' })
                }).catch(err => {
                    console.log(err)
                })
            } else {
                this.feedback = 'You must enter a smootie title'
            }   
        }
    },
    created() {
        let ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.smoothie = doc.data()
                this.smoothie.id = doc.id
            });
        })
    }

}
</script>

<style>
    .edit-smoothie {
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
        .edit-smoothie {
            max-width: 90%;
            width: 90%;
        }
    }
</style>