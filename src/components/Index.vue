<template>
  <div class="index container">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
        <h2 class="indigo-text"> {{ smoothie.title }} </h2>
        <p class="indigo-text"> {{ smoothie.slug }} </p>
        <ul class="ingredients">
          <li v-for="(ing, index) in smoothie.ingredients" :key="index">
            <span class="chip">
              {{ ing }}
            </span>
          </li>
        </ul>   
        <span class="btn-floating btn-large halfway-fab pink">
            <router-link :to="{ name: 'EditSmoothie', params: {smoothie_slug: smoothie.slug} }">
                <i class="material-icons">edit</i>
            </router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
export default {
  name: 'Index',
  data () {
    return {
     smoothies: []
    }
  },
  methods: {
    deleteSmoothie (id) {
      console.log(id)
      db.collection('smoothies').doc(id).delete().then(() => {
        this.smoothies = this.smoothies.filter(smoothie => {
          return smoothie.id != id
        })
      })
      
    }
  },
  created() {
    // Fetch Data From The Firestore
    db.collection('smoothies').get().then(snapshot => {
      snapshot.forEach(doc => {
        let smoothie = doc.data()
        smoothie.id = doc.id
        this.smoothies.push(smoothie)
      })
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
    margin-top: 5rem
  }
  h2 {
    font-size: 2rem;
    margin: 0
  }
  .card {
    box-shadow: 0px 9px 20px #00000014 !important;
  }
  .card:last-of-type {
    margin-bottom: 3rem
  }
  ul {
    margin-bottom: 0
  }
  ul li {
    display: inline;
  }
  .chip {
    background-color: #f3f3f3;
  }
  .btn-floating.btn-large {
    width: 45px;
    height: 45px;
    padding: 0;
    line-height: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .btn-large i {
    font-size: 1.3rem;
  }
  .delete {
    position: absolute;
    right: 1rem;
    top: 1rem;
    cursor: pointer;
    color: #aaa
  }
  @media only screen and (max-width: 1150px) {
    .index {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media only screen and (max-width: 767px) {
    .index {
      grid-template-columns: 1fr;
    }
  }
</style>
